import { useLocation, useNavigate, useParams } from "react-router";
import { useGetCourseQuery } from "../../Redux/features/Api/coursesApi";
import Loading from "../../components/Loading/Loading";
import { FaGripfire, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { usePostEnrollmentsMutation } from "../../Redux/features/Api/enrollmentsApi";
import Swal from "sweetalert2";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import { useMemo } from "react";

const CourseDetails = () => {
  // states
  const { id } = useParams();
  const location = useLocation();
  const pastLocation = location?.state?.from;
  const navigate = useNavigate();

  // Redux state
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice
  );

  // Rtk query hooks
  const { data: course, isLoading, isError, error } = useGetCourseQuery(id);
  const [postEnrollments] = usePostEnrollmentsMutation();
  const { data: usersData } = useGetUsersQuery();

  // collecting the user data from the database
  const user = useMemo(
    () => usersData?.find((user) => user.userEmail === userEmail),
    [usersData, userEmail]
  );
  const userRole = user?.userRole;

  // handling loading
  if (isLoading) {
    return <Loading />;
  }

  // handling error
  if (isError) {
    console.log("Error: ", error);
    console.log("Error message: ", error.error);
    Swal.fire({
      title: "Error!",
      text: "Error when fetching the courses data from the database",
      icon: "error",
      confirmButtonText: "Okey",
    });
    return;
  }

  // handling Enrollments
  const handleEnrollmentBtn = (data) => {
    // checking for the admin
    if (userRole === "admin" || userRole === "teacher") {
      Swal.fire({
        title: "Error!",
        text: "You are not a student",
        icon: "error",
        confirmButtonText: "Okey",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Enroll for this Course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // after confirming the enrollment
        const enrollmentInfo = {
          courseId: data._id,
          courseTitle: data.courseTitle,
          courseTeacherName: data.courseTeacherName,
          courseTeacherEmail: data.courseTeacherEmail,
          courseImage: data.courseImage,
          coursePrice: data.coursePrice,
          userName,
          userEmail,
          userPhoto,
          paymentStatus: "unpaid",
          enrollmentStatus: "pandding",
        };
        console.log("enrollment Info: ", enrollmentInfo);
        postEnrollments(enrollmentInfo)
          .unwrap()
          .then((resolveData) => {
            console.log("resolveData: ", resolveData);
            // navigating the user and showing a success alert
            navigate(-1);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Enrollment Successfull",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error Message: ", error.message);
            // showing an error alert
            Swal.fire({
              title: "Error!",
              text: "Error when saving the enrollments data in the server",
              icon: "error",
              confirmButtonText: "Okey",
            });
          });
      }
    });
  };

  // handling previous button
  const handlePreviousBtn = () => {
    navigate(pastLocation);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div className="w-4/5 h-full mx-auto my-10 flex gap-5 flex-col">
        <div className="w-full h-80">
          <img
            src={course.courseImage}
            alt={course.courseTitle}
            className="w-full h-full object-fill shadow-xl shadow-black/40"
          />
        </div>
        <div className="w-full h-full p-5">
          <h1 className="font-bold text-4xl text-center">Course Details</h1>
          <div className="mt-10 flex gap-5 justify-between items-center">
            <div className="w-1/2 space-y-3">
              <h3 className="text-xl font-semibold">
                Course Name: {course.courseTitle}
              </h3>
              <h1 className="text-xl font-semibold">
                Teacher Name: {course.courseTeacherName}
              </h1>
              <h1 className="text-xl font-semibold">
                Email: {course.courseTeacherEmail}
              </h1>
              <p className="text-xl font-semibold">
                Course Description: {course.courseDescription}
              </p>
              <p className="text-xl font-semibold">
                Course Price: {course.coursePrice} $
              </p>
              <p className="text-xl font-semibold flex items-center gap-2">
                Total Student: {course.courseStudentsCount} <FaUsers />
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEnrollmentBtn(course)}
                  className="btn hover:bg-blue-500 hover:text-white"
                >
                  Enroll Course
                </button>
                <button
                  onClick={handlePreviousBtn}
                  className="btn hover:bg-red-500 hover:text-white"
                >
                  Previous Page
                </button>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center flex-col ">
              <FaGripfire className="w-1/2 h-1/2 border-2 rounded-2xl shadow-sm shadow-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
