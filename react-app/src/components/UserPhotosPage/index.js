import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getUsersPhotosThunk } from "../../store/photosReducer";


const UserPhotosPage = () => {
  const dispatch = useDispatch()
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const userPhotos = useSelector(state => state.photos.usersPhotos)
  const userPhotosArr = Object.values(userPhotos)

  useEffect (() => {
    dispatch(getUsersPhotosThunk(userId))
      .then(() => setIsLoaded(true))

      return () => setIsLoaded(false)
  }, [dispatch, userId])

  if (!userPhotos) {
    return <div>user has no photos yet</div>
  }

  const userPhotoCards = userPhotosArr.map(photo => {
    console.log('inside for each',photo)
    return (
      <div className='photo-card-container'>
      <NavLink className='cards' to={`/photos/${photo.id}`}>
        <img className='card-image' alt='' src={photo.url} />
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

      {!isLoaded && (<div>Loading...</div>)}

      {isLoaded && userPhotos && (
        <div className='photos-main-container'>
          {userPhotoCards}
        </div>
      )}

    </>
  )
}

export default UserPhotosPage;
