import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useGetEnrollmentsQuery } from "../../../../Redux/features/Api/enrollmentsApi";
import {
  usePostPaymentIntentMutation,
  usePostPaymentsMutation,
} from "../../../../Redux/features/Api/paymentApi";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ id }) => {
  // States
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Stripe states
  const stripe = useStripe();
  const elements = useElements();

  // Rtk query states
  const [postPaymentIntent] = usePostPaymentIntentMutation();
  const [postPayments] = usePostPaymentsMutation();
  const { data, isLoading, isError, error } = useGetEnrollmentsQuery();

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

  // finding the course data
  const enrollmentDetails = data.find((enrollment) => enrollment._id === id);

  // collecting the course price and sending it to the server
  useEffect(() => {
    if (!enrollmentDetails) return;

    const fetchClientSecret = async () => {
      try {
        const result = await postPaymentIntent({
          price: enrollmentDetails.coursePrice,
        }).unwrap();
        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error("Error in fetching clientSecret:", error);
        setClientSecret("");
        Swal.fire({
          title: "Error!",
          text: error.message || "useEffect error",
          icon: "error",
          confirmButtonText: "Okey",
        });
      }
    };

    fetchClientSecret();
  }, [enrollmentDetails, postPaymentIntent]);

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Start processing state
    setIsProcessing(true);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setPaymentError(error.message);
      setIsProcessing(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentError("");
    }

    // confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: enrollmentDetails.userName,
            email: enrollmentDetails.userEmail,
          },
        },
      });

    if (confirmError) {
      console.log("Error when confirming payment: ", confirmError);
      setIsProcessing(false);
    } else {
      console.log("payment Intent: ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // seving data in the payment server
        const paymentInfo = {
          enrollmentId: enrollmentDetails._id,
          courseId: enrollmentDetails.courseId,
          courseTitle: enrollmentDetails.courseTitle,
          courseTeacherName: enrollmentDetails.courseTeacherName,
          coursePrice: enrollmentDetails.coursePrice,
          userEmail: enrollmentDetails.userEmail,
          transectionId: paymentIntent.id,
        };
        postPayments(paymentInfo)
          .unwrap()
          .then(() => {
            // navigating the user and showing a success alret
            navigate("/dashboard/studentEnrollments");
            // success alert
            Swal.fire({
              title: "Success",
              text: "Payment Successfull",
              icon: "success",
              confirmButtonText: "Okey",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Success",
              text: error.message || "Error when saving the payment data",
              icon: "success",
              confirmButtonText: "Okey",
            });
          })
          .finally(() => {
            setIsProcessing(false);
          });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "26px",
              color: "black",
              "::placeholder": {
                color: "gray",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
        className="my-5 btn bg-indigo-500 hover:bg-indigo-600"
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {paymentError && (
        <p className="text-xl font-bold text-red-500">{paymentError}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
