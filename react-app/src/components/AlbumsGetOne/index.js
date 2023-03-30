import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getOneAlbumDetailsThunk } from "../../store/albumsReducer";
import PhotoCards from "../PhotoCards";
import RingLoader from "react-spinners/RingLoader";
import './albumsGetOne.css'
import OpenModalButton from "../OpenModalButton";
import AlbumsEditForm from "../AlbumsEdit";
import AlbumDelete from "../AlbumsDelete";
import { getUsersPhotosThunk } from "../../store/photosReducer";



const AlbumsGetOne = () => {
  const {albumId} = useParams()
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const album = useSelector(state => state.albums.singleAlbum)
  const sessionUser = useSelector(state => state.session.user)
  const photosArr = album.photos ? Object.values(album.photos) : [];

  useEffect(() => {
    dispatch(getOneAlbumDetailsThunk(albumId))
    .then(() => setIsLoaded(true))
  }, [dispatch, albumId])

  useEffect(() => {
    dispatch(getUsersPhotosThunk(album?.user_id))
  },[dispatch, album])

  let photoCard;

  if (photosArr.length === 0) {
    photoCard = <div>no photos are in this album</div>
  } else {
    photoCard = (
      photosArr.map(photo => {
        return <PhotoCards photo={photo}/>
      })
    )
  }

  return (
    <>
      {!isLoaded && (
            <div className='loading'>
              <div className='loading-content'>
                <div>
                  <RingLoader
                    color='purple'
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
                <div className='loading-text'>
                  Loading...
                </div>
              </div>
            </div>
      )}

      {isLoaded && album && (
        <div>
          <div className='album-page-header'>
            <div className='album-details'>
              <div className='back-to-alb'><NavLink className='back-to-alb-link' to={`/user/${album?.user_id}/albums`}>back to albums</NavLink></div>
              <div className='album-title'>{album?.name}</div>
              <div className='photo-count'>{`${photosArr.length} photos in this album`}</div>
              <div className='album-creator'>{`Album Created By ${album?.user?.first_name} ${album?.user?.last_name}`}</div>
              <div>
                {sessionUser && album?.user_id === sessionUser.id ?
                <div>
                  <OpenModalButton
                    className="edit-album-btn"
                    buttonText='Edit'
                    modalComponent={<AlbumsEditForm albumPhotos={photosArr} album={album}/>}
                  />
                  <OpenModalButton
                  buttonText='Delete'
                  modalComponent={<AlbumDelete album={album} />}
                  className='delete-album-btn'
                  />
                </div>
                  : null }
              </div>
            </div>
          </div>

          <div className='photos-main-container'>
            {photoCard}
          </div>
        </div>
      )}
    </>
  )
}

export default AlbumsGetOne;
