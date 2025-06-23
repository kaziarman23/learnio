import { FaUsers } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";

const Stats = () => {
  return (
    <div className="w-full h-full bg-[#e9dfad] lg:h-screen">
      <div className="w-11/12 h-full mx-auto py-5 xl:w-4/5">
        <div className="w-full h-full flex justify-center items-center flex-col gap-5 lg:justify-between lg:flex-row lg:h-2/3">
          <div className="w-full space-y-5 xl:w-1/2">
            <h1 className="text-base font-bold sm:text-lg md:text-2xl xl:text-4xl">
              Empowering a Thriving Learning Community
            </h1>
            <p className='text-sm sm:text-lg'>
              Join our vibrant community of over 2,000 active students, guided
              by 36 expert teachers, and explore 25+ ongoing courses designed to
              help you achieve your goals. At Learnio, every number reflects our
              commitment to education and growth !
            </p>
          </div>
          <div className="w-full flex justify-start xl:w-1/2">
            <img
              src="https://i.pinimg.com/736x/14/76/0a/14760a486f3c746fc6e1148f6d06db68.jpg"
              alt="stats section image"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
        {/* stats */}
        <div>
          <div className="w-4/5 h-full mt-20 border-b-2 flex justify-center items-center flex-col gap-5 border-2 border-black rounded-2xl mx-auto p-2 shadow md:flex-row lg:flex-row lg:h-1/3 lg:w-2/3">
            <div className="w-full border-b-2 border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-2">
              <div className="stat-title">Active Students</div>
              <div className="stat-value flex items-center gap-2">
                2000 <FaUsers />
              </div>
            </div>

            <div className="w-full border-b-2 border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-2">
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
      </div>
    </div>
  );
};

export default Stats;
