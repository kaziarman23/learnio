const Events = () => {
  const eventCards = [
    {
      img: "https://i.pinimg.com/736x/4f/10/c5/4f10c581256bb3cab09b290c63d612c5.jpg",
      title: "Free Seminars",
      decription:
        "Gain insights and knowledge from industry experts without any cost.",
    },
    {
      img: "https://i.pinimg.com/736x/c9/34/f6/c934f6587b45bd577703addc053e2e99.jpg",
      title: "Community Get-Togethers",
      decription:
        "Build connections with fellow learners and educators in a fun, engaging environment.",
    },
    {
      img: "https://i.pinimg.com/736x/56/91/23/56912343c1839a73d72b66f2a4a55088.jpg",
      title: "Free Workshop",
      decription:
        "Experience the Learnio way of learning with complimentary lessons.",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto h-full w-full py-10 lg:w-11/12 xl:w-4/5">
        {/* benner part */}
        <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
          <div className="h-full w-11/12 space-y-5 lg:w-1/2">
            <h1 className="mt-5 text-base font-bold sm:text-2xl">
              Learnio Events – Learn, Connect, and Grow!
            </h1>
            <p className="text-sm md:text-lg">
              At Learnio, we believe that education is more than just courses.
              It&#39;s about building a vibrant learning community. That&#39;s
              why we organize exclusive <strong>Learnio Events</strong> to bring
              students and teachers together for meaningful interactions and
              experiences. Whether you&#39;re looking to explore new skills,
              network with like-minded individuals, or get a taste of what
              Learnio has to offer, our events are designed to inspire and
              empower.
            </p>
          </div>
          <div className="h-full w-11/12 lg:w-1/2">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fit.unm.edu%2Fassets%2Fimg%2Fstudents-image.jpg&f=1&nofb=1&ipt=af3adddbb6e8724356270c135404070190c008cf5a626f008749c5125d5fe06c&ipo=images"
              alt="Event page"
              className="h-full w-full rounded-2xl rounded-bl-[200px] object-cover"
            />
          </div>
        </div>
        {/* event cards */}
        <div className="mt-16 px-5 flex flex-col items-center justify-center gap-5 md:flex-row">
          {eventCards.map((item, index) => (
            <div
              key={index}
              className="h-72 w-72 rounded-xl border-2 border-white bg-white p-5 shadow-md transition-shadow duration-300 hover:shadow-2xl sm:h-80 sm:w-96 md:h-72 lg:h-80"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-1/2 w-full rounded-2xl object-cover"
              />
              <h4 className="my-2 text-left text-sm font-bold sm:text-2xl md:text-xs lg:text-base">
                {item.title}
              </h4>
              <p className="h-24 text-sm sm:text-lg md:h-20 md:text-sm lg:h-24 lg:text-base">
                {item.decription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
