import About from "./About";
import Events from "./Events";
import Headline from "./Headline";
import Hero from "./Hero";
import HighLights from "./HighLights";
import Popular from "./Popular";
import Stats from "./stats";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Headline />
      <About />
      <Events />
      <Popular />
      <Stats />
      <HighLights />
    </div>
  );
};

export default Home;

