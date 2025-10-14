import { useMemo } from "react";
import { useGetCoursesQuery } from "../../../../Redux/features/api/coursesApi";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import toast from "react-hot-toast";
import {
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

const CourseReview = () => {
  // RTK Query hook
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCoursesQuery();

  // Calculate course counts using useMemo for efficiency
  const { pendingCourses, activeCourses, rejectCourses } = useMemo(() => {
    const pending = courses.filter(
      (course) => course.courseStatus === "pending",
    );
    const active = courses.filter((course) => course.courseStatus === "active");
    const reject = courses.filter((course) => course.courseStatus === "reject");

    return {
      pendingCourses: pending,
      activeCourses: active,
      rejectCourses: reject,
    };
  }, [courses]);

  // --- Loading State UI ---
  if (isLoading) {
    return <Loading />;
  }

  // --- Error State UI (Kept consistent) ---
  if (isError) {
    console.error(
      "Error while fetching the courses data from the database : ",
      error,
    );
    // ⚠️ FIX: Add safe fallback message for toast
    toast.error(
      error?.data?.message ||
        error?.error ||
        "Failed to load course review data",
    );

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-lg rounded-2xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Courses
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching the course list. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- Empty State UI (Kept consistent) ---
  if (courses.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        {/* Background Elements */}
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl" />

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            {/* Empty Icon */}
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-6 shadow-2xl">
              <FaSearch className="text-4xl text-white" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Courses to Review
            </h1>

            {/* Message */}
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              There are currently no courses submitted for review in the system.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/dashboard/interface">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Go to Dashboard
                    <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Content UI (Enhanced Status Indicators) ---
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Background Elements */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-sky-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
          {/* Header */}
          <div className="mb-8 text-center sm:mb-12">
            <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl">
              Course{" "}
              <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                Review Center
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              📚 Select a category below to start reviewing course submissions.
              Total courses:{" "}
              <span className="font-semibold text-blue-600">
                {courses.length}
              </span>
            </p>
          </div>

          {/* Status Indicators (Enhanced UI) */}
          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Pending Courses */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-yellow-300 bg-yellow-200 p-6 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
              <FaHistory className="mb-2 text-4xl text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
              <p className="text-4xl font-extrabold text-yellow-600">
                {pendingCourses.length}
              </p>
            </div>
            {/* Active Courses */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-300 bg-blue-200 p-6 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
              <FaCheckCircle className="mb-2 text-4xl text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">Active</h3>
              <p className="text-4xl font-extrabold text-blue-600">
                {activeCourses.length}
              </p>
            </div>
            {/* Rejected Courses */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-300 bg-red-200 p-6 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
              <FaTimesCircle className="mb-2 text-4xl text-red-500" />
              <h3 className="text-lg font-semibold text-gray-700">Rejected</h3>
              <p className="text-4xl font-extrabold text-red-600">
                {rejectCourses.length}
              </p>
            </div>
          </div>

          {/* Navigation Buttons (Kept consistent and visually strong) */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/dashboard/courseReview/pending"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="group w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-3">
                  <FaHistory className="text-lg" />
                  Review Pending Courses
                </span>
              </button>
            </Link>
            <Link
              to="/dashboard/courseReview/active"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-3">
                  <FaCheckCircle className="text-lg" />
                  View Active Courses
                </span>
              </button>
            </Link>
            <Link
              to="/dashboard/courseReview/reject"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="group w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-3">
                  <FaTimesCircle className="text-lg" />
                  View Rejected Courses
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
