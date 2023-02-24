import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/commentsReducer";
import { loadCommentsThunk } from "../../store/commentsReducer";


const CommentDelete = ({comment, sessionUser, photo}) => {

  const dispatch = useDispatch()

  const canDelete = sessionUser && comment.user.id === sessionUser.id;

  const handleClick = e => {
    e.preventDefault()

    dispatch(deleteCommentThunk(comment.id)).then(() => dispatch(loadCommentsThunk(photo.id)))
  }

  return canDelete ? (
    <button onClick={handleClick}>Delete</button>
  ) : null;

}

export default CommentDelete;
