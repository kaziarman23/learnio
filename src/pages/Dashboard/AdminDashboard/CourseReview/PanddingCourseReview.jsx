import { useMemo } from "react";
import { Link, useNavigate } from "react-router";
import Loading from "../../../../components/Loading/Loading";
import {
  useGetCoursesQuery,
  useUpdateActiveCourseMutation,
  useUpdateRejectCourseMutation,
} from "../../../../Redux/features/Api/coursesApi";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";

const PanddingCourseReview = () => {
  //states
  const navigate = useNavigate();

  // Rtk query hook
  const { data, isLoading, isError, error } = useGetCoursesQuery();
  const [UpdateActiveCourse] = useUpdateActiveCourseMutation();
  const [UpdateRejectCourse] = useUpdateRejectCourseMutation();

  // fetching active courses data
  const panddingCourses = useMemo(
    () => data?.filter((course) => course.courseStatus === "pandding"),
    [data],
  );

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error while fetching the courses data from the database : ",
      error.error,
    );
    // showing an alert
    toast.error(error);
  }

  // Handle empty courses
  if (panddingCourses.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0cece]">
        <div className="flex h-40 w-4/5 flex-col items-center justify-center gap-5 rounded-2xl bg-[#c7c1c1]">
          <h1 className="text-center text-2xl font-bold">
            You have no pandding course !
          </h1>
          <Link to="/dashboard/courseReview">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
            >
              Review Other Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle accept
  const handleAccept = (id) => {
    UpdateActiveCourse(id)
      .unwrap()
      .then(() => {
        // showing an alert
        toast.success("successfully updated course status");
      })
      .catch((error) => {
        console.log("Error :", error);
        console.log(
          "Error while changing course data from the courses database: ",
          error.message,
        );

        // showing an alert
        toast.error(error);
      });
  };

  const handleReject = (id) => {
    UpdateRejectCourse(id)
      .unwrap()
      .then(() => {
        // showing an alert
        toast.success("successfully updated course status");
      })
      .catch((error) => {
        console.log("Error :", error);
        console.log(
          "Error while changing course data from the courses database: ",
          error.message,
        );

        // showing an alert
        toast.error(error);
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto my-5 w-11/12 overflow-hidden rounded-lg bg-[#c7c1c1]">
        <h1 className="p-5 text-center text-2xl font-bold">
          All Pandding Courses
        </h1>
        <div className="flex flex-col items-start justify-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-bold md:text-lg xl:text-2xl">
            Pandding Courses: {panddingCourses.length}
          </h3>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="btn hover:border-none hover:bg-blue-500 hover:text-white"
          >
            Review Other Courses
          </button>
        </div>

        {/* form content */}
        <div className="overflow-x-auto p-5">
          <table className="table">
            <thead>
              <tr className="font-bold uppercase">
                <th>SL:</th>
                <th>Course Image</th>
                <th>Course Title</th>
                <th>Course Price</th>
                <th>Teacher Name</th>
                <th>Teacher Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {panddingCourses.map((course, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="h-16 w-24">
                      <img
                        src={course.courseImage}
                        alt={course.courseTitle}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  </td>
                  <td>{course.courseTitle}</td>
                  <td>{course.coursePrice} $</td>
                  <td>{course.courseTeacherName}</td>
                  <td>{course.courseTeacherEmail}</td>
                  <th className="flex items-center justify-center">
                    <button
                      onClick={() => handleAccept(course._id)}
                      className="h-1/2 w-1/2 p-2 hover:text-blue-500"
                    >
                      <FaRegCheckCircle className="mx-auto h-8 w-8" />
                    </button>
                    <button
                      onClick={() => handleReject(course._id)}
                      className="h-1/2 w-1/2 p-2 hover:text-red-500"
                    >
                      <IoMdCloseCircle className="mx-auto h-8 w-8" />
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

export default PanddingCourseReview;
