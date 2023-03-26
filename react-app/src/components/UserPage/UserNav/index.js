import { NavLink } from "react-router-dom";
// import './userNav.css'

const UserNav = ({userId}) => {
  return (
    // <div>hello from usernav</div>
    <div className='usernav-navlinks'>
      <div><NavLink className='user-nav-navlink' to={`/user/${userId}/photos`}>Photostream</NavLink></div>
      <div className='albums'><NavLink className='user-nav-navlink' to={`/user/${userId}/albums`}>Albums</NavLink></div>
    </div>
  )
}

export default UserNav;
