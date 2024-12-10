import { PieChart } from "react-minimal-pie-chart";
import { useMemo } from "react";
import Swal from "sweetalert2";
import Loading from "./Loading/Loading";
import { useGetCoursesQuery } from "../Redux/features/Api/coursesApi";


const CoursePieChart = () => {
    // Rtk query hook
  const { data, isLoading, isError, error } = useGetCoursesQuery();
  const legendData = [
    { title: "Web Development", color: "#E38627" },
    { title: "App Development", color: "#C13C37" },
    { title: "Game Development", color: "green" },
    { title: "Ui/Ux Designer", color: "blue" },
    { title: "Machine Learning", color: "black" },
  ];

  // fetching data
  const courses = useMemo(
    () => data?.filter((course) => course.courseStatus === "active"),
    [data]
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
      text: "Error while sending teacher data in the database",
      icon: "error",
      confirmButtonText: "Okey",
    });
  }

  // Filtering Courses
  const webDev = courses?.filter(
    (course) => course.category === "web-development"
  );
  const appDev = courses?.filter(
    (course) => course.category === "app-development"
  );
  const gameDev = courses?.filter(
    (course) => course.category === "game-development"
  );
  const webDes = courses?.filter(
    (course) => course.category === "uiux-designer"
  );
  const machine = courses?.filter(
    (course) => course.category === "mechine-learning"
  );
  return (
    <div className="p-5 flex justify-between items-center">
          {/* Pie chart */}
          <div className="w-1/2 h-40">
            <PieChart
              data={[
                {
                  title: "Web Development",
                  value: webDev.length,
                  color: "#E38627",
                },
                {
                  title: "App Development",
                  value: appDev.length,
                  color: "#C13C37",
                },
                {
                  title: "Game Development",
                  value: gameDev.length,
                  color: "green",
                },
                {
                  title: "Ui/Ux Designer",
                  value: webDes.length,
                  color: "blue",
                },
                {
                  title: "Mechine Learning",
                  value: machine.length,
                  color: "black",
                },
              ]}
              label={({ dataEntry }) =>
                `${((dataEntry.value / courses.length) * 100).toFixed(1)}%`
              }
              labelStyle={{
                fontSize: "8px",
                fontWeight: "bold",
                fill: "#fff",
              }}
              labelPosition={60}
              animate={true}
              animationDuration={1000}
            />
          </div>

          {/* Legend */}
          <div className="w-1/2  mt-4 grid grid-cols-2 gap-2">
            {legendData.map((item, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="inline-block w-4 h-4 mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
  );
};

export default CoursePieChart;