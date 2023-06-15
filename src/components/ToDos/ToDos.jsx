import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ToDo from "../ToDo/ToDo";
import "./ToDos.css";
import loader from "../../assets/loader.gif";

export default function ToDos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const rendered = useRef(false);
  const tokenId = localStorage.getItem("tokenId");

  useEffect(() => {
    async function getAllTodos(tokenId) {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/todo/getAll",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        }
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    }

    if (!rendered.current) {
      getAllTodos(tokenId);
    }

    return () => {
      rendered.current = true;
    };
  }, []);

  const searchTodos = async () => {
    const response = await fetch(
      `https://todos-api-aeaf.onrender.com/api/v1/todo/getAll?search=${searchText}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenId,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      }
    );
    const data = await response.json();
    setTodos(data);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading_container">
        <img
          src={loader}
          className="loader"
        />
      </div>
    );
  }

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    padding: "10px 15px",
    backgroundColor: "black",
    borderRadius: "7px",
  };

  return (
    <>
      <Link to="/todos/create" style={linkStyle}>
        Add Todo
      </Link>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search todos..."
        />
        <button onClick={searchTodos}>Search</button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo._id}>
              <ToDo
                id={todo._id}
                name={todo.name}
                description={todo.description}
                status={todo.status}
                createdAt={todo.createdAt}
                createdBy={todo.createdBy}
                updatedAt={todo.updatedAt}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}