import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPhotoThunk } from "../../store/photosReducer";
import { useParams } from "react-router-dom";

const EditPhotoForm = () => {
    const {photoId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const photo = useSelector(state => state.photos.onePhoto)
    const sessionUser = useSelector(state => state.session.user);
    const [url, setUrl] = useState(photo.url || localStorage.getItem('editPhotoFormUrl'));
    const [name, setName] = useState(photo.name || localStorage.getItem('editPhotoFormName'));
    const [description, setDescription] = useState(photo.description || localStorage.getItem('editPhotoFormDescription'));
    const [date, setDate] = useState(photo.date ? new Date(photo.date).toISOString().split('T')[0] : localStorage.getItem('editPhotoFormDate') ?? new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState([])
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    let uploadImage;

    useEffect(() => {
      localStorage.setItem('editPhotoFormUrl', url);
      localStorage.setItem('editPhotoFormName', name);
      localStorage.setItem('editPhotoFormDescription', description);
      localStorage.setItem('editPhotoFormDate', date);
    }, [url, name, description, date]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);

      if (image) {
        const imageData = new FormData();
        imageData.append('image', image);

        setImageLoading(true);

        const res = await fetch('/api/photos/upload', {
          method: 'POST',
          body: imageData
        });

        if (res.ok) {
          const newImage = await res.json()
          uploadImage = newImage.url
        } else {
          setImageLoading(false);
          setErrors('error with image upload')
        }
      }

      if (!uploadImage) {
        uploadImage = url;
      }


      const convertedDate = new Date(date).toISOString().slice(0, 10);

      const editFormData = {
        id: photoId,
        url: uploadImage,
        name,
        description,
        date: convertedDate,
        user_id: sessionUser.id
      }

      const data = await dispatch(editPhotoThunk(editFormData, +photoId))
      if (Array.isArray(data)) {
        setErrors(data)
      } else {
        history.push(`/photos/${+photoId}`)
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
          <div className='create-form-header'>Edit Photo</div>
        </div>
        <div>
          <form className='actual-form' onSubmit={handleSubmit}>
            <div>
                {errors.map((error, idx) => (
                  <div className='errors' key={idx}>{error}</div>
                ))}
            </div>
            {imageLoading && <span>Loading...</span>}
            {!imageLoading && (
              <label>
                Change photo? Upload Below:
                <input
                type='file'
                accept='image/*'
                // value={url}
                onChange={updateImage}
                id='upload-btn'
                />
              </label>
            )}
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
            <button type='submit'>Edit Photo!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPhotoForm;
