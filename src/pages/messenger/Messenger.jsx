import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import React, {useState} from 'react';
import StoreContext from "../../StoreContext"

export default function Messenger() {

  const[message, changeMessage] = useState(''); 

  return (
    <StoreContext.Consumer>
      {
        (SF) => {
          const followersArr = SF.currentPerson.followers;
          let newFolArr = [];
          followersArr ? followersArr.map(id => {
            if(SF.allUsers[id] ? SF.allUsers[id].online ? 1 : 0 : 0) newFolArr.push(SF.allUsers[id]);
          }) : newFolArr = [];

          const onSendClickNew = () => {
            changeMessage('');
            SF.onSendClick(SF.currentUser.userId, message)
          }

          const userId = SF.currentUser ? SF.currentUser.userId ? SF.currentUser.userId : '' : '';
          const mesArr = SF.currentPerson.messages ? SF.currentPerson.messages[userId] ? SF.currentPerson.messages[userId] : [] : [];
          
          return(
          <>
            <Topbar/>
            <div className="messenger">
              <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input placeholder="Search for friends" className="chatMenuInput" />
                    <div>
                      <Conversation />
                    </div>
                </div>
              </div>
              <div className="chatBox">
                <div className="chatBoxWrapper">
                  <>
                    <div className="chatBoxTop">
                      <div>
                        {mesArr ? mesArr.map(mes => 
                          <Message
                            icon={SF.currentUser.icon} 
                            own={Object.keys(mes)[0]=='true'} 
                            message={Object.values(mes)[0]}
                          />) 
                        : []}
                      </div>
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        onKeyPress={e => {
                          if(e.key == 'Enter') {
                          onSendClickNew()
                          } 
                        }}
                        value={message}
                        onChange={e => changeMessage(e.currentTarget.value)}
                        className="chatMessageInput"
                        placeholder="write something...">
                      </textarea>
                      <button 
                        onClick={onSendClickNew} 
                        className="chatSubmitButton">
                        Send
                      </button>
                    </div>
                  </>
                </div>
              </div>
              <div className="chatOnline">
                <div className="chatOnlineWrapper">
                  {SF.allUsers && newFolArr.map((u) => (
                    <ChatOnline key={u.userId} user={u} />
                  ))}
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
