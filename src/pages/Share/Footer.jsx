import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGripfire, FaArrowUp } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsRocket, BsStars } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for animations
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef([]);
  const particlesRef = useRef([]);
  const waveRef = useRef(null);
  const backToTopRef = useRef(null);

  // Enhanced toast handler
  const handleClick = () => {
    toast.error("This is not a real link!", {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
      },
      icon: '⚡',
      duration: 3000,
    });
  };

  // Back to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add rocket animation
    gsap.to(backToTopRef.current, {
      y: -20,
      rotation: 45,
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  // Footer data structure
  const footerSections = [
    {
      title: "Services",
      icon: <BsRocket className="text-lg" />,
      items: [
        { name: "Web Development", icon: "🌐" },
        { name: "App Development", icon: "📱" },
        { name: "Game Development", icon: "🎮" },
        { name: "AI Solutions", icon: "🤖" },
      ]
    },
    {
      title: "Company",
      icon: <HiSparkles className="text-lg" />,
      items: [
        { name: "About us", icon: "ℹ️" },
        { name: "Contact", icon: "📞" },
        { name: "Teach on Learnio", icon: "👨‍🏫" },
        { name: "Careers", icon: "💼" },
      ]
    },
    {
      title: "Resources",
      icon: <BsStars className="text-lg" />,
      items: [
        { name: "Blog", icon: "📝" },
        { name: "Help Center", icon: "🆘" },
        { name: "Privacy Policy", icon: "🔒" },
        { name: "Terms of Service", icon: "📋" },
      ]
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, color: "from-blue-600 to-blue-800", name: "Facebook" },
    { icon: FaInstagram, color: "from-pink-500 to-purple-600", name: "Instagram" },
    { icon: FaTwitter, color: "from-blue-400 to-blue-600", name: "Twitter" },
    { icon: FaLinkedin, color: "from-blue-700 to-blue-900", name: "LinkedIn" },
  ];

  // Scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setIsVisible(scrollPercent > 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-0';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        footerRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 3 + 1,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
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

  // Main animations
  useEffect(() => {
    // Footer entrance animation
    gsap.fromTo(footerRef.current,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.95
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Brand animation
    gsap.fromTo(brandRef.current,
      { 
        x: -100, 
        opacity: 0,
        rotationY: -45
      },
      { 
        x: 0, 
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Links stagger animation
    gsap.fromTo(linksRef.current,
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
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social icons animation
    gsap.fromTo(socialRef.current,
      { 
        scale: 0, 
        rotation: -180,
        opacity: 0
      },
      { 
        scale: 1, 
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Wave animation
    gsap.to(waveRef.current, {
      x: "100%",
      duration: 8,
      repeat: -1,
      ease: "none"
    });

  }, []);

  // Hover animations for social icons
  const handleSocialHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.3,
        y: -8,
        rotation: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Link hover animations
  const handleLinkHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        x: 10,
        color: "#f97316",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        x: 0,
        color: "#374151",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated wave */}
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
          <div 
            ref={waveRef}
            className="w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"
            style={{ width: '200%', transform: 'translateX(-100%)' }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:justify-between lg:px-12">
          {/* Enhanced Brand Section */}
          <div ref={brandRef} className="mb-12 max-w-md lg:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-75" />
                <div className="relative p-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl shadow-xl">
                  <FaGripfire className="text-2xl text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Learnio
              </h2>
            </div>
            <p className="text-gray-600 leading-7 mb-6">
              🚀 Unlock your potential with expert-led courses. Learn new skills, 
              boost your career, and pursue your passions — all in one place.
            </p>
            
            {/* Newsletter signup */}
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/80 backdrop-blur border border-gray-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
              />
              <button 
                onClick={handleClick}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-orange-500/25"
              >
                <HiLightningBolt className="text-lg" />
              </button>
            </div>
          </div>

          {/* Enhanced Links Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-16">
            {footerSections.map((section, sectionIndex) => (
              <div key={section.title} ref={el => linksRef.current[sectionIndex] = el}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-xl">
                    {section.icon}
                  </div>
                  <h6 className="text-xl font-bold text-gray-800">
                    {section.title}
                  </h6>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={item.name}
                      onClick={handleClick}
                      className="group flex items-center gap-3 cursor-pointer transition-all duration-300 hover:bg-white/50 hover:backdrop-blur p-2 rounded-lg"
                      onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
                    >
                      <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Social Section */}
        <div className="border-t border-gray-200/50 bg-white/30 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="text-center lg:text-left">
                <p className="text-gray-600 font-medium">
                  © {new Date().getFullYear()} Learnio. All rights reserved.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Made with ❤️ for learners worldwide
                </p>
              </div>
              
              {/* Enhanced Social Icons */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 mr-2">Follow us:</span>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <div
                      key={social.name}
                      ref={el => socialRef.current[index] = el}
                      onClick={handleClick}
                      className={`group relative p-3 bg-gradient-to-r ${social.color} rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                      onMouseEnter={(e) => handleSocialHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleSocialHover(e.currentTarget, false)}
                      title={social.name}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <IconComponent className="text-white text-lg relative z-10" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button
          ref={backToTopRef}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 z-50 group"
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          <FaArrowUp className="text-lg group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;