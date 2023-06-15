import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
  const todoHeading = localStorage.getItem("heading");
  const todoDescription = localStorage.getItem("description");
  const todoStatus = localStorage.getItem("status");
  const params = useParams();
  const todoId = params.id;

  const [todo, setTodo] = useState({
    name: todoHeading,
    description: todoDescription,
    status: todoStatus,
  });

  const tokenId = localStorage.getItem("tokenId");
  const navigate = useNavigate();

  const updateTodo = async () => {
    try {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/update?id=${todoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      navigate("/todos");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTodo({
      ...todo,
      [name]: newValue,
    });
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
      <button onClick={updateTodo}>Update Todo</button>
    </>
  );
}


// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function EditTodo() {
//   const navigate = useNavigate();
//   const todoId = useParams().id;
//   const tokenId = localStorage.getItem("tokenId");
//   // get from lS
//   const todoHeading = localStorage.getItem("heading");
//   const todoDescription = localStorage.getItem("description");
//   const todoStatus = localStorage.getItem("status");

//   // state
//   const [todo, setTodo] = useState({
//     name: todoHeading,
//     description: todoDescription,
//     status: todoStatus,
//   });

//   const handleEdit = async () => {
//     console.log(todo.status)
//     try {
//       const response = await fetch(
//         `https://todos-api-aeaf.onrender.com/api/v1/todo/update?id=${todoId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: "Bearer " + tokenId,
//             "Content-Type": "application/json",
//             "Cache-Control": "no-cache",
//             Accept: "*/*",
//             "Accept-Encoding": "gzip, deflate, br",
//             Connection: "keep-alive",
//           },
//           body: JSON.stringify(todo),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to edit todo");
//       }

//       if (response.ok) {
//         // navigate("/todos");
//         console.log('updated successfully')
//       } else {
//         throw new Error("Failed");
//       }

//       const data = await response.json();
//       console.log(data);
      
//       setTodo({
//         name: "",
//         description: "",
//         status: false,
//       });

//     } catch (error) {
//       console.error("Error editing todo:", error);
//     }
//   };

//   // const handleHeadingChange = (e) => {
//   //   setTodo((prev) => {
//   //     return { ...prev, name: e.target.value };
//   //   });
//   //   console.log(e.target.value)
//   // };

//   // const handleDescriptionChange = (e) => {
//   //   setTodo((prev) => {
//   //     return { ...prev, description: e.target.value };
//   //   });
//   //   console.log(e.target.value)
//   // };

//   // const handleStatusChange = (e) => {
//   //   setTodo((prev) => {
//   //     return { ...prev, status: e.target.value };
//   //   });
//   //   console.log(e.target.value)
//   // };

//   const handleInputChange = (e) => {
//     console.log(e.target)
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
//     setTodo({
//       ...todo,
//       [name]: newValue,
//     });

//     console.log(todo);
//   };

//   return (
//     <>
//       <input
//         type="text"
//         name="name"
//         value={todo.name}
//         onChange={handleInputChange}
//         placeholder="Name"
//       />
//       <input
//         type="text"
//         name="description"
//         value={todo.description}
//         onChange={handleInputChange}
//         placeholder="Description"
//       />
//       <label>
//         Status:
//         <input
//           type="checkbox"
//           name="status"
//           checked={todo.status}
//           onChange={handleInputChange}
//         />
//       </label>
//       <button onClick={handleEdit}>Add Todo</button>
//     </>
//   );
// }
