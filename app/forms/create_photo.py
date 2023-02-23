from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import User

class CreatePhotoForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    name = StringField('url', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
