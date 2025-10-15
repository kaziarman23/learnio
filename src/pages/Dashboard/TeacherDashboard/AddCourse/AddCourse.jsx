import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAddCourseMutation } from "../../../../Redux/features/api/coursesApi";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";

const AddCourse = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [addCourse] = useAddCourseMutation();
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  const onSubmit = (data) => {
    const courseInfo = {
      ...data,
      coursePrice: Number(data.coursePrice),
      courseStudentsCount: Number(data.courseStudentsCount),
      courseStatus: "pending",
    };

    addCourse(courseInfo)
      .unwrap()
      .then(() => {
        toast.success("✅ Course added successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Failed to add course:", error);
        toast.error(error?.data?.message || "Failed to add course.");
      });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-6 sm:p-8">
      {/* Background Elements */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Add{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Course
            </span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            🧑‍🏫 Fill in the details below to create a new course.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-gray-300 bg-white/90 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Teacher Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Teacher Name
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue={userName}
                  {...register("courseTeacherName")}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Teacher Email
                </label>
                <input
                  type="email"
                  readOnly
                  defaultValue={userEmail}
                  {...register("courseTeacherEmail")}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Course Title and Price */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Course Title
                </label>
                <input
                  type="text"
                  {...register("courseTitle", {
                    required: "Course title is required",
                    maxLength: { value: 22, message: "Max 22 characters" },
                    minLength: { value: 4, message: "Min 4 characters" },
                  })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.courseTitle && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.courseTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Course Price ($)
                </label>
                <input
                  type="number"
                  {...register("coursePrice", {
                    required: "Price is required",
                    max: { value: 500, message: "Must be ≤ 500" },
                    min: { value: 10, message: "Must be ≥ 10" },
                  })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.coursePrice && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.coursePrice.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category & Student Count */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="game-development">Game Development</option>
                  <option value="uiux-designer">UI/UX Designer</option>
                  <option value="machine-learning">Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Student Count
                </label>
                <input
                  type="number"
                  readOnly
                  defaultValue={0}
                  {...register("courseStudentsCount")}
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Image & Description */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Course Image URL
                </label>
                <input
                  type="text"
                  {...register("courseImage", {
                    required: "Course image URL is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.courseImage && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.courseImage.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Description
                </label>
                <input
                  type="text"
                  {...register("courseDescription", {
                    required: "Description is required",
                    maxLength: { value: 300, message: "Max 300 characters" },
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-inner focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.courseDescription && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {errors.courseDescription.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto"
              >
                <HiSparkles className="text-xl" />
                Upload
                <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 sm:w-auto"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
