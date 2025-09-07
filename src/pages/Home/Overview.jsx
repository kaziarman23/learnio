function Overview() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-11/12 py-10 xl:w-4/5">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content Section */}
          <div className="flex flex-col space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              About Us
            </p>
            <h1 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-4xl xl:text-4xl">
              Your Journey to Lifelong Learning Starts Here. Discover a World of{" "}
              <span className="text-orange-500">Knowledge.</span>
            </h1>
          </div>

          {/* Right Cards Section */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Mission Card */}
            <div className="rounded-3xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-8">
              <h2 className="mb-2 text-center text-xl font-bold text-orange-500">
                Our Mission
              </h2>
              <p className="text-left text-sm text-gray-600">
                Our mission is to provide accessible, high-quality education to
                everyone, everywhere.
              </p>
            </div>

            {/* Vision Card */}
            <div className="rounded-3xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-8">
              <h2 className="mb-2 text-center text-xl font-bold text-orange-500">
                Our Vision
              </h2>
              <p className="text-left text-sm text-gray-600">
                We envision a future where curiosity is the only prerequisite
                for knowledge.
              </p>
            </div>

            {/* Purpose Card */}
            <div className="col-span-1 rounded-3xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl sm:col-span-2 sm:p-8">
              <h2 className="mb-2 text-center text-xl font-bold text-orange-500">
                Our Purpose
              </h2>
              <p className="text-left text-sm text-gray-600">
                Our purpose is to ignite a passion for learning. By offering a
                diverse range of courses and a supportive community, we empower
                individuals to acquire new skills, pursue their passions, and
                achieve their full potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
