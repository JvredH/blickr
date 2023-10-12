import React, {useState, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
  const [exploreBtn, setExploreBtn] = useState(null);
	const [youBtn, setYouBtn] = useState(null)

  useEffect(() => {
    if (location.pathname.includes('/photos') || location.pathname.includes('/albums')) {
      setExploreBtn(
        <div className='explore-btn'>
          <NavLink to='/photos'>Explore</NavLink>
        </div>
      );
    } else {
      setExploreBtn(null);
    }

		if ((location.pathname.includes('/albums') || location.pathname.includes('/photos')) && sessionUser) {
			setYouBtn(
				<div className='explore-btn'>
					<NavLink to={`/user/${sessionUser.id}/photos`}>You</NavLink>
				</div>
			)
		} else {
			setYouBtn(null)
		}

  }, [location.pathname, sessionUser]);

	let blickrPath;
	if (!sessionUser) {
		blickrPath = '/'
	} else {
		blickrPath ='/photos'
	}

	const isSplashOrLogin = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'
	console.log('isSplashOrLogin ===>',isSplashOrLogin)
	return (
		<div className={`${isSplashOrLogin ? 'nav-splash-container' : 'nav-container'}`}>
			<div className='nav-left'>
				<NavLink exact to={blickrPath} className='nav-link' id='name'>blickr</NavLink>
				{youBtn}
				{exploreBtn}
			</div>
			<div>
			{isLoaded && !sessionUser && (
				<div className='nav-right'>
					<div>
						<NavLink to='/login' className='nav-link'>Log In</NavLink>
					</div>
					<div>
						<NavLink to='/signup' className='nav-link sign-up'>Sign up</NavLink>
					</div>
				</div>
			)}
			{isLoaded && sessionUser && (
				<div className ='nav-right'>
					<div>
						<NavLink to='/photos/new' className='nav-link'>
							<i className="fa-solid fa-cloud-arrow-up fa-2x"/>
						</NavLink>
						</div>
					<div className='profile-button'>
					<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
			</div>
		</div>
	);
}

export default Navigation;

