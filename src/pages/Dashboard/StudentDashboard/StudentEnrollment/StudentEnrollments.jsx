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
import toast from "react-hot-toast";

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
    [data, userEmail],
  );

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching data from getEnrollmentsQuery because: ",
      error.error,
    );

    // showing an alert
    toast.error(error);
    return null;
  }

  // Handle empty enrollments
  if (allEnrollments.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0cece]">
        <div className="flex h-40 w-4/5 flex-col items-center justify-center gap-5 rounded-2xl bg-[#c7c1c1] md:w-1/2">
          <h1 className="text-center text-xl font-bold sm:text-2xl">
            {userName}, you have no enrollments.
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
            // showing an alert
            toast.success("Enrollment Deleted Successfully");
          })
          .catch((err) => {
            console.log("Failed to delete enrollment", err);

            // showing an alert
            toast.error(err);
          });
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="w-11/12 overflow-hidden rounded-xl bg-[#c7c1c1]">
        <h1 className="p-2 text-center text-xl font-bold lg:text-3xl">
          My Enrollments
        </h1>
        <div className="overflow-x-auto p-5">
          <table className="table table-zebra">
            <thead>
              <tr className="border-y-2 border-black text-base uppercase">
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
                          className="btn bg-indigo-500 px-8 font-bold hover:bg-indigo-700"
                        >
                          Pay <FaMoneyCheck />
                        </button>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="btn disabled cursor-not-allowed bg-blue-500 px-8 font-bold"
                      >
                        Paid <RiMoneyDollarBoxFill className="h-6 w-6" />
                      </button>
                    )}
                  </td>
                  <td>
                    {enrollment.enrollmentStatus === "pandding" ? (
                      <h1 className="rounded-sm border border-black bg-yellow-500 text-center text-2xl font-bold uppercase">
                        Pendding
                      </h1>
                    ) : (
                      <h1 className="rounded-sm border border-black bg-green-500 text-center text-2xl font-bold uppercase">
                        Active
                      </h1>
                    )}
                  </td>
                  <td>
                    {enrollment.paymentStatus === "paid" ? (
                      <button
                        type="button"
                        className="btn disabled cursor-not-allowed border-black bg-gray-500 text-black"
                      >
                        <FaRegTrashAlt />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(enrollment._id)}
                        type="button"
                        className="btn border-black bg-red-500 text-black hover:bg-red-600 hover:text-white"
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
