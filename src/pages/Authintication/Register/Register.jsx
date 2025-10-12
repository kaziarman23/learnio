import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { HiSparkles, HiShieldCheck, HiAcademicCap } from "react-icons/hi";
import { BsStars, BsCheckCircle, BsArrowRight } from "react-icons/bs";
import { MdSecurity, MdVerified } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser, googleSignIn } from "../../../Redux/features/userSlice";
import { useAddUserMutation } from "../../../Redux/features/api/usersApi";
import toast from "react-hot-toast";

const Register = () => {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'loading', 'success'
  
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  // Refs for animations
  const registerRef = useRef(null);
  const leftSideRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const featuresRef = useRef([]);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);

  // Watch form values for real-time validation feedback
  const watchedValues = watch();

  // Features data
  const features = [
    {
      icon: <HiAcademicCap className="text-2xl" />,
      title: "Premium Learning",
      description: "Access to 1000+ expert-led courses",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <HiShieldCheck className="text-2xl" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise security",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MdVerified className="text-2xl" />,
      title: "Verified Certificates",
      description: "Industry-recognized completion certificates",
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Statistics data
  const stats = [
    { number: "50K+", label: "Students" },
    { number: "1000+", label: "Courses" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        registerRef.current?.appendChild(particle);
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

    createParticles();

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  // Main animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Left side animation
    tl.fromTo(leftSideRef.current,
      { 
        x: -100, 
        opacity: 0,
        scale: 0.95
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Form container animation
    tl.fromTo(formRef.current,
      { 
        x: 100, 
        opacity: 0,
        scale: 0.95
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.7"
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
      "-=0.5"
    );

    // Input fields stagger animation
    tl.fromTo(inputsRef.current,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
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

    // Stats animation
    tl.fromTo(statsRef.current,
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
      "-=0.2"
    );

  }, []);

  // Handle form submit
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setRegistrationStep('loading');

    // Animate button
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });

    try {
      const result = await dispatch(createUser(data)).unwrap();
      console.log(result);

      // Send data to server
      const userInfo = {
        userName: data.userName,
        userPhoto: data.userPhoto,
        userEmail: data.userEmail,
        userRole: "student",
        isTeacher: null,
        experience: null,
        category: null,
      };
      await addUser(userInfo);

      setRegistrationStep('success');
      reset();
      
      // Animate success
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

      toast.success("Registration Successful! Welcome to Learnio!");
    } catch (error) {
      console.log("Error:", error);
      setRegistrationStep('form');
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsSubmitting(true);
    
    try {
      const data = await dispatch(googleSignIn()).unwrap();
      
      const userInfo = {
        userName: data.userName,
        userPhoto: data.userPhoto,
        userEmail: data.userEmail,
        userRole: "student",
        isTeacher: null,
        experience: null,
        category: null,
      };
      await addUser(userInfo);

      reset();
      navigate("/");
      toast.success("Registration Successful! Welcome to Learnio!");
    } catch (error) {
      reset();
      console.log("Error:", error);
      toast.error(error.message || "Google registration failed.");
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
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        borderColor: "#000000",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Feature hover effects
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

  return (
    <div 
      ref={registerRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 p-4 font-sans sm:p-6 lg:p-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl border border-gray-300 lg:grid lg:grid-cols-5">
          
          {/* Left side: Enhanced Welcome Section */}
          <div 
            ref={leftSideRef}
            className="lg:col-span-2 relative flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 p-6 text-center sm:p-8 md:p-12 text-white overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            
            <div className="relative z-10 w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-gray-300 mb-6">
                <BsStars className="text-sm" />
                <span className="text-sm font-bold">JOIN LEARNIO</span>
              </div>

              {/* Main Content */}
              <div className="space-y-6 mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Start Your Learning Journey Today!
                </h2>
                <p className="text-base sm:text-lg opacity-90 leading-relaxed max-w-md mx-auto">
                  🚀 Join thousands of learners and unlock your potential with our expert-led courses, interactive content, and supportive community.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    ref={el => featuresRef.current[index] = el}
                    className="group flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-300 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    onMouseEnter={(e) => handleFeatureHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleFeatureHover(e.currentTarget, false)}
                  >
                    <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-sm sm:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm opacity-75">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    ref={el => statsRef.current[index] = el}
                    className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-gray-300"
                  >
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm opacity-75">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Enhanced Register Form */}
          <div ref={formRef} className="lg:col-span-3 p-6 sm:p-8 md:p-12">
            
            {/* Form Header */}
            <div className="mb-8">
              <h1 
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              >
                Create Your Account
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Fill in your details below to get started with your learning journey
              </p>
            </div>

            {registrationStep === 'success' ? (
              // Success State
              <div className="text-center py-8">
                <div className="inline-flex p-6 bg-green-100 rounded-full mb-6">
                  <BsCheckCircle className="text-4xl text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to Learnio!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your account has been created successfully. Redirecting you to the dashboard...
                </p>
                <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              // Registration Form
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                
                {/* Name Input */}
                <div ref={el => inputsRef.current[0] = el}>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border-2 border-black pl-10 pr-4 py-3 text-sm sm:text-base transition-all duration-300 focus:border-orange-500 focus:outline-none"
                      onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                      onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                      {...register("userName", {
                        required: "Name is required",
                        maxLength: {
                          value: 14,
                          message: "Name must be less than 14 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.userName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                {/* Photo URL Input */}
                <div ref={el => inputsRef.current[1] = el}>
                  <label htmlFor="photo" className="mb-2 block text-sm font-semibold text-gray-700">
                    Profile Photo URL *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaImage className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="photo"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      className="w-full rounded-xl border-2 border-black pl-10 pr-4 py-3 text-sm sm:text-base transition-all duration-300 focus:border-orange-500 focus:outline-none"
                      onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                      onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                      {...register("userPhoto", {
                        required: "Photo URL is required",
                      })}
                    />
                  </div>
                  {errors.userPhoto && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                      {errors.userPhoto.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div ref={el => inputsRef.current[2] = el}>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border-2 border-black pl-10 pr-4 py-3 text-sm sm:text-base transition-all duration-300 focus:border-orange-500 focus:outline-none"
                      onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                      onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                      {...register("userEmail", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.userEmail && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                      {errors.userEmail.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div ref={el => inputsRef.current[3] = el}>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full rounded-xl border-2 border-black pl-10 pr-12 py-3 text-sm sm:text-base transition-all duration-300 focus:border-orange-500 focus:outline-none"
                      onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                      onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                      {...register("userPassword", {
                        required: "Password is required",
                        minLength: {
                          value: 7,
                          message: "Password must be at least 7 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Password must be less than 30 characters",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: "Must contain uppercase, lowercase, number, and special character",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.userPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                      {errors.userPassword.message}
                    </p>
                  )}
                  
                  {/* Password Strength Indicator */}
                  {watchedValues.userPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              watchedValues.userPassword?.length > i * 2 + 1
                                ? watchedValues.userPassword?.length > 8
                                  ? 'bg-green-500'
                                  : watchedValues.userPassword?.length > 6
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Password strength: {
                          watchedValues.userPassword?.length > 8 ? 'Strong' :
                          watchedValues.userPassword?.length > 6 ? 'Medium' : 'Weak'
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Register Button */}
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full transform rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 sm:px-8 sm:text-base overflow-hidden ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-105'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <HiSparkles className="text-xl" />
                        Create Account
                        <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative bg-white px-4 text-sm text-gray-500 font-medium">
                    Or continue with
                  </div>
                </div>

                {/* Google Register Button */}
                <button
                  onClick={handleGoogleRegister}
                  type="button"
                  disabled={isSubmitting}
                  className="group flex w-full transform items-center justify-center gap-3 rounded-2xl border-2 border-gray-300 bg-white px-6 py-4 text-sm font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 sm:px-8 sm:text-base"
                >
                  <FaGoogle className="h-5 w-5 text-red-500" />
                  Continue with Google
                  <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Link to Login */}
                <p className="text-center text-sm text-gray-600 pt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-orange-600 hover:text-orange-500 hover:underline transition-colors duration-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;