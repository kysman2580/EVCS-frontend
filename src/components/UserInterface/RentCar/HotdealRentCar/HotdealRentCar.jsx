import RentCarNav from "../../Common/Nav/RentCarNav";
import { RentConteinerDiv, RentBodyDiv } from "../RentCar.styled";

const HotdealRentCar = () => {
  return (
    <>
      <RentConteinerDiv>
        <RentCarNav />
        <RentBodyDiv>여긴 핫딜 렌트카야</RentBodyDiv>
      </RentConteinerDiv>
    </>
  );
};

export default HotdealRentCar;
