import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumsThunk } from "../../store/albumsReducer";



const AlbumDelete = ({album}) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user)

  const handleClick = async e => {
    e.preventDefault();

    return await dispatch(deleteAlbumsThunk(album.id)).then(() => closeModal()).then(() => history.push(`/user/${sessionUser.id}/albums`))
  }

  return (
    <div className='delete-modal'>
      <div>Are you sure you want to delete this album?</div>
      <div className='modal-buttons'>
        <button className='modal-yes' onClick={handleClick}>Yes</button>
        <button className='modal-no' onClick={() => closeModal()}>No</button>
      </div>
    </div>
  )
}

export default AlbumDelete;
