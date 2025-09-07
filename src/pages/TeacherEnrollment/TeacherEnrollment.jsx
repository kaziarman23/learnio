import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { usePostTeachersMutation } from "../../Redux/features/api/teachersApi";
import Loading from "../../components/Loading/Loading";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import { useMemo } from "react";
import toast from "react-hot-toast";

const TeacherEnrollment = () => {
  // States
  const navigate = useNavigate();

  // Form hook
  const { handleSubmit, register } = useForm();

  // Redux state
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice,
  );

  // Rtk query hooks
  const { data, refetch } = useGetUsersQuery();
  const [postTeachers, { isLoading, isError, error }] =
    usePostTeachersMutation();

  // Fetching the user data
  const user = useMemo(
    () => data?.find((user) => user.userEmail === userEmail),
    [data, userEmail],
  );
  const isTeacher = user?.isTeacher;
  const userRole = user?.userRole;

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle Error
  if (isError) {
    console.log("Error: ", error.error);
    console.log("Error in teacher enrollment component");

    // showing an alert
    toast.error(error);
  }

  // Handle teacher state
  if (isTeacher === "pandding") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex h-60 w-4/5 flex-col items-center justify-center gap-5 rounded-xl bg-[#c7c1c1] lg:w-1/2">
          <h1 className="text-center text-sm font-bold sm:text-base lg:text-lg">
            Please wait Admin is reviewing you&#39;r information.
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
            >
              Interface
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (isTeacher === true) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex h-60 w-4/5 flex-col items-center justify-center gap-5 rounded-xl bg-[#c7c1c1] lg:w-1/2">
          <h1 className="text-center text-sm font-bold sm:text-base lg:text-lg">
            Congratulation. You are Now a Teacher in Learnio !
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
            >
              Interface
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (isTeacher === false) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex h-60 w-4/5 flex-col items-center justify-center gap-5 rounded-xl bg-[#c7c1c1] lg:w-1/2">
          <h1 className="text-center text-xs font-bold sm:text-base lg:text-lg">
            You are Rejected as a Teacher. <br /> Plase Try again with more
            strong skills.
          </h1>
          <Link to="/dashboard/interface">
            <button
              type="button"
              className="btn hover:border-none hover:bg-blue-500 hover:text-white"
            >
              Interface
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle form submit
  const onSubmit = (data) => {
    // checking for the admin
    if (userRole === "admin" || userRole === "teacher") {
      // showing an alert
      toast.error("You are not a student");
      return;
    }

    // saving the teacherInfo
    const teacherInfo = {
      ...data,
      userPhoto: userPhoto,
      isTeacher: "pandding",
    };
    postTeachers(teacherInfo)
      .unwrap()
      .then(() => {
        // refetching the user data
        refetch();

        // navigating the user
        navigate(-1);

        // showing an alert
        toast.success("Requiest send successfully");
      })
      .catch((error) => {
        console.log(
          "Error while sending teacher data in the database: ",
          error,
        );

        // showing an alert
        toast.error(error);
      });
  };

  return (
    <div className="h-full w-full">
      <div className="mx-auto h-full w-11/12 xl:h-screen xl:w-1/2">
        <h1 className="p-5 text-center text-2xl font-bold">Became A Teacher</h1>
        {/* form card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 space-y-5 rounded-xl bg-white p-4 shadow-lg xl:mb-0">
            {/* image input */}
            <div className="flex h-1/2 w-full items-center justify-center">
              <img
                src={userPhoto}
                alt="user profile picture"
                className="h-40 w-40 rounded-full"
              />
            </div>

            {/* name & email input */}
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
              <div className="flex w-full flex-col items-start justify-center gap-2 md:w-1/2">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  readOnly
                  className="w-full rounded-md border-2 border-black p-2"
                  defaultValue={userName}
                  {...register("userName")}
                />
              </div>

              <div className="flex w-full flex-col items-start justify-center gap-2 md:w-1/2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  className="w-full rounded-md border-2 border-black p-2"
                  defaultValue={userEmail}
                  {...register("userEmail")}
                />
              </div>
            </div>

            {/* experience & category input */}
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
              <div className="flex w-full flex-col items-start justify-center gap-2 md:w-1/2">
                <label htmlFor="experience" className="font-bold">
                  Experience
                </label>
                <select
                  name="experience"
                  id="experience"
                  className="w-full border-2 border-black p-2"
                  {...register("experience")}
                >
                  <option value="beginner">Beginner</option>
                  <option value="midLevel">Mid-Level</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>

              <div className="flex w-full flex-col items-start justify-center gap-2 md:w-1/2">
                <label htmlFor="category" className="font-bold">
                  category
                </label>
                <select
                  name="category"
                  id="category"
                  className="w-full border-2 border-black p-2"
                  {...register("category")}
                >
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="game-development">Game Development</option>
                  <option value="uiux-designer">Ui-Ux Designer</option>
                  <option value="mechine-learning">Mechine Learning</option>
                </select>
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn w-full border-2 hover:bg-orange-500 hover:text-white"
              >
                Submit For Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEnrollment;
