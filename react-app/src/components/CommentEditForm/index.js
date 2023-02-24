import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCommentsThunk } from "../../store/commentsReducer";
import { editCommentThunk } from "../../store/commentsReducer";

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
    <form onSubmit={handleSubmit}>
      <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

export default CommentEditForm;
