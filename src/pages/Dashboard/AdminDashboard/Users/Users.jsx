import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import {
  useDeleteUserMutation,
  useDemoteUserRoleMutation,
  useGetUsersQuery,
  usePromoteUserRoleMutation,
} from "../../../../Redux/features/api/usersApi.js";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Users = () => {
  // Rtk query hooks
  const { data, isLoading, isError, error } = useGetUsersQuery();
  const [promoteUserRole] = usePromoteUserRoleMutation();
  const [demoteUserRole] = useDemoteUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error when fetching the data from users", error.error);

    // showing an alert
    toast.error(error);

    return null;
  }

  // Handle empty teachers
  if (data.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0cece]">
        <div className="flex h-40 w-1/2 flex-col items-center justify-center gap-5 rounded-2xl bg-[#c7c1c1]">
          <h1 className="text-center text-2xl font-bold">
            {data.length}, users found !
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
            >
              Interface
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePromotion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // sending the user id in the user database
        promoteUserRole(id)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("user role updated successfully");
          })
          .catch((error) => {
            console.log("Error: ", error.error);
            console.log(
              "Error when saving data in the database: ",
              error.message,
            );

            /// showing an alert
            toast.error(error);
            return null;
          });
      }
    });
  };

  const handleDemotion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // sending the user id in the user database
        demoteUserRole(id)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("user role updated successfully");
          })
          .catch((error) => {
            console.log("Error: ", error.error);
            console.log(
              "Error when saving data in the database: ",
              error.message,
            );

            /// showing an alert
            toast.error(error);
            return null;
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("user deleted successfully");
          })
          .catch(() => {
            console.log("Error: ", error.error);
            console.log(
              "Error when deleting a data in the database: ",
              error.message,
            );

            /// showing an alert
            toast.error(error);
            return null;
          });
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto my-5 w-11/12 overflow-hidden rounded-lg bg-[#c7c1c1]">
        <h1 className="p-5 text-center text-2xl font-bold">All Users</h1>
        {/* form content */}
        <div className="overflow-x-auto p-5">
          <table className="table">
            <thead>
              <tr className="font-bold uppercase">
                <th>SL:</th>
                <th>User Image</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Update Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="h-16 w-16">
                      <img
                        src={user.userPhoto}
                        alt={user.userName}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </td>
                  <td>{user.userName}</td>
                  <td>{user.userEmail}</td>
                  <td className="font-bold uppercase">{user.userRole}</td>
                  <th className="flex items-center justify-center">
                    {user.userRole === "admin" ? (
                      <button
                        type="button"
                        onClick={() => handleDemotion(user._id)}
                        className="mt-3 flex items-center gap-2 rounded-xl bg-red-500 p-2 hover:bg-red-600"
                      >
                        Demote To Student <FaAnglesDown />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handlePromotion(user._id)}
                        className="mt-3 flex items-center gap-2 rounded-xl bg-blue-500 p-2 hover:bg-blue-600"
                      >
                        Promote To Admin <FaAnglesUp />
                      </button>
                    )}
                  </th>
                  <th>
                    <button
                      type="button"
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-2 rounded-xl bg-red-500 p-2 hover:bg-red-600"
                    >
                      Delete
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
