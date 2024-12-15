import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useMemo } from "react";
import { useGetUsersQuery } from "../../Redux/features/Api/usersApi";

const Interface = () => {
  // states
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // Qtk query hooks
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Fetching user data
  const user = useMemo(
    () => data?.find((user) => user.userEmail === userEmail) || [],
    [data]
  );

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching data from getusersQuery because/ ",
      error.error
    );

    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error when fetching users data",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  return (
    <div className="w-full h-full bg-[#e0cece] text-black flex justify-center items-center sm:h-screen">
      <div className="w-11/12 h-full mx-auto xl:w-4/5 xl:h-4/5">
        {/* Type writer part */}
        <div className="text-center p-2 text-base font-bold sm:text-2xl xl:text-4xl">
          <Typewriter
            options={{
              strings: `Welcome to you'r Dashboard ${userName}`,
              autoStart: true,
            }}
          />
        </div>
        {/* text part */}
        {/* <div className="text-left mt-10 p-5 text-lg space-y-5"> */}
        <div className="text-left mt-5 p-5 text-base space-y-5 xl:text-lg xl:mt-10">
          {user.userRole === "admin" ? (
            <h1 className="font-bold">
              Your Admin Dashboard is your central command center for overseeing
              and optimizing the platform's operations. <br /> Here's what you
              can do:
            </h1>
          ) : user.userRole === "teacher" ? (
            <h1 className="font-bold">
              As a teacher, your Learnio Dashboard is your dedicated hub for
              managing your teaching journey. <br /> Here's what you can do:
            </h1>
          ) : (
            <h1 className="font-bold">
              As a student, your Learnio Dashboard is your personal hub for
              managing your learning journey. <br /> Here's what you can do:
            </h1>
          )}

          <ul className="list-disc space-y-3">
            {user.userRole === "admin" ? (
              // Admin access list
              <>
                <li>
                  <span className="font-bold">Monitor User Activity:</span>{" "}
                  Access a comprehensive overview of all registered users,
                  including teachers, students, and other administrators.
                </li>
                <li>
                  <span className="font-bold">
                    Approve Courses for Publication:
                  </span>
                  Review and approve courses submitted by teachers to ensure
                  quality and relevance before they go live.
                </li>
                <li>
                  <span className="font-bold">
                    Track Metrics and Insights: 
                  </span>
                  View key performance metrics, such as course engagement and
                  user growth, to make informed decisions.
                </li>
              </>
            ) : user.userRole === "teacher" ? (
              // Teacher access list
              <>
                <li>
                  <span className="font-bold">Manage Your Courses:</span> Create
                  and add new courses to share your expertise. Edit and update
                  course content effortlessly to ensure it's always relevant and
                  engaging.
                </li>
                <li>
                  <span className="font-bold">Monitor Enrollments: </span>
                  Stay informed by tracking how many students have enrolled in
                  each of your courses, providing insights into their popularity
                  and impact.
                </li>
                <li>
                  <span className="font-bold">Activate Course Access: </span>
                  Manage student access by activating courses for students who
                  have successfully completed their payments, ensuring a
                  seamless learning experience for them.
                </li>
              </>
            ) : (
              // Student access list
              <>
                <li>
                  <span className="font-bold">Manage Your Profile: </span> View
                  and update your profile information to keep it accurate and
                  up-to-date.
                </li>
                <li>
                  <span className="font-bold">Access Your Courses: </span>
                  Explore all your enrolled courses on Learnio.Seamlessly enroll
                  in new courses and complete payments for enrollment directly
                  through the dashboard
                </li>
                <li>
                  <span className="font-bold">Track Your Payment History:  </span>
                  Stay informed by reviewing your payment history, ensuring
                  transparency and easy access to your financial records.
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interface;
