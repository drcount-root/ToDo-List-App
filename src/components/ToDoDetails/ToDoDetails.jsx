import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ToDoDetails.css";
import loader from "../../assets/loader.gif";

export default function ToDoDetails() {
  const rendered = useRef(false);
  const params = useParams();
  const todoId = params.id;
  console.log(todoId);
  const navigate = useNavigate();
  const tokenId = localStorage.getItem("tokenId");
  const [loading, setLoading] = useState(true);

  const [todo, setTodo] = useState({
    todoheading: "",
    tododescription: "",
    todostatus: "",
    createdAt: "",
    createdBy: "",
    updatedAt: "",
  });

  useEffect(() => {
    const getTodoDetails = async (tokenId) => {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=${todoId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        }
      );
      const body = await response.json();
      // console.log(body);
      setTodo({
        todoheading: body.name,
        tododescription: body.description,
        todostatus: body.status,
        createdAt: body.createdAt,
        createdBy: body.createdBy,
        updatedAt: body.updatedAt,
      });
      setLoading(false);
    };

    if (!rendered.current && tokenId) {
      getTodoDetails(tokenId);
    }

    return () => {
      rendered.current = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="loading_container">
        <img src={loader} className="loader" />
      </div>
    );
  }

  const handleEdit = () => {
    localStorage.setItem("heading", todo.todoheading);
    localStorage.setItem("description", todo.tododescription);
    localStorage.setItem("status", todo.todostatus);
    navigate(`/todo/edit/${todoId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/delete?id=${todoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        }
      );

      if (response.ok) {
        navigate("/todos");
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleBack = () => {
    navigate("/todos");
  };

  return (
    <>
      <div className="main">
      <div className="todo_details">
    <h1>Todo Details</h1>
        <h2>{todo.todoheading}</h2>
        <p>{todo.tododescription}</p>
        <p className="status"><strong>Status - {!todo.todostatus ? "Active" : "Completed"}</strong></p>
        <br/>
        <p className="createdAt">Created At - {new Date(todo.createdAt).toLocaleDateString()} at {new Date(todo.createdAt).toLocaleTimeString()}</p>
        <p className="createdBy">Created By - {todo.createdBy}</p>
        <p className="updatedAt">Updated At - {new Date(todo.updatedAt).toLocaleDateString()} at {new Date(todo.updatedAt).toLocaleTimeString()}</p>

        <div className="button_group">
          <button onClick={handleEdit} className="edit">Edit</button>
          <button onClick={handleDelete} className="delete">Delete</button>
          <button onClick={handleBack} className="back">Back</button>
        </div>
      </div>
      </div>
    </>
  );
}

ToDoDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.bool,
};