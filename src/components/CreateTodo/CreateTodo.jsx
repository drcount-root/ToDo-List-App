import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTodo.css";

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    status: false,
  });
  const tokenId = localStorage.getItem("tokenId");
  const navigate = useNavigate();

  const addTodo = async () => {
    try {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/todo/create",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(newTodo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      if (response.ok) {
        navigate("/todos");
      } else {
        throw new Error("Failed to delete todo");
      }

      const data = await response.json();
      console.log(data);

      setNewTodo({
        name: "",
        description: "",
        status: false,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewTodo({
      ...newTodo,
      [name]: newValue,
    });
  };

  const handleBack = () => {
    navigate(`/todos`);
  };

  return (
    <>
      <div className="main">
        <div className="create_container">
          <h2 className="heading">Add Todo</h2>
          <input
            className="input"
            type="text"
            name="name"
            value={newTodo.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            className="input"
            type="text"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <label className="checkboxLabel">
            Status:
            <input
              className="checkbox"
              type="checkbox"
              name="status"
              checked={newTodo.status}
              onChange={handleInputChange}
            />
          </label>

          <div className="buttons">
            <button className="button" onClick={addTodo}>
              Add Todo
            </button>
            <button className="button" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
