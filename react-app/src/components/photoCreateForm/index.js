import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoThunk } from "../../store/photosReducer";
import './photoCreateForm.css'

const CreatePhotoForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    // console.log('date --------->', date)


    const convertedDate = new Date(date).toISOString().slice(0, 10);

    // console.log('convertedDate ------>', convertedDate)

    const formData = {
      url,
      name,
      description,
      date: convertedDate,
      user_id: sessionUser.id
    }

    const data = await dispatch(createPhotoThunk(formData))
    if (Array.isArray(data)) {
      setErrors(data)
    } else {
      console.log('data ----> ', data)
      history.push(`/photos/${data.id}`)
    }
  }

  return (
    <div className='outer-form'>
      <div className='form-container create'>
        <div>
          <div className='create-form-header'>Add A Photo</div>
        </div>
        <div>
          <form className='actual-form' onSubmit={handleSubmit}>
            <div className='error-container'>
                {errors.map((error, idx) => (
                  <div className='errors' key={idx}>{error}</div>
                ))}
            </div>
            <label>
              Url:
              <input
              type='url'
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              />
            </label>
            <label>
              Name:
              <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              />
            </label>
            <label>
              Description:
              <input
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              />
            </label>
            <label>
              Date Taken:
              <input
              type='date'
              value={date}
              onChange={e => setDate(e.target.value) }
              max={new Date().toISOString().split('T')[0]}
              required
              />
            </label>
            <button type='submit'>Add Photo!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePhotoForm;
