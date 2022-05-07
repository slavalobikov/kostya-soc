import React, {useState} from 'react';
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar(props) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    console.log(props)

    const[userCityFlag, changeUserCityFlag] = useState(false);
    const[userCityText, changeUserCityText] = useState('');
    const[userCountryFlag, changeUserCountryFlag] = useState(false);
    const[userCountryText, changeUserCountryText] = useState('');
    const[userRelationshipFlag, changeUserRelationshipFlag] = useState(false);
    const[userRelationshipText, changeUserRelationshipText] = useState('');

    const onClickCityButtonNew = () => {
      props.onClickInputButton(userCityText, 'city');
      changeUserCityFlag(false);
    }

    const onClickCountryButtonNew = () => {
      props.onClickInputButton(userCountryText, 'country');
      changeUserCountryFlag(false);
    }

    const onClickRelationshipButtonNew = () => {
      props.onClickInputButton(userRelationshipText, 'relationship');
      changeUserRelationshipFlag(false);
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
              {props.currentPerson.city || (props.currentPerson.userId && 'Your city...')}
            </span>}
            {userCityFlag && 
              <div className='inputPlusBtnRightbar'>
                <input 
                  value={userCityText} 
                  onChange={e => changeUserCityText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.city || "Your city..."} 
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
              {props.currentPerson.country || (props.currentPerson.userId && 'Your country...')}
            </span>}
            {userCountryFlag && 
              <div className='inputPlusBtnRightbar'>
                <input 
                  value={userCountryText} 
                  onChange={e => changeUserCountryText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.country || "Your country..."} 
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
              {props.currentPerson.relationship || (props.currentPerson.userId && 'Your relationship...')}
            </span>}
            {userRelationshipFlag && 
              <div className='inputPlusBtnRightbar'>
                <input 
                  value={userRelationshipText} 
                  onChange={e => changeUserRelationshipText(e.currentTarget.value)} 
                  placeholder={props.currentPerson.relationship || "Your relationship..."} 
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
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
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
