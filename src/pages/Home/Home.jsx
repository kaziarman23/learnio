import Hero from "./Hero";
import About from "./About";
import Events from "./Events";
// import Stats from "./Stats";
import HighLights from "./HighLights";
import Reviews from "./Reviews";
import Overview from "./Overview";
import Service from './Service';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Overview />
      <Service />
      <Events />
      {/* <Stats /> */}
      <HighLights />
      <Reviews />
    </div>
  );
};

export default Home;
