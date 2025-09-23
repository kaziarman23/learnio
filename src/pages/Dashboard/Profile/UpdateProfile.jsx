import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { setUser } from "../../../Redux/features/userSlice";
import { useUpdateUserProfileMutation } from "../../../Redux/features/api/usersApi";
import auth from "../../../Firebase/Firebase.Config";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { User, Camera, Mail, Save, X, ArrowLeft, Eye, EyeOff } from "lucide-react";

const UpdateProfile = () => {
  // States
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Redux states
  const dispatch = useDispatch();
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice,
  );

  // RTK query
  const [updateUserProfile, { isLoading, isError, error }] =
    useUpdateUserProfileMutation();

  // React Hook Form with validation
  const { 
    handleSubmit, 
    register, 
    reset, 
    formState: { errors, isDirty, isValid },
    watch,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: userName || "",
      userPhoto: userPhoto || ""
    }
  });

  // Watch form values for preview
  const watchedPhoto = watch("userPhoto");
  const watchedName = watch("userName");

  // Update preview when photo URL changes
  useEffect(() => {
    if (watchedPhoto && watchedPhoto !== userPhoto) {
      setPreviewImage(watchedPhoto);
      setImageError(false);
    } else {
      setPreviewImage(userPhoto || "");
    }
  }, [watchedPhoto, userPhoto]);

  // Validation rules
  const validationRules = {
    userName: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters"
      },
      maxLength: {
        value: 50,
        message: "Name must not exceed 50 characters"
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: "Name can only contain letters and spaces"
      }
    },
    userPhoto: {
      pattern: {
        value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
        message: "Please enter a valid image URL (jpg, jpeg, png, gif, webp)"
      }
    }
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageError(false);
  };

  // Generate initials for fallback
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2) || 'U';
  };

  // Validate image URL
  const validateImageUrl = async (url) => {
    if (!url) return true;
    
    try {
      await trigger("userPhoto");
      return true;
    } catch {
      return false;
    }
  };

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (isError) {
    console.log("Error: ", error?.error);
    console.log("Error when updating the user profile: ", error?.data?.message);
    toast.error(error?.data?.message || "An error occurred while updating profile");
  }

  // Handle form submission
  const onSubmit = async (data) => {
    const userInfo = {
      ...data,
      currentEmail: userEmail,
    };

    try {
      // Update Firebase Authentication Profile
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: data.userName,
          photoURL: data.userPhoto,
        });
      } else {
        throw new Error("No authenticated user.");
      }

      // Update the backend via API
      await updateUserProfile(userInfo).unwrap();

      // Dispatch updated profile to Redux
      dispatch(
        setUser({
          userName: data.userName,
          userPhoto: data.userPhoto,
          userEmail: userEmail,
        }),
      );

      // Navigate back
      navigate(-1);

      // Show success message
      toast.success("Profile updated successfully!");

    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.message || "Failed to update profile. Please try again.");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset({
      userName: userName || "",
      userPhoto: userPhoto || ""
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-center flex-1">Update Profile</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>

        <div className="p-8">
          {/* Preview Section */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {imageError || !previewImage ? (
                <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-4 border-gray-200 shadow-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-600">
                    {getInitials(watchedName || userName)}
                  </span>
                </div>
              ) : (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-lg"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              )}
              
              {/* Preview toggle */}
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            
            {/* Current Email Display */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Email</p>
                  <p className="text-lg font-semibold text-gray-900">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="userName" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </label>
              <input
                id="userName"
                type="text"
                placeholder="Enter your full name"
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.userName 
                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-400'
                }`}
                {...register("userName", validationRules.userName)}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.userName.message}</span>
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="space-y-2">
              <label htmlFor="userPhoto" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Camera className="w-4 h-4" />
                <span>Profile Photo URL</span>
              </label>
              <input
                id="userPhoto"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.userPhoto 
                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-blue-400'
                }`}
                {...register("userPhoto", validationRules.userPhoto)}
              />
              {errors.userPhoto && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.userPhoto.message}</span>
                </p>
              )}
              <p className="text-xs text-gray-500">
                Supported formats: JPG, JPEG, PNG, GIF, WebP
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid || isLoading}
                className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  (!isDirty || !isValid || isLoading)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg'
                }`}
              >
                <Save className="w-5 h-5" />
                <span>{isLoading ? 'Updating...' : 'Update Profile'}</span>
              </button>
            </div>

            {/* Form Status */}
            {isDirty && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm">
                  You have unsaved changes. Make sure to save your updates before leaving.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;