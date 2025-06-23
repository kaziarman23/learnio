import { useGetCoursesQuery } from "../../../../Redux/features/api/coursesApi";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router";
import toast from "react-hot-toast";

const CourseReview = () => {
  // Rtk query hook
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  // fetching active courses data
  const panddingCourses = data?.filter(
    (course) => course.courseStatus === "pandding"
  );
  const activeCourses = data?.filter(
    (course) => course.courseStatus === "active"
  );
  const rejectCourses = data?.filter(
    (course) => course.courseStatus === "reject"
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
  if (data.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
        <div className="w-1/2 h-40 rounded-2xl bg-[#c7c1c1] flex justify-center items-center flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">
            You have no course for review !
          </h1>
          <Link to="/dashboard/courseReview">
            <button
              type="button"
              className="btn hover:bg-blue-500 hover:text-white hover:border-none"
            >
              Review Other Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12 p-5 overflow-hidden mx-auto my-5 bg-[#c7c1c1] rounded-lg xl:w-4/5 xl:h-1/2">
        <h1 className="text-center text-2xl font-bold p-5">
          Review Teacher Courses
        </h1>
        <div className="p-5 font-bold text-sm flex justify-evenly items-center flex-col gap-2 sm:flex-row sm:text-base xl:text-2xl">
          <h3>
            Pandding Courses: {panddingCourses.length}
          </h3>
          <h3>
            Active Courses: {activeCourses.length}
          </h3>
          <h3>
            Rejected Courses: {rejectCourses.length}
          </h3>
        </div>
        <div className="flex justify-center items-center flex-col gap-3 sm:flex-row sm:justify-evenly">
          <Link to="/dashboard/courseReview/pandding">
            <button
              type="button"
              className="btn bg-yellow-500 hover:bg-yellow-600"
            >
              Pandding Courses
            </button>
          </Link>
          <Link to="/dashboard/courseReview/active">
            <button type="button" className="btn bg-blue-500 hover:bg-blue-600">
              Active Courses
            </button>
          </Link>
          <Link to="/dashboard/courseReview/reject">
            <button type="button" className="btn bg-red-500 hover:bg-red-600">
              Reject Courses
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
