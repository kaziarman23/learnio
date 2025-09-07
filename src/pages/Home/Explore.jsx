import { FaCheck } from "react-icons/fa";

const Explore = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-11/12 xl:w-4/5">
        <div className="items-center overflow-hidden rounded-2xl md:grid md:grid-cols-2 md:gap-8">
          <div className="sm:p-12">
            <img
              src="https://i.pinimg.com/736x/14/76/0a/14760a486f3c746fc6e1148f6d06db68.jpg"
              alt="Explore Section image"
              className="rounded-xl"
            />
          </div>
          <div className="p-2 md:p-0 md:pr-12">
            <h1 className="text-xl font-bold leading-tight text-gray-800 md:text-xl xl:text-3xl">
              Unlock your potential with our{" "}
              <span className="text-orange-500">online courses.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 md:mt-2 md:text-sm">
              Our platform provides you with the best resources to learn new
              skills, advance your career, and pursue your passions. Get started
              today and join a community of learners.
            </p>
            <ul className="mt-6 space-y-3 text-gray-600 md:text-sm">
              <li className="flex items-center gap-3">
                <FaCheck className="h-6 w-6 text-orange-500" />
                <span>
                  <strong>Flexible Learning:</strong> Study at your own pace,
                  anytime, anywhere.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheck className="h-6 w-6 text-orange-500" />
                <span>
                  <strong>Expert Instructors:</strong> Learn from industry
                  professionals with real-world experience.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheck className="h-6 w-6 text-orange-500" />
                <span>
                  <strong>Interactive Content:</strong> Engage with quizzes,
                  projects, and a vibrant community.
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <button className="transform rounded-lg bg-orange-500 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
