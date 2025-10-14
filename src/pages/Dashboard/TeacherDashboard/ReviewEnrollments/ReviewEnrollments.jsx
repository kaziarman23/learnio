import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import {
  useGetEnrollmentsQuery,
  useUpdateActiveEnrollmentsMutation,
  useUpdateRejectEnrollmentsMutation,
} from "../../../../Redux/features/api/enrollmentsApi";
import { useMemo } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdAttachMoney, MdOutlineMoneyOff } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router";
import toast from "react-hot-toast";

const ReviewEnrollments = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // Rtk query hooks
  const { data, isLoading, isError, error } = useGetEnrollmentsQuery();
  const [updateActiveEnrollments] = useUpdateActiveEnrollmentsMutation();
  const [updateRejectEnrollments] = useUpdateRejectEnrollmentsMutation();

  // Filtering the data
  const enrollments = useMemo(
    () =>
      data?.filter(
        (enrollment) => enrollment.courseTeacherEmail === userEmail,
      ) || [],
    [data, userEmail],
  );

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching the data from getCoursesQuery",
      error.error,
    );

    // showing an alert
    toast.error(error);
    return null;
  }

  const handleActive = (id) => {
    updateActiveEnrollments(id)
      .unwrap()
      .then(() => {
        // showing an alert
        toast.success("Enrollment status change successfully");
      })
      .catch((error) => {
        console.log("Failed to change the enrollment status");

        // showing an alert
        toast.error(error);
      });
  };

  const handleReject = (id) => {
    updateRejectEnrollments(id)
      .unwrap()
      .then(() => {
        // showing an alert
        toast.success("Enrollment status change successfully");
      })
      .catch((error) => {
        console.log("Failed to change the enrollment status");

        // showing an alert
        toast.error(error);
      });
  };

  // Handle empty enrollments
  if (enrollments.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0cece]">
        <div className="flex h-40 w-4/5 flex-col items-center justify-center gap-5 rounded-2xl bg-[#c7c1c1] md:w-1/2">
          <h1 className="text-center text-base font-bold sm:text-2xl">
            {userName}, have no enrollments for review.
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
            >
              Interface
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto my-5 w-11/12 overflow-hidden rounded-lg bg-[#c7c1c1]">
        <h1 className="p-5 text-center text-2xl font-bold">
          Review Enrollments
        </h1>
        {/* form content */}
        <div className="overflow-x-auto p-5">
          <table className="table">
            <thead>
              <tr className="font-bold uppercase">
                <th>SL:</th>
                <th>Course Image</th>
                <th>Course Title</th>
                <th>Course Price</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Payment Status</th>
                <th>Enrollment Status</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="h-14 w-28">
                      <img
                        src={enrollment.courseImage}
                        alt={enrollment.courseTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td>{enrollment.courseTitle}</td>
                  <td>{enrollment.coursePrice}</td>
                  <td>{enrollment.userName}</td>
                  <td>{enrollment.userEmail}</td>
                  <th>
                    {enrollment.paymentStatus === "unpaid" ? (
                      <h1 className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 p-3 text-center text-base font-bold uppercase">
                        unpaid <MdOutlineMoneyOff />
                      </h1>
                    ) : (
                      <h1 className="flex items-center justify-center gap-3 rounded-xl bg-blue-500 p-3 text-center text-base font-bold uppercase">
                        Paid <MdAttachMoney />
                      </h1>
                    )}
                  </th>
                  <th className="flex items-center justify-center">
                    {enrollment.enrollmentStatus === "pending" ? (
                      <>
                        <button
                          onClick={() => handleActive(enrollment._id)}
                          className="h-1/2 w-1/2 p-2 hover:text-blue-500"
                        >
                          <FaRegCheckCircle className="mx-auto h-8 w-8" />
                        </button>
                        <button
                          onClick={() => handleReject(enrollment._id)}
                          className="h-1/2 w-1/2 p-2 hover:text-red-500"
                        >
                          <IoMdCloseCircle className="mx-auto h-8 w-8" />
                        </button>
                      </>
                    ) : enrollment.enrollmentStatus === "active" ? (
                      <h1 className="flex items-center justify-center gap-3 rounded-xl bg-blue-500 p-3 text-center text-base font-bold uppercase">
                        Actived
                      </h1>
                    ) : (
                      <h1 className="mt-1 flex items-center justify-center gap-3 rounded-xl bg-red-500 p-3 text-center text-base font-bold uppercase">
                        Rejected
                      </h1>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewEnrollments;
