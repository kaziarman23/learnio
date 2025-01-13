import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Reviews = () => {
  const testimonials = [
    {
      img: "https://i.pinimg.com/736x/46/88/12/468812df30ab33d9c66397e40be563af.jpg",
      name: "John Doe",
      joinTime: "2023-01-15",
      reviewLocation: "New York, USA",
      comment: "Amazing service and great support!",
    },
    {
      img: "https://i.pinimg.com/736x/97/d8/64/97d86404b6d706e6e4799840199467f2.jpg",
      name: "Jane Smith",
      joinTime: "2022-12-10",
      reviewLocation: "London, UK",
      comment: "Highly recommend this product. It exceeded my expectations!",
    },
    {
      img: "https://i.pinimg.com/736x/ad/59/98/ad59984bfb3a864083f43a8c4aef8d6d.jpg",
      name: "Emily Johnson",
      joinTime: "2023-02-08",
      reviewLocation: "Sydney, Australia",
      comment: "The team was super helpful and the product works perfectly.",
    },
    {
      img: "https://i.pinimg.com/736x/8e/de/5a/8ede5a56196bb6bde599b6d323a11be4.jpg",
      name: "Michael Brown",
      joinTime: "2023-03-20",
      reviewLocation: "Toronto, Canada",
      comment: "Fantastic experience! I’m very happy with my purchase.",
    },
    {
      img: "https://i.pinimg.com/736x/4f/85/1b/4f851b58822313381aed56008626401e.jpg",
      name: "Sarah Lee",
      joinTime: "2023-04-05",
      reviewLocation: "Singapore",
      comment: "Wonderful customer service and fast delivery.",
    },
  ];

  return (
    <div className="h-full w-full border-t-2">
      <div className="mx-auto h-full w-11/12 xl:w-4/5">
        <div className="h-1/6 w-full">
          <h1 className="p-4 text-center text-lg font-bold md:text-2xl">
            What Students Are Saying About Learnio
          </h1>
          <p className="text-left text-sm xl:text-lg">
            Discover the experiences of our vibrant community! From students
            advancing their skills to teachers sharing their expertise, read
            authentic reviews that showcase the impact of Learnio on learning
            journeys worldwide.
          </p>
        </div>
        {/* review cards */}
        <div className="h-full w-full xl:h-1/2">
          <div className="h-full w-full p-3 text-black sm:p-2 md:p-3 xl:p-5">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              loop={testimonials.length > 1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
              }}
              // navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {testimonials.map((review, index) => (
                <SwiperSlide key={index}>
                  <article className="mx-4 rounded-2xl bg-[#c7c1c1] p-5 sm:mx-8 md:mx-14">
                    <div className="mb-4 flex items-center">
                      <img
                        className="mr-3 h-8 w-8 rounded-full sm:h-10 sm:w-10"
                        src={review.img}
                        alt={review.name}
                      />
                      <div className="font-medium">
                        <p className="text-sm sm:text-base">
                          <span>{review.name}</span>
                          <time
                            dateTime={review.joinTime}
                            className="block text-xs text-gray-500 sm:text-sm"
                          >
                            {review.joinTime}
                          </time>
                        </p>
                      </div>
                    </div>
                    <footer className="mb-3 text-xs sm:mb-5 sm:text-sm">
                      <p>{review.reviewLocation}</p>
                    </footer>
                    <p className="mb-2 text-xs sm:text-base">
                      {review.comment}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
