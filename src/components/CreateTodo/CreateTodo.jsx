import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        throw new Error('Failed to add todo');
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
    const newValue = type === 'checkbox' ? checked : value;
    setNewTodo({
      ...newTodo,
      [name]: newValue,
    });
  };

  return (
    <>
      <input
        type="text"
        name="name"
        value={newTodo.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={newTodo.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <label>
        Status:
        <input
          type="checkbox"
          name="status"
          checked={newTodo.status}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
}
