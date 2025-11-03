import React from "react";
import Banner from "../Components/Home/Banner";
import Gardeners from "../Components/Home/Gardeners";
import TrendingTips from "../Components/Home/TrendingTips";

const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section>
        <Gardeners />
      </section>
      <section>
        <TrendingTips />
      </section>
    </div>
  );
};

export default Home;
