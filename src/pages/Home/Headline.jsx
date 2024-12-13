import Marquee from "react-fast-marquee";

const Headline = () => {
  return (
    <div className="w-full h-26 mx-auto mt-3 py-3 border-t-2 xl:w-4/5">
      <Marquee>
        <h1 className="text-xl p-3 lg:text-6xl">
          Start Learning Today with Learnio — Explore Hundreds of Courses and
          Unlock Your Future!
        </h1>
      </Marquee>
    </div>
  );
};

export default Headline;
