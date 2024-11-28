const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Web Development
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Learn to build responsive, dynamic, and modern websites using HTML, CSS,
        JavaScript, and popular frameworks like React and Angular.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        App Development
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Master the art of creating high-performance mobile applications for iOS
        and Android platforms using tools like Flutter and Swift.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">UI/UX Design</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Dive into the principles of user-centric design and create visually
        stunning, intuitive interfaces that enhance user experiences.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Machine Learning
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Explore AI technologies and algorithms to develop intelligent systems
        that can analyze data, make predictions, and solve complex problems.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://i.pinimg.com/736x/14/18/c3/1418c3d8765931a1b8edd348869f2ae1.jpg",
    // "https://i.pinimg.com/736x/22/bc/8e/22bc8ebef610eb881071e1a7007a7a80.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://i.pinimg.com/736x/4a/0a/39/4a0a39c5c5f0971a9131bddb213aaf25.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://i.pinimg.com/736x/de/e1/74/dee174c245a13a551f0f7e85a8a3fbf4.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://i.pinimg.com/736x/bf/47/be/bf47be2e9b2563f9023a12ca7a974709.jpg",
    // "https://i.pinimg.com/736x/5b/e2/78/5be2781105238fe6fb5b037f0d6ccaab.jpg",
  },
];

export default cards;
