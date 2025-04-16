import RentCarNav from "../../Common/Nav/RentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
  RentCarListDiv,
  RentCarBtnDiv,
} from "../Common/RentCar.styles";

import RentCarCard from "../Common/RentCarCard";

const LongTermRentCar = () => {
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <RentCarListDiv>
            <RentCarCard></RentCarCard>
          </RentCarListDiv>
          <RentCarBtnDiv></RentCarBtnDiv>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default LongTermRentCar;
