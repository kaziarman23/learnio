
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
      "https://i.pinimg.com/736x/22/bc/8e/22bc8ebef610eb881071e1a7007a7a80.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://i.pinimg.com/736x/02/52/e3/0252e3a3282f752ab9c0e97400eb7778.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://i.pinimg.com/736x/76/f7/3b/76f73beec6e920708dad59aed69838e3.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://i.pinimg.com/736x/b3/55/05/b35505c5cf9ecf80c47dd94ed5e7c23e.jpg",
  },
];

export default cards;
