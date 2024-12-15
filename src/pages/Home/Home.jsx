import Hero from "./Hero";
import About from "./About";
import Events from "./Events";
import Popular from "./Popular";
import Stats from "./Stats";
import HighLights from "./HighLights";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Events />
      <Popular /> {/* Will Replace This Component  */}
      <Stats /> 
      <HighLights />
      <Reviews />
    </div>
  );
};

export default Home;

