import Hero from "./Hero";
import About from "./About";
import Events from "./Events";
import Stats from "./Stats";
import HighLights from "./HighLights";
import Reviews from "./Reviews";
import Overview from "./Overview";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Overview />
      <Events />
      <Stats />
      <HighLights />
      <Reviews />
    </div>
  );
};

export default Home;
