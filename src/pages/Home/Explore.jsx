import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheck, FaPlay, FaUsers, FaGraduationCap, FaCertificate } from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiAcademicCap } from "react-icons/hi";
import { BsArrowRight, BsStars, BsTrophy } from "react-icons/bs";
import { MdTrendingUp, MdAccessTime, MdVerified } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
  // Refs for animations
  const exploreRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef([]);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);
  const badgeRef = useRef(null);
  const particlesRef = useRef([]);

  // Enhanced features data
  const features = [
    {
      icon: <MdAccessTime className="text-xl" />,
      title: "Flexible Learning",
      description: "Study at your own pace, anytime, anywhere with lifetime access to content.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaGraduationCap className="text-xl" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience and proven track records.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <HiLightningBolt className="text-xl" />,
      title: "Interactive Content",
      description: "Engage with quizzes, projects, and a vibrant community of fellow learners.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaCertificate className="text-xl" />,
      title: "Certification Ready",
      description: "Earn industry-recognized certificates upon successful course completion.",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Statistics data
  const stats = [
    { number: "50K+", label: "Active Students", icon: FaUsers },
    { number: "1000+", label: "Premium Courses", icon: HiAcademicCap },
    { number: "95%", label: "Success Rate", icon: BsTrophy },
    { number: "24/7", label: "Support Available", icon: MdVerified }
  ];

  // Create subtle particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        exploreRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -120,
          opacity: 0,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 3
        });
      }
    };

    createParticles();

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  // Main animations
  useEffect(() => {
    // Image animation with 3D effect
    gsap.fromTo(imageRef.current,
      { 
        x: -100, 
        opacity: 0,
        rotationY: -30,
        scale: 0.8
      },
      { 
        x: 0, 
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Badge animation
    gsap.fromTo(badgeRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -180
      },
      { 
        scale: 1, 
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      { 
        x: 100, 
        opacity: 0,
        scale: 0.9
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description animation
    gsap.fromTo(descriptionRef.current,
      { 
        x: 80, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Features stagger animation
    gsap.fromTo(featuresRef.current,
      { 
        x: 60, 
        opacity: 0,
        scale: 0.9
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Button animation
    gsap.fromTo(buttonRef.current,
      { 
        x: 60, 
        opacity: 0,
        scale: 0.8
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    gsap.fromTo(statsRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  // Image hover effect
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  // Button hover effect
  const handleButtonHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        y: -3,
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

  // Feature hover effect
  const handleFeatureHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        x: 5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={exploreRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl xl:w-4/5">
        <div className="items-center overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm shadow-2xl border border-white/20 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
          
          {/* Image Section */}
          <div className="relative p-6 sm:p-8 lg:p-12">
            {/* Badge */}
            <div 
              ref={badgeRef}
              className="absolute top-8 left-8 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 backdrop-blur-sm"
            >
              <BsStars className="text-orange-500 text-sm" />
              <span className="text-orange-600 text-xs font-bold">PREMIUM CONTENT</span>
            </div>

            <div className="relative">
              <img
                ref={imageRef}
                src="https://i.pinimg.com/736x/14/76/0a/14760a486f3c746fc6e1148f6d06db68.jpg"
                alt="Explore Section image"
                className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl border border-white/20"
                onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl hover:scale-110 transition-all duration-300">
                  <FaPlay className="text-2xl sm:text-3xl text-orange-500 ml-1" />
                </button>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={el => statsRef.current[index] = el}
                    className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
                  >
                    <div className="inline-flex p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg mb-2 shadow-md">
                      <IconComponent className="text-white text-sm" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 lg:p-12 md:pr-8 lg:pr-12">
            
            {/* Title */}
            <h1 
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-800 mb-6"
            >
              Unlock your potential with our{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                online courses.
              </span>
            </h1>

            {/* Description */}
            <p 
              ref={descriptionRef}
              className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8"
            >
              🚀 Our platform provides you with the best resources to learn new skills, 
              advance your career, and pursue your passions. Get started today and join 
              a community of learners who are transforming their futures.
            </p>

            {/* Enhanced Features List */}
            <div className="space-y-4 sm:space-y-5 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={el => featuresRef.current[index] = el}
                  className="group flex items-start gap-4 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                >
                  <div className={`flex-shrink-0 p-2.5 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                ref={buttonRef}
                className="group relative transform rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 overflow-hidden"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <HiSparkles className="text-xl" />
                  Explore Courses
                  <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button className="group px-8 py-4 border-2 border-orange-300 text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <FaPlay className="text-sm" />
                  Watch Preview
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <MdTrendingUp className="text-green-500 text-xl" />
                <span className="text-sm text-gray-600">Growing Community</span>
              </div>
              <div className="flex items-center gap-2">
                <MdVerified className="text-blue-500 text-xl" />
                <span className="text-sm text-gray-600">Verified Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;