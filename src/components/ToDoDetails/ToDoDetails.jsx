// import React from 'react'
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function ToDoDetails() {
  const rendered = useRef(false);
  const todoId = useParams().id;
  console.log(todoId);
  const tokenId = localStorage.getItem("tokenId");

  useEffect(() => {
    const getTodoDetails = async (tokenId) => {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=643fa24a6e2af800346ceef4`, {
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
    };

    if (!rendered.current && tokenId) {
      getTodoDetails(tokenId);
    }

    return () => {
      rendered.current = true;
    };
  }, []);

  return (
    <>
      <h3>Todo Details Page:</h3>
    </>
  );
}

ToDoDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.bool,
};
