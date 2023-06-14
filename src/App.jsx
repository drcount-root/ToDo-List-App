import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import WelcomePage from "./components/WelcomePage/WelcomePage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import LoginErrorPage from "./components/ErrorPages/LoginErrorPage";
import CredentialsRulesets from "./components/CredentialsRulesets/CredentialsRulesets";
import ToDos from "./components/ToDos/ToDos";
import ToDoDetails from "./components/ToDoDetails/ToDoDetails";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import EditTodo from "./components/EditTodo/EditTodo";

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
    path: "/todo/:id",
    element: <ToDoDetails />,
  },
  {
    path: "/todos/create",
    element: <CreateTodo />,
  },
  {
    path: "/todo/edit/:id",
    element: <EditTodo />,
  },
  {
    path: "*",
    element: <WelcomePage />,
  },
]);

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
