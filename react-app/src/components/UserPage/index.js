import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './userPage.css'

const UserPageHeader = ({userId}) => {
  const userData = useSelector(state => state.usersData)

return (
  <div>
    <div className='banner-photo-container'>
      <div className='banner-content'>
        <div className='user-profile-photo'></div>
        <div>
          <div className='users-name'>{`${userData?.first_name} ${userData?.last_name}`}</div>
          <div className='users-email'>{userData?.email}</div>
        </div>
      </div>
    </div>
    <div className='user-nav-container'>
    <div className='usernav-navlinks'>
      <div><NavLink className='user-nav-navlink' to={`/user/${userId}/photos`}>Photostream</NavLink></div>
      <div className='albums'><NavLink className='user-nav-navlink' to={`/user/${userId}/albums`}>Albums</NavLink></div>
    </div>
    </div>
  </div>
  )
}

export default UserPageHeader;
