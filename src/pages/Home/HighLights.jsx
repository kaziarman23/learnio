import { HeroParallax } from "../../components/ui/hero-parallax.jsx";
import { products } from "./HighlightsDetails.js";

const HighLights = () => {
  return (
    <div className="w-4/5 h-full mx-auto text-black mt-20">
      <HeroParallax products={products} />
    </div>
  );
};

export default HighLights;
