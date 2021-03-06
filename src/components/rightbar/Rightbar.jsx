import React, {useState} from 'react';
import "./rightbar.css";
import Online from "../online/Online";
import StoreContext from "../../StoreContext";
import RightbarFollowings from "../rightbarFollowings/RightbarFollowings";

export default function Rightbar(props) {

  const HomeRightbar = () => {
    return (
      <StoreContext.Consumer>
      {
        (SF) => {
          const followersArr = SF.currentPerson.followers;
          let newFolArr = [];
          followersArr.map(id => {
            if(SF.allUsers[id] ? SF.allUsers[id].online ? 1 : 0 : 0) newFolArr.push(SF.allUsers[id]);
          })

          return(
            <>
              <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                  <b>Lera Savinova</b> have a birthday today.
                </span>
              </div>
              <img className="rightbarAd" src="assets/ad.png" alt="" />
              <h4 className="rightbarTitle">Online Friends</h4>
              <ul className="rightbarFriendList">
                {SF.allUsers && newFolArr.map((u) => (
                  <Online key={u.userId} user={u} />
                ))}
              </ul>
            </>
          )
        }
      }
      </StoreContext.Consumer>
    );
  };

  const ProfileRightbar = () => {

    const[userCityFlag, changeUserCityFlag] = useState(false);
    const[userCityText, changeUserCityText] = useState('');
    const[userCountryFlag, changeUserCountryFlag] = useState(false);
    const[userCountryText, changeUserCountryText] = useState('');
    const[userRelationshipFlag, changeUserRelationshipFlag] = useState(false);
    const[userRelationshipText, changeUserRelationshipText] = useState('');

    return (
      <StoreContext.Consumer>
      {
        (SF) => {

          const onClickCityButtonNew = () => {
            SF.onClickInputButton(userCityText, 'city');
            changeUserCityFlag(false);
            changeUserCityText('');
          }
      
          const onClickCountryButtonNew = () => {
            SF.onClickInputButton(userCountryText, 'country');
            changeUserCountryFlag(false);
            changeUserCountryText('');
          }

          const onClickRelationshipButtonNew = () => {
            SF.onClickInputButton(userRelationshipText, 'relationship');
            changeUserRelationshipFlag(false);
            changeUserRelationshipText('');
          }

          return (
          <>
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                {!userCityFlag && 
                <span 
                  className="rightbarInfoValue"
                  onDoubleClick={() => changeUserCityFlag(true)}>
                  {SF.currentPerson.city || (SF.currentPerson.userId && 'Your city...')}
                </span>}
                {userCityFlag && 
                  <div className='inputPlusBtnRightbar'>
                    <input 
                      value={userCityText} 
                      onChange={e => changeUserCityText(e.currentTarget.value)} 
                      placeholder={SF.currentPerson.city || "Your city..."} 
                      className="profileInfoInputs" 
                    />
                    <span>
                      <button 
                        onClick={() => onClickCityButtonNew()}  
                        className="shareButton shareButtonOk">
                        Ok
                      </button>
                    </span>
                  </div>
                }
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                {!userCountryFlag && 
                <span 
                  className="rightbarInfoValue"
                  onDoubleClick={() => changeUserCountryFlag(true)}>
                  {SF.currentPerson.country || (SF.currentPerson.userId && 'Your country...')}
                </span>}
                {userCountryFlag && 
                  <div className='inputPlusBtnRightbar'>
                    <input 
                      value={userCountryText} 
                      onChange={e => changeUserCountryText(e.currentTarget.value)} 
                      placeholder={SF.currentPerson.country || "Your country..."} 
                      className="profileInfoInputs" 
                    />
                    <span>
                      <button 
                        onClick={() => onClickCountryButtonNew()}  
                        className="shareButton shareButtonOk">
                        Ok
                      </button>
                    </span>
                  </div>
                }
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                {!userRelationshipFlag && 
                <span 
                  className="rightbarInfoValue"
                  onDoubleClick={() => changeUserRelationshipFlag(true)}>
                  {SF.currentPerson.relationship || (SF.currentPerson.userId && 'Your relationship...')}
                </span>}
                {userRelationshipFlag && 
                  <div className='inputPlusBtnRightbar'>
                    <input 
                      value={userRelationshipText} 
                      onChange={e => changeUserRelationshipText(e.currentTarget.value)} 
                      placeholder={SF.currentPerson.relationship || "Your relationship..."} 
                      className="profileInfoInputs" 
                    />
                    <span>
                      <button 
                        onClick={() => onClickRelationshipButtonNew()}  
                        className="shareButton shareButtonOk">
                        Ok
                      </button>
                    </span>
                  </div>
                }
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            
            <RightbarFollowings />

          </>
          )
        }
      }
      </StoreContext.Consumer>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {props.profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
