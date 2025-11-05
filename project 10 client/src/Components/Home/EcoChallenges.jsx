import React from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const EcoChallenges = () => {
  const challenges = [
    {
      title: "Zero Waste Week",
      description:
        "Avoid plastic packaging and try to make no trash for a whole week!",
      icon: "♻️",
      tooltip: "Reduce, reuse, recycle — and refuse what you don’t need!",
    },
    {
      title: "Plant a Tree Day",
      description:
        "Join your friends and plant a tree in your community or backyard.",
      icon: "🌳",
      tooltip: "One tree can provide oxygen for two people for a year!",
    },
    {
      title: "No Car Sunday",
      description:
        "Walk, bike, or use public transport to reduce your carbon footprint.",
      icon: "🚴‍♂️",
      tooltip: "Every liter of gas saved means 2.3 kg less CO₂ emitted.",
    },
    {
      title: "Save Water Challenge",
      description: "Take shorter showers and fix leaky taps this week.",
      icon: "💧",
      tooltip: "Water is life — every drop counts!",
    },
  ];

  return (
    <section className=" py-16 px-6 mb-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated Title */}
        <h2 className="text-4xl font-bold text-green-700 mb-4">
          <Typewriter
            words={["🌍 Eco Challenges", "Take Action for the Planet!"]}
            loop={0}
            cursor
            cursorStyle="🌱"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
        <p className="text-base-content max-w-2xl mx-auto mb-10">
          Take part in small weekly challenges that make a big impact. Track
          your progress and inspire others to live more sustainably!
        </p>

        {/* Challenge Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {challenges.map((challenge, index) => (
            <Fade key={index} delay={index * 100}>
              <div
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 border border-green-100"
                data-tooltip-id="ecoTip"
                data-tooltip-content={challenge.tooltip}
              >
                <div className="text-5xl mb-3">{challenge.icon}</div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-sm">{challenge.description}</p>
              </div>
            </Fade>
          ))}
        </div>

        {/* Tooltip */}
        <Tooltip
          id="ecoTip"
          place="bottom"
          style={{
            backgroundColor: "#065f46",
            color: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "0.9rem",
          }}
        />
      </div>
    </section>
  );
};

export default EcoChallenges;
