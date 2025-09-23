import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import Loading from "../../components/Loading/Loading";
import { useMemo, useEffect, useRef } from "react";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Interface = () => {
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const typewriterRef = useRef(null);
  const contentRef = useRef(null);
  const listItemsRef = useRef([]);
  const backgroundRef = useRef(null);

  // states
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK query hooks
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Fetching user data
  const user = useMemo(
    () => data?.find((user) => user.userEmail === userEmail) || [],
    [data, userEmail],
  );

  // GSAP Animation Timeline
  useEffect(() => {
    if (isLoading || isError || !user.userRole) return;

    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([typewriterRef.current, contentRef.current], { 
      opacity: 0, 
      y: 50 
    });
    gsap.set(listItemsRef.current, { 
      opacity: 0, 
      x: -30,
      scale: 0.95
    });

    // Animate background with gradient shift
    gsap.to(backgroundRef.current, {
      background: "linear-gradient(135deg, #e0cece 0%, #f5e6e6 50%, #ede0e0 100%)",
      duration: 2,
      ease: "power2.inOut"
    });

    // Main content animation sequence
    tl.to(typewriterRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.3
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3");

    // Animate list items with stagger
    listItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.to(item, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          delay: 1.5 + (index * 0.15),
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        });

        // Add hover animations
        const handleMouseEnter = () => {
          gsap.to(item, {
            scale: 1.02,
            x: 10,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners
        return () => {
          item.removeEventListener('mouseenter', handleMouseEnter);
          item.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });

    // Floating animation for the container
    gsap.to(containerRef.current, {
      y: -10,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

  }, [isLoading, isError, user.userRole]);

  // Cleanup ScrollTrigger on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error when fetching data from getusersQuery: ", error.error);
    toast.error(error);
    return null;
  }

  const getRoleContent = () => {
    switch (user.userRole) {
      case "admin":
        return {
          title: "Your Admin Dashboard is your central command center for overseeing and optimizing the platform's operations.",
          items: [
            {
              title: "Monitor User Activity:",
              description: "Access a comprehensive overview of all registered users, including teachers, students, and other administrators."
            },
            {
              title: "Approve Courses for Publication:",
              description: "Review and approve courses submitted by teachers to ensure quality and relevance before they go live."
            },
            {
              title: "Track Metrics and Insights:",
              description: "View key performance metrics, such as course engagement and user growth, to make informed decisions."
            }
          ]
        };
      case "teacher":
        return {
          title: "As a teacher, your Learnio Dashboard is your dedicated hub for managing your teaching journey.",
          items: [
            {
              title: "Manage Your Courses:",
              description: "Create and add new courses to share your expertise. Edit and update course content effortlessly to ensure it's always relevant and engaging."
            },
            {
              title: "Monitor Enrollments:",
              description: "Stay informed by tracking how many students have enrolled in each of your courses, providing insights into their popularity and impact."
            },
            {
              title: "Activate Course Access:",
              description: "Manage student access by activating courses for students who have successfully completed their payments, ensuring a seamless learning experience for them."
            }
          ]
        };
      default:
        return {
          title: "As a student, your Learnio Dashboard is your personal hub for managing your learning journey.",
          items: [
            {
              title: "Manage Your Profile:",
              description: "View and update your profile information to keep it accurate and up-to-date."
            },
            {
              title: "Access Your Courses:",
              description: "Explore all your enrolled courses on Learnio. Seamlessly enroll in new courses and complete payments for enrollment directly through the dashboard."
            },
            {
              title: "Track Your Payment History:",
              description: "Stay informed by reviewing your payment history, ensuring transparency and easy access to your financial records."
            }
          ]
        };
    }
  };

  const roleContent = getRoleContent();

  return (
    <div 
      ref={backgroundRef}
      className="flex h-full w-full items-center justify-center bg-[#e0cece] text-black sm:h-screen overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-400 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      <div ref={containerRef} className="mx-auto h-full w-11/12 xl:h-4/5 xl:w-4/5 relative z-10">
        {/* Typewriter section */}
        <div ref={typewriterRef} className="p-2 text-center text-base font-bold sm:text-2xl xl:text-4xl">
          <div className="relative">
            <Typewriter
              options={{
                strings: `Welcome to your Dashboard ${userName}`,
                autoStart: true,
                cursor: '|',
                cursorClassName: 'animate-pulse text-blue-600'
              }}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Content section */}
        <div ref={contentRef} className="mt-5 space-y-5 p-5 text-left text-base xl:mt-10 xl:text-lg">
          <h1 className="font-bold text-gray-800 leading-relaxed">
            {roleContent.title}
            <br />
            <span className="text-lg text-gray-600 font-medium">Here's what you can do:</span>
          </h1>

          <ul className="space-y-4">
            {roleContent.items.map((item, index) => (
              <li
                key={index}
                ref={el => listItemsRef.current[index] = el}
                className="group flex items-start space-x-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="flex-1">
                  <span className="font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="text-gray-700 ml-2 group-hover:text-gray-900 transition-colors duration-300">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-60"></div>
    </div>
  );
};

export default Interface;