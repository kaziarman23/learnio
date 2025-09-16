import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaMobileAlt, FaPaintBrush, FaRocket, FaUsers, FaAward } from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiCode } from "react-icons/hi";
import { BsArrowRight, BsStars, BsShield } from "react-icons/bs";
import { MdSpeed, MdSecurity, MdSupport } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Service = () => {
  // Refs for animations
  const serviceRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef([]);
  const ctaRef = useRef(null);
  const particlesRef = useRef([]);

  // Enhanced services data
  const services = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Web Development",
      description: "We build fast, scalable, and secure websites using modern frameworks like React, Next.js, and Node.js to ensure the best performance and user experience.",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
      color: "from-blue-500 to-cyan-500",
      bgPattern: "🌐"
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "App Development",
      description: "From iOS to Android, we create high-performing mobile apps that bring your ideas to life with intuitive design and seamless functionality.",
      features: ["iOS Development", "Android Development", "Cross-Platform", "App Store Optimization"],
      color: "from-green-500 to-emerald-500",
      bgPattern: "📱"
    },
    {
      icon: <FaPaintBrush className="text-3xl" />,
      title: "Web Design",
      description: "Our design team crafts visually stunning and user-friendly interfaces, focusing on responsive design and accessibility for all devices.",
      features: ["UI/UX Design", "Responsive Design", "Brand Identity", "User Research"],
      color: "from-purple-500 to-pink-500",
      bgPattern: "🎨"
    },
  ];

  // Additional features
  const additionalFeatures = [
    {
      icon: <MdSpeed className="text-xl" />,
      title: "Lightning Fast",
      description: "Optimized performance for speed"
    },
    {
      icon: <MdSecurity className="text-xl" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security standards"
    },
    {
      icon: <MdSupport className="text-xl" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance"
    },
    {
      icon: <FaAward className="text-xl" />,
      title: "Award Winning",
      description: "Industry-recognized excellence"
    }
  ];

  // Create subtle particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        serviceRef.current?.appendChild(particle);
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
    // Badge animation
    gsap.fromTo(badgeRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -90
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
        y: 60, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
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

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { 
        y: 40, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Service cards animation
    gsap.fromTo(cardsRef.current,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8,
        rotationX: 45
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotationX: 0,
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

    // Features animation
    gsap.fromTo(featuresRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { 
        y: 80, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  // Card hover animations
  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -15,
        scale: 1.02,
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

  // Button hover animations
  const handleButtonHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
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
      ref={serviceRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl xl:w-4/5">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-4 sm:mb-6"
          >
            <BsStars className="text-orange-500 text-sm" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">
              Our Services
            </h3>
          </div>

          {/* Main Title */}
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6"
          >
            What We{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            🚀 Comprehensive digital solutions tailored to bring your vision to life with cutting-edge technology and innovative design.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-16 lg:mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative transform flex-col items-start rounded-3xl bg-white/90 backdrop-blur-sm p-6 sm:p-8 shadow-xl border border-white/20 transition-all duration-500 hover:shadow-2xl cursor-pointer overflow-hidden"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              {/* Background Pattern */}
              <div className="absolute top-4 right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                {service.bgPattern}
              </div>

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative inline-flex p-4 bg-gradient-to-r ${service.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="relative text-xl sm:text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative mb-6 leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>

              {/* Features List */}
              <div className="relative mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More Button */}
              <button
                className={`relative mt-auto w-full rounded-xl bg-gradient-to-r ${service.color} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl group-hover:scale-105`}
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                <span className="flex items-center justify-center gap-2">
                  Learn More
                  <BsArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {additionalFeatures.map((feature, index) => (
            <div
              key={feature.title}
              ref={el => featuresRef.current[index] = el}
              className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl mb-3 shadow-lg">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaRocket className="text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Ready to Get Started?
              </h3>
            </div>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's transform your ideas into reality with our expert development and design services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-orange-500 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <HiSparkles className="text-xl group-hover:scale-125 transition-transform duration-300" />
                  Start Your Project
                </span>
              </button>
              <button className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <HiLightningBolt className="text-xl" />
                  Get Free Quote
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;