import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<div className='nav-left'>
				<NavLink exact to="/">Home</NavLink>
			</div>
			<div>
			{isLoaded && !sessionUser && (
				<div className='nav-right'>
					<div>
						<NavLink to='/login'>Log In</NavLink>
					</div>
					<div>
						<NavLink to='/signup'>Sign up</NavLink>
					</div>
				</div>
			)}
			{isLoaded && sessionUser && (
				<div className ='nav-right'>
					<div>
						<NavLink to='/photos/new'>
							Upload
						</NavLink>
						</div>
					<div>
					<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
			</div>
		</div>
	);
}

export default Navigation;

{/* <div className='nav-right'>
	<div>
		<NavLink to='/login'>Log In</NavLink>
	</div>
	<div>
		<NavLink to='/signup'>Sign up</NavLink>
	</div>
	<div>
		<ProfileButton user={sessionUser} />
	</div>
</div> */}



// return (
// 	<div className='nav-container'>
// 		<div className='nav-left'>
// 			<NavLink exact to="/">Home</NavLink>
// 		</div>
// 		<div>
// 		{isLoaded && (
// 			<div className='nav-right'>
// 				<div>
// 					<NavLink to='/login'>Log In</NavLink>
// 				</div>
// 				<div>
// 					<NavLink to='/signup'>Sign up</NavLink>
// 				</div>
// 			</div>
// 		)}
// 		{isLoaded && sessionUser && (
// 			<div className ='nav-right'>
// 				<div>Upload Button here</div>
// 				<div>
// 				<ProfileButton user={sessionUser} />
// 				</div>
// 			</div>
// 		)}
// 		</div>
// 	</div>
// );



// original return
// return (
// 	<div className='nav-container'>
// 		<div className='nav-left'>
// 			<NavLink exact to="/">Home</NavLink>
// 		</div>
// 		<div>
// 		{isLoaded && (
// 			<div className='nav-right'>
// 				<div>
// 					<NavLink to='/login'>Log In</NavLink>
// 				</div>
// 				<div>
// 					<NavLink to='/signup'>Sign up</NavLink>
// 				</div>
// 				{sessionUser &&
// 					<div>
// 						<ProfileButton user={sessionUser} />
// 					</div>
// 				}
// 			</div>
// 		)}
// 		</div>
// 	</div>
// );
