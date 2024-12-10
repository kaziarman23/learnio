import { FaUsers } from "react-icons/fa";
import CoursePieChart from "../../../../components/CoursePieChart";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";

const AdminAnalytics = () => {
  return (
    <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
      <div className="w-4/5 flex flex-col gap-5">
        {/* course analytics */}
        <div className="w-full rounded-2xl bg-[#c7c1c1]">
          <h1 className="text-2xl text-center p-2 font-bold">
            Enrollment Stats
          </h1>
          {/* stats */}
          <div>
            <div className="w-2/3 mt-10 flex justify-center items-center flex-col lg:flex-row border-2 border-black rounded-2xl mx-auto p-2 shadow">
              <div className="w-1/3 border-r-2 border-black flex justify-center items-center flex-col">
                <div className="stat-title">Active Students</div>
                <div className="stat-value flex items-center gap-2">
                  2000 <FaUsers />
                </div>
              </div>

              <div className="w-1/3 border-r-2 border-black flex justify-center items-center flex-col">
                <div className="stat-title">Available Teacher</div>
                <div className="stat-value flex items-center gap-2">
                  36 <LiaChalkboardTeacherSolid />
                </div>
              </div>

              <div className="w-1/3 flex justify-center items-center flex-col">
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
