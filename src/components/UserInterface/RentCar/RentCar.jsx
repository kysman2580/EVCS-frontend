import RentCarNav from "../Common/Nav/RentCarNav";
import { RentContainerDiv, RentBodyDiv } from "./RentCar.styles";

const RentCar = () => {
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv></RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default RentCar;
