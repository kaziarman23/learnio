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
      <div className="w-4/5 h-full mx-auto p-5">
        {/* benner part */}
        <div className="flex justify-between items-center mb-5">
          <div className="w-1/2 h-full space-y-5">
            <h1 className="text-2xl font-bold">
              Learnio Events – Learn, Connect, and Grow!
            </h1>
            <p>
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
          <div className="w-1/2 h-full">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fit.unm.edu%2Fassets%2Fimg%2Fstudents-image.jpg&f=1&nofb=1&ipt=af3adddbb6e8724356270c135404070190c008cf5a626f008749c5125d5fe06c&ipo=images"
              alt="Event page"
              className="w-full h-full object-cover rounded-2xl rounded-bl-[200px]"
            />
          </div>
        </div>
        {/* event cards */}
        <div className="flex justify-evenly items-center">
          {eventCards.map((item, index) => (
            <div key={index} className="w-80 h-80 border-2 rounded-xl p-5">
              <img src={item.img} alt={item.title} className='w-full h-1/2 object-cover rounded-2xl' />
              <h4 className='text-left font-bold my-2'>{item.title}</h4>
              <p className='h-20'>{item.decription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
