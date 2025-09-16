const Hero = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center lg:w-4/5">
        <div className="flex h-full w-full flex-col items-center justify-between gap-5 lg:flex-row">
          {/* Text content */}
          <div className="flex h-full w-11/12 flex-col items-center justify-center space-y-5 sm:w-4/5 lg:w-1/2 lg:items-start">
            <h1 className="text-center text-base font-bold sm:text-lg lg:text-xl xl:text-left xl:text-4xl">
              Unlock Your <span className="text-orange-500">Potential</span>
              <br /> One Skill at a Time
            </h1>
            <p className="text-left text-sm sm:text-base lg:text-lg">
              Discover expert-led courses designed to help you master new
              skills, elevate your career, or pursue your passions. Learn at
              your own pace from anywhere in the world.
            </p>
          </div>

          {/* Image content */}
          <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-1/2">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-wordpress-info.futurelearn.com%2Fwp-content%2Fuploads%2F1_Different-teaching-methods-and-how-to-use-them.jpg.optimal.jpg&f=1&nofb=1&ipt=aaf72edc8449a687dfcf43497651d184629206356801bae86847610daa864717"
              alt="hero section image 1"
              className="h-1/2 w-5/6 rounded-2xl border-2 border-black object-cover"
            />
            <div className="flex items-center justify-center gap-5">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp11867996.jpg&f=1&nofb=1&ipt=88948f2abbd08c06768368415796843c6e37a78140d7abcd1b372619795b611a&ipo=images"
                alt="hero section image 2"
                className="h-full w-1/3 rounded-2xl border-2 border-black object-cover"
              />
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn8.dissolve.com%2Fp%2FD2115_185_452%2FD2115_185_452_1200.jpg&f=1&nofb=1&ipt=73d53eec312d3e51f3e82ca61990be4c06a468a570a208ba15e0ccd1c580ebc7&ipo=images"
                alt="hero section image 3"
                className="h-full w-1/3 rounded-2xl border-2 border-black object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
