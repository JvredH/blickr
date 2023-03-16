import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push('/'));
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='p-btn' onClick={openMenu}>
      <i className="fas fa-user fa-2x"/>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div id='drop-menu-label'>Name:</div>
            <div>{`${user.first_name} ${user.last_name}`}</div>
            <div id='drop-menu-label'>Email:</div>
            <div>{user.email}</div>
            <div>
              <div className='logout-btn' onClick={handleLogout}>Log Out</div>
            </div>
          </>
        ) : null
        // (
        //   <>
        //     <OpenModalButton
        //       buttonText="Log In"
        //       onItemClick={closeMenu}
        //       modalComponent={<LoginFormModal />}
        //     />

        //     <OpenModalButton
        //       buttonText="Sign Up"
        //       onItemClick={closeMenu}
        //       modalComponent={<SignupFormModal />}
        //     />
        //   </>
        // )
        }
      </div>
    </>
  );
}

export default ProfileButton;

// return (
//   <>
//     <button onClick={openMenu}>
//       <i className="fas fa-user-circle" />
//     </button>
//     <ul className={ulClassName} ref={ulRef}>
//       {user ? (
//         <>
//           <li>{user.username}</li>
//           <li>{user.email}</li>
//           <li>
//             <button onClick={handleLogout}>Log Out</button>
//           </li>
//         </>
//       ) : (
//         <>
//           <OpenModalButton
//             buttonText="Log In"
//             onItemClick={closeMenu}
//             modalComponent={<LoginFormModal />}
//           />

//           <OpenModalButton
//             buttonText="Sign Up"
//             onItemClick={closeMenu}
//             modalComponent={<SignupFormModal />}
//           />
//         </>
//       )}
//     </ul>
//   </>
// );
