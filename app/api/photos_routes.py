from flask import Blueprint, jsonify, session, request
from ..models.photos import Photo
from flask_login import login_required, current_user
from ..forms import CreatePhotoForm, CreateCommentForm

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
  print('all_photos from back end @@@@@@@@@',all_photos)
  return {'allPhotos': [photo.to_dict() for photo in all_photos]}, 200

@photos_routes.route('/', methods=['POST'])
@login_required
def create_photo():
    """ Route to create a new photo in database and return new photo data """
    form = CreatePhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        photo = Photo(
            url = data['url'],
            name = data['name'],
            description = data['description'],
            date = datetime.strptime(str(data['date']), '%Y-%m-%d').date(),
            user_id = data['user_id']
        )

        db.session.add(photo)
        db.session.commit()
        return photo.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@photos_routes.route('/<int:photoId>')
def one_photo(photoId):
    """ Route to return and display one photo """
    photo = Photo.query.get(photoId)
    print('PHOTO @@@@@@@@@@@#######', photo)
    if not photo:
        return 'no photo found', 404

    return photo.to_dict(), 200


@photos_routes.route('/<int:photoId>', methods=['PUT'])
@login_required
def edit_photo(photoId):
    """ Route to return and edit a photo """
    form = CreatePhotoForm()
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
    print('ROUTE HIT !@#@!%!@$!@#!')
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

    # if not comments:
    #     return 'No comments for this photo', 404

    print('back end comments !#@$@!@!#!@##@!@!#', list(comments))

    return [comment.to_dict() for comment in comments], 200


@photos_routes.route('/<int:photoId>/comments', methods=['POST'])
@login_required
def add_comment(photoId):
    """ Route to create and return comment of a photo """
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        # date_str = data['date'].strftime('%Y-%m-%d')
        newComment = Comment(
            comment = data['comment'],
            date = datetime.strptime(str(data['date']), '%Y-%m-%d').date(),
            photo_id = +photoId,
            user_id = current_user.id
        )

        db.session.add(newComment)
        db.session.commit()
        return newComment.to_dict(), 200
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 450


@photos_routes.route('/<int:photoId>/tags')
def get_tags(photoId):
    photo = Photo.query.get(photoId)

    if not photo:
        return 'no photo found', 404

    return photo.tags_to_dict(), 200


@photos_routes.route('/<int:photoId>/tags', methods=['POST'])
@login_required
def add_tags(photoId):
    photo = Photo.query.get(photoId)
    new_tag_name = request.json.get('tag_name').lower()

    existing_tag = Tags.query.filter_by(tag_name=new_tag_name).first()

    if existing_tag:
        photo_tag = PhotosTags(photo_id=photo.id, tag_id=existing_tag.id)
        db.session.add(photo_tag)
        photo.tags.append(existing_tag)
        db.session.commit()
        return existing_tag.to_dict(), 200

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
