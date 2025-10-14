import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { usePostTeachersMutation } from "../../Redux/features/api/teachersApi";
import Loading from "../../components/Loading/Loading";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaTags,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import {
  HiSparkles,
  HiAcademicCap,
  HiShieldCheck,
  HiLightningBolt,
} from "react-icons/hi";
import {
  BsStars,
  BsCheckCircle,
  BsArrowRight,
  BsArrowLeft,
} from "react-icons/bs";
import { MdVerified, MdPending, MdDashboard } from "react-icons/md";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const TeacherEnrollment = () => {
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form hook
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  // Redux state
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice,
  );

  // Refs for animations
  const enrollmentRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const benefitsRef = useRef([]);
  const particlesRef = useRef([]);

  // RTK query hooks
  const { data, refetch } = useGetUsersQuery();
  const [postTeachers, { isLoading, isError, error }] =
    usePostTeachersMutation();

  // Watch form values
  const watchedValues = watch();

  // Fetching user data
  const user = useMemo(
    () =>
      data?.find(
        (user) => user.userEmail.toLowerCase() === userEmail.toLowerCase(),
      ),
    [data, userEmail],
  );

  const isTeacher = useMemo(() => user?.isTeacher, [user]);
  const userRole = useMemo(() => user?.userRole, [user]);

  // Teacher benefits
  const teacherBenefits = [
    {
      icon: <HiAcademicCap className="text-2xl" />,
      title: "Share Knowledge",
      description: "Inspire and educate the next generation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <HiLightningBolt className="text-2xl" />,
      title: "Flexible Schedule",
      description: "Teach at your own pace and time",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <HiShieldCheck className="text-2xl" />,
      title: "Verified Profile",
      description: "Get verified instructor badge",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <HiSparkles className="text-2xl" />,
      title: "Earn Revenue",
      description: "Monetize your expertise",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        enrollmentRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -150,
          opacity: 0,
          duration: Math.random() * 5 + 4,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 4,
        });
      }
    };

    if (enrollmentRef.current && !isTeacher) {
      createParticles();
    }

    return () => {
      particlesRef.current.forEach((particle) => particle.remove());
      particlesRef.current = [];
    };
  }, [isTeacher]);

  // Main animations for enrollment form
  useEffect(() => {
    if (isTeacher !== null && isTeacher !== undefined) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Badge animation
    tl.fromTo(
      badgeRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: -180,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
      },
    );

    // Title animation
    tl.fromTo(
      titleRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // Benefits animation
    tl.fromTo(
      benefitsRef.current,
      {
        y: 40,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.3",
    );

    // Form animation
    tl.fromTo(
      formRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // Image animation
    tl.fromTo(
      imageRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotation: -45,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.7",
    );

    // Input fields stagger
    tl.fromTo(
      inputsRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5",
    );
  }, [isTeacher]);

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle Error
  if (isError) {
    console.log("Error:", error.error);
    toast.error(error.message || "An error occurred");
  }

  // Status Components
  const StatusCard = ({
    icon,
    title,
    message,
    buttonText,
    status,
    onButtonClick,
  }) => {
    const statusRef = useRef(null);
    const statusIconRef = useRef(null);
    const statusButtonRef = useRef(null);

    useEffect(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        statusRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
        },
      );

      tl.fromTo(
        statusIconRef.current,
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.5",
      );

      tl.fromTo(
        statusButtonRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3",
      );
    }, []);

    const getStatusColor = () => {
      switch (status) {
        case "pending":
          return "from-yellow-500 to-orange-500";
        case "approved":
          return "from-green-500 to-emerald-500";
        case "rejected":
          return "from-red-500 to-pink-500";
        default:
          return "from-blue-500 to-cyan-500";
      }
    };

    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
          <div
            className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div ref={statusRef} className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            {/* Status Icon */}
            <div
              ref={statusIconRef}
              className={`inline-flex bg-gradient-to-r p-6 ${getStatusColor()} mb-6 rounded-full shadow-2xl`}
            >
              <div className="text-4xl text-white">{icon}</div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              {title}
            </h1>

            {/* Message */}
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              {message}
            </p>

            {/* Action Button */}
            <button
              ref={statusButtonRef}
              onClick={onButtonClick}
              className="group w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg"
            >
              <span className="flex items-center justify-center gap-3">
                <MdDashboard className="text-xl" />
                {buttonText}
                <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle teacher states
  if (isTeacher === "pending") {
    return (
      <StatusCard
        icon={<MdPending />}
        title="Application Under Review"
        message="Thank you for your interest in becoming a teacher! Our admin team is currently reviewing your application. We'll notify you once the review is complete."
        buttonText="Go to Dashboard"
        status="pending"
        onButtonClick={() => navigate("/dashboard/interface")}
      />
    );
  } else if (isTeacher === true) {
    return (
      <StatusCard
        icon={<FaCheckCircle />}
        title="Welcome, Teacher!"
        message="🎉 Congratulations! You are now a verified teacher on Learnio. Start creating courses and sharing your knowledge with students worldwide."
        buttonText="Go to Dashboard"
        status="approved"
        onButtonClick={() => navigate("/dashboard/interface")}
      />
    );
  } else if (isTeacher === false) {
    return (
      <StatusCard
        icon={<FaTimes />}
        title="Application Not Approved"
        message="Unfortunately, your teacher application was not approved this time. Please review our requirements and consider reapplying with additional qualifications."
        buttonText="Go to Dashboard"
        status="rejected"
        onButtonClick={() => navigate("/dashboard/interface")}
      />
    );
  }

  // Handle form submit
  const onSubmit = async (data) => {
    if (userRole === "admin" || userRole === "teacher") {
      toast.error("Admins and teachers cannot apply to become teachers.");
      return;
    }

    setIsSubmitting(true);

    // Animate button
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    const teacherInfo = {
      ...data,
      userEmail,
      userPhoto: userPhoto,
      isTeacher: "pending",
    };

    try {
      await postTeachers(teacherInfo).unwrap();
      await refetch();

      // Success animation
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      navigate(-1);
      toast.success(
        "🎉 Application submitted successfully! We'll review it soon.",
      );
    } catch (error) {
      console.log("Error submitting teacher application:", error);
      toast.error(
        error.message || "Failed to submit application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input focus animations
  const handleInputFocus = (element, isFocusing) => {
    if (isFocusing) {
      gsap.to(element, {
        scale: 1.02,
        borderColor: "#f97316",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        borderColor: "#000000",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Benefit hover effects
  const handleBenefitHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={enrollmentRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 mx-auto h-full w-11/12 max-w-6xl py-12 sm:py-16 lg:py-20">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12 text-center sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 sm:mb-8"
          >
            <BsStars className="text-sm text-orange-500" />
            <span className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Teacher Application
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="mb-6 text-3xl font-bold text-gray-800 sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Become a{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Teacher
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:mb-12 sm:text-lg lg:text-xl">
            🎓 Join our community of expert instructors and share your knowledge
            with students worldwide. Create courses, inspire learners, and build
            your teaching career.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {teacherBenefits.map((benefit, index) => (
              <div
                key={benefit.title}
                ref={(el) => (benefitsRef.current[index] = el)}
                className="group cursor-pointer rounded-2xl border border-gray-300 bg-white/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl sm:p-6"
                onMouseEnter={(e) => handleBenefitHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleBenefitHover(e.currentTarget, false)}
              >
                <div
                  className={`inline-flex bg-gradient-to-r p-3 ${benefit.color} mb-4 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <div className="text-white">{benefit.icon}</div>
                </div>
                <h3 className="mb-2 text-sm font-bold text-gray-800 sm:text-base">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Form */}
        <div
          ref={formRef}
          className="mx-auto max-w-4xl rounded-3xl border border-gray-300 bg-white/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-12"
        >
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              Teacher Application Form
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Fill out the form below to apply for our teacher program
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Profile Image */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  ref={imageRef}
                  src={userPhoto}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white shadow-2xl sm:h-40 sm:w-40"
                />
                <div className="absolute bottom-2 right-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-2">
                  <MdVerified className="text-lg text-white" />
                </div>
              </div>
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Input */}
              <div ref={(el) => (inputsRef.current[0] = el)}>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border-2 border-black bg-gray-50 py-3 pl-10 pr-4 text-sm sm:text-base"
                    defaultValue={userName}
                    {...register("userName")}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div ref={(el) => (inputsRef.current[1] = el)}>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEnvelope className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border-2 border-black bg-gray-50 py-3 pl-10 pr-4 text-sm sm:text-base"
                    defaultValue={userEmail}
                    {...register("userEmail")}
                  />
                </div>
              </div>
            </div>

            {/* Experience & Category Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Experience Input */}
              <div ref={(el) => (inputsRef.current[2] = el)}>
                <label
                  htmlFor="experience"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Teaching Experience *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaBriefcase className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    name="experience"
                    id="experience"
                    className="w-full rounded-xl border-2 border-black py-3 pl-10 pr-4 text-sm transition-all duration-300 focus:border-orange-500 focus:outline-none sm:text-base"
                    onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                    onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                    {...register("experience", {
                      required: "Experience level is required",
                    })}
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="midLevel">Mid-Level (2-5 years)</option>
                    <option value="experienced">Experienced (5+ years)</option>
                  </select>
                </div>
                {errors.experience && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-xs">
                      !
                    </span>
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* Category Input */}
              <div ref={(el) => (inputsRef.current[3] = el)}>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Expertise Category *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaTags className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    name="category"
                    id="category"
                    className="w-full rounded-xl border-2 border-black py-3 pl-10 pr-4 text-sm transition-all duration-300 focus:border-orange-500 focus:outline-none sm:text-base"
                    onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                    onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select your expertise</option>
                    <option value="web-development">Web Development</option>
                    <option value="app-development">App Development</option>
                    <option value="game-development">Game Development</option>
                    <option value="uiux-designer">UI/UX Design</option>
                    <option value="machine-learning">Machine Learning</option>
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-xs">
                      !
                    </span>
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Form Preview */}
            {(watchedValues.experience || watchedValues.category) && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-orange-800">
                  <BsCheckCircle className="text-orange-500" />
                  Application Preview
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  {watchedValues.experience && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Experience:
                      </span>
                      <span className="ml-2 capitalize text-gray-600">
                        {watchedValues.experience}
                      </span>
                    </div>
                  )}
                  {watchedValues.category && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Category:
                      </span>
                      <span className="ml-2 capitalize text-gray-600">
                        {watchedValues.category.replace("-", " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className={`group relative flex-1 transform overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-300 focus:outline-none sm:text-base ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 hover:from-orange-600 hover:to-orange-700"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaGraduationCap className="text-xl" />
                      Submit for Review
                      <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="group rounded-2xl border-2 border-gray-300 px-6 py-4 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 sm:text-base"
              >
                <span className="flex items-center justify-center gap-3">
                  <BsArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
                  Go Back
                </span>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <HiShieldCheck className="text-lg" />
                <span className="text-sm font-medium">
                  Your application will be reviewed within 24-48 hours
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherEnrollment;
