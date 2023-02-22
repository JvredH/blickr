from flask import Blueprint, jsonify, session, request
from ..models.photos import Photo


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


@photos_routes.route('/<int:photoId>')
def one_photo(photoId):
    photo = Photo.query.get(photoId)
    print('PHOTO @@@@@@@@@@@#######', photo)
    if not photo:
        return 'no photo found', 404

    return photo.to_dict(), 200
