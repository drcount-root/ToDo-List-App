import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ToDo(props) {
  const { id, name, description, status, createdAt, createdBy, updatedAt } =
    props;

  return (
    <>
      <h3>
        <Link to={`/todo/${id}`}>{name}</Link>
      </h3>
      <p>{description}</p>
      <p>{!status ? "Active" : "Completed"}</p>
      <p>{id}</p>
      <p>
        Created At: {new Date(createdAt).toLocaleDateString()} at{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </p>
      <p>Created By: {createdBy}</p>
      <p>
        Updated At: {new Date(updatedAt).toLocaleDateString()} at{" "}
        {new Date(updatedAt).toLocaleTimeString()}
      </p>
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
