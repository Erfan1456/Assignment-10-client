import React from "react";
import Banner from "../Components/Home/Banner";
import Gardeners from "../Components/Home/Gardeners";
import TrendingTips from "../Components/Home/TrendingTips";
import PlantCareCalendar from "../Components/Home/PlantCareCalendar";
import EcoChallenges from "../Components/Home/EcoChallenges";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <Banner />
      </section>
      <section>
        <Gardeners />
      </section>
      <section>
        <TrendingTips />
      </section>
      <section>
        <PlantCareCalendar />
      </section>
      <section>
        <EcoChallenges />
      </section>
    </div>
  );
};

export default Home;
