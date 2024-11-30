/* eslint-disable react/prop-types */

const TabItem = ({ Course }) => {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Course.map((course) => (
        <div
          key={course.id}
          className="w-80 h-96 bg-[#ffffff] border-2 border-black rounded-3xl p-4 space-y-3"
        >
          <img
            src={course.courseImage}
            alt={course.courseTitle}
            className="w-full h-1/2 object-fit rounded-2xl"
          />
          <h1>Title : {course.courseTitle}</h1>
          <h4>Teacher Name : {course.courseTeacherName}</h4>
          <h4>Total Students : {course.courseStudentsCount}</h4>
          <div className="flex justify-between items-center">
            <p>Price : {course.coursePrice}$</p>
            <button className="btn hover:bg-black hover:text-white">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabItem;
