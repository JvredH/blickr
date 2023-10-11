import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

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
        }
      </div>
    </>
  );
}

export default ProfileButton;

