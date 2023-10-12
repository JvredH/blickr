import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addCommentThunk } from '../../store/commentsReducer';
import { loadCommentsThunk } from '../../store/commentsReducer';

const AddCommentForm = ({photo}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user )
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState([])

  const now = new Date()
  const currentDate = now.toISOString().slice(0, 10)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    if (!sessionUser) {
      history.push('/login')
      return
    }

    const newComment = {
      comment,
      date: currentDate,
      photo_id: +photo.id,
      user_id: sessionUser.id
    }


      await dispatch(addCommentThunk(newComment, +photo.id))
      await dispatch(loadCommentsThunk(photo.id));

      setComment('')
}


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor='comment'></label> */}
          <br />
          <textarea
            className='add-comment-box'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows='4'
            cols='50'
            placeholder='Add a comment!'
            minLength='1'
            maxLength='450'
            required
          />
        </div>
        <button className='comment-btn' type='submit'>Add Comment</button>
      </form>
    </div>
  );
}

export default AddCommentForm;


