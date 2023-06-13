// import React from 'react'

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ToDos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const rendered = useRef(false);
  const tokenId = localStorage.getItem("tokenId");

  const handleCheckboxChange = () => {
    // setCompleted(!completed);
  };

  useEffect(() => {
    async function getAllTodos(tokenId) {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/todo/getAll?search=hey",
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
      console.log(data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo._id}>
              <input
                type="checkbox"
                checked={todo.status}
                onChange={handleCheckboxChange}
              />
              <h3>
                <Link to="/tododetails">{todo.name}</Link>
              </h3>
              <p>{todo.description}</p>
              <p>{todo.status}</p>
              <p>{todo.createdBy}</p>
              <p>{todo.createdAt}</p>
              <p>{todo.updatedAt}</p>
              <p>{todo.__v}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
