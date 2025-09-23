import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import {
  useDeleteEnrollmentsMutation,
  useGetEnrollmentsQuery,
} from "../../../../Redux/features/api/enrollmentsApi";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaMoneyCheck, FaRegTrashAlt, FaGraduationCap, FaBookOpen, FaUser, FaFilter, FaSearch } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiSparkles, HiAcademicCap, HiCurrencyDollar } from "react-icons/hi";
import { BsStars, BsCheckCircle, BsArrowRight, BsClock, BsGrid3X3Gap, BsList } from "react-icons/bs";
import { MdPending, MdVerified, MdDashboard, MdPayment } from "react-icons/md";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const StudentEnrollments = () => {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [isDeleting, setIsDeleting] = useState(null);

  // Redux state
  const { userName, userEmail, userPhoto } = useSelector((state) => state.userSlice);

  // Refs for animations
  const enrollmentsRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const filtersRef = useRef(null);
  const contentRef = useRef(null);
  const rowsRef = useRef([]);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetEnrollmentsQuery();
  const [deleteEnrollments] = useDeleteEnrollmentsMutation();

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  // Filter enrollments only for the current user
  const allEnrollments = useMemo(
    () =>
      data?.filter((enrollment) => enrollment.userEmail === userEmail) || [],
    [data, userEmail],
  );

  // Filter and search enrollments
  const filteredEnrollments = useMemo(() => {
    let filtered = allEnrollments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(enrollment =>
        enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.courseTeacherName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(enrollment => {
        switch (filterStatus) {
          case "paid":
            return enrollment.paymentStatus === "paid";
          case "unpaid":
            return enrollment.paymentStatus === "unpaid";
          case "active":
            return enrollment.enrollmentStatus === "active";
          case "pending":
            return enrollment.enrollmentStatus === "pending" || enrollment.enrollmentStatus === "pandding";
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allEnrollments, searchTerm, filterStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEnrollments = allEnrollments.length;
    const paidEnrollments = allEnrollments.filter(e => e.paymentStatus === "paid").length;
    const activeEnrollments = allEnrollments.filter(e => e.enrollmentStatus === "active").length;
    const totalSpent = allEnrollments
      .filter(e => e.paymentStatus === "paid")
      .reduce((sum, e) => sum + (parseFloat(e.coursePrice) || 0), 0);

    return [
      { number: totalEnrollments.toString(), label: "Total Enrollments", icon: FaBookOpen },
      { number: paidEnrollments.toString(), label: "Paid Courses", icon: RiMoneyDollarBoxFill },
      { number: activeEnrollments.toString(), label: "Active Courses", icon: BsCheckCircle },
      { number: `$${totalSpent.toFixed(0)}`, label: "Total Spent", icon: HiCurrencyDollar }
    ];
  }, [allEnrollments]);

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        enrollmentsRef.current?.appendChild(particle);
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

    if (enrollmentsRef.current && allEnrollments.length > 0) {
      createParticles();
    }

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, [allEnrollments.length]);

  // Main animations
  useEffect(() => {
    if (!allEnrollments.length && !isLoading) return;

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

    // Filters animation
    tl.fromTo(filtersRef.current,
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
      "-=0.4"
    );

    // Animate table rows or cards
    const elements = viewMode === 'table' ? rowsRef.current : cardsRef.current;
    if (elements.length > 0) {
      gsap.fromTo(elements,
        { 
          y: 30, 
          opacity: 0,
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1
        }
      );
    }

  }, [allEnrollments.length, viewMode, isLoading]);

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error when fetching data from getEnrollmentsQuery:", error.error);
    toast.error(error.message || "Failed to load enrollments");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Failed to load enrollments</h2>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (allEnrollments.length === 0) {
    const emptyRef = useRef(null);
    const emptyIconRef = useRef(null);
    const emptyButtonRef = useRef(null);

    useEffect(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(emptyRef.current,
        { 
          scale: 0.8, 
          opacity: 0,
          y: 50
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)"
        }
      );

      tl.fromTo(emptyIconRef.current,
        { 
          scale: 0, 
          rotation: -180
        },
        { 
          scale: 1, 
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)"
        },
        "-=0.5"
      );

      tl.fromTo(emptyButtonRef.current,
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
        "-=0.3"
      );
    }, []);

    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div 
          ref={emptyRef}
          className="relative z-10 w-11/12 max-w-lg mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 text-center">
            {/* Empty Icon */}
            <div 
              ref={emptyIconRef}
              className="inline-flex p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-2xl"
            >
              <FaGraduationCap className="text-white text-4xl" />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              No Enrollments Yet
            </h1>

            {/* Message */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              Hello {userName}! You haven't enrolled in any courses yet. Start your learning journey by exploring our amazing courses.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/courses">
                <button 
                  ref={emptyButtonRef}
                  className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Explore Courses
                    <BsArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
              
              <Link to="/dashboard/interface">
                <button className="group w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                  <span className="flex items-center justify-center gap-3">
                    <MdDashboard className="text-xl" />
                    Go to Dashboard
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle delete
  const handleDelete = async (id, courseTitle) => {
    const result = await Swal.fire({
      title: "Delete Enrollment?",
      text: `Are you sure you want to delete your enrollment for "${courseTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'rounded-2xl',
        title: 'text-xl font-bold',
        content: 'text-gray-600'
      }
    });

    if (result.isConfirmed) {
      setIsDeleting(id);
      try {
        await deleteEnrollments(id).unwrap();
        toast.success("🗑️ Enrollment deleted successfully!");
      } catch (err) {
        console.log("Failed to delete enrollment", err);
        toast.error(err.message || "Failed to delete enrollment");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // Get status badge
  const getStatusBadge = (status, type = 'payment') => {
    if (type === 'payment') {
      return status === "paid" ? (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full">
          <BsCheckCircle className="text-xs" />
          Paid
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
          <BsClock className="text-xs" />
          Unpaid
        </span>
      );
    } else {
      const isPending = status === "pending" || status === "pandding";
      return isPending ? (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
          <MdPending className="text-xs" />
          Pending
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full">
          <MdVerified className="text-xs" />
          Active
        </span>
      );
    }
  };

  // Card component for mobile/card view
  const EnrollmentCard = ({ enrollment, index }) => (
    <div
      ref={el => cardsRef.current[index] = el}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {enrollment.courseTitle}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <FaUser className="text-sm" />
            <span className="text-sm">{enrollment.courseTeacherName}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">
            ${enrollment.coursePrice}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Payment Status:</span>
          {getStatusBadge(enrollment.paymentStatus, 'payment')}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Enrollment Status:</span>
          {getStatusBadge(enrollment.enrollmentStatus, 'enrollment')}
        </div>
      </div>

      <div className="flex gap-3">
        {enrollment.paymentStatus === "unpaid" ? (
          <Link to={`/dashboard/payment/${enrollment._id}`} className="flex-1">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-sm hover:scale-105 transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <FaMoneyCheck />
                Pay Now
              </span>
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold text-sm cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              <RiMoneyDollarBoxFill />
              Paid
            </span>
          </button>
        )}

        <button
          onClick={() => handleDelete(enrollment._id, enrollment.courseTitle)}
          disabled={enrollment.paymentStatus === "paid" || isDeleting === enrollment._id}
          className={`px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
            enrollment.paymentStatus === "paid"
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600 hover:scale-105'
          }`}
        >
          {isDeleting === enrollment._id ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <FaRegTrashAlt />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div 
      ref={enrollmentsRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-orange-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Enhanced Header */}
          <div ref={headerRef} className="text-center mb-8 sm:mb-12">
            {/* Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full border border-orange-200 mb-6"
            >
              <BsStars className="text-orange-500 text-sm" />
              <span className="text-orange-600 text-sm font-bold uppercase tracking-wider">
                My Learning
              </span>
            </div>

            {/* Title */}
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
            >
              My{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Enrollments
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              📚 Track your learning progress, manage payments, and access your enrolled courses all in one place.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  ref={el => statsRef.current[index] = el}
                  className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                >
                  <div className="inline-flex p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-lg mb-3">
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

          {/* Filters and Search */}
          <div 
            ref={filtersRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses or teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Filter Dropdown */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                >
                  <option value="all">All Enrollments</option>
                  <option value="paid">Paid Only</option>
                  <option value="unpaid">Unpaid Only</option>
                  <option value="active">Active Only</option>
                  <option value="pending">Pending Only</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'table' 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-600 hover:text-orange-500'
                    }`}
                  >
                    <BsList className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'cards' 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-600 hover:text-orange-500'
                    }`}
                  >
                    <BsGrid3X3Gap className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredEnrollments.length} of {allEnrollments.length} enrollments
              </span>
              {searchTerm && (
                <span>
                  Results for "{searchTerm}"
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            {filteredEnrollments.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-6 bg-gray-100 rounded-full mb-6">
                  <FaSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  No enrollments found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No enrollments match "${searchTerm}" with the current filters.`
                    : "No enrollments match the current filters."
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'cards' ? (
              // Cards View
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEnrollments.map((enrollment, index) => (
                  <EnrollmentCard 
                    key={enrollment._id} 
                    enrollment={enrollment} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              // Table View
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">#</th>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">Course</th>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">Teacher</th>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">Price</th>
                        <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">Payment</th>
                        <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">Status</th>
                        <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredEnrollments.map((enrollment, index) => (
                        <tr 
                          key={enrollment._id}
                          ref={el => rowsRef.current[index] = el}
                          className="hover:bg-orange-50/50 transition-colors duration-200"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {enrollment.courseTitle}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaUser className="text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{enrollment.courseTeacherName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-lg font-bold text-gray-900">
                              ${enrollment.coursePrice}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {enrollment.paymentStatus === "unpaid" ? (
                              <Link to={`/dashboard/payment/${enrollment._id}`}>
                                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300">
                                  <FaMoneyCheck />
                                  Pay
                                </button>
                              </Link>
                            ) : (
                              <button
                                disabled
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-bold cursor-not-allowed"
                              >
                                <RiMoneyDollarBoxFill />
                                Paid
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(enrollment.enrollmentStatus, 'enrollment')}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleDelete(enrollment._id, enrollment.courseTitle)}
                              disabled={enrollment.paymentStatus === "paid" || isDeleting === enrollment._id}
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                enrollment.paymentStatus === "paid"
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-red-500 text-white hover:bg-red-600 hover:scale-105'
                              }`}
                            >
                              {isDeleting === enrollment._id ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <FaRegTrashAlt />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollments;