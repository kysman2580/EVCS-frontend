import RentCarNav from "../../Common/Nav/RentCarNav";
import { RentContainerDiv, RentBodyDiv } from "../RentCar.styled";

const HotdealRentCar = () => {
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>여긴 핫딜 렌트카야</RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default HotdealRentCar;
