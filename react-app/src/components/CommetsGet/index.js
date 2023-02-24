import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsThunk,  } from "../../store/commentsReducer";
import CommentEditForm from '../CommentEditForm';
import { editCommentThunk } from "../../store/commentsReducer";
import CommentDelete from "../CommentDelete";

const CommentsCards = ({ photo, sessionUser }) => {
  const dispatch = useDispatch();
  const allComments = useSelector(state => state.comments.photoComments);
  const commentsArray = Object.values(allComments);

  useEffect(() => {
    dispatch(loadCommentsThunk(photo.id));
  }, [dispatch, photo.id]);

  const [editingComment, setEditingComment] = useState(null);

  // const handleEditComment = (comment) => {
  //   // dispatch(editCommentThunk(comment));
  //   setEditingComment(null);
  // };

  const cards = commentsArray.map(comment => {
    const canEdit = sessionUser && comment.user.id === sessionUser.id;
    return (
      <div key={comment.id} className="comment-card">
        <div>
          <div>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
        </div>
        {editingComment && editingComment.id === comment.id ? (
          <CommentEditForm
            photo={photo}
            comment={comment}
            onSubmit={(editedComment) => {
              dispatch(editCommentThunk(editedComment, comment.id)).then(() => dispatch(loadCommentsThunk(photo.id)));
              setEditingComment(null);
            }}
          />
        ) : (
          <div>{comment.comment}</div>
        )}
        {canEdit && (
          <div>
            <button onClick={() => setEditingComment(comment)}>Edit</button>
            <CommentDelete
                comment={comment}
                sessionUser={sessionUser}
                photo={photo}
              />
          </div>
        )}
      </div>
    );
  });

  return <div>{cards}</div>;
};

export default CommentsCards;


// const CommentsCards = ({ photo, sessionUser }) => {
//   const dispatch = useDispatch();
//   const allComments = useSelector(state => state.comments.photoComments);
//   const commentsArray = Object.values(allComments);

//   useEffect(() => {
//     dispatch(loadCommentsThunk(photo.id));
//   }, [dispatch, photo.id]);

//   const [editingComment, setEditingComment] = useState(null);

//   const cards = commentsArray.map(comment => {
//     const canEdit = sessionUser && comment.user.id === sessionUser.id;
//     return (
//       <div key={comment.id} className="comment-card">
//         <div>
//           <div>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
//         </div>
//         {editingComment && editingComment.id === comment.id ? (
//           <CommentEditForm
//             comment={editingComment}
//             setEditingComment={setEditingComment}
//           />
//         ) : (
//           <div>{comment.comment}</div>
//         )}
//         {canEdit && (
//           <button onClick={() => setEditingComment(comment)}>Edit</button>
//         )}
//       </div>
//     );
//   });

//   return <div>{cards}</div>;
// };
