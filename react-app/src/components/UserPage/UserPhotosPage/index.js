import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getUsersPhotosThunk } from "../../../store/photosReducer";
import UserPageHeader from "..";
// import {getUsersDataThunk} from "../../../store/usersDataReducer";
import './userPhotos.css'
import RingLoader from "react-spinners/RingLoader";
import brokenImage from '../../../photos/errorPhoto/brokenUrl.png'

const UserPhotosPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const userPhotos = useSelector(state => state.photos.usersPhotos)
  const userPhotosArr = Object.values(userPhotos)
  // const userData = useSelector(state => state.usersData)

  // console.log('USER DATA',userData)


  useEffect (() => {
    dispatch(getUsersPhotosThunk(userId))
      .then(() => setIsLoaded(true))
      .catch(() => history.push('/error'))

      // .then(() => dispatch(getUsersDataThunk(userId)))


      return () => setIsLoaded(false)
  }, [dispatch, userId])

  // if (userPhotosArr.length === 0) {
  //   return <div>user has no photos yet</div>
  // }

  const userPhotoCards = userPhotosArr.map(photo => {
    return (
      <div className='photo-card-container'>
      <NavLink className='cards' to={`/photos/${photo.id}`}>
        <img className='card-image' alt='' src={photo.url} onError={e => {e.currentTarget.src=brokenImage} }/>
        <div className='card-details'>
          <div className='title'>{photo.name}</div>
          <div className='author'>{`by ${photo.user.first_name} ${photo.user.last_name}`}</div>
        </div>
      </NavLink>
    </div>
    )
  })

  return (
    <>
      <UserPageHeader userPhotos={userPhotos} userId={userId}/>

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

      {isLoaded && userPhotosArr.length !== 0 ? (
          <div className='photos-main-container'>
            {userPhotoCards}
          </div>
        ) : (
          <div className='nada'>
            <div className='nada-content'>
              <h1>No photos yet.</h1>
            </div>
          </div>
      )}
    </>
  )
}

export default UserPhotosPage;


      {/* {isLoaded && userPhotos && (
        <>
          <div className='photos-main-container'>
            {userPhotoCards}
          </div>
        </> ? : <div>user has no photos yet</div>
      )} */}
