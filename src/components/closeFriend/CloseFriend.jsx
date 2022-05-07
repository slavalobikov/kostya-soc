import React from 'react';
import {NavLink} from 'react-router-dom';
import "./closeFriend.css";
import StoreContext from '../../StoreContext';

export default function CloseFriend({user}) {

  return (
    <StoreContext.Consumer>
      {
        (SF) => (
        <NavLink className="usersLinks" to="/user">
          <li onClick={() => SF.onClickUser(user.userId)}  className="sidebarFriend">
            <img className="sidebarFriendImg" src={user.icon || "assets/person/noAvatar.png"} alt='' />
            <span className="sidebarFriendName">{user.userName || 'unknown'}</span>
          </li>
        </NavLink>
        )
      }
    </StoreContext.Consumer>
  );
}
