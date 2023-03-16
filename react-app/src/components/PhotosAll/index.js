import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getAllPhotosThunk } from "../../store/photosReducer";
import PhotoCards from "../PhotoCards";
import './index.css'
import Footer from "../Footer";
import RingLoader from "react-spinners/RingLoader";


const AllPhotos = () => {
  const dispatch = useDispatch()
  const allPhotosObj = useSelector(state => state.photos.allPhotos)
  let photos = Object.values(allPhotosObj)
  const [isLoaded, setIsLoaded] = useState(false);

  // const [photos, setPhotos] = useState(allPhotos)

  useEffect (() => {
    dispatch(getAllPhotosThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])


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

      {isLoaded && photos && (
        <div>
          <div className='photos-main-container'>
            {photos.map(photo => <PhotoCards photo={photo} key={photo.id}/> )}
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default AllPhotos;
