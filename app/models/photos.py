from .db import db, environment, SCHEMA, add_prefix_for_prod


class Photo(db.Model):
  __tablename__ = 'photos'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  date = db.Column(db.Date, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  user = db.relationship('User', back_populates='photo')
  comment = db.relationship('Comment', back_populates='photo', cascade='all, delete')
