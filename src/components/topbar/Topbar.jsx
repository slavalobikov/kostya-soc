import React from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {NavLink} from 'react-router-dom';
import StoreContext from '../../StoreContext';

export default function Topbar() {

  return (
    <StoreContext.Consumer>
    {
      (SF) => (
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
            <span className="topbarLink homepage">Homepage</span>
          </NavLink>
          <NavLink to="/timeline">
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
          <NavLink to="/">
            <img 
              onClick={SF.onClickTopbarImg} 
              src={SF.currentPerson.icon || (SF.currentPerson.userId && "assets/person/noAvatar.png")} 
              alt="" 
              className="topbarImg"
            />
          </NavLink>
        </div>
      </div>
      )
    }
    </StoreContext.Consumer>
  );
}
