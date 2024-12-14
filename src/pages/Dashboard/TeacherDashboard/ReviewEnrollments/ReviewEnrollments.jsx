import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import {
  useGetEnrollmentsQuery,
  useUpdateActiveEnrollmentsMutation,
  useUpdateRejectEnrollmentsMutation,
} from "../../../../Redux/features/Api/enrollmentsApi";
import { useMemo } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdAttachMoney, MdOutlineMoneyOff } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router";

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
        (enrollment) => enrollment.courseTeacherEmail === userEmail
      ) || [],
    [data]
  );

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching the data from getCoursesQuery",
      error.error
    );
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error when fetching getCoursesQuery data",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  const handleActive = (id) => {
    updateActiveEnrollments(id)
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Enrollment status change successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to change the enrollment status",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleReject = (id) => {
    updateRejectEnrollments(id)
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Enrollment status change successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  // Handle empty enrollments
  if (enrollments.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
        <div className="w-4/5 h-40 rounded-2xl bg-[#c7c1c1] flex justify-center items-center flex-col gap-5 md:w-1/2">
          <h1 className="text-base font-bold text-center sm:text-2xl">
            {userName}, have no enrollments for review.
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:bg-blue-500 hover:text-white hover:border-none"
            >
              Interface
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12 overflow-hidden mx-auto my-5 bg-[#c7c1c1] rounded-lg">
        <h1 className="text-center text-2xl font-bold p-5">
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
                    <div className="w-28 h-14">
                      <img
                        src={enrollment.courseImage}
                        alt={enrollment.courseTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td>{enrollment.courseTitle}</td>
                  <td>{enrollment.coursePrice}</td>
                  <td>{enrollment.userName}</td>
                  <td>{enrollment.userEmail}</td>
                  <th>
                    {enrollment.paymentStatus === "unpaid" ? (
                      <h1 className="flex justify-center items-center gap-2 font-bold text-center text-base bg-orange-500 p-3 uppercase rounded-xl">
                        unpaid <MdOutlineMoneyOff />
                      </h1>
                    ) : (
                      <h1 className="flex justify-center items-center gap-3 font-bold text-center text-base bg-blue-500 p-3 uppercase rounded-xl">
                        Paid <MdAttachMoney />
                      </h1>
                    )}
                  </th>
                  <th className="flex justify-center items-center">
                    {enrollment.enrollmentStatus === "pandding" ? (
                      <>
                        <button
                          onClick={() => handleActive(enrollment._id)}
                          className="w-1/2 h-1/2 p-2 hover:text-blue-500"
                        >
                          <FaRegCheckCircle className="w-8 h-8 mx-auto" />
                        </button>
                        <button
                          onClick={() => handleReject(enrollment._id)}
                          className="w-1/2 h-1/2 p-2 hover:text-red-500"
                        >
                          <IoMdCloseCircle className="w-8 h-8 mx-auto" />
                        </button>
                      </>
                    ) : enrollment.enrollmentStatus === "active" ? (
                      <h1 className="flex justify-center items-center gap-3 font-bold text-center text-base bg-blue-500 p-3 uppercase rounded-xl">
                        Actived
                      </h1>
                    ) : (
                      <h1 className="flex justify-center items-center gap-3 font-bold text-center text-base bg-red-500 p-3 mt-1 uppercase rounded-xl">
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
