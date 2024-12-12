import { LayoutGrid } from "../../components/ui/layout-grid";
import cards from "./PopularCardDetails";

const Popular = () => {
  return (
    <div className="w-full h-screen bg-[#efecfd]">
      <div className="w-4/5 h-full mx-auto">
        <div className="w-full h-1/6 flex justify-center items-center">
          <h1 className="text-3xl font-bold">Popular course on Learnio</h1>
        </div>

        <div
          className="w-full h-5/6 cursor-pointer"
          title="Click here for more details"
        >
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default Popular;
