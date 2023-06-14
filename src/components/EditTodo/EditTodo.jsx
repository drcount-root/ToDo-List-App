// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

const EditTodo = () => {
//     const todoId = useParams().id;
//     const navigate = useNavigate();
//   const [todo, setTodo] = useState({
//     name: "",
//     description: "",
//     status: "",
//   });
//   const tokenId = localStorage.getItem("tokenId");

//   const handleChange = (e) => {
//     setTodo({
//       ...todo,
//       [e.target.name]: e.target.value,
//       [e.target.description]: e.target.value,
//       [e.target.status]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch(
//         `https://todos-api-aeaf.onrender.com/api/v1/todo/update?id=${todoId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: "Bearer " + tokenId,
//             "Cache-Control": "no-cache",
//             Accept: "*/*",
//             "Accept-Encoding": "gzip, deflate, br",
//             Connection: "keep-alive",
//           },
//           body: JSON.stringify(todo),
//         }
//       );
//       console.log("Todo updated successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleBack = () => {
//     navigate('/todos');
//   }

  return
// (
//     <div>
//       <h2>Edit Todo</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Todo Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={todo.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Todo description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={todo.description}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="status">Todo Status:</label>
//           <select
//             id="status"
//             name="status"
//             value={todo.status}
//             onChange={handleChange}
//           >
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//         <button type="submit">Update Todo</button>
//         <button onClick={handleBack}>Back</button>
//       </form>
//     </div>
//   );
};

export default EditTodo;
