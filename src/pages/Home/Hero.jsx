import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiPlay, HiPause } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { FaGraduationCap, FaUsers, FaTrophy } from "react-icons/fa";

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Refs for animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaButtonsRef = useRef([]);
  const mainImageRef = useRef(null);
  const smallImagesRef = useRef([]);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);
  const videoRef = useRef(null);

  // Statistics data
  const stats = [
    { number: "50K+", label: "Students", icon: FaUsers },
    { number: "1000+", label: "Courses", icon: FaGraduationCap },
    { number: "95%", label: "Success Rate", icon: FaTrophy },
  ];

  // Create subtle particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-30 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        heroRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -50,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 2
        });
      }
    };

    createParticles();

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  // Clean entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Title entrance
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Description entrance
    tl.fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Buttons entrance
    tl.fromTo(ctaButtonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );

    // Stats entrance
    tl.fromTo(statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );

    // Main image entrance
    tl.fromTo(mainImageRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Small images entrance
    tl.fromTo(smallImagesRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

  }, []);

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Button hover animations
  const handleButtonHover = (element, isEntering, variant = "primary") => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.02,
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 lg:py-12 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            
            {/* Main Title */}
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-4 sm:mb-6"
            >
              Unlock Your{" "}
              <span className="text-orange-500">Potential</span>
              <br />
              One Skill at a Time
            </h1>

            {/* Description */}
            <p 
              ref={descriptionRef}
              className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Discover expert-led courses designed to help you master new skills, 
              elevate your career, or pursue your passions. Learn at your own pace 
              from anywhere in the world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 sm:mb-12">
              <button
                ref={el => ctaButtonsRef.current[0] = el}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                <span className="flex items-center justify-center gap-2">
                  Start Learning Now
                  <BsArrowRight className="text-lg" />
                </span>
              </button>

              <button
                ref={el => ctaButtonsRef.current[1] = el}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-base sm:text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true, "secondary")}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false, "secondary")}
              >
                <span className="flex items-center justify-center gap-2">
                  {isVideoPlaying ? <HiPause /> : <HiPlay />}
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-md mx-auto lg:mx-0">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={el => statsRef.current[index] = el}
                    className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="inline-flex p-2 bg-orange-100 rounded-lg mb-2">
                      <IconComponent className="text-orange-500 text-lg sm:text-xl" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 max-w-lg lg:max-w-none">
            
            {/* Main Image/Video */}
            <div className="relative mb-4 sm:mb-6">
              {isVideoPlaying ? (
                <video
                  ref={videoRef}
                  className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-2xl object-cover shadow-xl"
                  controls
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative">
                  <img
                    ref={mainImageRef}
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nea.org%2Fsites%2Fdefault%2Ffiles%2Flegacy%2F2020%2F04%2Fnew_teacher.jpeg&f=1&nofb=1&ipt=0d3e1ea6475419185788530ea3dcd8f08f858cae50f60cddb849f525d99f1678&ipo=images"
                    alt="Learning Experience"
                    className="w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-2xl object-cover shadow-xl"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={toggleVideo}
                      className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 hover:bg-white transition-all duration-300"
                    >
                      <HiPlay className="text-2xl sm:text-3xl lg:text-4xl text-orange-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Small Images Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                ref={el => smallImagesRef.current[0] = el}
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp11867996.jpg&f=1&nofb=1&ipt=88948f2abbd08c06768368415796843c6e37a78140d7abcd1b372619795b611a&ipo=images"
                alt="Coding Environment"
                className="w-full h-24 sm:h-32 md:h-36 lg:h-40 xl:h-44 rounded-xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <img
                ref={el => smallImagesRef.current[1] = el}
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn8.dissolve.com%2Fp%2FD2115_185_452%2FD2115_185_452_1200.jpg&f=1&nofb=1&ipt=73d53eec312d3e51f3e82ca61990be4c06a468a570a208ba15e0ccd1c580ebc7&ipo=images"
                alt="Study Environment"
                className="w-full h-24 sm:h-32 md:h-36 lg:h-40 xl:h-44 rounded-xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;