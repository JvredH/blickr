// import UserNav from "../UserNav";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPageHeader from "..";
import { getUsersAlbumsThunk } from "../../../store/albumsReducer";
import OpenModalButton from '../../OpenModalButton'
import RingLoader from "react-spinners/RingLoader";
import AlbumsCreateForm from "../../AlbumsCreateForm";
import {getUsersPhotosThunk} from '../../../store/photosReducer'


const UserAlbumsPage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const allUserAlbums = useSelector(state => state.albums.usersAlbums)
  const [isLoaded, setIsLoaded] = useState(false);
  const albumsArr = Object.values(allUserAlbums);

  useEffect(() => {
    dispatch(getUsersAlbumsThunk(userId))
      .then(() => setIsLoaded(true))

      return () => setIsLoaded(false)
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(getUsersPhotosThunk(userId))
  }, [])


  let albumCards;

  if (albumsArr.length === 0) {
    albumCards = (<div>{null}</div>);
  } else {
    albumCards = albumsArr.map(album => {
     return (
      <div className='photo-card-container'>
      <NavLink className='cards' to={`/albums/${album.id}`}>
        <img className='card-image' alt='' src={album.photos[0].url} />
        <div className='card-details'>
          <div className='title'>{album.name}</div>
          <div className='author'>{`${album.photos.length} photos`}</div>
        </div>
      </NavLink>
    </div>)
    })
  }



  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return (
  <>
    <UserPageHeader userId={userId}/>

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

    {isLoaded && albumsArr.length !== 0 ? (
      <div>
        {sessionUser && sessionUser.id === +userId ?
          <OpenModalButton
            className="new-album-button"
            buttonText={<> <span className="new-album-text">Create an album</span></>}
            modalComponent={<AlbumsCreateForm />}
          />
          : null }
        <div className='photos-main-container'>
          {albumCards}
        </div>
      </div>
    ) : (
      <div>User has no albums yet.</div>
    )}
  </>
  )
}

export default UserAlbumsPage;
