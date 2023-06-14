import "./WelcomePage.css";

import { Link } from "react-router-dom";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "white",
  cursor: "pointer",
  padding: "10px 15px",
  backgroundColor: "black",
  borderRadius: "7px",
};

export default function WelcomePage() {
  return (
    <>
      <div className="main_container">
        <div className="welcome_container">
          <div className="welcome_heading">Welcome To ToDo Manager</div>
          <div className="welcome_buttons">
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/signup" style={linkStyle}>
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
