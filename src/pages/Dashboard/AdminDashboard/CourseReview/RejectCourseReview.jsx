import { Link, useNavigate } from "react-router";
import { useGetCoursesQuery } from "../../../../Redux/features/Api/coursesApi";
import { useMemo } from "react";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";

const RejectCourseReview = () => {
  //states
  const navigate = useNavigate();

  // Rtk query hooks
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  // fetching reject courses data
  const rejectCourses = useMemo(() =>
    data?.filter((course) => course.courseStatus === "reject")
  );

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error : ", error.error);
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error while fetching the courses data from the database",
      icon: "error",
      confirmButtonText: "Okey",
    });
  }

  // Handle empty courses
  if (rejectCourses.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
        <div className="w-4/5 h-40 rounded-2xl bg-[#c7c1c1] flex justify-center items-center flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">
            You have no reject course !
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
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12  overflow-hidden mx-auto my-5 bg-[#c7c1c1] rounded-lg">
        <h1 className="text-center text-2xl font-bold p-5">
          All Reject Courses
        </h1>
        <div className="p-5 flex justify-start items-start flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h3 className="text-base font-bold md:text-lg xl:text-2xl">
            Reject Courses: {rejectCourses.length}
          </h3>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="btn hover:bg-blue-500 hover:text-white hover:border-none"
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
              {rejectCourses.map((course, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-24 h-16">
                      <img
                        src={course.courseImage}
                        alt={course.courseTitle}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </td>
                  <td>{course.courseTitle}</td>
                  <td>{course.coursePrice} $</td>
                  <td>{course.courseTeacherName}</td>
                  <td>{course.courseTeacherEmail}</td>

                  <th className="flex justify-center items-center">
                    {course.courseStatus === "active" ? (
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

export default RejectCourseReview;
