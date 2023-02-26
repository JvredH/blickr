import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOnePhotoThunk } from "../../store/photosReducer";
import CommentsCards from "../CommetsGet";
// import EditPhotoForm from "../PhotoEditForm";
import PhotoDelete from '../PhotoDelete/index'
import AddCommentForm from "../CommentsAdd";
import './photoDetails.css'

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
          <div className="top-half">
            <div className="image-container">
              <img className='actual-image' src={photo.url} alt="" />
            </div>
          </div>
          <div className='bottom-half'>
            <div className='desc-area'>
              <div className='left-half-desc'>
                Profile Pic
              </div>
              <div className='right-half-desc'>
                <div>
                  <div>{`${photo.user.first_name} ${photo.user.last_name}`}</div>
                  <div>{photo.name}</div>
                </div>
                <div>
                  {photo.description}
                </div>
              </div>
            </div>
              {sessionUser && photo.user.id === sessionUser.id ? (
                  <div className='crud-btns'>
                    <div>
                      <NavLink to={`/photos/${+photoId}/edit`}>
                        <button>edit</button>
                      </NavLink>
                    </div>
                    <div>
                      <PhotoDelete photo={photo} />
                    </div>
                  </div>
                ) : null
              }
            <div className='comments-container'>
              <h3>Comments</h3>
              <CommentsCards photo={photo} sessionUser={sessionUser}/>
            </div>
            <div>
              <AddCommentForm photo={photo}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoDetails;
