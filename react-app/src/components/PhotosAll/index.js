import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPhotosThunk } from "../../store/photosReducer";
import PhotoCards from "../PhotoCards";
import './index.css'
import Footer from "../Footer";

const AllPhotos = () => {
  const dispatch = useDispatch()
  const allPhotosObj = useSelector(state => state.photos.allPhotos)
  let photos = Object.values(allPhotosObj)
  // const [photos, setPhotos] = useState(allPhotos)

  useEffect (() => {
    dispatch(getAllPhotosThunk());
  }, [dispatch])


  return (
    <div>
      <div className='photos-main-container'>
        {photos.map(photo => <PhotoCards photo={photo} key={photo.id}/> )}
      </div>
      <Footer />
    </div>
  )
}

export default AllPhotos;
