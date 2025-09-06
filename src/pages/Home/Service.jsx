import { FaCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";

const Service = () => {
  const services = [
    {
      icon: <FaCode className="h-6 w-6 text-orange-500" />,
      title: "Web Development",
      description:
        "We build fast, scalable, and secure websites using modern frameworks like React, Next.js, and Node.js to ensure the best performance and user experience.",
    },
    {
      icon: <FaMobileAlt className="h-6 w-6 text-orange-500" />,
      title: "App Development",
      description:
        "From iOS to Android, we create high-performing mobile apps that bring your ideas to life with intuitive design and seamless functionality.",
    },
    {
      icon: <FaPaintBrush className="h-6 w-6 text-orange-500" />,
      title: "Web Design",
      description:
        "Our design team crafts visually stunning and user-friendly interfaces, focusing on responsive design and accessibility for all devices.",
    },
  ];

  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto w-4/5">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">
            Our Services
          </h3>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            What We Offer
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex transform flex-col items-start rounded-lg border-b-4 border-orange-500 bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800">
                {service.icon} {service.title}
              </h3>
              <p className="mb-6 flex-grow leading-relaxed text-gray-600">
                {service.description}
              </p>
              <a
                href="#"
                className="mt-auto rounded-md bg-orange-500 px-6 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-orange-600"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
