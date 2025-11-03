import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

const slides = [
  {
    id: 4,
    title: "Plant Care Tips for Beginners",
    subtitle: "Grow healthy plants effortlessly",
    description:
      "Essential tips on watering, sunlight, soil types, and fertilization. Perfect for anyone starting their gardening journey.",
    image:
      "https://images.ctfassets.net/i3tkg7dt3kro/kcUqtWUlsa9S7TwV9J9z5/ec199a3e4c3212e4fecd8d839ff48e86/top-plant-care-tips-15-1.jpg",
    buttonText: "Read Tips",
  },
  {
    id: 3,
    title: "Composting Workshop",
    subtitle: "Turn waste into garden gold",
    description:
      "Discover eco-friendly methods to compost kitchen and garden waste. Reduce your footprint and improve soil health naturally.",
    image:
      "https://cdn.stayhappening.com/events7/banners/ea532e395116dec4d0d8aeceebc0bbe105c23057080d68405f3244c648aece6e-rimg-w1200-h796-dc322c19-gmir.jpg?v=1761672459",
    buttonText: "Register Now",
  },
  {
    id: 1,
    title: "Community Garden Meetup",
    subtitle: "Monthly gathering of local gardeners",
    description:
      "Connect with fellow gardening enthusiasts, exchange tips, and participate in live demonstrations. All experience levels are welcome!",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.9yZ05F3Kaoi_8rw_nw4qOgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    buttonText: "Join Event",
  },
  {
    id: 2,
    title: "Urban Balcony Gardening",
    subtitle: "Maximize small spaces",
    description:
      "Learn techniques for growing vegetables and herbs in apartments or balconies. Step-by-step guides and expert tips included.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.noAfteKooXnVOc8oViGKdAHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
    buttonText: "Learn More",
  },
];

const Banner = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content Box */}
              <div className="relative max-w-3xl text-center text-white px-6 py-8  ">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-secondary">
                  {slide.subtitle}
                </h3>
                <p className="text-md md:text-lg mb-6">{slide.description}</p>
                <button className="btn btn-primary">{slide.buttonText}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
