from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.orm import backref


class Tags(db.Model):
  __tablename__ = 'tags'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  tag_name = db.Column(db.String, nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'tag_name': self.tag_name
    }
