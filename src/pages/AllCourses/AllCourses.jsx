import { useState } from "react";
import { useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TabItem from "./TabItem";
import { useGetCoursesQuery } from "../../Redux/features/Api/coursesApi";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

const AllCourses = () => {
  // states and variables
  const { data, isLoading, isError, error, refetch } = useGetCoursesQuery();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

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
  const courses = data.filter((course) => course.courseStatus === "active");
  const webDev = courses.filter(
    (course) => course.category === "web-development"
  );
  const appDev = courses.filter(
    (course) => course.category === "app-development"
  );
  const gameDev = courses.filter(
    (course) => course.category === "game-development"
  );
  const webDes = courses.filter(
    (course) => course.category === "uiux-designer"
  );
  const machine = courses.filter(
    (course) => course.category === "mechine-learning"
  );

  return (
    <div className="w-full h-full bg-[#f2f3f3] overflow-hidden">
      <div className="w-4/5 h-full mx-auto my-10">
        <h1 className="font-bold text-center text-4xl p-2">All Courses</h1>

        {/* tabs content */}
        <div className="my-10">
          <Tabs
            defaultIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList className="tabs rounded-xl bg-black text-white my-10">
              <Tab
                className={`tab focus:outline-none hover:text-green-400 ${
                  tabIndex === 0 && "text-green-500"
                }`}
              >
                Web Development
              </Tab>
              <Tab
                className={`tab focus:outline-none hover:text-green-400 ${
                  tabIndex === 1 && "text-green-500"
                }`}
              >
                App Development
              </Tab>
              <Tab
                className={`tab focus:outline-none hover:text-green-400 ${
                  tabIndex === 2 && "text-green-500"
                }`}
              >
                Game Development
              </Tab>
              <Tab
                className={`tab focus:outline-none hover:text-green-400 ${
                  tabIndex === 3 && "text-green-500"
                }`}
              >
                UI/UX Design
              </Tab>
              <Tab
                className={`tab focus:outline-none hover:text-green-400 ${
                  tabIndex === 4 && "text-green-500"
                }`}
              >
                Machine Learning
              </Tab>
            </TabList>

            <TabPanel>
              <TabItem Course={webDev}></TabItem>
            </TabPanel>
            <TabPanel>
              <TabItem Course={appDev}></TabItem>
            </TabPanel>
            <TabPanel>
              <TabItem Course={gameDev}></TabItem>
            </TabPanel>
            <TabPanel>
              <TabItem Course={webDes}></TabItem>
            </TabPanel>
            <TabPanel>
              <TabItem Course={machine}></TabItem>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
