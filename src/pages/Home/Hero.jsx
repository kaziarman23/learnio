import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BsArrowRight } from "react-icons/bs";
import { FaGraduationCap, FaUsers, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";
import { FaGoogleScholar } from "react-icons/fa6";

const Hero = () => {
  // Refs
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaButtonsRef = useRef([]);
  const mainImageRef = useRef(null);
  const smallImagesRef = useRef([]);
  const statsRef = useRef([]);

  const stats = [
    { number: "50K+", label: "Students", icon: FaUsers },
    { number: "1000+", label: "Courses", icon: FaGraduationCap },
    { number: "95%", label: "Success Rate", icon: FaTrophy },
  ];

  // Trigger animation only once using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Timeline animation
            const tl = gsap.timeline();

            tl.fromTo(
              titleRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            );

            tl.fromTo(
              descriptionRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
              "-=0.4",
            );

            tl.fromTo(
              ctaButtonsRef.current,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.3",
            );

            tl.fromTo(
              statsRef.current,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.2",
            );

            tl.fromTo(
              mainImageRef.current,
              { x: 50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
              "-=0.6",
            );

            tl.fromTo(
              smallImagesRef.current,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.4",
            );

            // Stop observing after the first trigger
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }, // 20% of section visible triggers animation
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  const handleButtonHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.02,
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 lg:py-12"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12 xl:gap-16">
          {/* Text Content */}
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            {/* Main Title */}
            <h1
              ref={titleRef}
              className="mb-4 text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-5xl xl:text-4xl 2xl:text-5xl"
            >
              Unlock Your <span className="text-orange-500">Potential</span>
              <br />
              One Skill at a Time
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mx-auto mb-6 max-w-2xl text-left text-base leading-relaxed text-gray-600 sm:mb-8 sm:text-lg lg:mx-0 lg:text-xl"
            >
              Discover expert-led courses designed to help you master new
              skills, elevate your career, or pursue your passions. Learn at
              your own pace from anywhere in the world.
            </p>

            {/* Buttons */}
            <div className="mb-8 flex w-full flex-col items-center justify-center gap-4 sm:mb-12 sm:flex-row lg:justify-start xl:mb-8">
              <Link to="/courses" className="w-full sm:w-auto">
                <button
                  ref={(el) => (ctaButtonsRef.current[0] = el)}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg lg:w-full lg:text-sm xl:text-lg"
                  onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) =>
                    handleButtonHover(e.currentTarget, false)
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    Start Learning Now
                    <BsArrowRight className="text-lg" />
                  </span>
                </button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <button
                  ref={(el) => (ctaButtonsRef.current[1] = el)}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg lg:w-auto lg:text-sm xl:text-lg"
                  onMouseEnter={(e) =>
                    handleButtonHover(e.currentTarget, true, "secondary")
                  }
                  onMouseLeave={(e) =>
                    handleButtonHover(e.currentTarget, false, "secondary")
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    Contact Us
                    <FaGoogleScholar />
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto grid max-w-md grid-cols-3 gap-4 sm:gap-6 lg:mx-0 lg:gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[index] = el)}
                    className="rounded-xl border border-gray-300 bg-white p-3 text-center shadow-sm sm:p-4"
                  >
                    <div className="mb-2 inline-flex rounded-lg bg-orange-100 p-2">
                      <IconComponent className="text-lg text-orange-500 sm:text-xl" />
                    </div>
                    <div className="mb-1 text-xl font-bold text-gray-800 sm:text-2xl lg:text-2xl xl:text-3xl">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image content */}
          <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-1/2">
            <img
              ref={(el) => (smallImagesRef.current[0] = el)}
              src="/HeroImageOne.jpg"
              alt="hero section image 1"
              className="h-1/2 w-5/6 rounded-2xl border-2 border-black object-cover"
            />
            <div className="flex items-center justify-center gap-5">
              <img
                ref={(el) => (smallImagesRef.current[1] = el)}
                src="/HeroImageTwo.jpg"
                alt="hero section image 2"
                className="h-full w-1/3 rounded-2xl border-2 border-black object-cover"
              />
              <img
                ref={(el) => (smallImagesRef.current[2] = el)}
                src="/HeroImageThree.jpg"
                alt="hero section image 3"
                className="h-full w-1/3 rounded-2xl border-2 border-black object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
