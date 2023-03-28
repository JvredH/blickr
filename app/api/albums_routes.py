from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user

from ..models import Albums, AlbumsPhotos, db, Photo
# from ..forms import CreateAlbumForm
from app.forms.create_album import CreateAlbumForm

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


@albums_routes.route('/', methods=['POST'])
@login_required
def create_album():
    """ Route to create albums """
    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    print('DATA !@#!@$$!#@!#@!#!@#',data)

    if form.validate_on_submit():
        album = Albums(
            albums_name = data['albums_name'],
            description = data['description'],
            user_id =  data['user_id']
        )

        db.session.add(album)

        for photo_id in data['photo_ids']:
            photo = Photo.query.get(photo_id)

            if photo:
                album_photo_join = AlbumsPhotos(album_id=album.id, photo_id=photo_id)
                album.photos.append(photo)
                db.session.add(album_photo_join)

        db.session.commit()

        return album.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 500
