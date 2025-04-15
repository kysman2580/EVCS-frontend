import {
  NavDiv,
  StyledHeaderBtn,
  NavContentDiv,
  NavEmptyDiv,
} from "./Nav.styled";
import { useNavigate } from "react-router-dom";

const RentCarNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavContentDiv>
          <StyledHeaderBtn onClick={() => navi("/hourRentCar")}>
            시간별 렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/subRentCar")}>
            구독 렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/longRentCar")}>
            장기 렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/hotRentCar")}>
            핫딜 렌트카
          </StyledHeaderBtn>
        </NavContentDiv>
        <NavEmptyDiv></NavEmptyDiv>
      </NavDiv>
    </>
  );
};
export default RentCarNav;
