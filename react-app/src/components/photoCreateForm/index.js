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
    console.log('res', res)

    if (res.ok) {
      const image = await res.json();
      setImageLoading(false);
      uploadUrl = image.url
      console.log('freshly created from s3', image)
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
      // console.log('data ----> ', data)
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
              {/* Url: */}
              <input
              type='file'
              accept="image/*"
              // value={url}
              onChange={updateImage}
              placeholder='Url'
              />
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


// const UploadPicture = () => {
//   const history = useHistory(); // so that we can redirect after the image upload is successful
//   const [image, setImage] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);


//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append("image", image);

//       // aws uploads can be a bit slow—displaying
//       // some sort of loading message is a good idea
//       setImageLoading(true);

//       const res = await fetch('/api/images', {
//           method: "POST",
//           body: formData,
//       });
//       if (res.ok) {
//           await res.json();
//           setImageLoading(false);
//           history.push("/images");
//       }
//       else {
//           setImageLoading(false);
//           // a real app would probably use more advanced
//           // error handling
//           console.log("error");
//       }
//   }

//   const updateImage = (e) => {
//       const file = e.target.files[0];
//       setImage(file);
//   }

//   return (
//       <form onSubmit={handleSubmit}>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={updateImage}
//           />
//           <button type="submit">Submit</button>
//           {(imageLoading)&& <p>Loading...</p>}
//       </form>
//   )
// }
