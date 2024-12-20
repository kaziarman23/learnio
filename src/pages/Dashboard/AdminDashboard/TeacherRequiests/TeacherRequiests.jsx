import Swal from "sweetalert2";
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
      error.error
    );
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error when fetching getTeachersQuery data",
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
            {userName}, have no teacher requiests for review.
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
            // showing a success alert
            Swal.fire({
              title: "Success",
              text: "Accepted as a teacher",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error Message: ", error.message);

            // showing error alert
            Swal.fire({
              title: "Error",
              text: "Faild to sand the data in the Users/Promotion database",
              icon: "error",
              confirmButtonText: "okey",
            });
          });
      })
      .catch((error) => {
        console.log("Error :", error);
        console.log("Error Message:", error.message);

        // showing error alert
        Swal.fire({
          title: "Error!",
          text: "Faild to update teacher data",
          icon: "error",
          confirmButtonText: "OK",
        });
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
            // showing a success alert
            Swal.fire({
              title: "Success",
              text: "Rejected as a teacher",
              icon: "warning",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error Message: ", error.message);

            // showing error alert
            Swal.fire({
              title: "Error",
              text: "Faild to sand the data in the Users/Demotion database",
              icon: "error",
              confirmButtonText: "okey",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12 overflow-hidden mx-auto my-5 bg-[#c7c1c1] rounded-lg">
        <h1 className="text-center text-2xl font-bold p-5">
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
                    <div className="w-16 h-16">
                      <img
                        src={teacher.userPhoto}
                        alt={teacher.userName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </td>
                  <td>{teacher.userName}</td>
                  <td>{teacher.userEmail}</td>
                  <td>{teacher.category}</td>
                  <td>{teacher.experience}</td>

                  <th className="flex justify-center items-center">
                    {teacher.isTeacher === "pandding" ? (
                      <>
                        <button
                          onClick={() => handleAccept(teacher._id)}
                          className="w-1/2 h-1/2 p-2 hover:text-blue-500"
                        >
                          <FaRegCheckCircle className="w-8 h-8 mx-auto" />
                        </button>
                        <button
                          onClick={() => handleReject(teacher._id)}
                          className="w-1/2 h-1/2 p-2 hover:text-red-500"
                        >
                          <IoMdCloseCircle className="w-8 h-8 mx-auto" />
                        </button>
                      </>
                    ) : teacher.isTeacher === true ? (
                      <h1 className="flex justify-center items-center gap-3 font-bold text-center text-base bg-blue-500 p-3 uppercase rounded-xl">
                        Accepted
                      </h1>
                    ) : (
                      <h1 className="flex justify-center items-center gap-3 font-bold text-center text-base bg-red-500 p-3 mt-1 uppercase rounded-xl">
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
