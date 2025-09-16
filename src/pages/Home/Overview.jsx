import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {  FaEye, FaHeart, FaGripfire } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsRocket, BsStars, BsTrophy } from "react-icons/bs";
import { MdTrendingUp, MdGroups, MdSchool } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function Overview() {
  // Refs for animations
  const overviewRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);
  const floatingElementsRef = useRef([]);

  // Enhanced cards data
  const cards = [
    {
      id: "mission",
      title: "Our Mission",
      description: "Our mission is to provide accessible, high-quality education to everyone, everywhere, breaking down barriers to learning.",
      color: "from-blue-500 to-cyan-500",
      stats: { number: "50K+", label: "Students Reached" }
    },
    {
      id: "vision",
      title: "Our Vision",
      description: "We envision a future where curiosity is the only prerequisite for knowledge, and learning knows no boundaries.",
      icon: <FaEye className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      stats: { number: "1000+", label: "Courses Available" }
    },
    {
      id: "purpose",
      title: "Our Purpose",
      description: "Our purpose is to ignite a passion for learning. By offering a diverse range of courses and a supportive community, we empower individuals to acquire new skills, pursue their passions, and achieve their full potential.",
      icon: <FaHeart className="text-2xl" />,
      color: "from-orange-500 to-red-500",
      stats: { number: "95%", label: "Success Rate" },
      fullWidth: true
    }
  ];

  // Achievement stats
  const achievements = [
    { icon: <MdGroups className="text-xl" />, number: "50K+", label: "Active Learners" },
    { icon: <MdSchool className="text-xl" />, number: "1000+", label: "Expert Instructors" },
    { icon: <BsTrophy className="text-xl" />, number: "95%", label: "Completion Rate" },
    { icon: <MdTrendingUp className="text-xl" />, number: "24/7", label: "Support Available" }
  ];



  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        overviewRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -150,
          opacity: 0,
          duration: Math.random() * 5 + 4,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 4
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
        duration: 1,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Title animation with character reveal
    gsap.fromTo(titleRef.current,
      { 
        y: 100, 
        opacity: 0,
        rotationX: -45
      },
      { 
        y: 0, 
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo(cardsRef.current,
      { 
        y: 80, 
        opacity: 0,
        scale: 0.8,
        rotationY: 45
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    gsap.fromTo(statsRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.5
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating elements
    gsap.fromTo(floatingElementsRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -90
      },
      { 
        scale: 1, 
        opacity: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Continuous floating animation
    gsap.to(floatingElementsRef.current, {
      y: "random(-15, 15)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

  }, []);

  // Card hover animations
  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -12,
        scale: 1.03,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={overviewRef}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>



      <div className="relative z-10 mx-auto w-11/12 max-w-7xl py-12 sm:py-16 lg:py-20 xl:w-4/5">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Content Section */}
          <div className="flex flex-col space-y-6 sm:space-y-8">
            {/* Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200"
            >
              <BsStars className="text-orange-500 text-sm" />
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                About Us
              </p>
            </div>

            {/* Enhanced Title */}
            <div className="space-y-4">
              <h1 
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-tight text-gray-900"
              >
                Your Journey to Lifelong Learning Starts Here. Discover a World of{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Knowledge.
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-lg opacity-50" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                🚀 Empowering minds through innovative education and fostering a global community of lifelong learners.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  ref={el => statsRef.current[index] = el}
                  className="text-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
                >
                  <div className="inline-flex p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg mb-2 shadow-md">
                    <div className="text-white">
                      {achievement.icon}
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    {achievement.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={el => cardsRef.current[index] = el}
                className={`group relative rounded-3xl bg-white/90 backdrop-blur-sm p-6 sm:p-8 shadow-xl border border-white/20 transition-all duration-500 hover:shadow-2xl cursor-pointer overflow-hidden ${
                  card.fullWidth ? 'sm:col-span-2' : ''
                }`}
                onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className={`p-3 bg-gradient-to-r ${card.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                      {card.title}
                    </h2>
                    {card.stats && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-bold text-orange-500">{card.stats.number}</span>
                        {card.stats.label}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {card.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  <HiLightningBolt className="text-2xl text-orange-500" />
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FaGripfire className="text-2xl sm:text-3xl" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Join the Learnio Community
                </h3>
              </div>
              <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Be part of a global movement that's reshaping education and empowering learners worldwide.
              </p>
              <button className="group px-8 sm:px-12 py-4 sm:py-5 bg-white text-orange-500 rounded-2xl font-bold text-base sm:text-lg lg:text-xl shadow-2xl hover:scale-105 transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <BsRocket className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                  Start Your Journey
                  <HiSparkles className="text-xl group-hover:scale-125 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;