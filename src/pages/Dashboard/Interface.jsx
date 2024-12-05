import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
const Interface = () => {
  const { userName } = useSelector((state) => state.userSlice);

  return (
    <div className="w-full h-screen bg-[#e0cece] text-black flex justify-center items-center">
      <div className="w-4/5 h-4/5 mx-auto">
        {/* Type writer part */}
        <div className="text-center p-2 text-4xl font-bold">
          <Typewriter
            options={{
              strings: `Welcome to you'r Dashboard ${userName}`,
              autoStart: true,
            }}
          />
        </div>
        {/* text part */}
        <div className="text-left mt-10 p-5 text-lg space-y-5">
          <h1 className="font-bold">
            As a student, your Learnio Dashboard is your personal hub for
            managing your learning journey. <br /> Here's what you can do:
          </h1>
          <ul className="list-disc space-y-3">
            <li>
              <span className="font-bold">Manage Your Profile:</span> View and
              update your profile information to keep it accurate and
              up-to-date.
            </li>
            <li>
              <span className="font-bold">Access Your Courses:</span> Explore
              all your enrolled courses on Learnio.Seamlessly enroll in new
              courses and complete payments for enrollment directly through the
              dashboard
            </li>
            <li>
              <span className="font-bold">Track Your Payment History:</span>{" "}
              Stay informed by reviewing your payment history, ensuring
              transparency and easy access to your financial records.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interface;
