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

  return (
    <>
      <RentCarCardContainer onClick={() => navi("/LongTermRentDetail")}>
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
            월 {car.rentCarPrice.toLocaleString()}원
          </RentCarPriceDiv>
        </RentCarCardContentDiv>
      </RentCarCardContainer>
    </>
  );
};

export default RentCarCard;
