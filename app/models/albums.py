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

  def to_dict(self):
      return {
          "id": self.id,
          "user_id": self.user_id,
          "name" : self.albums_name,
          "description" : self.description,

          "user": {"first_name": self.user.first_name, "last_name": self.user.last_name},
          "photos": [photo.to_dict() for photo in self.photos]
      }
