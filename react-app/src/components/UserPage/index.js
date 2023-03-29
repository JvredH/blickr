import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersDataThunk } from "../../store/usersDataReducer";
import './userPage.css'


const UserPageHeader = ({userId}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.usersData);


  useEffect (() => {
    dispatch(getUsersDataThunk(userId))
  }, [dispatch, userId])


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
      <div><NavLink className='user-nav-navlink' to={`/user/${userId}/photos`} activeClassName='active-nav-link' >Photostream</NavLink></div>
      <div className='albums'><NavLink className='user-nav-navlink' to={`/user/${userId}/albums`} activeClassName='active-nav-link' >Albums</NavLink></div>
    </div>
    </div>
  </div>
  )
}

export default UserPageHeader;
