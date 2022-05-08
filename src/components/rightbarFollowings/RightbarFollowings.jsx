import React from 'react';
import StoreContext from '../../StoreContext';
import "./RightbarFollowings.css";
import {NavLink} from 'react-router-dom';

export default function RightbarFollowings(){
    return(
        <StoreContext.Consumer>
        {
            (SF) => (
            <div className="rightbarFollowings">
                {SF.currentPerson.followers.map(id => 
                    <NavLink className="usersLinks" to="/user">
                        <div onClick={() => SF.onClickUser(id)} className="rightbarFollowing">
                        <img
                            src={SF.allUsers[id] ? 
                                SF.allUsers[id].icon ? 
                                SF.allUsers[id].icon 
                                : '' 
                                : ''}

                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            {SF.allUsers[id] ? 
                            SF.allUsers[id].userName ? 
                                SF.allUsers[id].userName.length<11 ? 
                                SF.allUsers[id].userName :
                                SF.allUsers[id].userName.slice(0, 10)+'...'
                            : '' 
                            : ''}
                        </span>
                        </div>
                    </NavLink>
                )}
                </div>
            )
        }
        </StoreContext.Consumer>
    )
}