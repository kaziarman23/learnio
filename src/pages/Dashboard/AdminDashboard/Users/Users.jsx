import Swal from "sweetalert2";
import { useCallback } from "react";
import Loading from "../../../../components/Loading/Loading";
import {
  useDeleteUserMutation,
  useDemoteUserRoleMutation,
  useGetUsersQuery,
  usePromoteUserRoleMutation,
} from "../../../../Redux/features/api/usersApi.js";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // Use Link from react-router-dom

const Users = () => {
  // Rtk query hooks
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();
  const [promoteUserRole] = usePromoteUserRoleMutation();
  const [demoteUserRole] = useDemoteUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  // --- Handlers (Refactored using useCallback and improved Swal messages) ---

  const handlePromotion = useCallback(
    (id, name) => {
      Swal.fire({
        title: "Promote to Admin?",
        text: `Are you sure you want to promote ${name} to the 'Admin' role?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6", // Blue 500
        cancelButtonColor: "#6b7280", // Gray 500
        confirmButtonText: "Yes, Promote!",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          promoteUserRole(id)
            .unwrap()
            .then(() => {
              toast.success(`👑 ${name} is now an admin!`);
            })
            .catch((err) => {
              console.error("Promotion Error:", err);
              toast.error(
                err?.data?.message || err?.error || "Failed to promote user.",
              );
            });
        }
      });
    },
    [promoteUserRole],
  );

  const handleDemotion = useCallback(
    (id, name) => {
      Swal.fire({
        title: "Demote User?",
        text: `Are you sure you want to demote ${name} to 'Student'?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f43f5e", // Rose 500
        cancelButtonColor: "#6b7280", // Gray 500
        confirmButtonText: "Yes, Demote!",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          demoteUserRole(id)
            .unwrap()
            .then(() => {
              toast.success(`⬇️ ${name} has been demoted to student.`);
            })
            .catch((err) => {
              console.error("Demotion Error:", err);
              toast.error(
                err?.data?.message || err?.error || "Failed to demote user.",
              );
            });
        }
      });
    },
    [demoteUserRole],
  );

  const handleDelete = useCallback(
    (id, name) => {
      Swal.fire({
        title: "Delete User?",
        text: `Are you sure you want to permanently delete the user: ${name}? This action cannot be undone.`,
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#ef4444", // Red 500
        cancelButtonColor: "#6b7280", // Gray 500
        confirmButtonText: "Yes, Delete!",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(id)
            .unwrap()
            .then(() => {
              toast.success("🗑️ User deleted successfully!");
            })
            .catch((err) => {
              console.error("Deletion Error:", err);
              toast.error(
                err?.data?.message || err?.error || "Failed to delete user.",
              );
            });
        }
      });
    },
    [deleteUser],
  );

  // --- Loading State UI ---
  if (isLoading) {
    return <Loading />;
  }

  // --- Error State UI (Modern Style) ---
  if (isError) {
    console.error("Error when fetching the data from users:", error);
    toast.error(
      error?.data?.message || error?.error || "Failed to load user data.",
    );

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-lg rounded-2xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Users
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching the user list. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- Empty State UI (Modern Style) ---
  if (users.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        {/* Background Elements */}
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl" />

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            {/* Empty Icon */}
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-6 shadow-2xl">
              <FaSearch className="text-4xl text-white" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Users Found
            </h1>

            {/* Message */}
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              The user database appears to be empty.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/dashboard/interface">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Go to Dashboard
                    <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Content UI (Modern Style) ---
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Background Elements */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Manage{" "}
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              Users
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            👥 Total Registered Users:{" "}
            <span className="font-bold text-blue-600">{users.length}</span>
          </p>
        </div>

        {/* Table Container (Modern Styling) */}
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Update Role
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="transition-colors duration-200 hover:bg-blue-50/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-12 w-12">
                        <img
                          src={user.userPhoto}
                          alt={user.userName}
                          className="h-full w-full rounded-full object-cover ring-2 ring-gray-300"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.userName}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">
                        {user.userEmail}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase ${
                          user.userRole === "admin"
                            ? "bg-purple-100 text-purple-700 ring-1 ring-purple-300"
                            : "bg-green-100 text-green-700 ring-1 ring-green-300"
                        }`}
                      >
                        {user.userRole}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {user.userRole === "admin" ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleDemotion(user._id, user.userName)
                          }
                          className="group flex items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-red-600"
                        >
                          Demote{" "}
                          <FaAnglesDown className="text-xs transition-transform duration-300 group-hover:translate-y-0.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handlePromotion(user._id, user.userName)
                          }
                          className="group flex items-center gap-2 rounded-xl bg-blue-500 px-3 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-blue-600"
                        >
                          Promote{" "}
                          <FaAnglesUp className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5" />
                        </button>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(user._id, user.userName)}
                        className="rounded-full bg-red-500 p-3 text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-red-600"
                        title={`Delete ${user.userName}`}
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
