import { FaUsers } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";

const Stats = () => {
  return (
    <div className="w-full h-screen bg-[#d1cecb] ">
      <div className="w-4/5 h-full mx-auto">
        <div className="w-full h-2/3 flex justify-between items-center">
          <div className="w-1/2 space-y-5">
            <h1 className="text-4xl font-bold">
              Empowering a Thriving Learning Community
            </h1>
            <p>
              Join our vibrant community of over 2,000 active students, guided
              by 36 expert teachers, and explore 25+ ongoing courses designed to
              help you achieve your goals. At Learnio, every number reflects our
              commitment to education and growth !
            </p>
          </div>
          <div className="w-1/2 flex justify-start">
            <img
              src="https://i.pinimg.com/736x/14/76/0a/14760a486f3c746fc6e1148f6d06db68.jpg"
              alt="stats section image"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
        {/* stats */}
        <div>
          <div className="w-2/3 h-1/3 mt-20 flex justify-center items-center flex-col lg:flex-row border-2 border-black rounded-2xl mx-auto p-2 shadow">
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
      </div>
    </div>
  );
};

export default Stats;
