import About from "./About";
import Events from "./Events";
import Hero from "./Hero";
import HighLights from "./HighLights";
import Popular from "./Popular";
import Reviews from "./Reviews";
import Stats from "./stats";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <Events />
      <Popular />
      <Stats />
      <HighLights />
      <Reviews />
    </div>
  );
};

export default Home;

