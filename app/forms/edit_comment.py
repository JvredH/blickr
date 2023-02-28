from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Length

class EditCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), Length(min=1, max=450, message='Comment must be between 1 - 450 characters')])
    # date = DateField('date')
    photo_id = IntegerField('photo_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
