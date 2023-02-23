import {NavLink} from 'react-router-dom';

const PhotoCards = ({photo}) => {
  return (
    <div className='photo-card-container'>
      <NavLink className='cards' to={`/photos/${photo.id}`}>
        <div>
          <img className='card-image' alt='' src={photo.url}/>
          <div>{photo.name}</div>
          <div>{`by ${photo.user.first_name} ${photo.user.last_name}`}</div>
        </div>
        {/* <div>
        </div> */}
      </NavLink>
    </div>
  )
}

export default PhotoCards;
