import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsThunk,  } from "../../store/commentsReducer";
import CommentEditForm from '../CommentEditForm';
import CommentDelete from "../CommentDelete";
import './commentCard.css'
import { NavLink } from "react-router-dom";

const CommentsCards = ({ photo, sessionUser }) => {
  const dispatch = useDispatch();
  const allComments = useSelector(state => state.comments.photoComments);
  const commentsArray = Object.values(allComments);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    dispatch(loadCommentsThunk(photo?.id));
  }, [dispatch, photo?.id]);



  if (!commentsArray) return null

  const cards = commentsArray.map(comment => {
    const canEdit = sessionUser && comment.user.id === sessionUser.id;
    const isEditing = editingComment && editingComment.id === comment.id;
    return (
      <div key={comment.id} className="comment-card">
        <div>
          <div className='name-crud-btn'><NavLink to={`/user/${comment.user.id}/photos`} className='comment-navlink'>{`${comment.user.first_name} ${comment.user.last_name}`}</NavLink>
          {canEdit && !isEditing && (
            <div>
              <button  className='crud-btn' onClick={() => setEditingComment(comment)}>Edit</button>
              <CommentDelete
                comment={comment}
                sessionUser={sessionUser}
                photo={photo}
              />
              </div>
          )}</div>
        </div>
        {isEditing ? (
          <CommentEditForm
            photo={photo}
            comment={comment}
            setEditingComment={setEditingComment}
          />
        ) : (
          <div className="actual-comment">{comment.comment}</div>
        )}
      </div>
    );
  });



  return <div>{cards}</div>;
};

export default CommentsCards;

