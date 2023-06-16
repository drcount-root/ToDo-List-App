import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/login")
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    padding: "10px 25px",
    backgroundColor: "black",
    borderRadius: "7px",
  };

  return (
    <>
      <div className="main_container">
        <form onSubmit={handleSubmit} className="signup_form">
          <h2>SignUp</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={linkStyle}>
            Signup
          </button>
          <div>
            Already have an account?&nbsp;&nbsp;
            <Link
              to="/login"
              style={{
                marginBottom: "20px",
                textDecoration: "none",
                color: "blueviolet",
              }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;