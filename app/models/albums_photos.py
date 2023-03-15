from .db import db, environment, SCHEMA, add_prefix_for_prod

class AlbumsPhotos(db.Model):
  __tablename__ = 'albums_photos'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
  photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), nullable=False)

