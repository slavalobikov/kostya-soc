import React, {useState} from 'react';
import "./user.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import UserRightbar from "./userRightbar";
import StoreContext from "../../StoreContext";

export default function Profile(props) { 

  return (
    <StoreContext.Consumer>
    {
      (SF) => {

        return (
        <>
          <Topbar/>
          <div className="profile">
            <Sidebar/>
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src={SF.currentUser.coverUrl || (SF.currentUser.userId && "assets/person/noCover.jpg")}
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    src={SF.currentUser.icon || (SF.currentUser.userId && "assets/person/noAvatar.png")}
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {SF.currentUser.userName || (SF.currentUser.userId && "unknown")}
                  </h4>
                  <span className="profileInfoDesc">
                    {SF.currentUser.status || (SF.currentUser.userId && "Your status...")}
                  </span>
              </div>
            </div>
              <div className="profileRightBottom">
                <Feed profile={false} user/>
                <UserRightbar profile allUsers={props.allUsers} />
              </div>
            </div>
          </div>
        </>
        )
      }
    }
    </StoreContext.Consumer>
  );
}
