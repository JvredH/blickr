from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from ..forms import EditCommentForm
from ..models import db, Comment

comments_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages



@comments_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
  form = EditCommentForm()
  # csrf token from cookie added to form to prevent csrf attack
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  commentToEdit = Comment.query.get(commentId)

  if not commentToEdit:
    return 'comment not found', 404

  if form.validate_on_submit():
    commentToEdit.comment = data['comment']

    db.session.commit()
    return commentToEdit.to_dict(), 200


@comments_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
   commentToDelete = Comment.query.get(commentId)

   if not commentToDelete:
      return 'No comment found', 404

   db.session.delete(commentToDelete)
   db.session.commit()
   return 'Comment Successfully Delete', 200
