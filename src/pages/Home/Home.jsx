import Hero from "./Hero";
import LearnioOffers from "./LearnioOffers";
import Events from "./Events";
import Explore from "./Explore";
import HighLights from "./HighLights";
import Overview from "./Overview";
import Service from "./Service";

const Home = () => {
  return (
    <div>
      <Hero />
      <LearnioOffers />
      <Overview />
      <Service />
      <Explore />
      <Events />
      <HighLights />
    </div>
  );
};

export default Home;
