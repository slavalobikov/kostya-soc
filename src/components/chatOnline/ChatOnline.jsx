import React from 'react';
import "./chatOnline.css";
import StoreContext from "../../StoreContext"

export default function ChatOnline(props) {

  return (
    <StoreContext.Consumer>
      {
        (SF) => (
          <div onClick={() => SF.onClickUser(props.user.userId)} className="chatOnline">
            <div className="chatOnlineFriend">
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src={props.user.icon}
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{props.user.userName}</span>
            </div>
          </div>
        )
      }
    </StoreContext.Consumer>
  );
}
