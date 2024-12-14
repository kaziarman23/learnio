import { useSelector } from "react-redux";
import {
  useDeleteEnrollmentsMutation,
  useGetEnrollmentsQuery,
} from "../../../../Redux/features/Api/enrollmentsApi";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaMoneyCheck, FaRegTrashAlt } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { useEffect, useMemo } from "react";

const StudentEnrollments = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetEnrollmentsQuery();
  const [deleteEnrollments] = useDeleteEnrollmentsMutation();

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  // Filter enrollments only for the current user
  const allEnrollments = useMemo(
    () =>
      data?.filter((enrollment) => enrollment.userEmail === userEmail) || [],
    [data, userEmail]
  );

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching data from getEnrollmentsQuery because/ ",
      error.error
    );

    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error when fetching payments data",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  // Handle empty enrollments
  if (allEnrollments.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
        <div className="w-4/5 h-40 rounded-2xl bg-[#c7c1c1] flex justify-center items-center flex-col gap-5 md:w-1/2">
          <h1 className="text-xl font-bold text-center sm:text-2xl">
            {userName}, you have no enrollments.
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

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEnrollments(id)
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Enrollment Deleted Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message || "Failed to delete enrollment",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#e0cece] flex justify-center items-center">
      <div className="w-11/12 bg-[#c7c1c1] rounded-xl overflow-hidden">
        <h1 className="text-xl font-bold text-center p-2 lg:text-3xl">My Enrollments</h1>
        <div className="p-5 overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="uppercase border-y-2 border-black text-base">
                <th>SL</th>
                <th>Course Name</th>
                <th>Teacher Name</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Enrollment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allEnrollments.map((enrollment, index) => (
                <tr key={enrollment._id}>
                  <th>{index + 1}</th>
                  <td>{enrollment.courseTitle}</td>
                  <td>{enrollment.courseTeacherName}</td>
                  <td>{enrollment.coursePrice}$</td>
                  <td className="flex justify-center">
                    {enrollment.paymentStatus === "unpaid" ? (
                      <Link to={`/dashboard/payment/${enrollment._id}`}>
                        <button
                          type="button"
                          className="btn font-bold px-8 bg-indigo-500 hover:bg-indigo-700"
                        >
                          Pay <FaMoneyCheck />
                        </button>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="btn disabled cursor-not-allowed font-bold px-8 bg-blue-500"
                      >
                        Paid <RiMoneyDollarBoxFill className="w-6 h-6" />
                      </button>
                    )}
                  </td>
                  <td>
                    {enrollment.enrollmentStatus === "pandding" ? (
                      <h1 className="font-bold text-2xl uppercase border-black border text-center bg-yellow-500 rounded-sm">
                        Pendding
                      </h1>
                    ) : (
                      <h1 className="font-bold text-2xl uppercase rounded-sm border-black border text-center bg-green-500">
                        Active
                      </h1>
                    )}
                  </td>
                  <td>
                    {enrollment.paymentStatus === "paid" ? (
                      <button
                        type="button"
                        className="btn bg-gray-500 text-black disabled cursor-not-allowed border-black"
                      >
                        <FaRegTrashAlt />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(enrollment._id)}
                        type="button"
                        className="btn bg-red-500 text-black border-black hover:bg-red-600 hover:text-white"
                      >
                        <FaRegTrashAlt />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollments;
