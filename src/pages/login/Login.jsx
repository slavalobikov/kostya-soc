import "./login.css";
import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Login() {
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
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <NavLink to="/profile">
              <button className="loginButton">Log In</button>
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
