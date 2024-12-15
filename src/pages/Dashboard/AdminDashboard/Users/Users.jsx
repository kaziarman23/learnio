import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import {
  useDeleteUserMutation,
  useDemoteUserRoleMutation,
  useGetUsersQuery,
  usePromoteUserRoleMutation,
} from "../../../../Redux/features/Api/usersApi";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

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
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error when fetching users data",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  // Handle empty teachers
  if (data.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
        <div className="w-1/2 h-40 rounded-2xl bg-[#c7c1c1] flex justify-center items-center flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">
            {data.length}, users found !
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:bg-blue-500 hover:text-white hover:border-none"
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
            // showing an error alert
            Swal.fire({
              title: "Success!",
              text: "user role updated successfully",
              icon: "success",
              confirmButtonText: "okey",
            });
          })
          .catch((error) => {
            console.log("Error: ", error.error);
            console.log("Error Message: ", error.message);

            // showing an error alert
            Swal.fire({
              title: "Error!",
              text: "Error when saving data in the database",
              icon: "error",
              confirmButtonText: "okey",
            });
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
            // showing an success alert
            Swal.fire({
              title: "Success!",
              text: "user role updated successfully",
              icon: "success",
              confirmButtonText: "okey",
            });
          })
          .catch((error) => {
            console.log("Error: ", error.error);
            console.log("Error Message: ", error.message);

            // showing an error alert
            Swal.fire({
              title: "Error!",
              text: "Error when saving data in the database",
              icon: "error",
              confirmButtonText: "okey",
            });
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
            // showing an success alert
            Swal.fire({
              title: "Success!",
              text: "user deleted successfully",
              icon: "success",
              confirmButtonText: "okey",
            });
          })
          .catch(() => {
            console.log("Error: ", error.error);
            console.log("Error Message: ", error.message);

            // showing an error alert
            Swal.fire({
              title: "Error!",
              text: "Error when deleting the user data in the database",
              icon: "error",
              confirmButtonText: "okey",
            });
            return null;
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12 overflow-hidden mx-auto my-5 bg-[#c7c1c1] rounded-lg">
        <h1 className="text-center text-2xl font-bold p-5">All Users</h1>
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
                    <div className="w-16 h-16">
                      <img
                        src={user.userPhoto}
                        alt={user.userName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </td>
                  <td>{user.userName}</td>
                  <td>{user.userEmail}</td>
                  <td className="uppercase font-bold">{user.userRole}</td>
                  <th className="flex justify-center items-center">
                    {user.userRole === "admin" ? (
                      <button
                        type="button"
                        onClick={() => handleDemotion(user._id)}
                        className="rounded-xl flex items-center p-2 gap-2 mt-3 bg-red-500 hover:bg-red-600"
                      >
                        Demote To Student <FaAnglesDown />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handlePromotion(user._id)}
                        className="rounded-xl flex items-center p-2 gap-2 mt-3 bg-blue-500 hover:bg-blue-600"
                      >
                        Promote To Admin <FaAnglesUp />
                      </button>
                    )}
                  </th>
                  <th>
                    <button
                      type="button"
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-red-500 hover:bg-red-600"
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
