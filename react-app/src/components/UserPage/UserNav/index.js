import { NavLink } from "react-router-dom";

const UserNav = ({userId}) => {
  return (
    <div className='usernav-navlinks'>
      <div><NavLink className='user-nav-navlink' to={`/user/${userId}/photos`}>Photostream</NavLink></div>
      <div className='albums'><NavLink className='user-nav-navlink' to={`/user/${userId}/albums`}>Albums</NavLink></div>
    </div>
  )
}

export default UserNav;
