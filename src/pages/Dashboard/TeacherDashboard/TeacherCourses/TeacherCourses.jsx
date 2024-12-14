import { useSelector } from "react-redux";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../../Redux/features/Api/coursesApi";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useMemo } from "react";
import { Link } from "react-router";
import { FaRegTrashAlt } from "react-icons/fa";

const TeacherCourses = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // Rtk query
  const { data, isLoading, isError, error } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  // filtering the data
  const courses = useMemo(
    () =>
      data?.filter((course) => course.courseTeacherEmail === userEmail) || [],
    [data]
  );

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching the data from getCoursesQuery",
      error.error
    );
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error when fetching getCoursesQuery data",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  // Handle empty enrollments
  if (courses.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
        <div className="w-4/5 h-40 rounded-2xl bg-[#c7c1c1] flex justify-center items-center flex-col gap-5 md:w-1/2">
          <h1 className="text-xl font-bold text-center sm:text-2xl">
            {userName}, have no courses.
          </h1>
          <Link to="/dashboard/addCourse">
            <button
              type="button"
              className="btn hover:bg-blue-500 hover:text-white hover:border-none"
            >
              Add Course
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id)
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Course Deleted Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message || "Failed to delete course",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-4/5 overflow-hidden mx-auto my-5 bg-[#c7c1c1] rounded-lg">
        <h1 className="text-center text-2xl font-bold p-5">All Courses</h1>
        {/* form content */}
        <div className="overflow-x-auto p-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-bold uppercase">
                <th>SL:</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Student Count</th>
                <th>Course Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-28 h-14">
                      <img
                        src={course.courseImage}
                        alt={course.courseTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="uppercase">{course.courseTitle}</td>
                  <td>{course.coursePrice}</td>
                  <td>{course.courseStudentsCount}</td>
                  <td className="uppercase">
                    {course.courseStatus === "pandding" ? (
                      <h1 className="font-bold text-2xl uppercase border-black border text-center bg-yellow-500 rounded-sm">
                        Pendding
                      </h1>
                    ) : (
                      <h1 className="font-bold text-2xl uppercase rounded-sm border-black border text-center bg-green-500">
                        Active
                      </h1>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn bg-red-500 text-black border-black hover:bg-red-600 hover:text-white"
                    >
                      <FaRegTrashAlt />
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

export default TeacherCourses;
