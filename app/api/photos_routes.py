from flask import Blueprint, jsonify, session, request
from ..models.photos import Photo
from flask_login import login_required, current_user
from ..forms import CreatePhotoForm, CreateCommentForm
from sqlalchemy import and_
from app.aws_s3 import (
    upload_file_to_s3, allowed_file, get_unique_filename
)

from ..models import Photo, db, Comment, Tags, PhotosTags
from datetime import datetime, date

photos_routes = Blueprint('photos', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@photos_routes.route('/')
def all_photos():
  """ Route to return and display all the photos """
  all_photos = Photo.query.all() # returns back an array of the data
  return {'allPhotos': [photo.to_dict() for photo in all_photos]}, 200


@photos_routes.route('/', methods=['POST'])
@login_required
def create_photo():
    """ Route to create a new photo in database and return new photo data """
    form = CreatePhotoForm()
    # csrf token from cookie added to form to prevent csrf attack
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    # validate data from req is good
    if form.validate_on_submit():
        photo = Photo(
            url = data['url'],
            name = data['name'],
            description = data['description'],
            # method used to store data in db with proper format
            date = datetime.strptime(str(data['date']), '%Y-%m-%d').date(),
            user_id = data['user_id']
        )

        db.session.add(photo)
        db.session.commit()
        return photo.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@photos_routes.route('/upload', methods=['POST'])
@login_required
def upload_image():
    """ Route used to upload images to AWS bucket """
    # checks if req contains file named image
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    # if image is present, store in image variable
    image = request.files["image"]

    # checks file if file type is allowed
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    # function used to get a unique file name to prevent duplicates
    image.filename = get_unique_filename(image.filename)

    # upload file to bucket
    upload = upload_file_to_s3(image)

    # if url not present, an error has occurred from bucket
    if "url" not in upload:
        return upload, 400

    # return url as json back to bucket
    url = upload["url"]
    return {"url": url}


@photos_routes.route('/<int:photoId>')
def one_photo(photoId):
    """ Route to return and display one photo """
    photo = Photo.query.get(photoId)
    if not photo:
        return 'no photo found', 404

    return photo.to_dict(), 200


@photos_routes.route('/<int:photoId>', methods=['PUT'])
@login_required
def edit_photo(photoId):
    """ Route to return and edit a photo """
    form = CreatePhotoForm()

    # csrf token from cookie added to form to prevent csrf attack
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    photo = Photo.query.get(photoId)

    if not photo:
        return 'no photo found', 404

    if form.validate_on_submit():
        photo.url = data['url']
        photo.name = data['name']
        photo.description = data['description']
        photo.date = datetime.strptime(str(data['date']), '%Y-%m-%d').date()

        db.session.commit()
        return photo.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@photos_routes.route('/<int:photoId>', methods=['DELETE'])
@login_required
def delete_photo(photoId):
    """ Route to delete a photo """
    photo = Photo.query.get(photoId)

    if not photo:
        return 'No photo found', 404

    db.session.delete(photo)
    db.session.commit()
    return 'Photo Successfully Deleted', 200


@photos_routes.route('/<int:photoId>/comments')
def get_comments(photoId):
    """ Route to return comments of a photo """
    comments = Comment.query.filter(Comment.photo_id == photoId).all()

    return [comment.to_dict() for comment in comments], 200


@photos_routes.route('/<int:photoId>/comments', methods=['POST'])
@login_required
def add_comment(photoId):
    """ Route to create and return comment of a photo """
    form = CreateCommentForm()

    # csrf token from cookie added to form to prevent csrf attack
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    # create new comment obj if data within is valid
    if form.validate_on_submit():
        newComment = Comment(
            comment = data['comment'],
            date = datetime.strptime(str(data['date']), '%Y-%m-%d').date(),
            photo_id = +photoId,
            user_id = current_user.id
        )

        db.session.add(newComment)
        db.session.commit()
        return newComment.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 450


@photos_routes.route('/<int:photoId>/tags')
def get_tags(photoId):
    """ Route to get a photos tags """
    photo = Photo.query.get(photoId)

    if not photo:
        return 'no photo found', 404

    return photo.tags_to_dict(), 200


@photos_routes.route('/<int:photoId>/tags', methods=['POST'])
@login_required
def add_tags(photoId):
    """ Route to create new tags for photos """
    photo = Photo.query.get(photoId)

    # get tag from req body
    new_tag_name = request.json.get('tag_name').lower()

    # check if tag already exists
    existing_tag = Tags.query.filter_by(tag_name=new_tag_name).first()

    # if it does, create new entry in PhotoTags table
    if existing_tag:
        photo_tag = PhotosTags(photo_id=photo.id, tag_id=existing_tag.id)
        db.session.add(photo_tag)
        photo.tags.append(existing_tag)
        db.session.commit()
        return existing_tag.to_dict(), 200

    # if it does not, create a new tag entry in Tag table & PhotosTags table
    else:
        new_tag = Tags(tag_name=new_tag_name)
        db.session.add(new_tag)
        db.session.commit()

        photo_tag = PhotosTags(photo_id=photo.id, tag_id=new_tag.id)
        db.session.add(photo_tag)
        db.session.commit()

        photo.tags.append(new_tag)
        db.session.commit()

        return new_tag.to_dict(), 200


@photos_routes.route('/<int:photoId>/tags/<int:tagId>', methods=['DELETE'])
@login_required
def photo_tag_delete(photoId, tagId):
    """ Route to delete tags from photos """
    # query PhotosTags table for entry
    photo_tag_entry = PhotosTags.query.filter_by(tag_id=tagId, photo_id=photoId).first()

    # query PhotosTags table to see if any entry exists
    anyRemainingTags = PhotosTags.query.filter(PhotosTags.tag_id == tagId).all()

    # query tag Tags table to retrieve tag with ID
    tagTable = Tags.query.get(tagId)


    db.session.delete(photo_tag_entry)

    # if no more entries remain, delete tag entirely
    if not anyRemainingTags:
        db.session.delete(tagTable)

    db.session.commit()

    return jsonify({'tagId': tagId}), 200
