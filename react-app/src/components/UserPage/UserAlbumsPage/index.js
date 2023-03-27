// import UserNav from "../UserNav";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPageHeader from "..";
import { getUsersAlbumsThunk } from "../../../store/albumsReducer";
import RingLoader from "react-spinners/RingLoader";

const UserAlbumsPage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const allUserAlbums = useSelector(state => state.albums.usersAlbums)
  const [isLoaded, setIsLoaded] = useState(false);
  const albumsArr = Object.values(allUserAlbums);


  console.log('user albums here fam', albumsArr)

  useEffect(() => {
    dispatch(getUsersAlbumsThunk(userId))
      .then(() => setIsLoaded(true))

      return () => setIsLoaded(false)
  }, [dispatch, userId])

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
      <div className='photos-main-container'>
        {albumCards}
      </div>
    ) : (
      <div>User has no albums yet.</div>
    )}
  </>
  )
}

export default UserAlbumsPage;
