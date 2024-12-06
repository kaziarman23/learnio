import { useSelector } from "react-redux";
import {
  useDeleteEnrollmentsMutation,
  useGetEnrollmentsQuery,
} from "../../../../Redux/features/Api/enrollmentsApi";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaMoneyCheck, FaRegTrashAlt } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

const StudentEnrollments = () => {
  // states
  const { userName, userEmail } = useSelector((state) => state.userSlice);
  const { data, isLoading, isError, error } = useGetEnrollmentsQuery();
  const [deleteEnrollments] = useDeleteEnrollmentsMutation();

  // handle loading
  if (isLoading) {
    return <Loading />;
  }

  // handle error
  if (isError) {
    Swal.fire({
      title: "Error!",
      text:
        error?.data?.message ||
        error?.error ||
        "Error when updating the user profile",
      icon: "error",
      confirmButtonText: "Okey",
    });
  }

  // filtering data from the database
  const allEnrollments = data.filter((data) => data.userEmail === userEmail);

  // handle empty enrollments
  if (!allEnrollments || allEnrollments.length === 0) {
    return (
      <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">
          {userName} have {allEnrollments.length} Enrollments.
        </h1>
        <div>
          <Link to="/courses">
            <button
              type="button"
              className="btn hover:bg-blue-500 hover:text-white hover:border-none"
            >
              All Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // handle delete
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
        // deleting a data from enrollments database
        deleteEnrollments(id)
          .unwrap()
          .then(() => {
            // success alert
            Swal.fire({
              title: "Success",
              text: "Enrollment Deleted Successfully",
              icon: "success",
              confirmButtonText: "Okey",
            });
          })
          .catch((error) => {
            // error alert
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonText: "Okey",
            });
          });
      }
    });
  };

  return (
    <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
      <div className="w-11/12 h-4/5 bg-[#c7c1c1] rounded-xl overflow-y-scroll">
        <h1 className="text-3xl font-bold text-center p-2">My Enrollments</h1>
        {/* table content */}
        <div className="p-5 overflow-x-auto ">
          <table className="table table-zebra">
            {/* head */}
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
              {data.map((enrollment, index) => (
                <tr key={enrollment._id}>
                  <th>{index + 1}</th>
                  <td>{enrollment.courseTitle}</td>
                  <td>{enrollment.courseTeacherName}</td>
                  <td>{enrollment.coursePrice}$</td>
                  <td className="flex justify-center">
                    {enrollment.paymentStatus === "unpaid" ? (
                      <button
                        type="button"
                        className="btn font-bold px-8 bg-indigo-500 hover:bg-indigo-700"
                      >
                        Pay <FaMoneyCheck />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn disabled cursor-not-allowed font-bold px-8 bg-blue-500 hover:bg-blue-500"
                      >
                        Paid <RiMoneyDollarBoxFill className="w-6 h-6" />
                      </button>
                    )}
                  </td>
                  <td>
                    {enrollment.enrollmentStatus === "pandding" ? (
                      <h1 className="font-bold text-2xl uppercase border-black border text-center bg-yellow-500 rounded-sm">
                        Pandding
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
                        className="btn bg-gray-500 text-black disabled cursor-not-allowed border-black hover:bg-gray-500"
                      >
                        <FaRegTrashAlt />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(enrollment._id)}
                        type="button"
                        className="btn bg-red-500 text-white border-black hover:bg-red-600 hover:text-black"
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
