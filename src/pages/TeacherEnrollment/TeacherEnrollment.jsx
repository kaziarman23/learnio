import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { usePostTeachersMutation } from "../../Redux/features/Api/teachersApi";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const TeacherEnrollment = () => {
  // states
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const [postTeachers, { isLoading, isError }] = usePostTeachersMutation();
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice
  );

  // handle Loading
  if (isLoading) {
    return <Loading />;
  }
  // handle Error
  if (isError) {
    Swal.fire({
      title: "Error!",
      text: isError.message || "Error in teacher enrollment component",
      icon: "error",
      confirmButtonText: "Okey",
    });
  }

  // handle form submit
  const onSubmit = (data) => {
    postTeachers(data)
      .unwrap()
      .then(() => {
        // navigating the user and showing a success alert
        navigate(-1);
        Swal.fire({
          title: "Success",
          text: `${userName} is now a Teacher`,
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
                  {...register("name")}
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
                  {...register("email")}
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
