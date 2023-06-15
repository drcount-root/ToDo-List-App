import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditTodo() {
  const param = useParams();
  const todoId = param.id;
  const tokenId = localStorage.getItem("tokenId");
  // get from lS
  const todoHeading = localStorage.getItem("heading");
  const todoDescription = localStorage.getItem("description");
  const todoStatus = localStorage.getItem("status");

  // state
  const [todo, setTodo] = useState({
    name: todoHeading,
    description: todoDescription,
    status: todoStatus === 'true',
  });

  const handleEdit = async () => {
    console.log(todo.status)
    try {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/update?id=${todoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }

      if (response.ok) {
        // navigate("/todos");
        console.log('updated successfully')
      } else {
        throw new Error("Failed");
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  
  const handleInputChange = (e) => {
    console.log(e.target)
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setTodo({
      ...todo,
      [name]: newValue,
    });

    console.log(todo);
  };

  return (
    <>
      <input
        type="text"
        name="name"
        value={todo.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={todo.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <label>
        Status:
        <input
          type="checkbox"
          name="status"
          checked={todo.status}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleEdit}>Update Todo</button>
    </>
  );
}