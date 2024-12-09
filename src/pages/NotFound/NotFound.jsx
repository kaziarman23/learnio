const NotFound = () => {
  return (
    <div className="w-full h-screen bg-[#e0cece] flex justify-center items-center flex-col gap-5">
      <h1 className="text-6xl font-bold text-center">Not Found</h1>
      <Link to="/">
        <button
          type="button"
          className="btn hover:bg-blue-500 hover:text-white hover:border-none"
        >
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
