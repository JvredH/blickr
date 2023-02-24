import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsThunk,  } from "../../store/commentsReducer";
import CommentEditForm from '../CommentEditForm';
// import { editCommentThunk } from "../../store/commentsReducer";
import CommentDelete from "../CommentDelete";

const CommentsCards = ({ photo, sessionUser }) => {
  const dispatch = useDispatch();
  const allComments = useSelector(state => state.comments.photoComments);
  const commentsArray = Object.values(allComments);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    dispatch(loadCommentsThunk(photo.id));
  }, [dispatch, photo.id]);


  // const handleEditComment = (comment) => {
  //   // dispatch(editCommentThunk(comment));
  //   setEditingComment(null);
  // };

  const cards = commentsArray.map(comment => {
    const canEdit = sessionUser && comment.user.id === sessionUser.id;
    const isEditing = editingComment && editingComment.id === comment.id;
    return (
      <div key={comment.id} className="comment-card">
        <div>
          <div>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
        </div>
        {isEditing ? (
          <CommentEditForm
            photo={photo}
            comment={comment}
            setEditingComment={setEditingComment}
          />
        ) : (
          <div>{comment.comment}</div>
        )}
        {canEdit && !isEditing && (
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


// onSubmit={() => {
//   // dispatch(editCommentThunk(editedComment, comment.id)).then(() => dispatch(loadCommentsThunk(photo.id)));
//   setEditingComment(null);
// }}



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
