import { FaGripfire } from "react-icons/fa";

const About = () => {
  const imgContainer = [
    {
      img: "https://i.pinimg.com/736x/7e/54/eb/7e54eb0da4a3b1a80e5bead21fdf1b4b.jpg",
    },
    {
      img: "https://i.pinimg.com/736x/ff/4e/63/ff4e634f1fc5dfe0c573fc6e131957d3.jpg",
    },
    {
      img: "https://i.pinimg.com/736x/36/1c/2f/361c2ff2affc361eae7acf7cb1e81553.jpg",
    },
  ];

  return (
    <div className="w-full h-full bg-[#c4a61154] overflow-hidden">
      <div className="w-11/12 h-full mx-auto my-10 space-y-5 xl:w-4/5 xl:h-screen">
        <div className="flex justify-between items-start flex-col gap-4 xl:flex-row xl:gap-0">
          <div className="w-full text-left space-y-5 xl:w-1/2 xl:p-5">
            <h1 className="flex items-center text-3xl xl:text-5xl">
              <FaGripfire />
              Learnio
            </h1>
            <p>
              Learnio is an innovative online learning platform where students
              can connect with expert teachers and purchase high-quality courses
              across a wide range of subjects. Whether you&#39;re looking to
              boost your career, pick up a new hobby, or master in-demand
              skills, Learnio provides a flexible, affordable, and engaging
              learning experience.
            </p>
          </div>
          <div className="w-full space-y-5 xl:p-5 xl:space-y-7 xl:w-1/2">
            <h1 className="text-xl font-bold text-left xl:text-3xl">With Learnio, you’ll gain:</h1>
            <ul className="xl:list-disc">
              <li>
                <strong>Expert-Led Courses:</strong> Learn directly from
                experienced professionals and industry leaders.
              </li>
              <li>
                <strong>Flexible Learning:</strong> Study at your own pace,
                anytime and anywhere.
              </li>
              <li>
                <strong>Affordable Education:</strong> Access premium content
                without breaking the bank.
              </li>
            </ul>
          </div>
        </div>
        {/* card div */}
        <div className="flex justify-center items-center flex-col gap-5 sm:flex-row sm:gap-5 xl:justify-evenly">
          {imgContainer.map((item, index) => (
            <div key={index} className="w-40 h-52 xl:w-60 xl:h-80">
              <img
                src={item.img}
                alt={`about section img ${index}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
