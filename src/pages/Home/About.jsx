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
      img: "https://i.pinimg.com/736x/72/c9/c3/72c9c3602fc0d516e519e3bcf3c7016b.jpg",
    },
  ];

  return (
    <div className="w-full h-screen bg-[#efeee9]">
      <div className="w-4/5 h-full mx-auto">
        <div className="flex justify-between items-start">
          <div className="w-1/2 p-5 text-left space-y-5 ">
            <h1 className="flex items-center text-5xl">
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
          <div className="w-1/2 p-5 space-y-9">
            <h1 className="text-xl font-bold">With Learnio, you’ll gain:</h1>
            <ul className="list-disc">
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
        <div className="flex justify-evenly items-center">
          {imgContainer.map((item, index) => (
            <div key={index} className="w-60 h-80">
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
