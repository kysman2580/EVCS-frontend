import { NavDiv, StyledHeaderBtn, NavRentContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const RentCarNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavRentContentDiv>
          <StyledHeaderBtn onClick={() => navi("/timerentalPage")}>
            시간별 렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/longRentCar")}>
            장기 렌트카
          </StyledHeaderBtn>
        </NavRentContentDiv>
      </NavDiv>
    </>
  );
};
export default RentCarNav;
