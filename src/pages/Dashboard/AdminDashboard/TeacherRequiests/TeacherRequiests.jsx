import { IoMdCloseCircle } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../../../components/Loading/Loading";
import {
  useGetTeachersQuery,
  useUpdateAcceptTeachersMutation,
  useUpdateRejectTeachersMutation,
} from "../../../../Redux/features/Api/teachersApi";
import {
  useRejectUserForTeacherMutation,
  useAcceptUserForTeacherMutation,
} from "../../../../Redux/features/Api/usersApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const TeacherRequiests = () => {
  // Redux state
  const { userName } = useSelector((state) => state.userSlice);

  // Rtk query hooks
  const { data, isLoading, isError, error } = useGetTeachersQuery();
  const [updateAcceptTeachers] = useUpdateAcceptTeachersMutation();
  const [updateRejectTeachers] = useUpdateRejectTeachersMutation();
  const [acceptUserForTeacher] = useAcceptUserForTeacherMutation();
  const [rejectUserForTeacher] = useRejectUserForTeacherMutation();

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching the data from getTeachersQuery",
      error.error,
    );
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
            {userName}, have no teacher requiests for review.
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

  // Handle accept
  const handleAccept = (id) => {
    // collecting teacher data from database
    const teacherInfo = data.find((teacher) => teacher._id === id);

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
        acceptUserForTeacher(userInfo)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("Accepted as a teacher");
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error Message: ", error.message);

            // showing an alert
            toast.error(error);
          });
      })
      .catch((error) => {
        console.log("Error :", error);
        console.log("Faild to update teacher data: ", error.message);

        // showing an alert
        toast.error(error);
      });
  };

  // Handle reject
  const handleReject = (id) => {
    // collecting teacher data from database
    const teacherInfo = data.find((teacher) => teacher._id === id);

    // updating the isTeacher filed
    updateRejectTeachers(id)
      .unwrap()
      .then(() => {
        // updating the user data in the database
        const userInfo = {
          userEmail: teacherInfo.userEmail,
        };
        // sending data in the user database
        rejectUserForTeacher(userInfo)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("Rejected as a teacher");
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log(
              "Faild to sand the data in the Users/Demotion database:  ",
              error.message,
            );

            // showing an alert
            toast.error(error);
          });
      })
      .catch((error) => {
        console.log("Error: ", error);
        // showing an alert
        toast.error(error);
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto my-5 w-11/12 overflow-hidden rounded-lg bg-[#c7c1c1]">
        <h1 className="p-5 text-center text-2xl font-bold">
          Review Teachers Request
        </h1>
        {/* form content */}
        <div className="overflow-x-auto p-5">
          <table className="table">
            <thead>
              <tr className="font-bold uppercase">
                <th>SL:</th>
                <th>Teacher Image</th>
                <th>Teacher Name</th>
                <th>Teacher Email</th>
                <th>Teacher category</th>
                <th>Teacher Experience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((teacher, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="h-16 w-16">
                      <img
                        src={teacher.userPhoto}
                        alt={teacher.userName}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </td>
                  <td>{teacher.userName}</td>
                  <td>{teacher.userEmail}</td>
                  <td>{teacher.category}</td>
                  <td>{teacher.experience}</td>

                  <th className="flex items-center justify-center">
                    {teacher.isTeacher === "pandding" ? (
                      <>
                        <button
                          onClick={() => handleAccept(teacher._id)}
                          className="h-1/2 w-1/2 p-2 hover:text-blue-500"
                        >
                          <FaRegCheckCircle className="mx-auto h-8 w-8" />
                        </button>
                        <button
                          onClick={() => handleReject(teacher._id)}
                          className="h-1/2 w-1/2 p-2 hover:text-red-500"
                        >
                          <IoMdCloseCircle className="mx-auto h-8 w-8" />
                        </button>
                      </>
                    ) : teacher.isTeacher === true ? (
                      <h1 className="flex items-center justify-center gap-3 rounded-xl bg-blue-500 p-3 text-center text-base font-bold uppercase">
                        Accepted
                      </h1>
                    ) : (
                      <h1 className="mt-1 flex items-center justify-center gap-3 rounded-xl bg-red-500 p-3 text-center text-base font-bold uppercase">
                        Rejected
                      </h1>
                    )}
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

export default TeacherRequiests;
