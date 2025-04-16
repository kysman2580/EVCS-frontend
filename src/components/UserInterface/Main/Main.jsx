import {
  MainBodyDiv,
  MainContainerDiv,
  SwiperDiv,
  MainBtnDiv,
  MainBtnImg,
  MainATag,
  MainSpan,
  MainLeftDiv,
  MainRightDiv,
  MainNewsDiv,
  MainNoitceDiv,
  MainRankingDiv,
} from "./Main.styles";
import MainSwiper from "./Swiper/MainSwiper";

const Main = () => {
  return (
    <>
      <MainContainerDiv>
        <SwiperDiv>
          <MainSwiper></MainSwiper>
        </SwiperDiv>
        <MainBtnDiv>
          <MainATag href="">
            <MainBtnImg src="images/hourRent.png" />
            <MainSpan>시간별 렌트카 대여</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg src="images/calendar.png" />
            <MainSpan>장기 렌트카 대여</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg src="images/key.png" />
            <MainSpan>구독형 렌트가 대여</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg
              src="images/chargingRent.png"
              style={{ width: "80px", height: "100px" }}
            />
            <MainSpan>충전소 위치</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg src="images/driveRoot.png" />
            <MainSpan>드라이브 루트 게시판</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg src="images/news.png" />
            <MainSpan>에너지 뉴스</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg src="images/question.png" />
            <MainSpan>문의 사항</MainSpan>
          </MainATag>
          <MainATag href="">
            <MainBtnImg src="images/hotDeal.png" />
            <MainSpan>핫딜 렌트카</MainSpan>
          </MainATag>
        </MainBtnDiv>
        <MainBodyDiv>
          <MainLeftDiv>
            <MainNewsDiv>
              <h1>뉴스 나오는 자리</h1>
            </MainNewsDiv>
            <MainNoitceDiv>
              <h1>공지사항 나오는 자리</h1>
            </MainNoitceDiv>
          </MainLeftDiv>
          <MainRightDiv>
            <MainRankingDiv>
              <h1>랭킹 나오는 자리</h1>
            </MainRankingDiv>
          </MainRightDiv>
        </MainBodyDiv>
      </MainContainerDiv>
    </>
  );
};

export default Main;
