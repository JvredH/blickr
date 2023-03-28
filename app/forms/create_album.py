from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, FieldList
from wtforms.validators import DataRequired, Length

class CreateAlbumForm(FlaskForm):
    albums_name = StringField('albums_name', validators=[DataRequired(), Length(min=1, max=30, message='Album must be between 1 and 30 characters')])
    description = StringField('description')
    user_id = IntegerField('user_id', validators=[DataRequired()])
    photo_ids = FieldList(IntegerField("photo_id"))
