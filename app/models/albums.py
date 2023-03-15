from .db import db, environment, SCHEMA, add_prefix_for_prod


class Albums(db.Model):
  __tablename__ = 'albums'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  albums_name = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  user = db.relationship("User", back_populates="albums")

  if environment == "production":
    __table_args__ = {"schema": SCHEMA}
    photos = db.relationship('Photo', secondary=f'{SCHEMA}.albums_photos', back_populates='albums', cascade='all, delete')
  else:
    photos = db.relationship('Photo', secondary='albums_photos', back_populates='albums', cascade='all, delete')
