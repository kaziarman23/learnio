import { LayoutGrid } from "../../components/ui/layout-grid";
import cards from "./PopularCardDetails";

const Popular = () => {
  return (
    <div className="h-screen w-full border-t-2 bg-[#efecfd] sm:h-[1000px] xl:h-screen">
      <div className="mx-auto h-full w-full xl:w-4/5">
        <div className="flex h-1/6 w-full items-center justify-center">
          <h1 className="text-lg font-bold sm:text-4xl xl:text-3xl">
            Popular course on Learnio
          </h1>
        </div>

        {/* layout */}
        <div
          className="h-5/6 w-full cursor-pointer p-2 xl:p-0"
          title="Click here for more details"
        >
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default Popular;
