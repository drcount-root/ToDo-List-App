import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Style Import
import "./App.css";

// Importing Components
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import LoginErrorPage from "./components/ErrorPages/LoginErrorPage";
import CredentialsRulesets from "./components/CredentialsRulesets/CredentialsRulesets";
import ToDos from "./components/ToDos/ToDos";
import ToDoDetails from "./components/ToDoDetails/ToDoDetails";

// Creating router
const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <LoginErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <CredentialsRulesets />,
  },
  {
    path: "/todos",
    element: <ToDos />,
  },
  {
    path: "/tododetails",
    element: <ToDoDetails />,
  },
  {
    path: "*",
    element: <WelcomePage />,
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]);

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
