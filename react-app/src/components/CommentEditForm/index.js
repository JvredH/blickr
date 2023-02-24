import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCommentsThunk } from "../../store/commentsReducer";

const CommentEditForm = ({ comment, onSubmit,photo }) => {
  const dispatch = useDispatch()
  const [editedComment, setEditedComment] = useState(comment.comment);

  // const dateStr = comment.date;
  // const dateObj = new Date(dateStr);
  // const yyyy = dateObj.getFullYear();
  // const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  // const dd = String(dateObj.getDate()).padStart(2, '0');
  // const formattedDate = `${yyyy}-${mm}-${dd}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...comment, comment: editedComment, /*date: formattedDate*/});
    

  };
  console.log('comment from edit form...', comment)
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

export default CommentEditForm;
