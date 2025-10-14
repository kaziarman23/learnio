import { IoMdCloseCircle } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import Loading from "../../../../components/Loading/Loading";
import {
  useGetTeachersQuery,
  useUpdateAcceptTeachersMutation,
  useUpdateRejectTeachersMutation,
} from "../../../../Redux/features/api/teachersApi";
import {
  useRejectUserForTeacherMutation,
  useAcceptUserForTeacherMutation,
} from "../../../../Redux/features/api/usersApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

const TeacherRequiests = () => {
  // Redux state
  const { userName } = useSelector((state) => state.userSlice);

  // Rtk query hooks
  // Destructure data with a default empty array for safety
  const {
    data: teachers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTeachersQuery();
  const [updateAcceptTeachers] = useUpdateAcceptTeachersMutation();
  const [updateRejectTeachers] = useUpdateRejectTeachersMutation();
  const [acceptUserForTeacher] = useAcceptUserForTeacherMutation();
  const [rejectUserForTeacher] = useRejectUserForTeacherMutation();

  // FIX: Use the destructured 'teachers' (which defaults to [])
  // or safely access 'data' with the optional chaining operator (?)
  const pendingRequests = useMemo(
    () => teachers.filter((teacher) => teacher.isTeacher === "pending"),
    [teachers],
  );

  // Handle accept
  const handleAccept = (id) => {
    // collecting teacher data from database
    const teacherInfo = teachers.find((teacher) => teacher._id === id);

    if (!teacherInfo) {
      toast.error("Teacher info not found!");
      return;
    }

    // updating isTeacher filed
    updateAcceptTeachers(id)
      .unwrap()
      .then(() => {
        // updating the user data in the database
        const userInfo = {
          userEmail: teacherInfo.userEmail,
          experience: teacherInfo.experience,
          category: teacherInfo.category,
        };
        // sending data in the user database
        return acceptUserForTeacher(userInfo).unwrap();
      })
      .then(() => {
        // showing an alert
        toast.success("Accepted as a teacher");
      })
      .catch((error) => {
        console.error("Acceptance/User Update Error: ", error);
        // showing an alert
        toast.error(error?.data?.message || "Failed to accept teacher.");
      });
  };

  // Handle reject
  const handleReject = (id) => {
    // collecting teacher data from database
    const teacherInfo = teachers.find((teacher) => teacher._id === id);

    if (!teacherInfo) {
      toast.error("Teacher info not found!");
      return;
    }

    // updating the isTeacher filed
    updateRejectTeachers(id)
      .unwrap()
      .then(() => {
        // updating the user data in the database
        const userInfo = {
          userEmail: teacherInfo.userEmail,
        };
        // sending data in the user database
        return rejectUserForTeacher(userInfo).unwrap();
      })
      .then(() => {
        // showing an alert
        toast.success("Rejected as a teacher");
      })
      .catch((error) => {
        console.error("Rejection/User Update Error: ", error);
        // showing an alert
        toast.error(error?.data?.message || "Failed to reject teacher.");
      });
  };

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.error("Error in fetching data from getTeachersQuery: ", error);
    toast.error(
      error?.data?.message || error?.error || "Failed to load teacher requests",
    );

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-lg rounded-2xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Requests
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching teacher requests. Please check the
            console and try again.
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

  // Handle empty teachers (Using the modern UI from your other components)
  if (teachers.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        {/* Background Elements */}
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl" />

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-6 shadow-2xl">
              <FaRegCheckCircle className="text-4xl text-white" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Teacher Requests!
            </h1>

            {/* Message */}
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              {userName}, you currently have no pending teacher requests to
              review.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/dashboard/interface">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Go to Interface
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

  console.log(teachers);
  // --- Main Content UI ---
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Background Elements */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-sky-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Teacher{" "}
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              Requests
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            🧑‍🏫 Review and manage applications for teacher status.
            <span className="ml-2 font-semibold text-blue-600">
              ({pendingRequests.length} Pending)
            </span>
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
                    Image
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Status / Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Use the destructured 'teachers' array */}
                {teachers.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className={`transition-colors duration-200 ${
                      teacher.isTeacher === "pending"
                        ? "bg-blue-50/50 hover:bg-blue-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-10 w-10">
                        <img
                          src={teacher.userPhoto}
                          alt={teacher.userName}
                          className="h-full w-full rounded-full object-cover ring-2 ring-blue-300 ring-offset-2"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-xs truncate text-sm font-medium text-gray-900">
                        {teacher.userName}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="font-mono text-sm tracking-wider text-gray-600">
                        {teacher.userEmail}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                        {teacher.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="text-sm text-gray-700">
                        {teacher.experience}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {teacher.isTeacher === "pending" ? (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() =>
                              handleAccept(teacher._id, teacher.userName)
                            }
                            type="button"
                            className="rounded-full bg-green-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
                            title="Accept Request"
                          >
                            <FaRegCheckCircle className="text-sm" />
                          </button>
                          <button
                            onClick={() =>
                              handleReject(teacher._id, teacher.userName)
                            }
                            type="button"
                            className="rounded-full bg-red-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600"
                            title="Reject Request"
                          >
                            <IoMdCloseCircle className="text-sm" />
                          </button>
                        </div>
                      ) : teacher.isTeacher === true ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase text-emerald-700 shadow-md">
                          Accepted
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold uppercase text-red-700 shadow-md">
                          Rejected
                        </span>
                      )}
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

export default TeacherRequiests;
