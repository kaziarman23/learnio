import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { setUser } from "../../../Redux/features/userSlice";
import { useUpdateUserProfileMutation } from "../../../Redux/features/api/usersApi";
import auth from "../../../Firebase/Firebase.Config";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  // States
  const navigate = useNavigate();

  // Redux states
  const dispatch = useDispatch();
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice,
  );

  // Rtk query
  const [updateUserProfile, { isLoading, isError, error }] =
    useUpdateUserProfileMutation();

  // Use form hook
  const { handleSubmit, register, reset } = useForm();

  // handle loging
  if (isLoading) {
    return <Loading />;
  }

  // handle error
  if (isError) {
    console.log("Error: ", error.error);
    console.log("Error when updating the user profile: ", error.data.message);

    // showing an alert
    toast.error(error);
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
        }),
      );

      // navigating the user
      navigate(-1);

      // showing an alert
      toast.success("Profile Updated Successfully");

    } catch (error) {
      console.log(error);

      // showing an alert
      toast.error(error);
    }
  };

  // handle cancel btn
  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#e0cece]">
      <div className="mx-auto h-1/2 w-11/12 rounded-lg bg-[#c7c1c1] p-5 sm:w-4/5 md:w-1/2">
        <h1 className="mb-5 text-center text-2xl font-bold">
          Updating User Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border-2 border-black p-2"
                defaultValue={userName}
                {...register("userName")}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <label htmlFor="photo" className="font-bold">
                Photo URL
              </label>
              <input
                id="photo"
                type="text"
                className="w-full rounded-md border-2 border-black p-2"
                defaultValue={userPhoto}
                {...register("userPhoto")}
              />
            </div>
            <div className="flex w-full justify-end gap-4">
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
