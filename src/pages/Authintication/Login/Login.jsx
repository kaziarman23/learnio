import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { googleSignIn, loginUser } from "../../../Redux/features/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  // states
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // handle form submit
  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        // clearing the form
        reset();

        // navigating the user
        navigate(location?.state?.from || "/");

        // showing an alert
        toast.success("login Successfull");
      })
      .catch((error) => {
        console.log("Error :", error);

        // showing an alert
        toast.error(error);
      });
  };

  const handleGoogleRegister = () => {
    dispatch(googleSignIn())
      .unwrap()
      .then(() => {
        // clearing the form
        reset();

        // navigating the user
        navigate(location?.state?.from || "/");

        // showing an alert
        toast.success("Login Successfull");
      })
      .catch((error) => {
        console.log("Error :", error);

        // showing an alert
        toast.error(error);

        // clearing all inputs
        reset();
      });
  };
  return (
    <div className="h-full w-full">
      <div className="mx-auto min-h-screen w-2/6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 space-y-3 rounded-md border-2 p-4">
            <h1 className="text-center text-2xl font-bold">Please Login</h1>

            {/* All inputs */}
            <div className="space-y-3">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-black/50 p-2"
                  {...register("userEmail", {
                    required: "Email is required",
                  })}
                />
                {errors.userEmail && (
                  <p className="text-red-500">{errors.userEmail.message}</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="Password">Password</label>
                <input
                  id="Password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-black/50 p-2"
                  {...register("userPassword", {
                    required: "Password is required",
                    maxLength: {
                      value: 30,
                      message: "Password must be lower then 30 characters",
                    },
                    minLength: {
                      value: 7,
                      message: "Password must be grater then 7 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                  })}
                />{" "}
                {errors.userPassword && (
                  <p className="text-red-500">{errors.userPassword.message}</p>
                )}
              </div>
            </div>

            <button className="btn w-full hover:bg-black hover:text-white">
              Login
            </button>
            <p>
              Did&#39;t have an Account ? Please
              <Link to="/register">
                <span className="ml-2 font-bold text-blue-500 hover:underline">
                  Register
                </span>
              </Link>
            </p>

            <button
              onClick={handleGoogleRegister}
              className="btn w-full hover:bg-black hover:text-white"
            >
              <FaGoogle /> Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
