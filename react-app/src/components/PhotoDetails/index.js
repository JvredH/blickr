import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePhotoThunk } from "../../store/photosReducer";

const PhotoDetails = () => {
  let { photoId } = useParams()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const photo = useSelector(state => state.photos.onePhoto)

  useEffect(() => {
    dispatch(getOnePhotoThunk(+photoId)).then(() => setIsLoaded(true))
  }, [dispatch, photoId])

  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && (
        <div className='photo-detail-main-container'>
          <div className='top half'>
            <img src={photo.url}/>
          </div>
          <div>
            <div>{`${photo.user.first_name} ${photo.user.last_name}`}</div>
            <div>{photo.name}</div>
            <div>{photo.description}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoDetails;
