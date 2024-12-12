import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { usePostTeachersMutation } from "../../Redux/features/Api/teachersApi";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import { useMemo } from "react";

const TeacherEnrollment = () => {
  // states
  const navigate = useNavigate();

  // Form hook
  const { handleSubmit, register } = useForm();

  // Redux state
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice
  );

  // Rtk query hooks
  const [postTeachers, { isLoading, isError, error }] =
    usePostTeachersMutation();
  const { data, refetch } = useGetUsersQuery();

  // fetching the user data
  const user = useMemo(
    () => data?.find((user) => user.userEmail === userEmail),
    [data, userEmail]
  );
  const isTeacher = user?.isTeacher;
  const userRole = user?.userRole;

  // handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // handle Error
  if (isError) {
    console.log("Error: ", error.error);
    Swal.fire({
      title: "Error!",
      text: "Error in teacher enrollment component",
      icon: "error",
      confirmButtonText: "Okey",
    });
  }

  if (isTeacher === "pandding") {
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">
          Please wait Admin is reviewing you'r information.
        </h1>
        <Link to="/dashboard/interface">
          <button
            type="button"
            className="btn hover:bg-blue-500 hover:text-white hover:border-none"
          >
            Interface
          </button>
        </Link>
      </div>
    );
  } else if (isTeacher === true) {
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">
          Congratulation. You are Now a Teacher in Learnio !
        </h1>
        <Link to="/dashboard/interface">
          <button
            type="button"
            className="btn hover:bg-blue-500 hover:text-white hover:border-none"
          >
            Interface
          </button>
        </Link>
      </div>
    );
  } else if (isTeacher === false) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">
          You are Rejected as a Teacher. Plase Try again with more strong skills
          !
        </h1>
        <Link to="/dashboard/interface">
          <button
            type="button"
            className="btn hover:bg-blue-500 hover:text-white hover:border-none"
          >
            Interface
          </button>
        </Link>
      </div>
    );
  }

  // handle form submit
  const onSubmit = (data) => {
    // checking for the admin
    if (userRole === "admin" || userRole === "teacher") {
      Swal.fire({
        title: "Error!",
        text: "You are not a student",
        icon: "error",
        confirmButtonText: "Okey",
      });
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

        // showing a success alert
        Swal.fire({
          title: "Success",
          text: "Requiest send successfully",
          icon: "success",
          confirmButtonText: "Okey",
        });
      })
      .catch((error) => {
        // showing an error alert
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Error while sending teacher data in the database",
          icon: "error",
          confirmButtonText: "Okey",
        });
      });
  };

  return (
    <div className="w-full h-full">
      <div className="w-1/2 h-screen mx-auto">
        <h1 className="text-center text-2xl font-bold p-5">Became A Teacher</h1>
        {/* form card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 border border-black rounded-lg space-y-5">
            {/* image input */}
            <div className="w-full h-1/2 flex justify-center items-center">
              <img
                src={userPhoto}
                alt="user profile picture"
                className="w-40 h-40 rounded-full"
              />
            </div>

            {/* name & email input */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  readOnly
                  className="w-full rounded-md border-2 p-2 border-black"
                  defaultValue={userName}
                  {...register("userName")}
                />
              </div>

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  className="w-full rounded-md border-2 p-2 border-black"
                  defaultValue={userEmail}
                  {...register("userEmail")}
                />
              </div>
            </div>

            {/* experience & category input */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
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

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
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
                className="w-full btn border-2 hover:bg-blue-500 hover:text-white"
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
