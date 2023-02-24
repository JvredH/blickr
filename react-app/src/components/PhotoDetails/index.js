import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOnePhotoThunk } from "../../store/photosReducer";
import CommentsCards from "../CommetsGet";
// import EditPhotoForm from "../PhotoEditForm";
import PhotoDelete from '../PhotoDelete/index'
import AddCommentForm from "../CommentsAdd";

const PhotoDetails = () => {
  let { photoId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [photo, setPhoto] = useState({});
  // const sessionUser = useSelector
  // const comments = useSelector(state => state.comments.photoComments)
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getOnePhotoThunk(+photoId)).then((data) => setPhoto(data)).then(() => setIsLoaded(true));

    return () => setPhoto({});
  }, [dispatch, photoId]);

  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && photo && (
        <div className="photo-detail-main-container">
          <div className="top half">
            <img src={photo.url} alt="" />
          </div>
          <div>
            <div>{`${photo.user.first_name} ${photo.user.last_name}`}</div>
            <div>{photo.name}</div>
            <div>{photo.description}</div>
          </div>
          <div>
            <NavLink to={`/photos/${+photoId}/edit`}>
              <button>edit</button>
            </NavLink>
          </div>
          <div>
            <PhotoDelete photo={photo} />
          </div>
          <div className='comments-container'>
            <CommentsCards photo={photo} sessionUser={sessionUser}/>
          </div>
          <div>
            <AddCommentForm photo={photo}/>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoDetails;
