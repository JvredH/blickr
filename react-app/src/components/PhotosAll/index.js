import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPhotosThunk } from "../../store/photosReducer";
import PhotoCards from "../PhotoCards";
import './index.css'

const AllPhotos = () => {
  const dispatch = useDispatch()
  const allPhotosObj = useSelector(state => state.photos.allPhotos)
  let photos = Object.values(allPhotosObj)
  // const [photos, setPhotos] = useState(allPhotos)

  useEffect (() => {
    dispatch(getAllPhotosThunk());
  }, [dispatch])


  return (
    <div className='photos-main-container'>
      {photos.map(photo => <PhotoCards photo={photo} key={photo.id}/> )}
    </div>
  )
}

export default AllPhotos;
