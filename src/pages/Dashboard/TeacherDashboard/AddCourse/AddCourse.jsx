import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { usePostCoursesMutation } from "../../../../Redux/features/Api/coursesApi";
import Swal from "sweetalert2";

const AddCourse = () => {
  // Use form hooks
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Rtk query hooks
  const [postCourses] = usePostCoursesMutation();

  // Redux state
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice
  );

  // Handle submit
  const onSubmit = (data) => {
    const courseInfo = {
      ...data,
      coursePrice: Number(data.coursePrice),
      courseStudentsCount: Number(data.courseStudentsCount),
      courseStatus: "pandding",
    };
    postCourses(courseInfo)
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Course data saved successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to send course data in the server",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        clearForm();
      });
  };

  const clearForm = () => {
    reset();
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-4/5 h-4/5 mx-auto  bg-[#c7c1c1] rounded-lg">
        <h1 className="text-center text-2xl font-bold p-5">Add Course</h1>
        {/* form content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-full p-5 space-y-3">
            {/* name & email input */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Teacher Name
                </label>
                <input
                  id="name"
                  type="text"
                  readOnly
                  className="w-full rounded-md border-2 p-2 border-black"
                  defaultValue={userName}
                  {...register("courseTeacherName")}
                />
              </div>

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  Teacher Email
                </label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  className="w-full rounded-md border-2 p-2 border-black"
                  defaultValue={userEmail}
                  {...register("courseTeacherEmail")}
                />
              </div>
            </div>

            {/* title & price input */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="title" className="font-bold">
                  Course Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded-md border-2 p-2 border-black"
                  {...register("courseTitle", {
                    required: "course title is required",
                    maxLength: {
                      value: 22,
                      message:
                        "Course Title have to be lower then 22 chareacters",
                    },
                    minLength: {
                      value: 4,
                      message:
                        "Course Title have to be getter then 4 chareacters",
                    },
                  })}
                />
              </div>

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="price" className="font-bold">
                  Course Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full rounded-md border-2 p-2 border-black"
                  {...register("coursePrice", {
                    required: "course price is required",
                    max: {
                      value: 500,
                      message: "Course price must be less then or equal to 500",
                    },
                    min: {
                      value: 10,
                      message:
                        "Course price must be greater then or equal to 10",
                    },
                  })}
                />
              </div>
            </div>

            {/* category & student-count */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="category" className="font-bold">
                  Category
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

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="studentCount" className="font-bold">
                  Student Count
                </label>
                <input
                  id="studentCount"
                  type="number"
                  className="w-full rounded-md border-2 p-2 border-black"
                  readOnly
                  defaultValue={0}
                  {...register("courseStudentsCount")}
                />
              </div>
            </div>

            {/* image & description */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="courseImage" className="font-bold">
                  Course Image URL
                </label>
                <input
                  id="courseImage"
                  type="text"
                  className="w-full rounded-md border-2 p-2 border-black"
                  {...register("courseImage", {
                    required: "course image is required",
                  })}
                />
              </div>

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="courseDescription" className="font-bold">
                  Description
                </label>
                <input
                  id="courseDescription"
                  type="text"
                  className="w-full rounded-md border-2 p-2 border-black"
                  {...register("courseDescription", {
                    required: "You have to tell something about the course",
                    maxLength: {
                      value: 300,
                      message:
                        "Course description have to be lower then 300 chareacters",
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Course description have to be getter then 10 chareacters",
                    },
                  })}
                />
              </div>
            </div>
            <button
              className="btn w-full bg-green-500 text-black hover:bg-green-600 hover:text-white border-none"
              type="submit"
            >
              Upload
            </button>
            <button
              onClick={clearForm}
              className="btn w-full bg-red-500 text-black hover:bg-red-600 hover:text-white border-none"
              type="button"
            >
              Clear The Form
            </button>
            {/* form errors */}
            {errors.courseTitle && (
              <p className="text-red-500 font-bold text-center text-2xl uppercase">
                {errors.courseTitle.message}
              </p>
            )}
            {errors.coursePrice && (
              <p className="text-red-500 font-bold text-center text-2xl uppercase">
                {errors.coursePrice.message}
              </p>
            )}
            {errors.courseImage && (
              <p className="text-red-500 font-bold text-center text-2xl uppercase">
                {errors.courseImage.message}
              </p>
            )}
            {errors.courseDescription && (
              <p className="text-red-500 font-bold text-center text-2xl uppercase">
                {errors.courseDescription.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
