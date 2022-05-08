import React from 'react';
import "./online.css";
import {NavLink} from 'react-router-dom';
import StoreContext from '../../StoreContext';

export default function Online({user}) {
  return (
    <StoreContext.Consumer>
    {
      (SF) => (
      <NavLink className="usersLinks" to="/user">
        <li onClick={() => SF.onClickUser(user.userId)} className="rightbarFriend">
          <div className="rightbarProfileImgContainer">
            <img className="rightbarProfileImg" src={user.icon} alt="" />
            <span className="rightbarOnline"></span>
          </div>
          <span className="rightbarUsername">{user.userName}</span>
        </li>
      </NavLink>
      )
    }
    </StoreContext.Consumer>
  );
}
