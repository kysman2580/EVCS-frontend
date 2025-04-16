import { MainBodyDiv, MainConteinerDiv, SwiperDiv } from "./Main.styles";
import MainSwiper from "./Swiper/MainSwiper";

const Main = () => {
  return (
    <>
      <MainConteinerDiv>
        <MainBodyDiv>
          <SwiperDiv>
            <MainSwiper></MainSwiper>
          </SwiperDiv>
        </MainBodyDiv>
      </MainConteinerDiv>
    </>
  );
};

export default Main;
