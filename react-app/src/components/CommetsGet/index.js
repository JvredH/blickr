import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsThunk } from "../../store/commentsReducer";

const CommentsCards = ({photo}) => {
  const dispatch = useDispatch()
  const allComments = useSelector(state => state.comments.photoComments)
  // console.log('all comments', allComments)
  const commentsArray = Object.values(allComments)

  useEffect(() => {
    dispatch(loadCommentsThunk(photo.id))
  }, [dispatch, photo.id])

  const cards = commentsArray.map(comment => {
    return (
      <div className='comment-card'>
        <div>
          <div>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
          {/* <div>{comment.date}</div> */}
        </div>
        <div> {comment.comment} </div>
      </div>
    )
  })

  return (
    <div>
      {cards}
    </div>
  );
}

export default CommentsCards;
