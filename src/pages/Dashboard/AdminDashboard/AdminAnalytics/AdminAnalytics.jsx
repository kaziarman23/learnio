import { FaUsers } from "react-icons/fa";
import CoursePieChart from "../../../../components/CoursePieChart";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";

const AdminAnalytics = () => {
  return (
    <div className="w-full min-h-screen bg-[#e0cece] flex justify-center items-center">
      <div className="w-11/12 overflow-hidden my-10 flex flex-col gap-5 xl:w-4/5">
        {/* course analytics */}
        <div className="w-full rounded-2xl bg-[#c7c1c1]">
          <h1 className="text-2xl text-center p-2 font-bold">
            Enrollment Stats
          </h1>
          {/* stats */}
          <div>
            <div className="w-4/5 h-full mt-5 border-b-2 flex justify-center items-center flex-col gap-5 border-2 border-black rounded-2xl mx-auto p-2 shadow md:flex-row lg:flex-row lg:h-1/3 lg:w-2/3">
              <div className="w-full py-2 border-b-2 border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-2 xl:py-0">
                <div className="stat-title">Active Students</div>
                <div className="stat-value flex items-center gap-2">
                  2000 <FaUsers />
                </div>
              </div>

              <div className="w-full py-2 border-b-2 border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-2 xl:py-0">
                <div className="stat-title">Available Teacher</div>
                <div className="stat-value flex items-center gap-2">
                  36 <LiaChalkboardTeacherSolid />
                </div>
              </div>

              <div className="w-full  border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-0">
                <div className="stat-title">On Going Course</div>
                <div className="stat-value flex items-center gap-2">
                  25 <SiGoogleclassroom />
                </div>
              </div>
            </div>
          </div>

          {/* pie chart */}
          <div className="space-y-3 mt-10">
            <h1 className="text-2xl text-center p-2 font-bold">
              Available Courses
            </h1>
            <CoursePieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
