import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOnePhotoThunk } from "../../store/photosReducer";
import CommentsCards from "../CommetsGet";
// import EditPhotoForm from "../PhotoEditForm";
import PhotoDelete from '../PhotoDelete/index'
import AddCommentForm from "../CommentsAdd";
import './photoDetails.css'
import brokenImage from '../../photos/errorPhoto/brokenUrl.png'
import Footer from "../Footer";

const PhotoDetails = () => {
  let { photoId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [photo, setPhoto] = useState({});
  // const sessionUser = useSelector
  // const comments = useSelector(state => state.comments.photoComments)
  const sessionUser = useSelector(state => state.session.user);

  const date = photo.date
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })

  useEffect(() => {
    dispatch(getOnePhotoThunk(+photoId)).then((data) => setPhoto(data)).then(() => setIsLoaded(true));

    return () => setPhoto({});
  }, [dispatch, photoId]);

  console.log(photo.date)

  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && photo && (
        <div className="photo-detail-main-container">
          <div className="top-half">
            <div className="image-container">
              <img className='actual-image' src={photo.url} alt="" onError={e => {e.currentTarget.src=brokenImage} } />
            </div>
          </div>
          <div className='bottom-half'>
            <div className='left-side'>
              <div className='desc-area'>
                {/* <div className='left-half-desc'>

                  <i className="fa-solid fa-user"/>
                </div> */}
                <div className='right-half-desc'>
                  <div>
                    <div className='name'>{`${photo.user.first_name} ${photo.user.last_name}`}</div>
                    <div className='photo-name'>{photo.name}</div>
                  </div>
                  <div className='photo-desc'>
                    {photo.description}
                  </div>
                </div>
              </div>
              <div className='comments-container'>
                <h4 className='comment-h3'>Comments</h4>
                <CommentsCards photo={photo} sessionUser={sessionUser}/>
              </div>
              <div>
                <AddCommentForm photo={photo}/>
              </div>
            </div>
            <div className='right-side'>
              <div className='taken-on'>Taken On {formattedDate}</div>
                  {sessionUser && photo.user.id === sessionUser.id ? (
                      <div className='crud-btns'>
                        <div>
                          <NavLink to={`/photos/${+photoId}/edit`}>
                            <button className='edit-btn'>Edit Photo</button>
                          </NavLink>
                        </div>
                        <div>
                          <PhotoDelete photo={photo} />
                        </div>
                      </div>
                    ) : null
                  }
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default PhotoDetails;
