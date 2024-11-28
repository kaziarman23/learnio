import { useState } from "react";
import { useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TabItem from "./TabItem";

const AllCourses = () => {
  // states and variables
  const [allCourses, setAllCourses] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  // fetching data
  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => setAllCourses(data))
      .catch((error) =>
        console.log("Error when fetch all courses data:", error)
      );
  }, [setAllCourses]);

  // Filtering Courses
  const webDev = allCourses.filter(
    (course) => course.courseTitle === "Web Development"
  );
  const appDev = allCourses.filter(
    (course) => course.courseTitle === "App Development"
  );
  const gameDev = allCourses.filter(
    (course) => course.courseTitle === "Game Development"
  );
  const webDes = allCourses.filter(
    (course) => course.courseTitle === "UI/UX Design"
  );
  const machine = allCourses.filter(
    (course) => course.courseTitle === "Machine Learning"
  );

  return (
    // <div className="w-full h-full bg-[#f6f9ff] overflow-hidden">
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
