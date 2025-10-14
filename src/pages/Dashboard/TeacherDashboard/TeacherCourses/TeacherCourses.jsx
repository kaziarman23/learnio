import { useSelector } from "react-redux";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../../Redux/features/api/coursesApi";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useMemo } from "react";
import { Link } from "react-router";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

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
    [data, userEmail],
  );

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching the data from getCoursesQuery",
      error.error,
    );

    // showing an alert
    toast.error(error);
    return null;
  }

  // Handle empty enrollments
  if (courses.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0cece]">
        <div className="flex h-40 w-4/5 flex-col items-center justify-center gap-5 rounded-2xl bg-[#c7c1c1] md:w-1/2">
          <h1 className="text-center text-xl font-bold sm:text-2xl">
            {userName}, have no courses.
          </h1>
          <Link to="/dashboard/addCourse">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
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
            // showing an alert
            toast.success("Course Deleted Successfully");
          })
          .catch((err) => {
            console.log("Error: ");

            // showing an alert
            toast.error(err);
          });
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto my-5 w-4/5 overflow-hidden rounded-lg bg-[#c7c1c1]">
        <h1 className="p-5 text-center text-2xl font-bold">All Courses</h1>
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
                    <div className="h-14 w-28">
                      <img
                        src={course.courseImage}
                        alt={course.courseTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="uppercase">{course.courseTitle}</td>
                  <td>{course.coursePrice}</td>
                  <td>{course.courseStudentsCount}</td>
                  <td className="uppercase">
                    {course.courseStatus === "pending" ? (
                      <h1 className="rounded-sm border border-black bg-yellow-500 text-center text-2xl font-bold uppercase">
                        Pendding
                      </h1>
                    ) : (
                      <h1 className="rounded-sm border border-black bg-green-500 text-center text-2xl font-bold uppercase">
                        Active
                      </h1>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn border-black bg-red-500 text-black hover:bg-red-600 hover:text-white"
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
