import {NavLink} from 'react-router-dom';
import './photoCard.css'
import brokenImage from '../../photos/errorPhoto/brokenUrl.png'

const PhotoCards = ({photo}) => {
  return (
    <div className='photo-card-container'>
      <NavLink className='cards' to={`/photos/${photo.id}`}>
        <img className='card-image' alt='' src={photo.url} onError={e => {e.currentTarget.src=brokenImage} } />
        <div className='card-details'>
          <div className='title'>{photo.name}</div>
          <div className='author'>{`by ${photo.user.first_name} ${photo.user.last_name}`}</div>
        </div>
      </NavLink>
    </div>
  )
}

export default PhotoCards;
