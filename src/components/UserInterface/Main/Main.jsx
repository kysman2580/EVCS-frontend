import { MainBodyDiv, MainContainerDiv, SwiperDiv } from "./Main.styles";
import MainSwiper from "./Swiper/MainSwiper";

const Main = () => {
  return (
    <>
      <MainContainerDiv>
        <MainBodyDiv>
          <SwiperDiv>
            <MainSwiper></MainSwiper>
          </SwiperDiv>
        </MainBodyDiv>
      </MainContainerDiv>
    </>
  );
};

export default Main;
