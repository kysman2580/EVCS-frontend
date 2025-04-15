import {
  NavDiv,
  StyledHeaderBtn,
  NavContentDiv,
  NavEmptyDiv,
  NavTopEmptyDiv,
} from "./Nav.styled";
import { useNavigate } from "react-router-dom";

const RentCarNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavTopEmptyDiv></NavTopEmptyDiv>
        <NavContentDiv>
          <StyledHeaderBtn onClick={() => navi("/timerentalPage")}>
            시간별 렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn>구독 렌트카</StyledHeaderBtn>
          <StyledHeaderBtn>장기 렌트카</StyledHeaderBtn>
          <StyledHeaderBtn>핫딜 렌트카</StyledHeaderBtn>
        </NavContentDiv>
        <NavEmptyDiv></NavEmptyDiv>
      </NavDiv>
    </>
  );
};
export default RentCarNav;
