// import React from 'react'
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ToDoDetails() {
  const rendered = useRef(false);
  const todoId = useParams().id;
  console.log(todoId);
  const navigate = useNavigate();
  const tokenId = localStorage.getItem("tokenId");

  const [todoheading, setTodoheading] = useState('');
  const [tododescription, setTododescription] = useState('');
  const [todostatus, setTodostatus] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    const getTodoDetails = async (tokenId) => {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=${todoId}`, {
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
      console.log(body);
      setTodoheading(body.name);
      setTododescription(body.description);
      setTodostatus(body.status);
      setCreatedAt(body.createdAt)
      setCreatedBy(body.createdBy)
      setUpdatedAt(body.updatedAt)
    };

    if (!rendered.current && tokenId) {
      getTodoDetails(tokenId);
    }

    return () => {
      rendered.current = true;
    };
  }, []);

  /* new code
  */
  const handleEdit = () => {
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
    navigate('/todos');
  }

  return (
    <>
      <h3>{todoheading}</h3>
      <p>{tododescription}</p>
      <p>{!todostatus ? "Active" : "Completed"}</p>
      <p>{createdAt}</p>
      <p>{createdBy}</p>
      <p>{updatedAt}</p>

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
