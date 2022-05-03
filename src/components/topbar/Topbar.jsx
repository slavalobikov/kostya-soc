import React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {NavLink} from 'react-router-dom';

export default function Topbar() {
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
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
        </NavLink>
      </div>
    </div>
  );
}
