import React from 'react';
import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.icon || "assets/person/noAvatar.png"} alt='' />
      <span className="sidebarFriendName">{user.userName || 'unknown'}</span>
    </li>
  );
}
