import RentCarNav from "../../Common/Nav/RentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
  RentCarListDiv,
  RentCarBtnDiv,
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
          </RentCarListDiv>
          <RentCarBtnDiv></RentCarBtnDiv>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default LongTermRentCar;
