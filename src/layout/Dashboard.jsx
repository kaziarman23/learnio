import { signOut } from "firebase/auth";
import { CgLogOut, CgProfile } from "react-icons/cg";
import {
  FaChalkboardTeacher,
  FaGripfire,
  FaHome,
  FaRegCreditCard,
  FaUsers,
} from "react-icons/fa";
import { SiCoursera, SiGoogleclassroom } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/features/userSlice";
import { MdAnalytics, MdDashboard, MdPreview } from "react-icons/md";
import auth from "../Firebase/Firebase.Config";
import { HiArchiveBox, HiArchiveBoxArrowDown } from "react-icons/hi2";
import Loading from "../components/Loading/Loading";
import { VscOpenPreview } from "react-icons/vsc";
import { useGetUsersQuery } from "../Redux/features/api/usersApi";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Dashboard = () => {
  // states
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for animations
  const sidebarRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  // Redux state
  const { userEmail } = useSelector((state) => state.userSlice);

  // Rtk query hooks - MUST be called unconditionally at the top level
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Handle loading - return early after hooks
  if (isLoading) {
    return <Loading />;
  }

  // Handle error - return early after hooks
  if (isError) {
    console.log("Error When fetching user data: ", error.error);
    toast.error("Error When fetching user data");
    return null;
  }

  // finding the data - this is safe now since we return early for loading/error
  const userInfo = data?.find(
    (user) => user.userEmail.toLowerCase() === userEmail.toLowerCase(),
  );
  const user = userInfo?.userRole;

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
    );

    // Sidebar slide in
    tl.fromTo(
      sidebarRef.current,
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5",
    );

    // Menu items stagger animation
    tl.fromTo(
      menuItemsRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.3",
    );

    // Floating animation for logo
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  // Mobile menu animations
  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);

      gsap.set(mobileMenuRef.current, { display: "block" });
      gsap.set(overlayRef.current, { display: "block" });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).fromTo(
        mobileMenuRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );
    } else {
      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2")
        .set([mobileMenuRef.current, overlayRef.current], { display: "none" });

      setIsMobileMenuOpen(false);
    }
  };

  // Menu item hover animations
  const handleMenuItemHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        x: 10,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // handle logout with animation
  const handleLogout = () => {
    const tl = gsap.timeline();

    tl.to(sidebarRef.current, {
      x: -300,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });

    tl.call(() => {
      signOut(auth);
      dispatch(logoutUser());
      navigate("/");
      toast.success("Logout Successfully");
    });
  };

  const getMenuItems = () => {
    if (user === "admin") {
      return [
        { to: "/dashboard/interface", icon: MdDashboard, label: "Interface" },
        { to: "/dashboard/analytics", icon: MdAnalytics, label: "Analytics" },
        { to: "/dashboard/profile", icon: CgProfile, label: "Profile" },
        {
          to: "/dashboard/teacherRequiests",
          icon: FaChalkboardTeacher,
          label: "Teacher Requests",
        },
        {
          to: "/dashboard/courseReview",
          icon: VscOpenPreview,
          label: "Course Review",
        },
        { to: "/dashboard/users", icon: FaUsers, label: "Users" },
      ];
    } else if (user === "teacher") {
      return [
        { to: "/dashboard/interface", icon: MdDashboard, label: "Interface" },
        { to: "/dashboard/profile", icon: CgProfile, label: "Profile" },
        {
          to: "/dashboard/addCourse",
          icon: HiArchiveBoxArrowDown,
          label: "Add Course",
        },
        {
          to: "/dashboard/teacherCourses",
          icon: HiArchiveBox,
          label: "My Courses",
        },
        {
          to: "/dashboard/ReviewEnrollments",
          icon: MdPreview,
          label: "Review Enrollments",
        },
      ];
    } else {
      return [
        { to: "/dashboard/interface", icon: MdDashboard, label: "Interface" },
        { to: "/dashboard/profile", icon: CgProfile, label: "Profile" },
        {
          to: "/dashboard/studentEnrollments",
          icon: SiGoogleclassroom,
          label: "My Enrollments",
        },
        {
          to: "/dashboard/studentPaymentHistory",
          icon: FaRegCreditCard,
          label: "Payment History",
        },
      ];
    }
  };

  const commonMenuItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/courses", icon: SiCoursera, label: "All Courses" },
  ];

  const MenuItem = ({ to, icon: Icon, label, index, isMobile = false }) => (
    <NavLink
      ref={(el) => (menuItemsRef.current[index] = el)}
      to={to}
      className={({ isActive }) =>
        `group relative flex transform items-center gap-4 rounded-2xl p-4 transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            : "text-gray-700 hover:bg-white hover:shadow-md"
        } ${isMobile ? "mb-2" : "mb-3"}`
      }
      onMouseEnter={(e) =>
        !isMobile && handleMenuItemHover(e.currentTarget, true)
      }
      onMouseLeave={(e) =>
        !isMobile && handleMenuItemHover(e.currentTarget, false)
      }
    >
      <Icon className={`text-xl ${isMobile ? "text-lg" : ""}`} />
      <span className="font-medium">{label}</span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
    </NavLink>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 lg:flex-row">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleMobileMenu}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <HiMenuAlt3 className="text-xl" />
          </button>
          <div ref={logoRef} className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2">
              <FaGripfire className="text-xl text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Learnio
            </h1>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        style={{ display: "none" }}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Sidebar */}
      <div
        ref={mobileMenuRef}
        className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-white/95 shadow-2xl backdrop-blur-lg lg:hidden"
        style={{ display: "none" }}
      >
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3">
                <FaGripfire className="text-2xl text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                Learnio
              </h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="rounded-xl bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <div className="space-y-2">
            {getMenuItems().map((item, index) => (
              <MenuItem key={item.to} {...item} index={index} isMobile={true} />
            ))}

            <div className="my-6 border-t border-gray-200 pt-6">
              {commonMenuItems.map((item, index) => (
                <MenuItem
                  key={item.to}
                  {...item}
                  index={index + getMenuItems().length}
                  isMobile={true}
                />
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-2xl p-4 font-medium text-red-600 transition-all duration-300 hover:bg-red-50"
            >
              <CgLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        ref={sidebarRef}
        className="hidden w-80 border-r border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-lg lg:block"
      >
        <div className="p-8">
          {/* Logo Section */}
          <div ref={logoRef} className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg">
              <FaGripfire className="text-3xl text-white" />
              <h1 className="text-3xl font-bold text-white">Learnio</h1>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {getMenuItems().map((item, index) => (
              <MenuItem key={item.to} {...item} index={index} />
            ))}

            <div className="my-8 border-t border-gray-200 pt-8">
              {commonMenuItems.map((item, index) => (
                <MenuItem
                  key={item.to}
                  {...item}
                  index={index + getMenuItems().length}
                />
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-4 rounded-2xl p-4 font-medium text-red-600 transition-all duration-300 hover:bg-red-50 hover:shadow-md"
              onMouseEnter={(e) => handleMenuItemHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleMenuItemHover(e.currentTarget, false)}
            >
              <CgLogOut className="text-xl" />
              Logout
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;