import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainSwiper = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ width: "100%", height: "200px" }}
      >
        <SwiperSlide>
          <img src="images/calendar.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/2.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainSwiper;
