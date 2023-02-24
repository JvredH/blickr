from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired

class CreateCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    date = DateField('date')
    photo_id = IntegerField('photo_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
