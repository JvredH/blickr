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

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

    tags = db.relationship('Tags', secondary=f'{SCHEMA}.photos_tags', cascade='all, delete')
  else:
    tags = db.relationship('Tags', secondary='photos_tags', cascade='all, delete')


  def to_dict(self):
    return {
      'id': self.id,
      'url': self.url,
      'name': self.name,
      'description': self.description,
      'date': self.date,
      'user_id': self.user_id,

      'user': {'id': self.user.id, 'first_name': self.user.first_name, 'last_name': self.user.last_name},
      'tags': {'id': self.tags.id, 'tag_name': self.tags.tag_name}
    }
