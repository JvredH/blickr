import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPhotoThunk } from "../../store/photosReducer";
// import PhotoDelete from "../PhotoDelete";
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
    // const [date, setDate] = useState(new Date(photo.date).toISOString().split('T')[0]);
    const [date, setDate] = useState(photo.date ? new Date(photo.date).toISOString().split('T')[0] : localStorage.getItem('editPhotoFormDate') ?? new Date().toISOString().split('T')[0]);
    const [errors, setErrors] = useState([])

    // console.log('date --->', date)

    useEffect(() => {
      localStorage.setItem('editPhotoFormUrl', url);
      localStorage.setItem('editPhotoFormName', name);
      localStorage.setItem('editPhotoFormDescription', description);
      localStorage.setItem('editPhotoFormDate', date);
    }, [url, name, description, date]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);

      const convertedDate = new Date(date).toISOString().slice(0, 10);

      const editFormData = {
        id: photoId,
        url,
        name,
        description,
        date: convertedDate,
        user_id: sessionUser.id
      }

      // console.log('photo.id ====> ', +photoId)

      const data = await dispatch(editPhotoThunk(editFormData, +photoId))
      if (Array.isArray(data)) {
        setErrors(data)
      } else {
        history.push(`/photos/${+photoId}`)
      }
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
                  <div key={idx}>{error}</div>
                ))}
            </div>
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
            <button type='submit'>Edit Photo!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPhotoForm;

// const EditPhotoForm = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const photo = useSelector(state => state.photos.onePhoto)
//   const sessionUser = useSelector(state => state.session.user);
//   const [url, setUrl] = useState(photo.url);
//   const [name, setName] = useState(photo.name);
//   const [description, setDescription] = useState(photo.description);
//   // const [date, setDate] = useState(new Date(photo.date).toISOString().split('T')[0]);
//   const [date, setDate] = useState(new Date(photo.date ?? new Date()).toISOString().split('T')[0]);
//   const [errors, setErrors] = useState([])

//   console.log('date --->', date)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     const convertedDate = new Date(date).toISOString().slice(0, 10);

//     const editFormData = {
//       id: photo.id,
//       url,
//       name,
//       description,
//       date: convertedDate,
//       user_id: sessionUser.id
//     }

//     const data = await dispatch(editPhotoThunk(editFormData, photo.id))
//     if (Array.isArray(data)) {
//       setErrors(data)
//     } else {
//       history.push(`/photos/${photo.id}`)
//     }
//   }


// return (
//   <div className='outer-form'>
//     <div className='form-container create'>
//       <div>
//         <div className='create-form-header'>Edit Photo</div>
//       </div>
//       <div>
//         <form className='actual-form' onSubmit={handleSubmit}>
//           <div>
//               {errors.map((error, idx) => (
//                 <div key={idx}>{error}</div>
//               ))}
//           </div>
//           <label>
//             Url:
//             <input
//             type='url'
//             value={url}
//             onChange={e => setUrl(e.target.value)}
//             />
//           </label>
//           <label>
//             Name:
//             <input
//             type='text'
//             value={name}
//             onChange={e => setName(e.target.value)}/>
//           </label>
//           <label>
//             Description:
//             <input
//             type='text'
//             value={description}
//             onChange={e => setDescription(e.target.value)}/>
//           </label>
//           <label>
//             Date Taken:
//             <input
//             type='date'
//             value={date}
//             onChange={e => setDate(e.target.value) }
//             max={new Date().toISOString().split('T')[0]}/>
//           </label>
//           <button type='submit'>Edit Photo!</button>
//         </form>
//       </div>
//     </div>
//   </div>
// )
// }

// export default EditPhotoForm;
