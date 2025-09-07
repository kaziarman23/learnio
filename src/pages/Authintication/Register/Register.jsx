import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser, googleSignIn } from "../../../Redux/features/userSlice";
import { useAddUserMutation } from "../../../Redux/features/api/usersApi";
import toast from "react-hot-toast";

const Register = () => {
  // states
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  // handle form submit
  const onSubmit = (data) => {
    // updating the user information by dispatch
    dispatch(createUser(data))
      .unwrap()
      .then((result) => {
        console.log(result);

        // sending data in the server
        const userInfo = {
          userName: data.userName,
          userPhoto: data.userPhoto,
          userEmail: data.userEmail,
          userRole: "student",
          isTeacher: null,
          experience: null,
          category: null,
        };
        addUser(userInfo);

        // clearing the form
        reset();

        // navigating the user
        navigate("/");

        // showing an alert
        toast.success("Registetion Successfull");
      })
      .catch((error) => {
        console.log("Error :", error);

        // showing an alert
        toast.error(error);
      });
  };

  const handleGoogleRegister = async () => {
    dispatch(googleSignIn())
      .unwrap()
      .then((data) => {
        // sending data in the server
        const userInfo = {
          userName: data.userName,
          userPhoto: data.userPhoto,
          userEmail: data.userEmail,
          userRole: "student",
          isTeacher: null,
          experience: null,
          category: null,
        };
        addUser(userInfo);

        // clearing the form
        reset();

        // navigating the user
        navigate("/");

        // showing an alert
        toast.success("Registetion Successfull");
      })
      .catch((error) => {
        // clearing the form
        reset();
        console.log("Error :", error);

        // showing an alert
        toast.error(error);
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 font-sans sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg md:grid md:grid-cols-2">
          {/* Left side: Welcome Text */}
          <div className="hidden flex-col items-center justify-center bg-gray-50/50 p-6 text-center sm:p-8 md:flex md:p-12">
            <h2 className="mt-6 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              Join Learnio Today!
            </h2>
            <p className="mt-4 max-w-sm text-sm text-gray-600 sm:text-base">
              Create your account to explore courses, track progress, and start
              learning with us.
            </p>
          </div>

          {/* Right side: Register Form */}
          <div className="p-6 sm:p-8 md:p-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
              Create Your Account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
            >
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg border border-black px-3 py-2 text-sm transition duration-300 sm:px-4 sm:py-3 sm:text-base"
                  {...register("userName", {
                    required: "Name is required",
                    maxLength: {
                      value: 14,
                      message: "Name must be less than 14 characters",
                    },
                  })}
                />
                {errors.userName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              {/* Photo URL Input */}
              <div>
                <label
                  htmlFor="photo"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Photo URL
                </label>
                <input
                  id="photo"
                  type="text"
                  placeholder="Photo URL"
                  className="w-full rounded-lg border border-black px-3 py-2 text-sm transition duration-300 sm:px-4 sm:py-3 sm:text-base"
                  {...register("userPhoto", {
                    required: "Photo URL is required",
                  })}
                />
                {errors.userPhoto && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userPhoto.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-black px-3 py-2 text-sm transition duration-300 sm:px-4 sm:py-3 sm:text-base"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="Password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-black px-3 py-2 text-sm transition duration-300 sm:px-4 sm:py-3 sm:text-base"
                  {...register("userPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Password must be at least 7 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password must be less than 30 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Must contain uppercase, lowercase, number, and special character",
                    },
                  })}
                />
                {errors.userPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.userPassword.message}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full transform rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:px-8 sm:text-base"
              >
                Register
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative bg-white px-2 text-xs text-gray-500 sm:text-sm">
                  Or continue with
                </div>
              </div>

              {/* Google Register Button */}
              <button
                onClick={handleGoogleRegister}
                type="button"
                className="flex w-full transform items-center justify-center gap-2 rounded-lg border border-gray-300 bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 sm:px-8 sm:text-base"
              >
                <FaGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
                Register with Google
              </button>

              {/* Link to Login */}
              <p className="text-center text-xs text-gray-600 sm:text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-orange-600 hover:text-orange-500 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
