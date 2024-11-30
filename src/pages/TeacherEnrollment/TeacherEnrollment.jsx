import { useForm } from "react-hook-form";

const TeacherEnrollment = () => {
  // states
  const { handleSubmit, register } = useForm();

  // handle form submit
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full">
      <div className="w-1/2 h-screen mx-auto">
        <h1 className="text-center text-2xl font-bold p-5">Became A Teacher</h1>
        {/* form card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 border border-black rounded-lg space-y-5">
            {/* image input */}
            <div className="flex justify-center items-center">
              <img
                src="https://i.pinimg.com/736x/9d/0b/1b/9d0b1b867af718e52c9187b57381de67.jpg"
                alt="user profile picture"
                className="w-3/12 h-3/12 rounded-full"
              />
            </div>

            {/* name & email input */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  // readOnly
                  className="w-full rounded-md border-2 p-2 border-black"
                  {...register("name")}
                />
              </div>

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  // readOnly
                  className="w-full rounded-md border-2 p-2 border-black"
                  {...register("email")}
                />
              </div>
            </div>

            {/* experience & category input */}
            <div className="flex justify-between items-center gap-4">
              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="experience" className="font-bold">
                  Experience
                </label>
                <select
                  name="experience"
                  id="experience"
                  className="w-full border-2 border-black p-2"
                  {...register("experience")}
                >
                  <option value="beginner">Beginner</option>
                  <option value="midLevel">Mid-Level</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>

              <div className="w-1/2 flex justify-center items-start flex-col gap-2">
                <label htmlFor="category" className="font-bold">
                  category
                </label>
                <select
                  name="category"
                  id="category"
                  className="w-full border-2 border-black p-2"
                  {...register("category")}
                >
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="game-development">Game Development</option>
                  <option value="uiux-designer">Ui-Ux Designer</option>
                  <option value="mechine-learning">Mechine Learning</option>
                </select>
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full btn border-2 hover:bg-black hover:text-white">
                Submit For Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEnrollment;
