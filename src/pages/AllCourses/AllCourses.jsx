import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FaCode, FaMobileAlt, FaGamepad, FaPaintBrush, FaBrain, FaFilter } from "react-icons/fa";
import { HiSparkles, HiAcademicCap, HiLightningBolt } from "react-icons/hi";
import { BsStars, BsSearch, BsGrid3X3Gap, BsList } from "react-icons/bs";
import { MdFilterList, MdSort } from "react-icons/md";
import TabItem from "./TabItem";
import { useGetCoursesQuery } from "../../Redux/features/api/coursesApi";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const AllCourses = () => {
  // States
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Refs for animations
  const coursesRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const searchRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const particlesRef = useRef([]);

  // RTK query hook
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  // Categories with enhanced information
  const categories = [
    {
      id: "web-development",
      name: "Web Development",
      shortName: "Web",
      icon: <FaCode className="text-xl" />,
      color: "from-blue-500 to-cyan-500",
      description: "Build modern web applications"
    },
    {
      id: "app-development",
      name: "App Development",
      shortName: "App",
      icon: <FaMobileAlt className="text-xl" />,
      color: "from-green-500 to-emerald-500",
      description: "Create mobile applications"
    },
    {
      id: "game-development",
      name: "Game Development",
      shortName: "Game",
      icon: <FaGamepad className="text-xl" />,
      color: "from-purple-500 to-pink-500",
      description: "Design and develop games"
    },
    {
      id: "uiux-designer",
      name: "UI/UX Design",
      shortName: "UI/UX",
      icon: <FaPaintBrush className="text-xl" />,
      color: "from-orange-500 to-red-500",
      description: "Design user experiences"
    },
    {
      id: "mechine-learning",
      name: "Machine Learning",
      shortName: "ML",
      icon: <FaBrain className="text-xl" />,
      color: "from-indigo-500 to-purple-500",
      description: "Build AI and ML solutions"
    }
  ];

  // Fetching and filtering data
  const courses = useMemo(
    () => data?.filter((course) => course.courseStatus === "active"),
    [data]
  );

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        coursesRef.current?.appendChild(particle);
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

    if (coursesRef.current) {
      createParticles();
    }

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  // Main animations
  useEffect(() => {
    if (!courses) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Badge animation
    tl.fromTo(badgeRef.current,
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
        ease: "elastic.out(1, 0.8)"
      }
    );

    // Title animation
    tl.fromTo(titleRef.current,
      { 
        y: 60, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Stats animation
    tl.fromTo(statsRef.current,
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
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    // Search and filters animation
    tl.fromTo(searchRef.current,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.2"
    );

    // Tabs animation
    tl.fromTo(tabsRef.current,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // Content animation
    tl.fromTo(contentRef.current,
      { 
        y: 40, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out"
      },
      "-=0.3"
    );

  }, [courses]);

  // Tab change animation
  const handleTabChange = (index) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        setTabIndex(index);
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

  // Filter courses by category
  const getFilteredCourses = (categoryId) => {
    return courses?.filter((course) => course.category === categoryId) || [];
  };

  // Course statistics
  const courseStats = useMemo(() => {
    if (!courses) return [];
    
    return [
      { number: courses.length.toString(), label: "Total Courses", icon: HiAcademicCap },
      { number: categories.length.toString(), label: "Categories", icon: FaFilter },
      { number: "50K+", label: "Students", icon: HiSparkles },
      { number: "95%", label: "Success Rate", icon: HiLightningBolt }
    ];
  }, [courses]);

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error:", error.error);
    toast.error(error.message || "Failed to load courses");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={coursesRef}
      className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto my-10 h-full w-11/12 lg:w-4/5 max-w-7xl">
        
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-6 sm:mb-8"
          >
            <BsStars className="text-orange-500 text-sm" />
            <span className="text-orange-600 text-sm font-bold uppercase tracking-wider">
              Course Library
            </span>
          </div>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6 sm:mb-8"
          >
            Explore All{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
            🚀 Discover our comprehensive collection of expert-led courses designed to help you master new skills and advance your career.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {courseStats.map((stat, index) => {
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
        </div>

        {/* Enhanced Search and Filters */}
        <div 
          ref={searchRef}
          className="mb-8 sm:mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  <BsGrid3X3Gap className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  <BsList className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div ref={tabsRef} className="my-8 sm:my-12">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={handleTabChange}
          >
            {/* Mobile Tabs */}
            <TabList className="flex overflow-x-auto scrollbar-hide bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 lg:hidden">
              {categories.map((category, index) => (
                <Tab
                  key={category.id}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 focus:outline-none ${
                    tabIndex === index
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${tabIndex === index ? 'bg-white/20' : 'bg-gray-100'}`}>
                    {category.icon}
                  </div>
                  {category.shortName}
                </Tab>
              ))}
            </TabList>

            {/* Desktop Tabs */}
            <TabList className="hidden lg:flex justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              {categories.map((category, index) => (
                <Tab
                  key={category.id}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium cursor-pointer transition-all duration-300 focus:outline-none ${
                    tabIndex === index
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50 hover:scale-102'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${tabIndex === index ? 'bg-white/20' : 'bg-gray-100'}`}>
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{category.name}</div>
                    <div className={`text-xs ${tabIndex === index ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.description}
                    </div>
                  </div>
                </Tab>
              ))}
            </TabList>

            {/* Tab Panels */}
            <div ref={contentRef} className="mt-8 sm:mt-12">
              {categories.map((category, index) => (
                <TabPanel key={category.id}>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl shadow-lg`}>
                        <div className="text-white">
                          {category.icon}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                          {category.name}
                        </h2>
                        <p className="text-gray-600">
                          {getFilteredCourses(category.id).length} courses available
                        </p>
                      </div>
                    </div>
                  </div>
                  <TabItem 
                    Course={getFilteredCourses(category.id)} 
                    searchTerm={searchTerm}
                    sortBy={sortBy}
                    viewMode={viewMode}
                  />
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;