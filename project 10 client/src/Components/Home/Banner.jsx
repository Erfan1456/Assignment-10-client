import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

const Banner = ({ bannerInfo }) => {
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
        {bannerInfo.map((slide) => (
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
