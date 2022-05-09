import React from 'react';
import "./message.css";

export default function Message({own, message, icon}) {
  return (
    <div className={`message ${own && 'own'}`}>
      <div className="messageTop">
        {!own &&
          <img
          className="messageImg"
          src={icon}
          alt=""
          />
        }
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom"></div>
    </div>
  );
}
