import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/auth/login",
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
        if ("token" in data.data) {
          localStorage.setItem("tokenId", data.data.token);
          console.log("User's Email => ", data.data.email);
          console.log("User's token => ", data.data.token);
          setName(data.data.name);
          setError("");
        } else {
          console.log("Error!");
          setError("Invalid credentials. Please try again.");
        }
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="main_container">
        <form onSubmit={handleSubmit} className="login_form">
          <h2>Login</h2>
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
          {error && <p className="error_message">{error}</p>}
          <button type="submit">Login</button>
          <div className="signup_message">
            Don&apos;t have an account?&nbsp;&nbsp;
            <Link
              to="/signup"
              style={{ marginBottom: "20px", textDecoration: "none", color: "blueviolet" }}
            >
              SignUp
            </Link>
          </div>

          {name && <Navigate to="/todos" replace={true} />}
          {!name && <Navigate to="/login" replace={true} />}
        </form>
      </div>
    </>
  );
};

export default Login;