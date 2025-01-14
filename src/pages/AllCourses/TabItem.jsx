import { Link, useLocation } from "react-router";

const TabItem = ({ Course }) => {
  const location = useLocation();
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center">
      {Course.map((course, index) => (
        <div
          key={index}
          className="w-72 h-96 bg-[#ffffff] border-2 border-black rounded-3xl p-4 space-y-3 sm:w-96 md:w-80"
        >
          {/* Image content */}
          <div className='w-full h-1/3 md:h-3/6 xl:h-1/2'>
            <img
              src={course.courseImage}
              alt={course.courseTitle}
              className="w-full h-full object-fit rounded-2xl"
            />
          </div>
          {/* Information content */}
          <div className='space-y-3 h-auto font-bold sm:text-xl md:text-sm xl:text-sm'>
            <h1>Title : {course.courseTitle}</h1>
            <h4>Teacher Name : {course.courseTeacherName}</h4>
            <h4>Total Students : {course.courseStudentsCount}</h4>
            <div className="flex justify-between items-center">
              <p>Price : {course.coursePrice}$</p>
              <Link
                to={`/courses/${course._id}`}
                state={{ from: location.pathname }}
              >
                <button className="btn hover:bg-black hover:text-white">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabItem;
