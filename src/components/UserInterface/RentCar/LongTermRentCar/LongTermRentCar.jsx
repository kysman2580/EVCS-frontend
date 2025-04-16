import RentCarNav from "../../Common/Nav/RentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
  RentCarListDiv,
  RentCarBtnDiv,
} from "../Common/RentCar.styles";

const LongTermRentCar = () => {
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <RentCarListDiv></RentCarListDiv>
          <RentCarBtnDiv></RentCarBtnDiv>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default LongTermRentCar;
