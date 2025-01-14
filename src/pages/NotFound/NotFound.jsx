import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center flex-col gap-5">
      <h1 className="text-6xl font-bold text-center">Page Not Found</h1>
      <Link to="/">
        <button
          type="button"
          className="btn hover:bg-blue-500 hover:text-white hover:border-none"
        >
          Please Go Back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
