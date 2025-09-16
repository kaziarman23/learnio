import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiSparkles, HiNewspaper, HiTrendingUp } from "react-icons/hi";
import { BsStars, BsArrowRight, BsEye } from "react-icons/bs";
import { FaGripfire, FaCalendar, FaUser } from "react-icons/fa";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-100, 100]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col self-auto overflow-hidden pb-16 sm:pb-20 lg:pb-28 antialiased bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="h-full w-full"
      >
        <motion.div className="mb-12 sm:mb-16 lg:mb-20 flex flex-row-reverse space-x-8 sm:space-x-12 lg:space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-8 sm:mb-10 lg:mb-10 flex flex-row space-x-8 sm:space-x-12 lg:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-8 sm:space-x-12 lg:space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const ctaRef = useRef(null);

  // Statistics data
  const stats = [
    { number: "500+", label: "Articles", icon: HiNewspaper },
    { number: "1M+", label: "Readers", icon: BsEye },
    { number: "Weekly", label: "Updates", icon: FaCalendar },
    { number: "Expert", label: "Authors", icon: FaUser }
  ];

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
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
        delay: 0.3
      }
    );

    // Title animation with character reveal
    gsap.fromTo(titleRef.current,
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
        ease: "power3.out",
        delay: 0.6
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
        delay: 0.9
      }
    );

    // Stats animation
    gsap.fromTo(statsRef.current,
      { 
        y: 40, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.2
      }
    );

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        delay: 1.5
      }
    );

  }, []);

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
    <div 
      ref={headerRef}
      className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      {/* Enhanced Header Content */}
      <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
        
        {/* Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-6 sm:mb-8"
        >
          <BsStars className="text-orange-500 text-sm" />
          <span className="text-orange-600 text-sm font-bold uppercase tracking-wider">
            Latest Insights
          </span>
        </div>

        {/* Enhanced Title */}
        <h1 
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6 sm:mb-8"
        >
          Insights and Updates <br /> 
          Stay Informed with{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Learnio.
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-lg opacity-50" />
          </span>
        </h1>

        {/* Enhanced Description */}
        <p 
          ref={descriptionRef}
          className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-8 sm:mb-12"
        >
          🚀 Discover the latest trends, stories, and breakthroughs in education and beyond. 
          Explore our curated articles and news, paired with engaging visuals, to inspire 
          your learning journey and keep you up to date with industry innovations.
        </p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                ref={el => statsRef.current[index] = el}
                className="text-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
              >
                <div className="inline-flex p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg mb-2 shadow-md">
                  <IconComponent className="text-white text-sm sm:text-base" />
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button
            ref={ctaRef}
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden"
            onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <HiSparkles className="text-xl" />
              Explore All Articles
              <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <button className="group w-full sm:w-auto px-8 py-4 border-2 border-orange-300 text-orange-600 rounded-2xl font-bold text-base sm:text-lg hover:bg-orange-50 transition-all duration-300">
            <span className="flex items-center justify-center gap-3">
              <HiTrendingUp className="text-xl" />
              Trending Topics
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element.querySelector('.card-overlay'), {
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(element.querySelector('.card-title'), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(element.querySelector('.card-image'), {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(element.querySelector('.card-overlay'), {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(element.querySelector('.card-title'), {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(element.querySelector('.card-image'), {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-48 sm:h-56 lg:h-60 w-72 sm:w-80 lg:w-96 flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
      onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
      onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl h-full w-full"
      >
        <img
          src={product.thumbnail}
          className="card-image absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500"
          alt={product.title}
        />
      </a>
      
      {/* Enhanced Overlay */}
      <div className="card-overlay pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300" />
      
      {/* Enhanced Content */}
      <div className="pointer-events-none absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
        {/* Category Badge */}
        <div className="mb-2 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            <HiNewspaper className="text-xs" />
            {product.category || "Article"}
          </span>
        </div>
        
        {/* Title */}
        <h2 className="card-title text-white font-bold text-lg sm:text-xl leading-tight opacity-0 transform translate-y-5 transition-all duration-300">
          {product.title}
        </h2>
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-2 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 delay-100">
          {product.date && (
            <span className="flex items-center gap-1 text-white/80 text-xs">
              <FaCalendar className="text-xs" />
              {product.date}
            </span>
          )}
          {product.readTime && (
            <span className="flex items-center gap-1 text-white/80 text-xs">
              <BsEye className="text-xs" />
              {product.readTime}
            </span>
          )}
        </div>
      </div>

      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/50 to-purple-500/50 p-0.5">
          <div className="h-full w-full rounded-3xl bg-transparent" />
        </div>
      </div>
    </motion.div>
  );
};