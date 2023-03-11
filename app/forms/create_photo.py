from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
# from app.models import User

class CreatePhotoForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    name = StringField('url', validators=[DataRequired(), Length(min=1, max=100, message='Name must be between 1 - 100 characters')])
    description = StringField('description', validators=[DataRequired(), Length(min=1, max=500, message='Description must be between 1 - 500 characters')])
    date = DateField('date', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
