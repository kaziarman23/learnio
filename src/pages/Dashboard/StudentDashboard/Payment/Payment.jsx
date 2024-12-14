import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";

const Payment = () => {
  // states
  const { id } = useParams();
  const stripePromise = loadStripe(import.meta.env.VITE_GETWAY_PK);


  return (
    <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center">
      <div className="w-4/5 h-1/2 bg-[#c7c1c1] space-y-5 rounded-xl">
        <h1 className="text-base font-bold text-center p-2 md:text-2xl">Make Payment</h1>
        <div className="p-5">
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
