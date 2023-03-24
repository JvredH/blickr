import { NavLink } from "react-router-dom";

const UserNav = ({userId}) => {
  return (
    // <div>hello from usernav</div>
    <div>
      <div><NavLink to={`/user/${userId}/photos`}>Photostream</NavLink></div>
      <div><NavLink to={`/user/${userId}/albums`}>Albums</NavLink></div>
    </div>
  )
}

export default UserNav;
