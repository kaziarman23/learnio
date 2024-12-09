import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { useGetUsersQuery } from "../../Redux/features/Api/usersApi";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useMemo } from "react";

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
          {user.userRole === "admin" ? (
            <h1></h1>
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
              <></>
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
                  <span className="font-bold">Manage Your Profile:</span> View
                  and update your profile information to keep it accurate and
                  up-to-date.
                </li>
                <li>
                  <span className="font-bold">Access Your Courses:</span>
                  Explore all your enrolled courses on Learnio.Seamlessly enroll
                  in new courses and complete payments for enrollment directly
                  through the dashboard
                </li>
                <li>
                  <span className="font-bold">Track Your Payment History:</span>
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
