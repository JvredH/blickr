import {NavLink} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './splashPage.css'

const SplashPage = () => {
  const [currentPhoto, setCurrentPhoto] = useState(1);
  const sessionUser = useSelector((state) => state.session.user);

  let check;
  if (sessionUser) {
    check = true;
  } else {
    check = false;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto(prevPhoto => prevPhoto === 4 ? 1 : prevPhoto + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='splash-container' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/photos/photo${currentPhoto}.jpg)` }}>
      <h1 className='splash-text'>Find your inspiration.</h1>
      <h3 className='splash-text'>Join the blickr community, home to tens of billions of photos and 2 million groups</h3>
      <NavLink to='/signup'>
        <button className='splash-btn' disabled={check}>Start for free</button>
      </NavLink>
      <NavLink to='/photos'>
        <button className='splash-exp'>Explore</button>
      </NavLink>
    </div>
  )
}

export default SplashPage;


// const SplashPage = () => {
//   return (
//     <div className='splash-container'>
//       <h1>Find your inspiration.</h1>
//       <h3>Join the blickr community, home to tens of billions of photos and 2 million groups</h3>
//       <NavLink to='/signup'>
//         <button>Start for free</button>
//       </NavLink>
//       <NavLink to='/photos'>
//         <button>Explore</button>
//       </NavLink>
//     </div>
//   )
// }
