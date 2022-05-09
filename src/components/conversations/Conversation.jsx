import React from 'react';
import "./conversation.css";
import StoreContext from '../../StoreContext'

export default function Conversation() {

  return (
    <StoreContext.Consumer>
        {
        (SF) => (
          <>
            {SF.currentPerson.followers.map(id =>
              <div onClick={() => SF.onClickUser(id)} className="conversation">
                <img
                  className="conversationImg"
                  src={
                    SF.allUsers[id] ? 
                      SF.allUsers[id].icon ? 
                      SF.allUsers[id].icon 
                      : '' 
                    : ''}
                  alt=""
                />
                <span className="conversationName">
                  {SF.allUsers[id] ? 
                    SF.allUsers[id].userName ? 
                    SF.allUsers[id].userName
                    : '' 
                  : ''}
                </span>
              </div>
            )}
          </>
        )
      }
    </StoreContext.Consumer>
  );
}
