import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToDo from "../ToDo/ToDo";
import "./ToDos.css";
import loader from "../../assets/loader.gif";

export default function ToDos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const rendered = useRef(false);
  const tokenId = localStorage.getItem("tokenId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenId) {
      navigate("/login");
    }
  }, [navigate, tokenId]);

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
  }, [tokenId]);

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
        <img src={loader} className="loader" alt="Loading" />
      </div>
    );
  }

  return (
    <>
      <div className="todos_container">
        <div className="todos_top">
          <Link to="/todos/create" className="add_todo_button">
            Add Todo
          </Link>
          <div className="search_container">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search todos..."
              className="search_input"
            />
            <button onClick={searchTodos} className="search_button">
              Search
            </button>
          </div>
        </div>
        <div className="todos_grid">
          {todos.map((todo) => (
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
          ))}
        </div>
      </div>
    </>
  );
}