import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGripfire, FaCheckCircle, FaUsers, FaGraduationCap } from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiAcademicCap } from "react-icons/hi";
import { BsRocket, BsStars, BsTrophy } from "react-icons/bs";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Refs for animations
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const benefitsRef = useRef(null);
  const benefitItemsRef = useRef([]);
  const imagesRef = useRef([]);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);

  // Image data with enhanced information
  const imgContainer = [
    {
      img: "https://i.pinimg.com/736x/ff/4e/63/ff4e634f1fc5dfe0c573fc6e131957d3.jpg",
      title: "Expert Instructors",
      description: "Learn from industry professionals"
    },
    {
      img: "https://i.pinimg.com/736x/7e/54/eb/7e54eb0da4a3b1a80e5bead21fdf1b4b.jpg",
      title: "Interactive Learning",
      description: "Hands-on projects and real-world applications"
    },
    {
      img: "https://i.pinimg.com/736x/36/1c/2f/361c2ff2affc361eae7acf7cb1e81553.jpg",
      title: "Global Community",
      description: "Connect with learners worldwide"
    },
  ];

  // Enhanced benefits data
  const benefits = [
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Expert-Led Courses",
      description: "Learn directly from experienced professionals and industry leaders with real-world expertise.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <HiLightningBolt className="text-2xl" />,
      title: "Flexible Learning",
      description: "Study at your own pace, anytime and anywhere with our mobile-friendly platform.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BsTrophy className="text-2xl" />,
      title: "Affordable Education",
      description: "Access premium content without breaking the bank. Quality education for everyone.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BsRocket className="text-2xl" />,
      title: "Career Growth",
      description: "Boost your career prospects with certificates and skills that employers value.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Statistics data
  const stats = [
    { number: "50K+", label: "Happy Students", icon: FaUsers },
    { number: "1000+", label: "Quality Courses", icon: HiAcademicCap },
    { number: "95%", label: "Success Rate", icon: BsTrophy },
    { number: "24/7", label: "Support", icon: HiSparkles }
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        aboutRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -100,
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
    // Title animation
    gsap.fromTo(titleRef.current,
      { 
        y: 80, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
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
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
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

    // Benefits section animation
    gsap.fromTo(benefitsRef.current,
      { 
        y: 60, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Benefit items stagger animation
    gsap.fromTo(benefitItemsRef.current,
      { 
        y: 40, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Images animation
    gsap.fromTo(imagesRef.current,
      { 
        y: 100, 
        opacity: 0,
        rotationY: 45,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imagesRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    gsap.fromTo(statsRef.current,
      { 
        y: 60, 
        opacity: 0,
        scale: 0.5
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  // Image hover effects
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        y: -10,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  // Benefit card hover effects
  const handleBenefitHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={aboutRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl space-y-12 sm:space-y-16 lg:space-y-20 xl:w-4/5 py-12 sm:py-16 lg:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-8 lg:gap-12 xl:flex-row">
          
          {/* Brand Section */}
          <div className="w-full space-y-6 sm:space-y-8 text-left xl:w-1/2 xl:p-5">
            <div ref={titleRef} className="space-y-4">
              <div className="flex items-center gap-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur opacity-75" />
                  <div className="relative p-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl shadow-xl">
                    <FaGripfire className="text-white" />
                  </div>
                </div>
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Learnio
                </span>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200">
                <BsStars className="text-orange-500 text-sm" />
                <span className="text-orange-600 text-sm font-medium">
                  Transforming Education Since 2024
                </span>
              </div>
            </div>
            
            <p 
              ref={descriptionRef}
              className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed"
            >
              🚀 Learnio is an innovative online learning platform where students 
              can connect with expert teachers and purchase high-quality courses 
              across a wide range of subjects. Whether you're looking to boost your 
              career, pick up a new hobby, or master in-demand skills, Learnio provides 
              a flexible, affordable, and engaging learning experience.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="w-full space-y-6 sm:space-y-8 xl:w-1/2 xl:p-5">
            <h2 
              ref={benefitsRef}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-left"
            >
              With Learnio, you'll{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                gain
              </span>
              :
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  ref={el => benefitItemsRef.current[index] = el}
                  className={`group p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer ${index >= 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                  onMouseEnter={(e) => handleBenefitHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleBenefitHover(e.currentTarget, false)}
                >
                  <div className={`inline-flex p-3 bg-gradient-to-r ${benefit.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                ref={el => statsRef.current[index] = el}
                className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl mb-3 shadow-lg">
                  <IconComponent className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Image Gallery */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Experience the{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Difference
              </span>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers with our platform
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:justify-evenly">
            {imgContainer.map((item, index) => (
              <div
                key={index}
                ref={el => imagesRef.current[index] = el}
                className="group relative w-full max-w-xs sm:w-64 lg:w-72 xl:w-80"
                onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-48 sm:h-64 lg:h-72 xl:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-lg sm:text-xl font-bold mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base opacity-90">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaCheckCircle className="text-white text-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our community of learners and unlock your potential today!
            </p>
            <button className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-orange-500 rounded-2xl font-bold text-base sm:text-lg lg:text-xl shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300">
              <span className="flex items-center justify-center gap-3">
                <BsRocket className="text-xl" />
                Get Started Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;