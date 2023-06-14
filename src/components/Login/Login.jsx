import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
        } else {
          console.log("Error!");
        }
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="main_container">
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Login</button>
          <div className="signup-message">Don&apos;t have an account?</div>
          <Link to="/signup">SignUp</Link>

          {name && <Navigate to="/todos" replace={true} />}
          {!name && <Navigate to="/login" replace={true} />}
        </form>

      </div>
    </>
  );
};

export default Login;

// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userData = {
//       email,
//       password,
//     };

//     try {
//       const response = await fetch(
//         "https://todos-api-aeaf.onrender.com/api/v1/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Cache-Control": "no-cache",
//             Accept: "*/*",
//             "Accept-Encoding": "gzip, deflate, br",
//             Connection: "keep-alive",
//           },
//           body: JSON.stringify(userData),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         if ('token' in data.data) {
//                 localStorage.setItem("tokenId", data.data.token);
//                 console.log("User's Email => ", data.data.email);
//                 console.log("User's token => ", data.data.token);
//                 setName(data.data.name);
//               }
//               else {
//                 console.log("Error!");
//               }
//         console.log(data);
//       } else {
//         const errorData = await response.json();
//         console.error("Login failed:", errorData);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   const linkStyle = {
//     margin: "1rem",
//     textDecoration: "none",
//     color: "white",
//     cursor: "pointer",padding: "10px 15px",
//     backgroundColor: "black",
//     borderRadius: "7px"
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" style={linkStyle}>Login</button>
//       </form>

//       <div>Don&apos;t have an account?</div>
//       <Link to="/signup" style={linkStyle}>SignUp</Link>
//       {name && <Navigate to="/todos" replace={true} />}
//       {!name && <Navigate to="/login" replace={true} />}
//     </>
//   );
// };

// export default Login;
