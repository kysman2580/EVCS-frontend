import {
  NavDiv,
  StyledHeaderBtn,
  NavContentDiv,
  NavEmptyDiv,
  NavTopEmptyDiv,
} from "./Nav.styled";

const RentCarNav = () => {
  return (
    <>
      <NavDiv>
        <NavTopEmptyDiv></NavTopEmptyDiv>
        <NavContentDiv>
          <StyledHeaderBtn>시간별 렌트카</StyledHeaderBtn>
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
