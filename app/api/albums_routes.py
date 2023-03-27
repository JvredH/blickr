from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user

from ..models import Albums, AlbumsPhotos

albums_routes = Blueprint('albums', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@albums_routes.route('/<int:albumId>')
def one_album(albumId):
    """ Route that queries for one album and returns data for that album """
    album = Albums.query.get(albumId)

    if not album:
        return 'no album found', 404

    return album.to_dict(), 200
