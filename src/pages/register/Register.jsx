import "./register.css";
import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Password Again" className="loginInput" />
            <NavLink to="/profile">
              <button className="loginButton">Sign Up</button>
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
