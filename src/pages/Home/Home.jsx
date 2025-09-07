import Hero from "./Hero";
import About from "./About";
import Events from "./Events";
import Explore from "./Explore";
import HighLights from "./HighLights";
import Contact from "./Contact";
import Overview from "./Overview";
import Service from "./Service";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Overview />
      <Service />
      <Explore />
      <Events />
      <HighLights />
      <Contact />
    </div>
  );
};

export default Home;
