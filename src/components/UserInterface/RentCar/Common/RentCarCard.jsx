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
} from "./RentCarCard.styles";

const RentCarCard = () => {
  return (
    <>
      <RentCarCardContainer>
        <RentCarCardImgDiv>
          <RentCarCardImg src="images/model_Y.png"></RentCarCardImg>
        </RentCarCardImgDiv>
        <RentCarCardContentDiv>
          <RentCarNameDiv>Model Y</RentCarNameDiv>
          <RentCarMiddleDiv>
            <RentCarYearSpan>2025년</RentCarYearSpan>
            <RentCarPlaceSpan>천안/아산</RentCarPlaceSpan>
          </RentCarMiddleDiv>
          <RentCarPriceDiv>월 486,000원</RentCarPriceDiv>
        </RentCarCardContentDiv>
      </RentCarCardContainer>
    </>
  );
};

export default RentCarCard;
