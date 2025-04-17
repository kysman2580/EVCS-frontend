import RentCarNav from "../../Common/Nav/RentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
  RentCarListDiv,
  RentCarBtnDiv,
  RentMoreButton,
} from "../RentCarCommon/RentCar.styles";
import RentCarCard from "../RentCarCommon/RentCarCard";

const LongTermRentCar = () => {
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <RentCarListDiv>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
            <RentCarCard></RentCarCard>
          </RentCarListDiv>
          <RentCarBtnDiv>
            <RentMoreButton>더 보기</RentMoreButton>
          </RentCarBtnDiv>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default LongTermRentCar;
