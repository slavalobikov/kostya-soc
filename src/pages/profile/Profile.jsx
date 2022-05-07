import React, {useState} from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile(props) {

  const[userNameFlag, changeUserNameFlag] = useState(false);
  const[userNameText, changeUserNameText] = useState('');
  const[userStatusFlag, changeUserStatusFlag] = useState(false);
  const[userStatusText, changeUserStatusText] = useState('');  
  const[profileCoverImgFlag, changeProfileCoverImgFlag] = useState(false);
  const[profileCoverImgText, changeProfileCoverImgText] = useState('');  
  const[profileIconFlag, changeProfileIconFlag] = useState(false);
  const[profileIconText, changeProfileIconText] = useState('');  

  const onClickNameButtonNew = () => {
    props.onClickInputButton(userNameText, 'userName');
    changeUserNameFlag(false);
    changeUserNameText('');
  }

  const onClickStatusButtonNew = () => {
    props.onClickInputButton(userStatusText, 'status');
    changeUserStatusFlag(false);
    changeUserStatusText('');
  }
  
  const onClickCoverButtonNew = () => {
    props.onClickInputButton(profileCoverImgText, 'coverUrl');
    changeProfileCoverImgFlag(false);
    changeProfileCoverImgText('');
  }

  const onClickProfileIconButtonNew = () => {
    props.onClickInputButton(profileIconText, 'icon');
    changeProfileIconFlag(false);
    changeProfileIconText('');
  }

  return (
    <>
      <Topbar onClickTopbarImg={props.onClickTopbarImg} currentPerson={props.currentPerson} />
      <div className="profile">
        <Sidebar allUsers={props.allUsers} currentId={props.currentPerson.userId}/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={props.currentPerson.coverUrl || (props.currentPerson.userId && "assets/person/noCover.jpg")}
                onDoubleClick={() => changeProfileCoverImgFlag(true)}
                alt=""
              />
            {profileCoverImgFlag && 
              <div className='inputPlusBtnCover'>
                <input 
                  value={profileCoverImgText} 
                  onChange={e => changeProfileCoverImgText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.coverUrl || "coverUrl..."} 
                  className="profileInfoInputs" 
                />
                <span>
                  <button 
                    onClick={() => onClickCoverButtonNew()}  
                    className="shareButton shareButtonOk">
                    Ok
                  </button>
                </span>
              </div>
            }
              <img
                className="profileUserImg"
                src={props.currentPerson.icon || (props.currentPerson.userId && "assets/person/noAvatar.png")}
                onDoubleClick={() => changeProfileIconFlag(true)}
                alt=""
              />
              {profileIconFlag && 
              <div className='inputPlusBtnIcon'>
                <input 
                  value={profileIconText} 
                  onChange={e => changeProfileIconText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.coverUrl || "iconUrl..."} 
                  className="profileInfoInputs" 
                />
                <span>
                  <button 
                    onClick={() => onClickProfileIconButtonNew()}  
                    className="shareButton shareButtonOk">
                    Ok
                  </button>
                </span>
              </div>
            }
            </div>
            <div className="profileInfo">
            {!userNameFlag && 
              <h4 
                className="profileInfoName" 
                onDoubleClick={() => changeUserNameFlag(true)}>
                {props.currentPerson.userName || (props.currentPerson.userId && "unknown")}
              </h4>
            }
            {userNameFlag && 
              <div className='inputPlusBtn'>
                <input 
                  value={userNameText} 
                  onChange={e => changeUserNameText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.userName || "Username..."} 
                  className="profileInfoInputs" 
                />
                <span>
                  <button 
                    onClick={() => onClickNameButtonNew()}  
                    className="shareButton shareButtonOk">
                    Ok
                  </button>
                </span>
              </div>
            }
            {!userStatusFlag && 
              <span 
                className="profileInfoDesc" 
                onDoubleClick={() => changeUserStatusFlag(true)}>
                {props.currentPerson.status || (props.currentPerson.userId && "Your status...")}
              </span>
            }
            {userStatusFlag && 
              <div className='inputPlusBtnStatus'>
                <input 
                  value={userStatusText} 
                  onChange={e => changeUserStatusText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.status || "Your status..."} 
                  className="profileInfoInputs" 
                />
                <span>
                  <button 
                    onClick={() => onClickStatusButtonNew('status')}  
                    className="shareButton shareButtonOk">
                    Ok
                  </button>
                </span>
              </div>
            }
          </div>
        </div>
          <div className="profileRightBottom">
            <Feed 
              onClickShare={props.onClickShare} 
              posts={props.currentPerson.posts}
              onClickDelBut={props.onClickDelBut}
              onClickLike={props.onClickLike}
              profile={true}
            />
            <Rightbar 
              onClickInputButton={props.onClickInputButton} 
              currentPerson={props.currentPerson}
              profile/>
          </div>
        </div>
      </div>
    </>
  );
}
