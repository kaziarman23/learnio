import Headline from "./Headline";

const Hero = () => {
  return (
    <div className="mx-auto h-full w-full">
      <div className="mx-auto mt-2 flex h-full w-full flex-col items-center justify-between gap-5 lg:w-4/5 lg:flex-row">
        {/* Text content */}
        <div className="h-full w-11/12 space-y-5 sm:w-4/5 lg:w-1/2">
          <h1 className="text-center text-base font-bold sm:text-lg lg:text-xl xl:text-left xl:text-4xl">
            Unlock Your Potential,
            <br /> One Skill at a Time
          </h1>
          <p className="text-left text-sm sm:text-base lg:text-lg">
            Discover expert-led courses designed to help you master new skills,
            elevate your career, or pursue your passions. Learn at your own pace
            from anywhere in the world.
          </p>
        </div>

        {/* Image content */}
        <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-1/2">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nea.org%2Fsites%2Fdefault%2Ffiles%2Flegacy%2F2020%2F04%2Fnew_teacher.jpeg&f=1&nofb=1&ipt=0d3e1ea6475419185788530ea3dcd8f08f858cae50f60cddb849f525d99f1678&ipo=images"
            alt=""
            className="h-1/2 w-5/6 rounded-2xl border-2 border-black object-cover"
          />
          <div className="flex items-center justify-center gap-5">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp11867996.jpg&f=1&nofb=1&ipt=88948f2abbd08c06768368415796843c6e37a78140d7abcd1b372619795b611a&ipo=images"
              alt=""
              className="h-full w-1/3 rounded-2xl border-2 border-black object-cover"
            />
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn8.dissolve.com%2Fp%2FD2115_185_452%2FD2115_185_452_1200.jpg&f=1&nofb=1&ipt=73d53eec312d3e51f3e82ca61990be4c06a468a570a208ba15e0ccd1c580ebc7&ipo=images"
              alt=""
              className="h-full w-1/3 rounded-2xl border-2 border-black object-cover"
            />
          </div>
        </div>
      </div>
      <Headline />
    </div>
  );
};

export default Hero;
