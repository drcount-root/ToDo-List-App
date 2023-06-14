import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Signup</button>
      </form>
      <div>Already have an account?</div>
      <Link to="/login">Login</Link>
    </>
  );
};

export default SignUp;