import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCommentsThunk } from "../../store/commentsReducer";
import { editCommentThunk } from "../../store/commentsReducer";
import './editCommentForm.css'

const CommentEditForm = ({ comment, photo, setEditingComment }) => {
  const dispatch = useDispatch()
  const [editedComment, setEditedComment] = useState(comment.comment);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newComment = {...comment, comment: editedComment}

    dispatch(editCommentThunk(newComment, comment.id)).then(() => dispatch(loadCommentsThunk(photo.id)))

    setEditingComment(null)

  };

  return (
    <form className='edit-comment-form' onSubmit={handleSubmit}>
      <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} rows='4' cols='50' minLength='1' maxLength='450' required/>
      <button className='edit button' type="submit">Save</button>
    </form>
  );
};

export default CommentEditForm;
