import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../../../Redux/features/userSlice";

const Register = () => {
  // states
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();

  // handle form submit
  const onSubmit = (data) => {
    // const userInfo = {
    //   ...data,
    //   userRole: "student",
    //   isTeacher: "",
    //   experience: "",
    //   category: "",
    // };

    // updating the user information by dispatch
    dispatch(createUser(data));

    // clearing inputs
    reset();
  };

  return (
    <div className="w-full h-full">
      <div className="w-2/6 h-screen mx-auto">
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
                  {...register("userName")}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="photo">Photo URL</label>
                <input
                  id="photo"
                  type="text"
                  placeholder="Photo URL"
                  className="w-full rounded-md p-2 border border-black/50"
                  {...register("userPhoto")}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md p-2 border border-black/50"
                  {...register("userEmail")}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="Password">Password</label>
                <input
                  id="Password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md p-2 border border-black/50"
                  {...register("userPassword")}
                />
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

            <button className="w-full btn hover:bg-black hover:text-white">
              <FaGoogle /> Register with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
