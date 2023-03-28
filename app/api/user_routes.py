from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:userId>/photos')
def usersPhotos(userId):
    """ Query for all photos a user posted """

    user = User.query.get(userId)

    return user.photo_to_dict(), 200


@user_routes.route('/<int:userId>/albums')
def usersAlbums(userId):
    """ Query for all albums a user has """

    user = User.query.get(userId)

    return user.albums_to_dict(), 200
