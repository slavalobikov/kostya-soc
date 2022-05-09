import "./login.css";
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

export default function Login(props) {

  const[userEmail, setUserEmail] = useState('');
  const[userPassword, setUserPassword] = useState('');

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MySoc</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MySoc.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input value={userEmail} onChange={e => setUserEmail(e.currentTarget.value)} placeholder="Email" className="loginInput" />
            <input value={userPassword} onChange={e => setUserPassword(e.currentTarget.value)} placeholder="Password" className="loginInput" />
              <NavLink to={props.currentPerson?"/profile":"/"}>
              <button onClick={() => props.clickLoginButton(userEmail, userPassword)}  className="loginButton">Log In</button>
              </NavLink>
            <span className="loginForgot">Forgot Password?</span>
            <NavLink className="loginRegisterButtonLink" to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
