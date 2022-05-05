import React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {NavLink} from 'react-router-dom';

export default function Topbar(props) {

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/Profile">
          <span className="logo">MySoc</span>
        </NavLink>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <NavLink to="/Profile">
          <span className="topbarLink">Homepage</span>
        </NavLink>
        <NavLink to="/">
          <span className="topbarLink">Timeline</span>
        </NavLink>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <NavLink to="/messenger">
            <div className="topbarIconItem">
              <Chat />
                <span className="topbarIconBadge">2</span>
            </div>
          </NavLink>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <NavLink to="/login">
          <img 
            onClick={props.onClickTopbarImg} 
            src="https://sun9-62.userapi.com/s/v1/if2/32TFFh8jr3uwVTpJsyzN2uMFTsUQyZhFx5Uhif46J3lva0tqWXpbyDkarGnuJE-XpEhGzhL5lxkBjYwYKckPU3wj.jpg?size=810x1080&quality=96&type=album" 
            alt="" 
            className="topbarImg"
          />
        </NavLink>
      </div>
    </div>
  );
}
