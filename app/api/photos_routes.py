from flask import Blueprint, jsonify, session, request
from ..models.photos import Photo
from flask_login import login_required
from ..forms.create_photo import CreatePhotoForm
from ..models import Photo, db
from datetime import datetime

photos_routes = Blueprint('photos', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
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
