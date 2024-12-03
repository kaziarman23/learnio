import { useNavigate, useParams } from "react-router";
import { useGetCourseQuery } from "../../Redux/features/Api/coursesApi";
import Loading from "../../components/Loading/Loading";
import { FaGripfire } from "react-icons/fa";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: course, isLoading, isError } = useGetCourseQuery(id);

  // handling loading
  if (isLoading) {
    return <Loading />;
  }

  // handling error
  if (isError) {
    console.log("Error in fetching Course details: ", isError);
  }

  // handling previous button
  const handlePreviousBtn = () => {
    navigate(-1);
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
                Course Price: {course.coursePrice}
              </p>
              <p className="text-xl font-semibold">
                Total Student: {course.courseStudentsCount}
              </p>
              <div className="flex gap-3">
                {/* Have to handle the enrollment button */}
                <button className="btn hover:bg-blue-500 hover:text-white">
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
