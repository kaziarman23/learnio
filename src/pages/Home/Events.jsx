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
    <div className="w-full h-full">
      <div className="w-full h-full mx-auto p-4 lg:w-11/12 xl:w-4/5">
        {/* benner part */}
        <div className="flex justify-center items-center mb-5 flex-col gap-5 lg:justify-between lg:flex-row">
          <div className="w-11/12 h-full space-y-5 lg:w-1/2">
            {/* <h1 className="text-2xl font-bold"> */}
            <h1 className="text-base mt-5 font-bold sm:text-2xl">
              Learnio Events – Learn, Connect, and Grow!
            </h1>
            <p className='text-sm md:text-lg'>
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
          <div className="w-11/12 h-full lg:w-1/2">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fit.unm.edu%2Fassets%2Fimg%2Fstudents-image.jpg&f=1&nofb=1&ipt=af3adddbb6e8724356270c135404070190c008cf5a626f008749c5125d5fe06c&ipo=images"
              alt="Event page"
              className="w-full h-full object-cover rounded-2xl rounded-bl-[200px]"
            />
          </div>
        </div>
        {/* event cards */}
        <div className="flex justify-center items-center flex-col gap-5 mb-5  p-5 md:flex-row">
          {eventCards.map((item, index) => (
            <div key={index} className="w-72 h-72 border-2 rounded-xl p-5 sm:w-96 sm:h-80 md:h-72 lg:h-80">
              <img src={item.img} alt={item.title} className='w-full h-1/2 object-cover rounded-2xl' />
              <h4 className='text-left font-bold my-2 text-sm sm:text-2xl md:text-xs lg:text-base'>{item.title}</h4>
              <p className='h-24 text-sm sm:text-lg md:text-sm md:h-20  lg:h-24 lg:text-base'>{item.decription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
