from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email is already in use.')


class SignUpForm(FlaskForm):
    # username = StringField(
    #     'email', validators=[DataRequired(), username_exists])
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=1, max=50, message='First name must be between 1 - 50 characters')])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=1, max=50, message='Last name must be between 1 - 50 characters')])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(min=4, max=100, message='Email must be between 4 - 100 characters')])
    age = IntegerField('age', validators=[DataRequired(), NumberRange(min=16, max=100, message='Age must be between 16 - 100 years old')])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=50, message='Password must be be between 6 - 50 characters long')])
