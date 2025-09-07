import { HeroParallax } from "../../components/ui/hero-parallax.jsx";
import { products } from "./HighlightsDetails.js";

const HighLights = () => {
  return (
    <div className="mx-auto mt-20 h-full w-11/12 text-black xl:w-4/5">
      <HeroParallax products={products} />
    </div>
  );
};

export default HighLights;
