import "./register.css";
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

export default function Register(props) {

  const[userName, setUserName] = useState('');
  const[userEmail, setUserEmail] = useState('');
  const[userPassword, setUserPassword] = useState('');
  const[userPasswordAgain, setUserPasswordAgain] = useState('');

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MySoc</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input value={userName} onChange={e => setUserName(e.currentTarget.value)} placeholder="Username" className="loginInput" />
            <input value={userEmail} onChange={e => setUserEmail(e.currentTarget.value)} placeholder="Email" className="loginInput" />
            <input value={userPassword} onChange={e => setUserPassword(e.currentTarget.value)} placeholder="Password" className="loginInput" />
            <input value={userPasswordAgain} onChange={e => setUserPasswordAgain(e.currentTarget.value)} placeholder="Password Again" className="loginInput" />
            <NavLink to="/profile">
              <button onClick={() => props.clickRegisterButton(userName, userEmail, userPassword)} className="loginButton">Sign Up</button>
            </NavLink>
            <NavLink className="loginRegisterButtonLink" to="/login">
              <button className="loginRegisterButton">
                Log into Account
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
