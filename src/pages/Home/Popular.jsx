import { LayoutGrid } from "../../components/ui/layout-grid";
import cards from "./PopularCardDetails";

const Popular = () => {
  return (
    <div className="w-full h-screen bg-[#efecfd] border-t-2 sm:h-[1000px] xl:h-screen">
      <div className="w-full h-full mx-auto xl:w-4/5">
        <div className="w-full h-1/6 flex justify-center items-center">
          <h1 className="text-lg font-bold sm:text-4xl xl:text-3xl">Popular course on Learnio</h1>
        </div>

        {/* layout */}
        <div
          className="w-full h-5/6 cursor-pointer p-2 xl:p-0"
          title="Click here for more details"
        >
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default Popular;
