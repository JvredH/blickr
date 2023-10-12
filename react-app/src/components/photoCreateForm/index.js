import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPhotoThunk } from "../../store/photosReducer";
import './photoCreateForm.css'

const CreatePhotoForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  let uploadUrl;

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    const imageData = new FormData();
    imageData.append('image', image);

    setImageLoading(true);

    const res = await fetch('/api/photos/upload', {
      method: 'POST',
      body: imageData
    })

    if (res.ok) {
      const newImage = await res.json();
      setImageLoading(false);
      uploadUrl = newImage.url
    } else {
      setImageLoading(false);
      setErrors('error with image upload')
    }


    const convertedDate = new Date(date).toISOString().slice(0, 10);


    const formData = {
      url: uploadUrl,
      name,
      description,
      date: convertedDate,
      user_id: sessionUser.id
    }

    const data = await dispatch(createPhotoThunk(formData))
    if (Array.isArray(data)) {
      setErrors(data)
    } else {
      history.push(`/photos/${data.id}`)
    }
  }

  const updateImage = e => {
    const file = e.target.files[0];
    setImage(file)
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
              Upload Here:
              {imageLoading && <span>Loading...</span>}
              {!imageLoading && (
                <input
                id='upload-btn'
                type='file'
                accept="image/*"
                onChange={updateImage}
                />
              )}
            </label>
            <label>
              {/* Name: */}
              <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder='Name'
              />
            </label>
            <label>
              {/* Description: */}
              <input
              className='desc-input'
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder='Description'
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
              placeholder='Date Taken'
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

