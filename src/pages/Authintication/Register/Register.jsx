import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser, googleSignIn } from "../../../Redux/features/userSlice";
import { useAddUserMutation } from "../../../Redux/features/Api/usersApi";
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
    <div className="min-h-full w-full">
      <div className="mx-auto min-h-screen w-2/6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 space-y-3 rounded-md border-2 p-4">
            <h1 className="text-center text-2xl font-bold">Register Now</h1>

            {/* All inputs */}
            <div className="space-y-3">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md border border-black/50 p-2"
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
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="photo">Photo URL</label>
                <input
                  id="photo"
                  type="text"
                  placeholder="Photo URL"
                  className="w-full rounded-md border border-black/50 p-2"
                  {...register("userPhoto", {
                    required: "PhotoURL is required",
                  })}
                />
                {errors.userPhoto && (
                  <p className="text-red-500">{errors.userPhoto.message}</p>
                )}
              </div>
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
                />
                {errors.userPassword && (
                  <p className="text-red-500">{errors.userPassword.message}</p>
                )}
              </div>
            </div>

            <button className="btn w-full hover:bg-black hover:text-white">
              Register
            </button>
            <p>
              Already have an Account ? Please
              <Link to="/login">
                <span className="ml-2 font-bold text-blue-500 hover:underline">
                  Login
                </span>
              </Link>
            </p>

            <button
              onClick={handleGoogleRegister}
              className="btn w-full hover:bg-black hover:text-white"
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
