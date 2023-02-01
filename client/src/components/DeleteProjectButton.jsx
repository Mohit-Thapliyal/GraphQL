import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    // variables: { id: projectId },
    // refetchQueries: [{ query: GET_PROJECTS }],
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({ 
        query: GET_PROJECTS,
        data: {
          projects: projects.filter((project) => project.id !== deleteProject.id),
        },
      });
    },
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <div
        className="btn btn-danger m-2"
        onClick={() => {
          window.confirm(
            `Do you really want to delete project ${projectId}?`
          ) && deleteProject();
        }}
      >
        <FaTrash className="icon" /> Delete Project
      </div>
    </div>
  );
};

export default DeleteProjectButton;
