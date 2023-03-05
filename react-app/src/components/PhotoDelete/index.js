import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePhotoThunk } from "../../store/photosReducer";
import { useModal } from "../../context/Modal";
import './deleteModal.css'


const PhotoDelete = ({photo}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault();

   return await dispatch(deletePhotoThunk(photo.id)).then(() => closeModal()).then(() => history.push('/photos'))
  }

  return (
    <div className='delete-modal'>
      <div>Are you sure you want to delete this photo?</div>
      <div className='modal-buttons'>
        <button className='modal-yes' onClick={handleClick}>Yes</button>
        <button className='modal-no' onClick={() => closeModal()}>No</button>
      </div>
    </div>
  );
}

export default PhotoDelete;
