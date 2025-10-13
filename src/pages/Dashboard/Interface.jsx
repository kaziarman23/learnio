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
  const mainContainerRef = useRef(null);
  const typewriterWrapperRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const listItemsRef = useRef([]);

  // states
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK query hooks
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Fetching user data
  const user = useMemo(
    () => data?.find((user) => user.userEmail === userEmail) || {},
    [data, userEmail],
  );

  // --- GSAP Animation Timeline ---
  useEffect(() => {
    if (
      !user.userRole ||
      !typewriterWrapperRef.current ||
      !contentWrapperRef.current
    )
      return;

    const cleanupEventListeners = [];
    const tl = gsap.timeline();
    const listItems = listItemsRef.current.filter((item) => item !== null);

    // Set initial states
    gsap.set([typewriterWrapperRef.current, contentWrapperRef.current], {
      opacity: 0,
      y: 30,
    });
    gsap.set(listItems, {
      opacity: 0,
      x: -20,
      scale: 0.98,
    });

    // Main content animation sequence
    tl.to(typewriterWrapperRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    }).to(
      contentWrapperRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    );

    // Animate list items with stagger
    listItems.forEach((item, index) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.1)",
        delay: 1.2 + index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Add hover animations
      const handleMouseEnter = () => {
        gsap.to(item, {
          scale: 1.02,
          x: 5,
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          scale: 1,
          x: 0,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          duration: 0.3,
        });
      };

      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
      cleanupEventListeners.push({ item, handleMouseEnter, handleMouseLeave });
    });

    // Floating animation for the container
    gsap.to(mainContainerRef.current, {
      y: 5,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Proper cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      cleanupEventListeners.forEach(
        ({ item, handleMouseEnter, handleMouseLeave }) => {
          item.removeEventListener("mouseenter", handleMouseEnter);
          item.removeEventListener("mouseleave", handleMouseLeave);
        },
      );
    };
  }, [user.userRole]);

  // --- Role Content Logic ---
  const getRoleContent = () => {
    switch (user.userRole) {
      case "admin":
        return {
          title:
            "Your **Admin Dashboard** is your central command center for overseeing and optimizing the platform's operations.",
          items: [
            {
              title: "Monitor User Activity:",
              description:
                "Access a comprehensive overview of all registered users, including teachers, students, and other administrators.",
            },
            {
              title: "Approve Courses for Publication:",
              description:
                "Review and approve courses submitted by teachers to ensure quality and relevance before they go live.",
            },
            {
              title: "Track Metrics and Insights:",
              description:
                "View key performance metrics, such as course engagement and user growth, to make informed decisions.",
            },
          ],
        };
      case "teacher":
        return {
          title:
            "As a teacher, your **Dashboard** is your dedicated hub for managing your teaching journey.",
          items: [
            {
              title: "Manage Your Courses:",
              description:
                "Create and add new courses to share your expertise. Edit and update course content effortlessly to ensure it's always relevant and engaging.",
            },
            {
              title: "Monitor Enrollments:",
              description:
                "Stay informed by tracking how many students have enrolled in each of your courses, providing insights into their popularity and impact.",
            },
            {
              title: "Activate Course Access:",
              description:
                "Manage student access by activating courses for students who have successfully completed their payments, ensuring a seamless learning experience.",
            },
          ],
        };
      default:
        return {
          title:
            "As a student, your **Dashboard** is your personal hub for managing your learning journey.",
          items: [
            {
              title: "Manage Your Profile:",
              description:
                "View and update your profile information to keep it accurate and up-to-date.",
            },
            {
              title: "Access Your Courses:",
              description:
                "Explore all your enrolled courses. Seamlessly enroll in new courses and complete payments for enrollment directly through the dashboard.",
            },
            {
              title: "Track Your Payment History:",
              description:
                "Stay informed by reviewing your payment history, ensuring transparency and easy access to your financial records.",
            },
          ],
        };
    }
  };

  const roleContent = getRoleContent();

  if (isError) {
    console.error("Error when fetching data from getusersQuery: ", error);
    toast.error(
      error?.data?.message || error?.error || "Failed to load user data.",
    );
    return null;
  }

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mainContainerRef}
      // 🎨 Applied the requested gradient to the main background
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 text-gray-900 sm:p-8"
    >
      {/* Animated background elements (Updated colors to match the theme) */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute left-10 top-10 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-52 w-52 animate-pulse rounded-full bg-gradient-to-br from-sky-400 to-blue-400 blur-3xl delay-1000"></div>
      </div>

      {/* Content Card */}
      <div className="relative z-10 mx-auto w-full max-w-5xl rounded-3xl border border-white/50 bg-white/70 p-6 backdrop-blur-lg sm:p-10">
        {/* Typewriter section */}
        <div
          ref={typewriterWrapperRef}
          className="mb-6 p-2 text-center text-xl font-extrabold sm:text-3xl xl:text-5xl"
        >
          <div className="relative inline-block">
            <Typewriter
              options={{
                strings: `Welcome to your ${user.userRole ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1) : ""} Dashboard, ${userName}`,
                autoStart: true,
                cursor: "|",
                // 🎨 Updated cursor color
                cursorClassName: "animate-pulse text-cyan-600 text-5xl",
              }}
            />
            {/* Animated underline/glow (Updated colors) */}
            <div className="absolute -inset-1 animate-pulse rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 opacity-20 blur-md"></div>
          </div>
        </div>

        {/* Content section */}
        <div
          ref={contentWrapperRef}
          className="mt-5 space-y-6 text-base xl:mt-10 xl:text-lg"
        >
          <h1 className="font-semibold leading-snug text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: roleContent.title }} />
            <br />
            <span className="mt-2 block text-xl font-bold text-gray-900">
              Key Features:
            </span>
          </h1>

          <ul className="space-y-4">
            {roleContent.items.map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  listItemsRef.current[index] = el;
                }}
                className="group flex cursor-pointer items-start space-x-4 rounded-xl border border-gray-400 bg-white p-5 shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl"
              >
                {/* Decorative Icon/Bullet (Updated gradient) */}
                <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:scale-150"></div>

                <div className="flex-1">
                  <span className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                    {item.title}
                  </span>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interface;
