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
import OpenModalButton from "../OpenModalButton";
import Error from "../404Page";
import TagsGet from "../TagsGet";
import TagsAdd from '../TagsAdd'
import { getPhotoTagsThunk } from "../../store/tagsReducer";
import RingLoader from "react-spinners/RingLoader";


const PhotoDetails = () => {
  let { photoId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [photo, setPhoto] = useState({});
  const sessionUser = useSelector(state => state.session.user);

  const date = photo?.date
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })

  useEffect(() => {
    dispatch(getOnePhotoThunk(+photoId))
      .then((data) => setPhoto(data))
      .then(dispatch(getPhotoTagsThunk(+photoId)))
      .then(() => setIsLoaded(true));

    return () => setPhoto({});
  }, [dispatch, photoId]);

  if (!photo) return <Error />

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
      </div>)}
      {isLoaded && photo && (
        <div className="photo-detail-main-container">
          <div className="top-half">
            <div className="image-container">
              <img className='actual-image' src={photo?.url} alt="" onError={e => {e.currentTarget.src=brokenImage} } />
            </div>
          </div>
          <div className='bottom-half'>
            <div className='left-side'>
              <div className='desc-area'>
                <div className='right-half-desc'>
                  <div>
                    <div className='name'>{`${photo?.user?.first_name} ${photo?.user?.last_name}`}</div>
                    <div className='photo-name'>{photo?.name}</div>
                  </div>
                  <div className='photo-desc'>
                    {photo.description}
                  </div>
                </div>
              </div>
              <div className='comments-container'>
                <div className='comment-h3'>Comments</div>
                <CommentsCards photo={photo} sessionUser={sessionUser}/>
              </div>
              <div>
                <AddCommentForm photo={photo}/>
              </div>
            </div>
            <div className='right-side'>
              <div className='taken-on-crud-btns-container'>
                <div className='taken-on'>Taken On {formattedDate}.</div>
                    {sessionUser && photo.user.id === sessionUser.id ? (
                        <div className='crud-btns'>
                          <div>
                            <NavLink to={`/photos/${+photoId}/edit`}>
                              <button className='edit-btn'>Edit Photo</button>
                            </NavLink>
                          </div>
                          <div>
                            <OpenModalButton
                            buttonText='Delete Photo'
                            modalComponent={<PhotoDelete photo={photo} />}
                            className='delete-btn'
                            />
                          </div>
                        </div>
                      ) : null
                    }
              </div>
              <div className='tags-title-div'>Tags</div>
              <div className='tags-container'><TagsGet sessionUser={sessionUser} photo={photo}/></div>
              {sessionUser && photo.user.id === sessionUser.id ? <TagsAdd photo={photo}/> : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default PhotoDetails;
