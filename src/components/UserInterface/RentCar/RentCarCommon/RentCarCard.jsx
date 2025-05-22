import {
  RentCarCardContainer,
  RentCarCardImgDiv,
  RentCarCardContentDiv,
  RentCarCardImg,
  RentCarNameDiv,
  RentCarMiddleDiv,
  RentCarPriceDiv,
  RentCarYearSpan,
  RentCarPlaceSpan,
  InlineBadge,
} from "./RentCarCard.styles";
import { useNavigate } from "react-router-dom";

const RentCarCard = ({ car }) => {
  const navi = useNavigate();
  const URL = window.API_URL;

  const originalMonthlyPrice = car.rentCarPrice;

  // 1) 하루 단가 계산 (월 요금 / 30)
  const monthlyFinalPrice = car.rentCarPrice / 30;
  // 2) 기본 10% 할인
  const baseDiscount = 0.1;
  // 3) 핫딜일 경우 추가 할인
  const hotdealDiscount =
    Number(car.ingHotdeal) === 1 ? car.dealPercent / 100 : 0;
  // 4) 총 할인률
  const totalDiscount = baseDiscount + hotdealDiscount;
  // 5) 최종 할인 적용된 하루 단가 (반올림)
  const finalPrice = Math.round(monthlyFinalPrice * (1 - totalDiscount));

  return (
    <>
      <RentCarCardContainer
        onClick={() =>
          navi("/LongTermRentDetail", { state: { rentCarNo: car.rentCarNo } })
        }
      >
        {/* {car.ingHotdeal === 1 && <HotBadge>🔥 핫딜</HotBadge>} */}
        <RentCarCardImgDiv>
          <RentCarCardImg src={car.fileLoad}></RentCarCardImg>
        </RentCarCardImgDiv>
        <RentCarCardContentDiv>
          <RentCarNameDiv>
            {car.carName}
            {Number(car.ingHotdeal) === 1 && <InlineBadge>🔥 핫딜</InlineBadge>}
          </RentCarNameDiv>
          <RentCarMiddleDiv>
            <RentCarYearSpan>{car.carYear}년</RentCarYearSpan>
            <RentCarPlaceSpan>/ {car.regionSido}</RentCarPlaceSpan>
          </RentCarMiddleDiv>
          <RentCarPriceDiv>
            {" "}
            <span
              style={{
                textDecoration: "line-through",
                marginRight: 8,
              }}
            >
              월 {originalMonthlyPrice.toLocaleString()}원
            </span>
            /<span> 월 {finalPrice.toLocaleString()}원</span>
          </RentCarPriceDiv>
        </RentCarCardContentDiv>
      </RentCarCardContainer>
    </>
  );
};

export default RentCarCard;
