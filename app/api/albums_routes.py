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


@albums_routes.route('/<int:albumId>', methods=['DELETE'])
@login_required
def delete_album(albumId):
    """ Route to delete an album """
    album = Albums.query.get(albumId)
    albums_photos = AlbumsPhotos.query.filter_by(album_id=albumId).all()
    print('delete@!#@!#@!#@!#!@#', albums_photos)


    for album_photo in albums_photos:
        db.session.delete(album_photo)

    db.session.delete(album)
    db.session.commit()

    return 'Album successfully delete', 200


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
                album_photos = AlbumsPhotos(album_id=album.id, photo_id=photo_id)
                album.photos.append(photo)
                db.session.add(album_photos)

        db.session.commit()

        return album.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@albums_routes.route('/<int:albumId>', methods=['PUT'])
@login_required
def edit_album(albumId):
    """ Route to edit a album """
    album = Albums.query.get(albumId)

    if not album:
        return 'album cannot be found', 404

    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    if form.validate_on_submit():
        album.albums_name = data['albums_name']
        album.description = data['description']
        AlbumsPhotos.query.filter_by(album_id=albumId).delete()

        album.photos.clear()

        for photo_id in data['photo_ids']:
            photo = Photo.query.get(photo_id)

            if photo:
                album_photos = AlbumsPhotos(album_id=album.id, photo_id=photo_id)
                album.photos.append(photo)
                db.session.add(album_photos)

        db.session.commit()

        return album.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
