import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetCourseQuery } from "../../Redux/features/api/coursesApi";
import Loading from "../../components/Loading/Loading";
import { FaGripfire, FaUsers, FaStar, FaClock, FaPlay, FaBookmark, FaShare } from "react-icons/fa";
import { HiSparkles, HiAcademicCap, HiShieldCheck, HiLightningBolt } from "react-icons/hi";
import { BsStars, BsCheckCircle, BsArrowRight, BsArrowLeft, BsCalendar3 } from "react-icons/bs";
import { MdVerified, MdLanguage, MdAccessTime, MdGroup } from "react-icons/md";
import { useSelector } from "react-redux";
import { usePostEnrollmentsMutation } from "../../Redux/features/api/enrollmentsApi";
import Swal from "sweetalert2";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const CourseDetails = () => {
  // States
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const { id } = useParams();
  const location = useLocation();
  const pastLocation = location?.state?.from || '/courses';
  const navigate = useNavigate();

  // Refs for animations
  const detailsRef = useRef(null);
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const detailsCardsRef = useRef([]);
  const featuresRef = useRef([]);
  const buttonsRef = useRef([]);
  const brandRef = useRef(null);
  const particlesRef = useRef([]);

  // Redux state
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice,
  );

  // RTK query hooks
  const { data: course, isLoading, isError, error } = useGetCourseQuery(id);
  const { data: usersData } = useGetUsersQuery();
  const [postEnrollments] = usePostEnrollmentsMutation();

  // Collecting user data
  const user = useMemo(
    () => usersData?.find((user) => user.userEmail === userEmail),
    [usersData, userEmail],
  );
  const userRole = user?.userRole;

  // Course features/highlights
  const courseFeatures = [
    {
      icon: <HiAcademicCap className="text-xl" />,
      title: "Expert Instructor",
      description: "Learn from industry professionals",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MdAccessTime className="text-xl" />,
      title: "Lifetime Access",
      description: "Learn at your own pace",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MdVerified className="text-xl" />,
      title: "Certificate",
      description: "Get certified upon completion",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <HiShieldCheck className="text-xl" />,
      title: "Money Back",
      description: "30-day money back guarantee",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        detailsRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -120,
          opacity: 0,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 3
        });
      }
    };

    if (detailsRef.current && course) {
      createParticles();
    }

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, [course]);

  // Main animations
  useEffect(() => {
    if (!course) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Hero section animation
    tl.fromTo(heroRef.current,
      { 
        y: 100, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out"
      }
    );

    // Image animation with 3D effect
    tl.fromTo(imageRef.current,
      { 
        scale: 0.8, 
        opacity: 0,
        rotationY: -30
      },
      { 
        scale: 1, 
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.7"
    );

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
      },
      "-=0.5"
    );

    // Title animation
    tl.fromTo(titleRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3"
    );

    // Content animation
    tl.fromTo(contentRef.current,
      { 
        y: 60, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Details cards stagger
    tl.fromTo(detailsCardsRef.current,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.9
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

    // Features animation
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
      "-=0.4"
    );

    // Buttons animation
    tl.fromTo(buttonsRef.current,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)"
      },
      "-=0.2"
    );

    // Brand animation
    tl.fromTo(brandRef.current,
      { 
        scale: 0.5, 
        opacity: 0,
        rotationY: 45
      },
      { 
        scale: 1, 
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      },
      "-=0.8"
    );

  }, [course]);

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error:", error);
    toast.error(error.message || "Failed to load course details");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Handle Enrollments
  const handleEnrollmentBtn = async (data) => {
    if (userRole === "admin" || userRole === "teacher") {
      toast.error("Only students can enroll in courses.");
      return;
    }

    const result = await Swal.fire({
      title: "Enroll in Course?",
      text: `You're about to enroll in "${data.courseTitle}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Enroll Now!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-xl font-bold',
        content: 'text-gray-600'
      }
    });

    if (result.isConfirmed) {
      setIsEnrolling(true);
      
      const enrollmentInfo = {
        courseId: data._id,
        courseTitle: data.courseTitle,
        courseTeacherName: data.courseTeacherName,
        courseTeacherEmail: data.courseTeacherEmail,
        courseImage: data.courseImage,
        coursePrice: data.coursePrice,
        userName,
        userEmail,
        userPhoto,
        paymentStatus: "unpaid",
        enrollmentStatus: "pending",
      };

      try {
        await postEnrollments(enrollmentInfo).unwrap();
        
        // Success animation
        gsap.to(buttonsRef.current[0], {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });

        navigate(-1);
        toast.success("🎉 Enrollment successful! Welcome to the course!");
      } catch (error) {
        console.log("Error:", error);
        toast.error(error.message || "Enrollment failed. Please try again.");
      } finally {
        setIsEnrolling(false);
      }
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

  // Feature hover animations
  const handleFeatureHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -5,
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

  // Image hover effect
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={detailsRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto my-10 flex h-full w-11/12 max-w-7xl flex-col gap-8 sm:gap-12 lg:w-4/5">
        
        {/* Enhanced Hero Section */}
        <div ref={heroRef} className="relative">
          {/* Course Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <img
              ref={imageRef}
              src={course.courseImage}
              alt={course.courseTitle}
              className="h-full w-full object-cover transition-transform duration-500"
              onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl hover:scale-110 transition-all duration-300">
                <FaPlay className="text-2xl sm:text-3xl text-orange-500 ml-1" />
              </button>
            </div>

            {/* Course Badge */}
            <div 
              ref={badgeRef}
              className="absolute top-4 sm:top-6 left-4 sm:left-6 inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 backdrop-blur-sm rounded-full border border-orange-200"
            >
              <BsStars className="text-orange-500 text-sm" />
              <span className="text-orange-600 text-xs sm:text-sm font-bold">PREMIUM COURSE</span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2">
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300">
                <FaBookmark className="text-lg" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300">
                <FaShare className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* Course Header */}
            <div>
              <h1 
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
              >
                {course.courseTitle}
              </h1>
              
              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MdVerified className="text-blue-500" />
                  <span className="text-sm sm:text-base font-medium">{course.courseTeacherName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-green-500" />
                  <span className="text-sm sm:text-base">{course.courseStudentsCount} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm sm:text-base">4.8 (1,234 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdLanguage className="text-purple-500" />
                  <span className="text-sm sm:text-base">English</span>
                </div>
              </div>
            </div>

            {/* Course Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: MdVerified, label: "Instructor", value: course.courseTeacherName, color: "text-blue-500" },
                { icon: MdGroup, label: "Email", value: course.courseTeacherEmail, color: "text-green-500" },
                { icon: FaUsers, label: "Students", value: `${course.courseStudentsCount} enrolled`, color: "text-purple-500" },
                { icon: BsCalendar3, label: "Last Updated", value: "2 weeks ago", color: "text-orange-500" }
              ].map((detail, index) => {
                const IconComponent = detail.icon;
                return (
                  <div
                    key={detail.label}
                    ref={el => detailsCardsRef.current[index] = el}
                    className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-xl">
                        <IconComponent className={`text-lg ${detail.color}`} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium">{detail.label}</p>
                        <p className="text-sm sm:text-base font-bold text-gray-800">{detail.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Course Description */}
            <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">About This Course</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {showFullDescription 
                  ? course.courseDescription 
                  : `${course.courseDescription?.slice(0, 200)}...`
                }
              </p>
              {course.courseDescription?.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-4 text-orange-500 hover:text-orange-600 font-semibold text-sm sm:text-base"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {courseFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={el => featuresRef.current[index] = el}
                  className="group p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">{feature.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* Price Card */}
            <div className="sticky top-6 p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                  ${course.coursePrice}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">One-time payment</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  ref={el => buttonsRef.current[0] = el}
                  onClick={() => handleEnrollmentBtn(course)}
                  disabled={isEnrolling}
                  className={`group relative w-full transform rounded-2xl px-6 py-4 text-sm sm:text-base font-bold text-white shadow-2xl transition-all duration-300 focus:outline-none overflow-hidden ${
                    isEnrolling 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  }`}
                  onMouseEnter={(e) => !isEnrolling && handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) => !isEnrolling && handleButtonHover(e.currentTarget, false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isEnrolling ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <HiSparkles className="text-xl" />
                        Enroll Now
                        <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>

                <button
                  ref={el => buttonsRef.current[1] = el}
                  onClick={() => navigate(pastLocation)}
                  className="group w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-sm sm:text-base hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
                >
                  <span className="flex items-center justify-center gap-3">
                    <BsArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Courses
                  </span>
                </button>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <HiShieldCheck className="text-lg" />
                  <span className="text-sm font-medium">30-day money back guarantee</span>
                </div>
              </div>
            </div>

            {/* Learnio Brand */}
            <div 
              ref={brandRef}
              className="text-center p-6 sm:p-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl text-white"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FaGripfire className="text-2xl" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">Learnio</span>
              </div>
              <p className="text-sm sm:text-base opacity-90">
                Join thousands of learners advancing their careers with expert-led courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;