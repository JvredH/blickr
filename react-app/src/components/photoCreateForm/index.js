import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoThunk } from "../../store/photosReducer";

const CreatePhotoForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState([])

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
    <div>
      <h1>Add A Photo</h1>
      <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
        </ul>
        <label>
          Url:
          <input
          type='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          Description:
          <input
          type='text'
          value={description}
          onChange={e => setDescription(e.target.value)}/>
        </label>
        <label>
          Date Taken:
          <input
          type='date'
          value={date}
          onChange={e => setDate(e.target.value) }
          max={new Date().toISOString().split('T')[0]}/>
        </label>
        <button type='submit'>Add Photo!</button>
      </form>
    </div>
  )
}

export default CreatePhotoForm;
