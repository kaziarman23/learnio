import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser, googleSignIn } from "../../../Redux/features/userSlice";
import { usePostUsersMutation } from "../../../Redux/features/api/usersApi";
import Swal from "sweetalert2";

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

  const [postUsers] = usePostUsersMutation();

  // handle form submit
  const onSubmit = (data) => {
    // updating the user information by dispatch
    dispatch(createUser(data))
      .unwrap()
      .then((result) => {
        console.log(result);

        // sending data in the server
        const userInfo = {
          ...data,
          userRole: "student",
          isTeacher: null,
          experience: null,
          category: null,
        };
        postUsers(userInfo);

        // navigating the user and clearing the inputs
        navigate("/");
        reset();

        // showing successfull alert
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Registetion Successfull",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.message || "Something went wrong. Please try again.",
          confirmButtonText: "Retry",
          background: "black",
          color: "white",
        });
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
        postUsers(userInfo);

        // navigating the user and clearing the inputs
        navigate("/");
        reset();

        // showing successfull alert
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Registetion Successfull",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message || "Please try again.",
        });

        // clearing all inputs
        reset();
      });
  };

  return (
    <div className="w-full min-h-full">
      <div className="w-2/6 min-h-screen mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 border-2 p-4 rounded-md space-y-3">
            <h1 className="text-center font-bold text-2xl">Register Now</h1>

            {/* All inputs */}
            <div className="space-y-3">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md p-2 border border-black/50"
                  {...register("userName", {
                    required: "Name is Required",
                    maxLength: {
                      value: 14,
                      message: "Name must be lower then 14 characters",
                    },
                  })}
                />
                {errors.userName && (
                  <p className="text-red-500">{errors.userName.message}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="photo">Photo URL</label>
                <input
                  id="photo"
                  type="text"
                  placeholder="Photo URL"
                  className="w-full rounded-md p-2 border border-black/50"
                  {...register("userPhoto", {
                    required: "PhotoURL is required",
                  })}
                />
                {errors.userPhoto && (
                  <p className="text-red-500">{errors.userPhoto.message}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md p-2 border border-black/50"
                  {...register("userEmail", {
                    required: "Email is required",
                  })}
                />
                {errors.userEmail && (
                  <p className="text-red-500">{errors.userEmail.message}</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="Password">Password</label>
                <input
                  id="Password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md p-2 border border-black/50"
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
                />
                {errors.userPassword && (
                  <p className="text-red-500">{errors.userPassword.message}</p>
                )}
              </div>
            </div>

            <button className="w-full btn hover:bg-black hover:text-white">
              Register
            </button>
            <p>
              Already have an Account ? Please
              <Link to="/login">
                <span className="text-blue-500 font-bold ml-2 hover:underline">
                  Login
                </span>
              </Link>
            </p>

            <button
              onClick={handleGoogleRegister}
              className="w-full btn hover:bg-black hover:text-white"
            >
              <FaGoogle /> Register with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
