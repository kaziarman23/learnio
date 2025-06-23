import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAddCourseMutation } from "../../../../Redux/features/api/coursesApi";
import toast from "react-hot-toast";

const AddCourse = () => {
  // Use form hooks
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Rtk query hooks
  const [addCourse] = useAddCourseMutation();

  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // Handle submit
  const onSubmit = (data) => {
    const courseInfo = {
      ...data,
      coursePrice: Number(data.coursePrice),
      courseStudentsCount: Number(data.courseStudentsCount),
      courseStatus: "pandding",
    };
    addCourse(courseInfo)
      .unwrap()
      .then(() => {
        // showing an alert
        toast.success("Course data saved successfully");
      })
      .catch((error) => {
        console.log("Failed to send course data in the server");

        // showing an alert
        toast.error(error);
      })
      .finally(() => {
        clearForm();
      });
  };

  const clearForm = () => {
    reset();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto my-5 w-11/12 overflow-hidden rounded-lg bg-[#c7c1c1] lg:w-4/5">
        <h1 className="p-5 text-center text-2xl font-bold">Add Course</h1>
        {/* form content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-full w-full space-y-3 p-5">
            {/* name & email input */}
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
              <div className="flex w-full flex-col items-start justify-center gap-2 lg:w-1/2">
                <label htmlFor="name" className="font-bold">
                  Teacher Name
                </label>
                <input
                  id="name"
                  type="text"
                  readOnly
                  className="w-full rounded-md border-2 border-black p-2"
                  defaultValue={userName}
                  {...register("courseTeacherName")}
                />
              </div>

              <div className="flex w-full flex-col items-start justify-center gap-2 lg:w-1/2">
                <label htmlFor="email" className="font-bold">
                  Teacher Email
                </label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  className="w-full rounded-md border-2 border-black p-2"
                  defaultValue={userEmail}
                  {...register("courseTeacherEmail")}
                />
              </div>
            </div>

            {/* title & price input */}
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
              <div className="flex w-1/2 flex-col items-start justify-center gap-2">
                <label htmlFor="title" className="font-bold">
                  Course Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded-md border-2 border-black p-2"
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

              <div className="flex w-1/2 flex-col items-start justify-center gap-2">
                <label htmlFor="price" className="font-bold">
                  Course Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full rounded-md border-2 border-black p-2"
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
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
              <div className="flex w-1/2 flex-col items-start justify-center gap-2">
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

              <div className="flex w-1/2 flex-col items-start justify-center gap-2">
                <label htmlFor="studentCount" className="font-bold">
                  Student Count
                </label>
                <input
                  id="studentCount"
                  type="number"
                  className="w-full rounded-md border-2 border-black p-2"
                  readOnly
                  defaultValue={0}
                  {...register("courseStudentsCount")}
                />
              </div>
            </div>

            {/* image & description */}
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
              <div className="flex w-1/2 flex-col items-start justify-center gap-2">
                <label htmlFor="courseImage" className="font-bold">
                  Course Image URL
                </label>
                <input
                  id="courseImage"
                  type="text"
                  className="w-full rounded-md border-2 border-black p-2"
                  {...register("courseImage", {
                    required: "course image is required",
                  })}
                />
              </div>

              <div className="flex w-1/2 flex-col items-start justify-center gap-2">
                <label htmlFor="courseDescription" className="font-bold">
                  Description
                </label>
                <input
                  id="courseDescription"
                  type="text"
                  className="w-full rounded-md border-2 border-black p-2"
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
              className="btn w-full border-none bg-green-500 text-black hover:bg-green-600 hover:text-white"
              type="submit"
            >
              Upload
            </button>
            <button
              onClick={clearForm}
              className="btn w-full border-none bg-red-500 text-black hover:bg-red-600 hover:text-white"
              type="button"
            >
              Clear The Form
            </button>
            {/* form errors */}
            {errors.courseTitle && (
              <p className="text-center text-2xl font-bold uppercase text-red-500">
                {errors.courseTitle.message}
              </p>
            )}
            {errors.coursePrice && (
              <p className="text-center text-2xl font-bold uppercase text-red-500">
                {errors.coursePrice.message}
              </p>
            )}
            {errors.courseImage && (
              <p className="text-center text-2xl font-bold uppercase text-red-500">
                {errors.courseImage.message}
              </p>
            )}
            {errors.courseDescription && (
              <p className="text-center text-2xl font-bold uppercase text-red-500">
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
