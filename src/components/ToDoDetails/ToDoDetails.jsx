import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    return <div>Loading...</div>;
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
      <h3>{todo.todoheading}</h3>
      <p>{todo.tododescription}</p>
      <p>{!todo.todostatus ? "Active" : "Completed"}</p>
      <p>{todo.createdAt}</p>
      <p>{todo.createdBy}</p>
      <p>{todo.updatedAt}</p>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleBack}>Back</button>
    </>
  );
}

ToDoDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.bool,
};
