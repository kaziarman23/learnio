import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { setUser } from "../../../Redux/features/userSlice";
import { useUpdateUserProfileMutation } from "../../../Redux/features/Api/usersApi";
import auth from "../../../Firebase/Firebase.Config";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const UpdateProfile = () => {
  // States
  const navigate = useNavigate();

  // Redux states
  const dispatch = useDispatch();
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice
  );

  // Rtk query
  const [updateUserProfile, { isLoading, isError, error }] = useUpdateUserProfileMutation();

  // Use form hook
  const { handleSubmit, register, reset } = useForm();

  // handle loging
  if (isLoading) {
    return <Loading />;
  }

  // handle error
  if (isError) {
    console.log("Error: ", error.error);
    console.log("Error Message: ", error.data.message);
    Swal.fire({
      title: "Error!",
      text: "Error when updating the user profile",
      icon: "error",
      confirmButtonText: "Okey",
    });
  }

  // handle submit
  const onSubmit = async (data) => {
    // collecting the input datas
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
        console.log("Firebase profile updated!");
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
          userEmail: userEmail, // Usually unchanged
        })
      );

      // navigation and Success alert
      navigate(-1);

      Swal.fire({
        title: "Success",
        text: "Profile Updated Successfully",
        icon: "success",
        confirmButtonText: "Okey",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okey",
      });
    }
  };

  // handle cancel btn
  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12 h-1/2 mx-auto bg-[#c7c1c1] rounded-lg p-5 sm:w-4/5 md:w-1/2">
        <h1 className="text-2xl font-bold text-center mb-5">
          Updating User Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center flex-col gap-4">
            <div className="w-full flex justify-center items-start flex-col gap-2">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border-2 p-2 border-black"
                defaultValue={userName}
                {...register("userName")}
              />
            </div>
            <div className="w-full flex justify-center items-start flex-col gap-2">
              <label htmlFor="photo" className="font-bold">
                Photo URL
              </label>
              <input
                id="photo"
                type="text"
                className="w-full rounded-md border-2 p-2 border-black"
                defaultValue={userPhoto}
                {...register("userPhoto")}
              />
            </div>
            <div className="w-full flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="btn hover:bg-red-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn hover:bg-green-500 hover:text-black"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
