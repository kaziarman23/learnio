import { IoMdCloseCircle } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../../../components/Loading/Loading";
import {
  useGetTeachersQuery,
  useUpdateAcceptTeachersMutation,
  useUpdateRejectTeachersMutation,
} from "../../../../Redux/features/api/teachersApi";
import {
  useRejectUserForTeacherMutation,
  useAcceptUserForTeacherMutation,
} from "../../../../Redux/features/api/usersApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const TeacherRequiests = () => {
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const tableRef = useRef(null);
  const rowRefs = useRef([]);
  const emptyStateRef = useRef(null);

  // Redux state
  const { userName } = useSelector((state) => state.userSlice);

  // Rtk query hooks
  const { data, isLoading, isError, error } = useGetTeachersQuery();
  const [updateAcceptTeachers] = useUpdateAcceptTeachersMutation();
  const [updateRejectTeachers] = useUpdateRejectTeachersMutation();
  const [acceptUserForTeacher] = useAcceptUserForTeacherMutation();
  const [rejectUserForTeacher] = useRejectUserForTeacherMutation();

  // GSAP Animations
  useEffect(() => {
    if (!isLoading && !isError) {
      const ctx = gsap.context(() => {
        // Animate container entrance
        gsap.fromTo(containerRef.current,
          { opacity: 0, scale: 0.9, rotationX: -15 },
          { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "back.out(1.7)" }
        );

        // Animate header
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: -50, rotationY: -10 },
          { opacity: 1, y: 0, rotationY: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
        );

        // Animate table or empty state
        if (data && data.length > 0) {
          gsap.fromTo(tableRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.5, ease: "power2.out" }
          );

          // Animate table rows
          rowRefs.current.forEach((row, index) => {
            if (row) {
              gsap.fromTo(row,
                { opacity: 0, x: -30, rotationY: -5 },
                { 
                  opacity: 1, 
                  x: 0, 
                  rotationY: 0,
                  duration: 0.5, 
                  delay: 0.7 + (index * 0.1),
                  ease: "power2.out" 
                }
              );
            }
          });
        } else if (emptyStateRef.current) {
          gsap.fromTo(emptyStateRef.current,
            { opacity: 0, y: 50, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, isError, data]);

  // Button hover animations
  const handleButtonHover = (button, scale = 1.1) => {
    gsap.to(button, { scale, duration: 0.2, ease: "power2.out" });
  };

  const handleButtonLeave = (button) => {
    gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  // Handle loadin
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log(
      "Error when fetching the data from getTeachersQuery",
      error.error,
    );
    // showing an alert
    toast.error(error);
    return null;
  }

  // Handle empty teachers
  if (data.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div 
          ref={emptyStateRef}
          className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-12 max-w-2xl mx-4"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
          <div className="relative z-10 text-center space-y-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              {userName}, you have no teacher requests for review.
            </h1>
            <p className="text-gray-300/80 text-lg">
              All caught up! Check back later for new applications.
            </p>
            <Link to="/dashboard/interface">
              <button
                type="button"
                className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 overflow-hidden group"
                onMouseEnter={(e) => handleButtonHover(e.target, 1.05)}
                onMouseLeave={(e) => handleButtonLeave(e.target)}
              >
                <span className="relative z-10">Return to Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle accept
  const handleAccept = (id) => {
    // collecting teacher data from database
    const teacherInfo = data.find((teacher) => teacher._id === id);

    // updating isTeacher filed
    updateAcceptTeachers(id)
      .unwrap()
      .then(() => {
        // updating the user data in the database
        const userInfo = {
          userEmail: teacherInfo.userEmail,
          experience: teacherInfo.experience,
          category: teacherInfo.category,
        };
        // sending data in the user database
        acceptUserForTeacher(userInfo)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("Accepted as a teacher");
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error Message: ", error.message);

            // showing an alert
            toast.error(error);
          });
      })
      .catch((error) => {
        console.log("Error :", error);
        console.log("Faild to update teacher data: ", error.message);

        // showing an alert
        toast.error(error);
      });
  };

  // Handle reject
  const handleReject = (id) => {
    // collecting teacher data from database
    const teacherInfo = data.find((teacher) => teacher._id === id);

    // updating the isTeacher filed
    updateRejectTeachers(id)
      .unwrap()
      .then(() => {
        // updating the user data in the database
        const userInfo = {
          userEmail: teacherInfo.userEmail,
        };
        // sending data in the user database
        rejectUserForTeacher(userInfo)
          .unwrap()
          .then(() => {
            // showing an alert
            toast.success("Rejected as a teacher");
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log(
              "Faild to sand the data in the Users/Demotion database:  ",
              error.message,
            );

            // showing an alert
            toast.error(error);
          });
      })
      .catch((error) => {
        console.log("Error: ", error);
        // showing an alert
        toast.error(error);
      });
  };

  return (
<div class="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-8 px-4">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto"
      >
        <div className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative z-10">
            <div 
              ref={headerRef}
              className="text-center py-8 border-b border-white/20"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Review Teacher Requests
              </h1>
              <p className="text-gray-300/80 text-lg">
                Manage and approve incoming teacher applications
              </p>
            </div>

            <div 
              ref={tableRef}
              className="p-6 overflow-x-auto"
            >
              <div className="min-w-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">SL</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">Teacher</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">Experience</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((teacher, index) => (
                      <tr 
                        key={index}
                        ref={el => rowRefs.current[index] = el}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300 group"
                      >
                        <td className="py-6 px-6">
                          <span className="text-white font-medium">{index + 1}</span>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300">
                                <img
                                  src={teacher.userPhoto}
                                  alt={teacher.userName}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                            </div>
                            <span className="text-white font-medium">{teacher.userName}</span>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <span className="text-gray-300">{teacher.userEmail}</span>
                        </td>
                        <td className="py-6 px-6">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {teacher.category}
                          </span>
                        </td>
                        <td className="py-6 px-6">
                          <span className="text-gray-300">{teacher.experience}</span>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center space-x-2">
                            {teacher.isTeacher === "pandding" ? (
                              <>
                                <button
                                  onClick={() => handleAccept(teacher._id)}
                                  className="p-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 hover:scale-110 transition-all duration-300 group/btn"
                                  onMouseEnter={(e) => handleButtonHover(e.currentTarget)}
                                  onMouseLeave={(e) => handleButtonLeave(e.currentTarget)}
                                >
                                  <FaRegCheckCircle className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                                </button>
                                <button
                                  onClick={() => handleReject(teacher._id)}
                                  className="p-3 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all duration-300 group/btn"
                                  onMouseEnter={(e) => handleButtonHover(e.currentTarget)}
                                  onMouseLeave={(e) => handleButtonLeave(e.currentTarget)}
                                >
                                  <IoMdCloseCircle className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                                </button>
                              </>
                            ) : teacher.isTeacher === true ? (
                              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold uppercase tracking-wide">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Accepted
                              </div>
                            ) : (
                              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold uppercase tracking-wide">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Rejected
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRequiests;