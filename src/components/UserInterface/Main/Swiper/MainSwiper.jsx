import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperImg } from "./MainSwiper.styles";

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
        style={{ width: "1000px", height: "400px" }}
      >
        <SwiperSlide>
          <SwiperImg src="images/first_sale_img.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImg src="images/night_sale_img.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImg src="images/hot_deal_img.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainSwiper;
