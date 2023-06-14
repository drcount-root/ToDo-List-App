// import React from 'react'

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ToDo from "../ToDo/ToDo";

export default function ToDos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const rendered = useRef(false);
  const tokenId = localStorage.getItem("tokenId");

  // const handleCheckboxChange = () => {
    // setCompleted(!completed);
  // };

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
      <button><Link to='/new'>Add Todo</Link></button>
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
