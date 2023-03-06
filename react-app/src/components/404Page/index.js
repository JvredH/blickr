import { NavLink } from "react-router-dom";
import './error.css'

const Error = () => {
  return (
    <div className='error-page-container'>
      <h1>404 Page Not Found</h1>
      <h2>The page you are looking for does not exist.</h2>
      <NavLink to='/'>
        <button className='error-button'>Home</button>
      </NavLink>
    </div>
  );
}

export default Error;
