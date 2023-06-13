// import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log("Email", email);
    console.log("Password", password);
  };
  return (
    <>
      <div>
        <h2>SignUp</h2>
        <form>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            SignUp
          </button>
        </form>
      </div>

      <div>Already have an account?</div>
      <Link to="/login">Login</Link>
    </>
  );
}
