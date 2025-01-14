import { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TabItem from "./TabItem";
import { useGetCoursesQuery } from "../../Redux/features/Api/coursesApi";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";

const AllCourses = () => {
  // state
  const [tabIndex, setTabIndex] = useState(0);

  // Rtk query hook
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  // fetching data
  const courses = useMemo(
    () => data?.filter((course) => course.courseStatus === "active"),
    [data],
  );

  // Handle Loading
  if (isLoading) {
    return <Loading></Loading>;
  }

  // Handle error
  if (isError) {
    console.log("Error : ", error.error);

    // showing an alert
    toast.error(error);
  }

  // Filtering Courses
  const webDev = courses?.filter(
    (course) => course.category === "web-development",
  );
  const appDev = courses?.filter(
    (course) => course.category === "app-development",
  );
  const gameDev = courses?.filter(
    (course) => course.category === "game-development",
  );
  const webDes = courses?.filter(
    (course) => course.category === "uiux-designer",
  );
  const machine = courses?.filter(
    (course) => course.category === "mechine-learning",
  );

  return (
    <div className="h-full w-full overflow-hidden bg-[#f2f3f3]">
      <div className="mx-auto my-10 h-full w-11/12 lg:w-4/5">
        <h1 className="p-2 text-center text-xl font-bold sm:text-2xl xl:text-4xl">
          All Courses
        </h1>

        {/* tabs content */}
        <div className="my-10">
          <Tabs
            defaultIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            {/* mobile screen tab */}
            <TabList className="tabs my-10 rounded-xl bg-black text-white lg:hidden">
              <Tab
                className={`tab text-xs hover:text-green-400 focus:outline-none ${
                  tabIndex === 0 && "text-green-500"
                }`}
              >
                Web
              </Tab>
              <Tab
                className={`tab text-xs hover:text-green-400 focus:outline-none ${
                  tabIndex === 1 && "text-green-500"
                }`}
              >
                App
              </Tab>
              <Tab
                className={`tab text-xs hover:text-green-400 focus:outline-none ${
                  tabIndex === 2 && "text-green-500"
                }`}
              >
                Game
              </Tab>
              <Tab
                className={`tab text-xs hover:text-green-400 focus:outline-none ${
                  tabIndex === 3 && "text-green-500"
                }`}
              >
                UI/UX
              </Tab>
              <Tab
                className={`tab text-xs hover:text-green-400 focus:outline-none ${
                  tabIndex === 4 && "text-green-500"
                }`}
              >
                ML
              </Tab>
            </TabList>

            {/* large screen tab */}
            <TabList className="tabs my-10 hidden justify-center rounded-xl bg-black text-white lg:flex lg:items-center lg:justify-evenly">
              <Tab
                className={`tab hover:text-green-400 focus:outline-none ${
                  tabIndex === 0 && "text-green-500"
                }`}
              >
                Web Development
              </Tab>
              <Tab
                className={`tab hover:text-green-400 focus:outline-none ${
                  tabIndex === 1 && "text-green-500"
                }`}
              >
                App Development
              </Tab>
              <Tab
                className={`tab hover:text-green-400 focus:outline-none ${
                  tabIndex === 2 && "text-green-500"
                }`}
              >
                Game Development
              </Tab>
              <Tab
                className={`tab hover:text-green-400 focus:outline-none ${
                  tabIndex === 3 && "text-green-500"
                }`}
              >
                UI/UX Design
              </Tab>
              <Tab
                className={`tab hover:text-green-400 focus:outline-none ${
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
