import { useSelector, useDispatch } from "react-redux";
import { useState} from "react";
import { useModal } from "../../context/Modal";
import brokenImage from '../../photos/errorPhoto/brokenUrl.png'
import './albumCreateForm.css'
import { createAlbumThunk } from "../../store/albumsReducer";
import { useHistory} from "react-router-dom";


const AlbumsCreateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();
  const sessionUser = useSelector(state => state.session.user)
  const usersPhotos = useSelector(state => state.photos.usersPhotos)
  const usersPhotosArr = Object.values(usersPhotos)
  const [albumName, setAlbumName] = useState("");
  const [pickedPhotos, setPickedPhotos] = useState([]);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const photoIdArr = pickedPhotos.map(photo => photo.id)

    const newAlbum = {
      user_id: sessionUser.id,
      albums_name: albumName,
      description: null,
      photo_ids: photoIdArr
    }

    const album = await dispatch(createAlbumThunk(newAlbum))
    if (Array.isArray(album)) {
        const errorMessages = Object.values(album);
        setErrors(errorMessages);
      } else {
        history.push(`/albums/${album.id}`)
        closeModal()
      }
  }

  const handlePickedPhotos = (photo) => {
    const photoIndex = pickedPhotos.findIndex((pickedPhoto) => pickedPhoto.id === photo.id);

    if (photoIndex > -1) {
      const newPickedPhotos = [...pickedPhotos];
      newPickedPhotos.splice(photoIndex, 1);
      setPickedPhotos(newPickedPhotos);
    } else {
      setPickedPhotos([...pickedPhotos, photo]);
    }
  };

  const isPicked = (photo) => {
    return pickedPhotos.find((pickedPhoto) => pickedPhoto.id === photo.id) !== undefined;
  };

  return (
    <div className="album-modal-container">
      <div>Create Album</div>
      <form className="album-form-container" onSubmit={handleSubmit}>
        <div className="errors">
          {errors?.length > 0 ? errors.map((error) => <div key={error}>{error}</div>) : null}
        </div>
        <div className="edit-label-container">
            <label>
              Name
              <input
              type="text"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="Album name"
              required />
            </label>
            {pickedPhotos.length === 0 && (
                  <div className="errors">Must pick at least one photo.</div>
              )}
            <label>
              Pick Photos to Add to Album
              <div className="mini-photo-container">
                  {usersPhotosArr.map((photo) => (
                  <div key={photo.id} className={`mini-photo-cards ${isPicked(photo) ? "selected" : ""}`} onClick={() => handlePickedPhotos(photo)}>
                    <img src={photo.url} alt="" className="mini-img" onError={e => {e.currentTarget.src=brokenImage}} />
                  </div>
                  ))}
              </div>
            </label>
            <button className={`create-album-submit ${pickedPhotos.length > 0 ? "" : "grayed-out"}`} type="submit" disabled={pickedPhotos.length === 0}>
            Create Album
            </button>
          </div>
      </form>
    </div>
  );
}

export default AlbumsCreateForm;
