import Marquee from "react-fast-marquee";

const Headline = () => {
  return (
    <div className="w-4/5 h-26 mx-auto border-y-2">
      <Marquee>
        <h1 className="text-6xl p-3">
          Start Learning Today with Learnio — Explore Hundreds of Courses and
          Unlock Your Future!
        </h1>
      </Marquee>
    </div>
  );
};

export default Headline;
