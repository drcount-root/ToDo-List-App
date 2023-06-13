// import React from 'react'

import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <>
      <div>Welcome To ToDo List App</div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </div>
    </>
  );
}
