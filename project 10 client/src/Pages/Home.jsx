import React, { useEffect } from "react";
import Banner from "../Components/Home/Banner";
import Gardeners from "../Components/Home/Gardeners";
import TrendingTips from "../Components/Home/TrendingTips";
import PlantCareCalendar from "../Components/Home/PlantCareCalendar";
import EcoChallenges from "../Components/Home/EcoChallenges";
import { useLoaderData } from "react-router";

const Home = () => {
  useEffect(() => {
    document.title = "GrowTogether | Home";
  }, []);

  const { bannerInfo, ecoInfo } = useLoaderData();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <Banner bannerInfo={bannerInfo} />
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
        <EcoChallenges ecoInfo={ecoInfo} />
      </section>
    </div>
  );
};

export default Home;
