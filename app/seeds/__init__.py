from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .tags import seed_tags, undo_tags
from .photos_tags import seed_photos_tags, undo_photos_tags
# from .albums import seed_albums, undo_albums
# from .albums_photos import seed_albums_photos, undo_albums_photos

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_photos()
        undo_comments()
        undo_tags()
        undo_photos_tags()
        # undo_albums()
        # undo_albums_photos()
    seed_users()
    # Add other seed functions here
    seed_photos()
    seed_comments()
    seed_tags()
    seed_photos_tags()
    # seed_albums()
    # seed_albums_photos()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_albums_photos()
    # undo_albums()
    undo_photos_tags()
    undo_tags()
    undo_comments()
    undo_photos()
    undo_users()
    # Add other undo functions here
