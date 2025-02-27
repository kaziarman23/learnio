import { useSelector } from "react-redux";
import { Link } from "react-router";

const Profile = () => {
  // states
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice
  );

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#e0cece]">
      <div className="w-11/12 h-2/3 mx-auto bg-[#c7c1c1] rounded-lg md:w-4/5 xl:w-1/2">
        <div className="w-full h-1/2 flex justify-center items-center">
          <img
            src={userPhoto}
            alt="user profile"
            className="w-40 h-40 object-cover rounded-full border-2 border-black"
          />
        </div>
        <div className="w-full h-1/2 p-5 space-y-5">
          <h1 className="text-lg font-bold sm:text-2xl">Name: {userName}</h1>
          <h2 className="text-lg font-bold sm:text-2xl">Email: {userEmail}</h2>
          <div>
            <Link to="/dashboard/updateProfile">
              <button className="btn hover:bg-black hover:border-none hover:text-white">
                Update Your Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
