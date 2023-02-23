import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOnePhotoThunk } from "../../store/photosReducer";
// import EditPhotoForm from "../PhotoEditForm";
import PhotoDelete from '../PhotoDelete/index'

const PhotoDetails = () => {
  let { photoId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const photo = useSelector(state => state.photos.onePhoto);

  useEffect(() => {
    dispatch(getOnePhotoThunk(+photoId)).then(() => setIsLoaded(true))
  }, [dispatch, photoId])

  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && (
        <div className='photo-detail-main-container'>
          <div className='top half'>
            <img src={photo?.url} alt=''/>
          </div>
          <div>
            <div>{`${photo.user?.first_name} ${photo.user?.last_name}`}</div>
            <div>{photo?.name}</div>
            <div>{photo?.description}</div>
          </div>
          <div>
            <NavLink to={`/photos/${+photoId}/edit`}>
              <button>edit</button>
            </NavLink>
          </div>
          <div>
            <PhotoDelete photo={photo}/>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoDetails;
