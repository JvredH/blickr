from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
  __tablename__ = 'comments'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String, nullable=False)
  date = db.Column(db.Date, nullable=False)
  photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  photo = db.relationship('Photo', back_populates='comment')
  user = db.relationship('User', back_populates='comment')

  def to_dict(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'date': self.date,
      'photo_id': self.photo_id,
      'user_id': self.user_id,

      'user': {'id': self.user.id, 'first_name': self.user.first_name, 'last_name': self.user.last_name}
    }
