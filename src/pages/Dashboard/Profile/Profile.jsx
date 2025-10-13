import { useSelector } from "react-redux";
import { Link } from "react-router";
import { User, Mail, Edit3, Camera } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  // States
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice
  );
  
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Generate initials for fallback
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2) || 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Header Section with Background Pattern */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-sky-500  overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Profile Image Section */}
        <div className="relative flex justify-center -mt-16 mb-6">
          <div className="relative group">
            {imageError || !userPhoto ? (
              // Fallback Avatar
              <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-600">
                  {getInitials(userName)}
                </span>
              </div>
            ) : (
              <div className="relative">
                {imageLoading && (
                  <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                )}
                <img
                  src={userPhoto}
                  alt={`${userName}'s profile`}
                  className={`w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                    imageLoading ? 'opacity-0 absolute' : 'opacity-100'
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            )}
            
            {/* Camera overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="px-8 pb-8 space-y-6">
          
          {/* User Details Card */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Name</p>
                <p className="text-lg font-semibold text-gray-900 truncate" title={userName}>
                  {userName || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                <Mail className="w-5 h-5 text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-lg font-semibold text-gray-900 truncate" title={userEmail}>
                  {userEmail || 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/dashboard/updateProfile" 
              className="flex-1"
              aria-label="Update your profile information"
            >
              <button className="w-full bg-gradient-to-r from-blue-500 to-sky-500  hover:from-blue-600 hover:to-sky-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group">
                <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span>Update Profile</span>
              </button>
            </Link>

            <button 
              className="bg-gradient-to-r from-blue-500 to-sky-500  hover:bg-gray-200 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              aria-label="Share profile"
            >
              <span>Share</span>
            </button>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">48</p>
              <p className="text-sm text-gray-500">Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;