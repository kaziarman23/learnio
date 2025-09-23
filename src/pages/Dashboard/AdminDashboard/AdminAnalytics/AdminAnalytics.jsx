import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers } from "react-icons/fa";
import CoursePieChart from "../../../../components/CoursePieChart"; // Assuming this path is correct
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AdminAnalytics = () => {
  // Refs for DOM elements to be animated
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statCardRefs = useRef([]);
  const pieChartSectionRef = useRef(null);

  // Reusable counter animation function with number formatting
  const animateCounter = (element, target, duration = 2) => {
    gsap.fromTo(element, 
      { innerText: 0 },
      {
        innerText: target,
        duration: duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function() {
          element.innerText = Math.ceil(element.innerText).toLocaleString();
        }
      }
    );
  };

  useEffect(() => {
    // GSAP context for safe animation scoping and cleanup
    const ctx = gsap.context(() => {
      // --- Initial states for elements before they animate in ---
      gsap.set([titleRef.current, pieChartSectionRef.current], { opacity: 0, y: 50 });
      gsap.set(statCardRefs.current, { opacity: 0, y: 30, scale: 0.95 });

      // --- Main animation timeline for sequencing ---
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.2")
        .to(statCardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }, "-=0.5")
        .to(pieChartSectionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5");

      // --- Animate counters after cards are visible ---
      tl.call(() => {
        const counters = [
          { element: document.querySelector('.counter-students'), target: 2000 },
          { element: document.querySelector('.counter-teachers'), target: 36 },
          { element: document.querySelector('.counter-courses'), target: 25 }
        ];

        counters.forEach(counter => {
          if (counter.element) {
            animateCounter(counter.element, counter.target);
          }
        });
      }, [], ">-0.5");

      // --- Modern hover animations for stat cards ---
      statCardRefs.current.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              boxShadow: "0px 20px 30px -10px rgba(71, 145, 255, 0.3)", // A subtle blue glow
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
      
      // --- Floating animation for icons ---
      gsap.utils.toArray('.stat-icon').forEach((icon, index) => {
        gsap.to(icon, {
          y: -5,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.4
        });
      });

    }, containerRef);

    // Cleanup function to revert animations when the component unmounts
    return () => ctx.revert();
  }, []);

  // Data for the stat cards, making the JSX cleaner
  const stats = [
    {
      title: "Active Students",
      counterClass: "counter-students",
      Icon: FaUsers,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Instructors",
      counterClass: "counter-teachers",
      Icon: LiaChalkboardTeacherSolid,
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Ongoing Courses",
      counterClass: "counter-courses",
      Icon: SiGoogleclassroom,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 opacity-0"
    >
      <div className="max-w-7xl mx-auto my-10 flex flex-col gap-12">
        {/* --- Header Section --- */}
        <div ref={titleRef} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Real-time platform analytics and enrollment statistics.
          </p>
        </div>

        {/* --- Stats Cards Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              ref={el => (statCardRefs.current[index] = el)}
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 flex items-center gap-6 shadow-md transform-gpu cursor-pointer"
              // Default shadow for the mouseleave animation to return to
              style={{ boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
            >
              <div className={`p-4 rounded-full ${stat.bgColor}`}>
                <stat.Icon className={`w-8 h-8 ${stat.iconColor} stat-icon`} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                <p className={`text-4xl font-bold tracking-tighter ${stat.counterClass}`}>
                  0
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Pie Chart Section --- */}
        <div
          ref={pieChartSectionRef}
          className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
            Course Distribution
          </h2>
          <div className="w-full h-80 md:h-96 flex justify-center items-center">
            <CoursePieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;