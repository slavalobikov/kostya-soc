import React, {useState} from 'react';
import "./userRightbar.css";
import { Users } from "../../dummyData";
import Online from "../../components/online/Online";
import StoreContext from "../../StoreContext";
import RightbarFollowings from '../../components/rightbarFollowings/RightbarFollowings';

export default function userRightbar(props) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
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

    let localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
    let currentPerson = props.allUsers[localCurrentPerson.userId];
    const localCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = localCurrentUser.userId;
    currentPerson = currentPerson ? currentPerson : {};
    currentPerson = currentPerson.followers ? currentPerson : {...currentPerson, followers: []};
    const isFollow = !currentPerson.followers.includes(userId);

    const[userFollowFlag, changeUserFollowFlag] = useState(isFollow);

    return (
      <StoreContext.Consumer>
      {
        (SF) => {

          const changeUserFollowFlagNew = () => {
            changeUserFollowFlag(!userFollowFlag);
            SF.followOnUser()
          }

          return (
          <div className='userWrapper'>
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">
                  {SF.currentUser.city || (SF.currentUser.userId && '...')}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">
                  {SF.currentUser.country || (SF.currentUser.userId && '...')}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {SF.currentUser.relationship || (SF.currentUser.userId && '...')}
                </span>
              </div>
            </div>
            <button 
              onClick={changeUserFollowFlagNew} 
              className={`followBtn ${userFollowFlag ? 'redFollow' : 'greenFollow'}`}>
              {userFollowFlag ? 'FOLLOW' : 'UNFOLLOW'}
            </button>
            <h4 className="rightbarTitle">User friends</h4>

            <RightbarFollowings />

          </div>
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
