import { useState } from "react";
import { useEffect } from "react";

const AllCourses = () => {
  // states
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => setAllCourses(data))
      .catch((error) =>
        console.log("Error when fetch all courses data:", error)
      );
  }, [setAllCourses]);

  // filtering courses
  const webDev = allCourses.filter(
    (course) => course.courseTitle === "Web Development"
  );
  const appDev = allCourses.filter(
    (course) => course.courseTitle === "Web Development"
  );
  const gameDev = allCourses.filter(
    (course) => course.courseTitle === "Web Development"
  );
  const webDes = allCourses.filter(
    (course) => course.courseTitle === "Web Development"
  );
  const machineLearning = allCourses.filter(
    (course) => course.courseTitle === "Web Development"
  );

  return (
    <div className="w-full h-full bg-[#f6f9ff] overflow-hidden">
      <div className="w-4/5 h-full mx-auto my-10">
        <h1 className="font-bold text-center text-2xl p-2">All Courses</h1>

        {/* tabs */}
      </div>
    </div>
  );
};

export default AllCourses;
