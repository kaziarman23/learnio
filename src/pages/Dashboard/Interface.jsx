import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import Loading from "../../components/Loading/Loading";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import { FaChartLine, FaUsers, FaGraduationCap, FaBookOpen, FaUserGraduate, FaCog, FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import { HiSparkles, HiAcademicCap, HiShieldCheck, HiLightningBolt } from "react-icons/hi";
import { BsStars, BsCheckCircle, BsArrowRight, BsClock } from "react-icons/bs";
import { MdDashboard, MdAnalytics, MdVerified, MdPayment, MdClass } from "react-icons/md";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Interface = () => {
  // States
  const [currentTime, setCurrentTime] = useState(new Date());
  const { userName, userEmail, userPhoto } = useSelector((state) => state.userSlice);

  // Refs for animations
  const interfaceRef = useRef(null);
  const headerRef = useRef(null);
  const avatarRef = useRef(null);
  const typewriterRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);
  const quickStatsRef = useRef([]);
  const particlesRef = useRef([]);

  // RTK query hooks
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Fetching user data
  const user = useMemo(
    () => data?.find((user) => user.userEmail === userEmail) || {},
    [data, userEmail],
  );

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        interfaceRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -150,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: Math.random() * 6 + 4,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 5
        });
      }
    };

    if (interfaceRef.current && user.userRole) {
      createParticles();
    }

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, [user.userRole]);

  // Main animations
  useEffect(() => {
    if (!user.userRole) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Header animation
    tl.fromTo(headerRef.current,
      { 
        y: -80, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out"
      }
    );

    // Avatar animation
    tl.fromTo(avatarRef.current,
      { 
        scale: 0, 
        rotation: -180,
        opacity: 0
      },
      { 
        scale: 1, 
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      },
      "-=0.7"
    );

    // Typewriter container animation
    tl.fromTo(typewriterRef.current,
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
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Content animation
    tl.fromTo(contentRef.current,
      { 
        y: 80, 
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

    // Features stagger animation
    tl.fromTo(featuresRef.current,
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
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Quick stats animation
    tl.fromTo(quickStatsRef.current,
      { 
        y: 30, 
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
      "-=0.4"
    );

  }, [user.userRole]);

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error when fetching data from getusersQuery:", error.error);
    toast.error(error.message || "Failed to load dashboard data");
    return null;
  }

  // Get role-specific data
  const getRoleData = () => {
    switch (user.userRole) {
      case "admin":
        return {
          title: "Admin Command Center",
          subtitle: "Your central hub for overseeing and optimizing the platform's operations",
          icon: <FaUserShield className="text-4xl" />,
          color: "from-red-500 to-pink-500",
          features: [
            {
              icon: <FaUsers className="text-xl" />,
              title: "Monitor User Activity",
              description: "Access a comprehensive overview of all registered users, including teachers, students, and other administrators.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: <MdVerified className="text-xl" />,
              title: "Approve Courses for Publication",
              description: "Review and approve courses submitted by teachers to ensure quality and relevance before they go live.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <MdAnalytics className="text-xl" />,
              title: "Track Metrics and Insights",
              description: "View key performance metrics, such as course engagement and user growth, to make informed decisions.",
              color: "from-purple-500 to-pink-500"
            }
          ],
          stats: [
            { number: "1,234", label: "Total Users", icon: FaUsers },
            { number: "156", label: "Active Courses", icon: FaBookOpen },
            { number: "98%", label: "Platform Uptime", icon: HiShieldCheck },
            { number: "24/7", label: "Admin Support", icon: MdDashboard }
          ]
        };
      
      case "teacher":
        return {
          title: "Teacher Dashboard",
          subtitle: "Your dedicated hub for managing your teaching journey and inspiring students",
          icon: <FaChalkboardTeacher className="text-4xl" />,
          color: "from-green-500 to-emerald-500",
          features: [
            {
              icon: <FaBookOpen className="text-xl" />,
              title: "Manage Your Courses",
              description: "Create and add new courses to share your expertise. Edit and update course content effortlessly to ensure it's always relevant and engaging.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: <FaUsers className="text-xl" />,
              title: "Monitor Enrollments",
              description: "Stay informed by tracking how many students have enrolled in each of your courses, providing insights into their popularity and impact.",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: <MdClass className="text-xl" />,
              title: "Activate Course Access",
              description: "Manage student access by activating courses for students who have successfully completed their payments, ensuring a seamless learning experience.",
              color: "from-purple-500 to-pink-500"
            }
          ],
          stats: [
            { number: "12", label: "Your Courses", icon: FaBookOpen },
            { number: "456", label: "Total Students", icon: FaUserGraduate },
            { number: "4.8", label: "Average Rating", icon: BsStars },
            { number: "$2,340", label: "Monthly Earnings", icon: MdPayment }
          ]
        };
      
      default: // student
        return {
          title: "Student Learning Hub",
          subtitle: "Your personal space for managing your learning journey and achieving your goals",
          icon: <FaUser className="text-4xl" />,
          color: "from-blue-500 to-cyan-500",
          features: [
            {
              icon: <FaUser className="text-xl" />,
              title: "Manage Your Profile",
              description: "View and update your profile information to keep it accurate and up-to-date, ensuring a personalized learning experience.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <FaGraduationCap className="text-xl" />,
              title: "Access Your Courses",
              description: "Explore all your enrolled courses on Learnio. Seamlessly enroll in new courses and complete payments for enrollment directly through the dashboard.",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: <MdPayment className="text-xl" />,
              title: "Track Your Payment History",
              description: "Stay informed by reviewing your payment history, ensuring transparency and easy access to your financial records.",
              color: "from-orange-500 to-red-500"
            }
          ],
          stats: [
            { number: "8", label: "Enrolled Courses", icon: FaBookOpen },
            { number: "156", label: "Hours Learned", icon: BsClock },
            { number: "5", label: "Certificates", icon: MdVerified },
            { number: "92%", label: "Progress Rate", icon: FaChartLine }
          ]
        };
    }
  };

  const roleData = getRoleData();

  // Feature hover animation
  const handleFeatureHover = (element, isEntering) => {
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

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      ref={interfaceRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Enhanced Header */}
        <div 
          ref={headerRef}
          className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-lg"
        >
          <div className="mx-auto w-11/12 xl:w-4/5 max-w-7xl py-4 sm:py-6">
            <div className="flex items-center justify-between">
              
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div 
                  ref={avatarRef}
                  className="relative"
                >
                  <img
                    src={userPhoto}
                    alt="Profile"
                    className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-3 border-white shadow-xl"
                  />
                  <div className={`absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r ${roleData.color} rounded-full shadow-lg`}>
                    <div className="text-white text-xs">
                      {roleData.icon}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    {userName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 bg-gradient-to-r ${roleData.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {user.userRole?.toUpperCase()}
                    </span>
                    <MdVerified className="text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Time and Date */}
              <div className="hidden sm:block text-right">
                <div className="text-sm text-gray-600">
                  {formatTime(currentTime)}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <BsClock className="text-orange-500" />
                  Last updated: Now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="mx-auto w-11/12 xl:w-4/5 max-w-7xl">
            
            {/* Typewriter Section */}
            <div 
              ref={typewriterRef}
              className="text-center mb-8 sm:mb-12 lg:mb-16"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-6 sm:mb-8">
                <BsStars className="text-orange-500 text-sm" />
                <span className="text-orange-600 text-sm font-bold uppercase tracking-wider">
                  Dashboard
                </span>
              </div>

              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
                <Typewriter
                  options={{
                    strings: [`Welcome to your Dashboard, ${userName}!`],
                    autoStart: true,
                    delay: 50,
                    deleteSpeed: 25,
                  }}
                />
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                {roleData.title}
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                🚀 {roleData.subtitle}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {roleData.stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={el => quickStatsRef.current[index] = el}
                    className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                  >
                    <div className={`inline-flex p-3 bg-gradient-to-r ${roleData.color} rounded-xl shadow-lg mb-3`}>
                      <IconComponent className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features Section */}
            <div ref={contentRef}>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                Here's what you can do:
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {roleData.features.map((feature, index) => (
                  <div
                    key={feature.title}
                    ref={el => featuresRef.current[index] = el}
                    className="group p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                  >
                    {/* Feature Icon */}
                    <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Feature Content */}
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-6 flex items-center text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-semibold mr-2">Learn more</span>
                      <BsArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    {/* Bottom Accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 sm:mt-16 lg:mt-20">
              <div className="p-6 sm:p-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <HiSparkles className="text-2xl sm:text-3xl" />
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                    Ready to get started?
                  </h3>
                </div>
                <p className="text-base sm:text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Explore the sidebar navigation to access all the powerful features of your {user.userRole} dashboard.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <MdDashboard className="text-xl" />
                  <span className="font-semibold">Explore Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;