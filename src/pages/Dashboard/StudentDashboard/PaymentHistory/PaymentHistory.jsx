import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  useDeletePaymentsMutation,
  useGetPaymentsQuery,
} from "../../../../Redux/features/Api/paymentApi";
import Loading from "../../../../components/Loading/Loading";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const PaymentHistory = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query hooks
  const { data, isLoading, isError, error } = useGetPaymentsQuery();
  const [deletePayments] = useDeletePaymentsMutation();

  // Filter enrollments only for the current user
  const payments = useMemo(
    () =>
      data?.filter(
        (paymentHistory) => paymentHistory.userEmail === userEmail
      ) || [],
    [data, userEmail]
  );

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error in fetching data from getPaymentquery: ", error.error);
    console.log(error.message);
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text:
        error?.data?.message || error?.error || "Error when fetching payments",
      icon: "error",
      confirmButtonText: "OK",
    });
    return null;
  }

  // Handle empty enrollments
  if (payments.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-100 flex justify-center items-center flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">
          {userName}, you have no payment history.
        </h1>
        <Link to="/courses">
          <button
            type="button"
            className="btn hover:bg-blue-500 hover:text-white hover:border-none"
          >
            Browse Courses
          </button>
        </Link>
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
        deletePayments(id)
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Payment history deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message || "Failed to delete payment history",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
      <div className="w-11/12 h-4/5 bg-[#c7c1c1] rounded-xl overflow-y-scroll">
        <h1 className="text-3xl font-bold text-center p-2">Payment Historys</h1>
        <div className="p-5 overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="uppercase border-y-2 border-black text-base">
                <th>SL</th>
                <th>Course Name</th>
                <th>Teacher Name</th>
                <th>Price</th>
                <th>Transection Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{payment.courseTitle}</td>
                  <td>{payment.courseTeacherName}</td>
                  <td>{payment.coursePrice}$</td>
                  <td>{payment.transectionId}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(payment._id)}
                      type="button"
                      className="btn bg-red-500 text-white border-black hover:bg-red-600"
                    >
                      <FaRegTrashAlt />
                    </button>
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

export default PaymentHistory;
