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
    <div className="flex min-h-screen w-full items-center justify-center p-4 font-sans sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg md:grid md:grid-cols-2">
          {/* Left side: Illustration and Welcome Text */}
          <div className="hidden flex-col items-center justify-center bg-gray-50/50 p-6 text-center sm:p-8 md:flex lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-gray-800 sm:mt-8 sm:text-3xl lg:text-4xl">
              Welcome Back!
            </h2>
            <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-base lg:text-lg">
              Login to access your courses and continue your learning journey.
            </p>
          </div>

          {/* Right side: Login Form */}
          <div className="p-6 sm:p-8 lg:p-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              Login to Your Account
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
            >
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-black px-4 py-3 text-sm transition duration-300 sm:text-base"
                  {...register("userEmail", { required: "Email is required" })}
                />
                {errors.userEmail && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userEmail.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="Password"
                  className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
                >
                  Password
                </label>
                <input
                  id="Password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-black px-4 py-3 text-sm transition duration-300 sm:text-base"
                  {...register("userPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Password must be at least 7 characters",
                    },
                  })}
                />
                {errors.userPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userPassword.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full transform rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 sm:px-8 sm:text-base"
              >
                Login
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative bg-white px-2 text-xs text-gray-500 sm:px-4 sm:text-sm">
                  Or continue with
                </div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleRegister}
                type="button"
                className="flex w-full transform items-center justify-center gap-2 rounded-lg border border-gray-300 bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-orange-600 sm:px-8 sm:text-base"
              >
                <FaGoogle className="text-lg sm:text-xl" />
                Login with Google
              </button>

              {/* Link to Register */}
              <p className="text-center text-xs text-gray-600 sm:text-sm">
                Don&#39;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-orange-600 hover:text-orange-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
