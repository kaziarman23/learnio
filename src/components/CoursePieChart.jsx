import { PieChart } from "react-minimal-pie-chart";
import { useMemo, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Swal from "sweetalert2";
import Loading from "./Loading/Loading";
import { useGetCoursesQuery } from "../Redux/features/api/coursesApi";

const CoursePieChart = () => {
  // Rtk query hook
  const { data, isLoading, isError, error } = useGetCoursesQuery();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const pieChartRef = useRef(null);
  const legendRef = useRef(null);
  const legendItemRefs = useRef([]);
  const titleRefs = useRef([]);

  const legendData = [
    { title: "Web Development", color: "#E38627" },
    { title: "App Development", color: "#C13C37" },
    { title: "Game Development", color: "green" },
    { title: "Ui/Ux Designer", color: "blue" },
    { title: "Machine Learning", color: "black" },
  ];

  // fetching data
  const courses = useMemo(
    () => data?.filter((course) => course.courseStatus === "active"),
    [data]
  );

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error : ", error.error);
    // showing an error alert
    Swal.fire({
      title: "Error!",
      text: "Error while sending teacher data in the database",
      icon: "error",
      confirmButtonText: "Okay",
    });
  }

  // Filtering Courses
  const webDev = courses?.filter(
    (course) => course.category === "web-development"
  );
  const appDev = courses?.filter(
    (course) => course.category === "app-development"
  );
  const gameDev = courses?.filter(
    (course) => course.category === "game-development"
  );
  const webDes = courses?.filter(
    (course) => course.category === "uiux-designer"
  );
  const machine = courses?.filter(
    (course) => course.category === "mechine-learning"
  );

  const chartData = [
    {
      title: "Web Development",
      value: webDev?.length || 0,
      color: "#E38627",
    },
    {
      title: "App Development",
      value: appDev?.length || 0,
      color: "#C13C37",
    },
    {
      title: "Game Development",
      value: gameDev?.length || 0,
      color: "green",
    },
    {
      title: "Ui/Ux Designer",
      value: webDes?.length || 0,
      color: "blue",
    },
    {
      title: "Machine Learning",
      value: machine?.length || 0,
      color: "black",
    },
  ];

  useEffect(() => {
    if (!courses || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(pieChartRef.current, {
        opacity: 0,
        scale: 0.3,
        rotation: -180
      });

      gsap.set(legendItemRefs.current, {
        opacity: 0,
        x: -50,
        scale: 0.8
      });

      // Create main timeline
      const tl = gsap.timeline({
        onComplete: () => setAnimationComplete(true)
      });

      // Animate pie chart entrance
      tl.to(pieChartRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      })
      
      // Animate legend items with stagger
      .to(legendItemRefs.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // Add hover animations for legend items
      legendItemRefs.current.forEach((item, index) => {
        if (item) {
          const colorBox = item.querySelector('.color-box');
          const text = item.querySelector('.legend-text');

          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              x: 10,
              duration: 0.3,
              ease: "power2.out"
            });
            
            gsap.to(colorBox, {
              scale: 1.2,
              rotation: 360,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(text, {
              fontWeight: "bold",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            
            gsap.to(colorBox, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });

            gsap.to(text, {
              fontWeight: "normal",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

      // Add floating animation to pie chart
      gsap.to(pieChartRef.current, {
        y: -5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5
      });

      // Add subtle pulse effect to legend items
      gsap.to(legendItemRefs.current, {
        opacity: 0.8,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        delay: 2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [courses]);

  // Add click animation for legend items
  const handleLegendClick = (index) => {
    if (legendItemRefs.current[index]) {
      gsap.to(legendItemRefs.current[index], {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  if (!courses) return null;

  return (
    <div 
      ref={containerRef}
      className="p-5 flex justify-center items-center flex-col xl:justify-between xl:flex-row"
    >
      {/* Pie chart */}
      <div 
        ref={pieChartRef}
        className="w-full h-40 xl:w-1/2 relative"
        style={{ transformOrigin: "center center" }}
      >
        <PieChart
          data={chartData}
          label={({ dataEntry }) =>
            `${((dataEntry.value / courses.length) * 100).toFixed(1)}%`
          }
          labelStyle={{
            fontSize: "8px",
            fontWeight: "bold",
            fill: "#fff",
            textShadow: "1px 1px 1px rgba(0,0,0,0.5)"
          }}
          labelPosition={60}
          animate={animationComplete}
          animationDuration={1500}
          animationEasing="easeOutCubic"
          lineWidth={60}
          paddingAngle={2}
          startAngle={-90}
        />
      </div>

      {/* Legend */}
      <div 
        ref={legendRef}
        className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 xl:w-1/2"
      >
        {legendData.map((item, index) => (
          <div 
            key={index} 
            ref={el => legendItemRefs.current[index] = el}
            className="flex items-center cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20"
            onClick={() => handleLegendClick(index)}
          >
            <span
              className="color-box inline-block w-4 h-4 mr-3 rounded-sm shadow-sm"
              style={{ 
                backgroundColor: item.color,
                transformOrigin: "center center"
              }}
            ></span>
            <span className="legend-text text-sm md:text-base transition-all duration-300">
              {item.title}
            </span>
            <span className="ml-auto text-xs md:text-sm opacity-70 font-semibold">
              {chartData[index]?.value || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePieChart;