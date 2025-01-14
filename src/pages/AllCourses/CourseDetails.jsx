import { useLocation, useNavigate, useParams } from "react-router";
import { useGetCourseQuery } from "../../Redux/features/Api/coursesApi";
import Loading from "../../components/Loading/Loading";
import { FaGripfire, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { usePostEnrollmentsMutation } from "../../Redux/features/Api/enrollmentsApi";
import Swal from "sweetalert2";
import { useGetUsersQuery } from "../../Redux/features/Api/usersApi";
import { useMemo } from "react";
import toast from "react-hot-toast";

const CourseDetails = () => {
  // states
  const { id } = useParams();
  const location = useLocation();
  const pastLocation = location?.state?.from;
  const navigate = useNavigate();

  // Redux state
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice,
  );

  // Rtk query hooks
  const { data: course, isLoading, isError, error } = useGetCourseQuery(id);
  const { data: usersData } = useGetUsersQuery();
  const [postEnrollments] = usePostEnrollmentsMutation();

  // collecting the user data from the database
  const user = useMemo(
    () => usersData?.find((user) => user.userEmail === userEmail),
    [usersData, userEmail],
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

    // showing an alert
    toast.error(error);

    return;
  }

  // handling Enrollments
  const handleEnrollmentBtn = (data) => {
    // checking for the admin and the teacher
    if (userRole === "admin" || userRole === "teacher") {
      
      // showing an alert
      toast.error("You are not a student.");
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
        postEnrollments(enrollmentInfo)
          .unwrap()
          .then(() => {
            // navigating the user
            navigate(-1);

            // showing an alert
            toast.success("Enrollment Successfull");
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error Message: ", error.message);
            console.log("Error when saving the enrollments data in the server");

            // showing an alert
            toast.error(error);
          });
      }
    });
  };

  // handling previous button
  const handlePreviousBtn = () => {
    navigate(pastLocation);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="mx-auto my-10 flex h-full w-11/12 flex-col gap-5 lg:w-4/5">
        {/* Image content */}
        <div className="h-1/3 w-full md:h-72 lg:h-60 xl:h-72">
          <img
            src={course.courseImage}
            alt={course.courseTitle}
            className="h-full w-full object-fill shadow-xl shadow-black/40"
          />
        </div>
        <div className="h-2/3 w-full p-5">
          <h1 className="text-center text-2xl font-bold lg:text-4xl">
            Course Details
          </h1>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
            <div className="w-full space-y-3 text-sm font-semibold sm:text-base lg:w-1/2 xl:text-xl">
              <h3>Course Name: {course.courseTitle}</h3>
              <h1>Teacher Name: {course.courseTeacherName}</h1>
              <h1>Email: {course.courseTeacherEmail}</h1>
              <p>Course Price: {course.coursePrice} $</p>
              <p className="flex items-center gap-2">
                Total Student: {course.courseStudentsCount} <FaUsers />
              </p>
              <p>Course Description: {course.courseDescription}</p>
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
            <div className="flex w-full items-center justify-center lg:w-1/2">
              <FaGripfire className="h-1/2 w-1/2 rounded-2xl border-2 shadow-sm shadow-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
