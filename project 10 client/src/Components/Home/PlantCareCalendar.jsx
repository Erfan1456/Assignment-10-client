import Lottie from "lottie-react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import springAnim from "../../assets/lottie/spring.json";
import summerAnim from "../../assets/lottie/summer.json";
import autumnAnim from "../../assets/lottie/autumn.json";
import winterAnim from "../../assets/lottie/winter.json";

const PlantCareCalendar = () => {
  const seasons = [
    {
      id: "spring",
      title: "🌸 Spring",
      animation: springAnim,
      plants: [
        { name: "Lettuce", tip: "Plant in cool weather and partial sun." },
        { name: "Spinach", tip: "Keep soil moist but not soggy." },
      ],
      bg: "bg-green-100",
    },
    {
      id: "summer",
      title: "☀️ Summer",
      animation: summerAnim,
      plants: [
        { name: "Tomatoes", tip: "Needs 6+ hours of sunlight daily." },
        { name: "Basil", tip: "Water every morning, avoid soggy roots." },
      ],
      bg: "bg-yellow-100",
    },
    {
      id: "autumn",
      title: "🍂 Autumn",
      animation: autumnAnim,
      plants: [
        { name: "Carrots", tip: "Loosen soil before planting seeds." },
        { name: "Broccoli", tip: "Prefers cooler weather for best taste." },
      ],
      bg: "bg-orange-100",
    },
    {
      id: "winter",
      title: "❄️ Winter",
      animation: winterAnim,
      plants: [
        { name: "Garlic", tip: "Plant before the ground freezes." },
        { name: "Kale", tip: "Survives frost and gets sweeter." },
      ],
      bg: "bg-blue-100",
    },
  ];

  return (
    <section className="py-16 " id="plant-calendar">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-green-700 mb-6">
          <Typewriter
            words={["🌱 Plant Care Calendar", "Grow with Every Season"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>
        <p className="text-base-content max-w-2xl mx-auto mb-10">
          Learn what to plant and how to care for them during each season. Hover
          over a plant name to reveal its care tips 🌼
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seasons.map((season) => (
            <Fade key={season.id} direction="up" triggerOnce>
              <div
                className={`${season.bg} rounded-3xl p-6 shadow-lg flex flex-col items-center hover:shadow-2xl transition-shadow`}
              >
                <div className="w-40 h-40">
                  <Lottie animationData={season.animation} loop={true} />
                </div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  {season.title}
                </h3>
                <ul className="space-y-2">
                  {season.plants.map((plant, idx) => (
                    <li
                      key={idx}
                      className="text-gray-800 font-medium hover:text-green-700 cursor-pointer"
                      data-tooltip-id={`tip-${season.id}-${idx}`}
                    >
                      {plant.name}
                      <ReactTooltip
                        id={`tip-${season.id}-${idx}`}
                        place="top"
                        content={plant.tip}
                        className="max-w-xs text-sm text-center"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCareCalendar;
