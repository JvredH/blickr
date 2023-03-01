import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePhotoThunk } from "../../store/photosReducer";

const PhotoDelete = ({photo}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault();

   return await dispatch(deletePhotoThunk(photo.id)).then(() => history.push('/photos'))
  }

  return (
    <div>
      <button className='delete-btn' onClick={handleClick}>Delete Photo</button>
    </div>
  );
}

export default PhotoDelete;
