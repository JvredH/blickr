import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPhotoThunk } from "../../store/photosReducer";
// import PhotoDelete from "../PhotoDelete";

const EditPhotoForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const photo = useSelector(state => state.photos.onePhoto)
    const [url, setUrl] = useState(photo.url);
    const [name, setName] = useState(photo.name);
    const [description, setDescription] = useState(photo.description);
    const [date, setDate] = useState(new Date(photo.date).toISOString().split('T')[0]);
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user);

    console.log('date --->', date)

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);

      const convertedDate = new Date(date).toISOString().slice(0, 10);

      const editFormData = {
        id: photo.id,
        url,
        name,
        description,
        date: convertedDate,
        user_id: sessionUser.id
      }

      const data = await dispatch(editPhotoThunk(editFormData, photo.id))
      if (Array.isArray(data)) {
        setErrors(data)
      } else {
        history.push(`/photos/${photo.id}`)
      }
    }


  return (
    <div>
      <h1>Edit Photo</h1>
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

export default EditPhotoForm;
