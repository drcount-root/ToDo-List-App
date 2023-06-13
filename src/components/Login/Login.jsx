import { useState } from "react";
import { Link, Navigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function loginUser(credentials) {
    const response = await fetch("https://todos-api-aeaf.onrender.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if ('token' in data.data) {
      localStorage.setItem("tokenId", data.data.token);
      console.log("User's Email => ", data.data.email);
      console.log("User's token => ", data.data.token);
      setName(data.data.name);
    }
    else {
      console.log("Error!");
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Email", email);
    console.log("Password", password);
    await loginUser({
      email,
      password,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
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
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div>Don&apos;t have an account?</div>
      <Link to="/signup">SignUp</Link>
      {name && (<Navigate to="/todos" replace={true}/>)}
      {!name && (<Navigate to="/login" replace={true}/>)}
    </div>
  );
};

export default Login;
