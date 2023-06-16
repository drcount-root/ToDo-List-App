import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './ToDo.css'

export default function ToDo(props) {
  const { id, name, description, status, createdAt, createdBy, updatedAt } =
    props;

  return (
    <>
      <div className="todo_card">
      <h3 className="todo_card_title">
        <Link to={`/todo/${id}`} className="title_link">{name}</Link>
      </h3>
      <p className="todo_card_description">{description}</p>
      <p className="todo_card_status">Status - {!status ? "Active" : "Completed"}</p>
      <p className="todo_card_id">ID: {id}</p>
      <p className="todo_card_date">
        Created At: {new Date(createdAt).toLocaleDateString()} at{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </p>
      <p className="todo_card_created_by">Created By: {createdBy}</p>
      <p className="todo_card_date">
        Updated At: {new Date(updatedAt).toLocaleDateString()} at{" "}
        {new Date(updatedAt).toLocaleTimeString()}
      </p>
    </div>
    </>
  );
}

ToDo.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.bool,
  createdAt: PropTypes.string,
  createdBy: PropTypes.string,
  updatedAt: PropTypes.string,
};