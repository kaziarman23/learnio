import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers } from "react-icons/fa";
import CoursePieChart from "../../../../components/CoursePieChart";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AdminAnalytics = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statCardRefs = useRef([]);
  const pieChartSectionRef = useRef(null);
  const pieChartTitleRef = useRef(null);

  // Counter animation function
  const animateCounter = (element, target, duration = 2) => {
    gsap.fromTo(element, 
      { innerText: 0 },
      {
        innerText: target,
        duration: duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function() {
          element.innerText = Math.ceil(element.innerText);
        }
      }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, statsContainerRef.current, pieChartSectionRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(statCardRefs.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: 180
      });

      // Create main timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate main container entrance
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      
      // Animate title
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      
      // Animate stats container
      .to(statsContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3")
      
      // Animate stat cards with stagger
      .to(statCardRefs.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.3")
      
      // Animate pie chart section
      .to(pieChartSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      
      .to(pieChartTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Add hover animations for stat cards
      statCardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            transformOrigin: "center center"
          });

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              z: 20,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

      // Animate counters after cards are visible
      setTimeout(() => {
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
      }, 1500);

      // Add floating animation to icons
      const icons = document.querySelectorAll('.stat-icon');
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });
      });

      // Add pulse effect to the main container border
      gsap.to(statsContainerRef.current, {
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-[#e0cece] flex justify-center items-center opacity-0"
    >
      <div className="w-11/12 overflow-hidden my-10 flex flex-col gap-5 xl:w-4/5">
        {/* course analytics */}
        <div className="w-full rounded-2xl bg-[#c7c1c1] overflow-hidden">
          <h1 
            ref={titleRef}
            className="text-2xl text-center p-2 font-bold transform"
          >
            Enrollment Stats
          </h1>
          
          {/* stats */}
          <div>
            <div 
              ref={statsContainerRef}
              className="w-4/5 h-full mt-5 border-b-2 flex justify-center items-center flex-col gap-5 border-2 border-black rounded-2xl mx-auto p-2 shadow md:flex-row lg:flex-row lg:h-1/3 lg:w-2/3 transform"
            >
              <div 
                ref={el => statCardRefs.current[0] = el}
                className="w-full py-2 border-b-2 border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-2 xl:py-0 cursor-pointer transition-all duration-300"
              >
                <div className="stat-title">Active Students</div>
                <div className="stat-value flex items-center gap-2">
                  <span className="counter-students">0</span> 
                  <FaUsers className="stat-icon" />
                </div>
              </div>

              <div 
                ref={el => statCardRefs.current[1] = el}
                className="w-full py-2 border-b-2 border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-2 xl:py-0 cursor-pointer transition-all duration-300"
              >
                <div className="stat-title">Available Teacher</div>
                <div className="stat-value flex items-center gap-2">
                  <span className="counter-teachers">0</span> 
                  <LiaChalkboardTeacherSolid className="stat-icon" />
                </div>
              </div>

              <div 
                ref={el => statCardRefs.current[2] = el}
                className="w-full border-black flex justify-center items-center flex-col md:w-1/3 md:border-b-0 md:border-r-0 cursor-pointer transition-all duration-300"
              >
                <div className="stat-title">On Going Course</div>
                <div className="stat-value flex items-center gap-2">
                  <span className="counter-courses">0</span> 
                  <SiGoogleclassroom className="stat-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* pie chart */}
          <div 
            ref={pieChartSectionRef}
            className="space-y-3 mt-10 transform"
          >
            <h1 
              ref={pieChartTitleRef}
              className="text-2xl text-center p-2 font-bold transform"
            >
              Available Courses
            </h1>
            <CoursePieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;