import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/features/userSlice";

const Login = () => {
  // states
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();

  // handle form submit
  const onSubmit = (data) => {
    dispatch(loginUser(data));
    reset();
  };
  return (
    <div className="w-full h-full">
      <div className="w-2/6 h-screen mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 border-2 p-4 rounded-md space-y-3">
            <h1 className="text-center font-bold text-2xl">Please Login</h1>

            {/* All inputs */}
            <div className="space-y-3">
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
              Login
            </button>
            <p>
              Did&#39;t have an Account ? Please
              <Link to="/register">
                <span className="text-blue-500 font-bold ml-2 hover:underline">
                  Register
                </span>
              </Link>
            </p>

            <button className="w-full btn hover:bg-black hover:text-white">
              <FaGoogle /> Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
