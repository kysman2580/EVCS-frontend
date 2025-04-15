import {
  NavDiv,
  StyledHeaderBtn,
  NavContentDiv,
  NavEmptyDiv,
  NavTopEmptyDiv,
} from "./Nav.styled";

const NoticeNav = () => {
  return (
    <>
      <NavDiv>
        <NavTopEmptyDiv></NavTopEmptyDiv>
        <NavContentDiv>
          <StyledHeaderBtn>이벤트 게시판</StyledHeaderBtn>
          <StyledHeaderBtn>공지 사항</StyledHeaderBtn>
          <StyledHeaderBtn>문의 사항</StyledHeaderBtn>
        </NavContentDiv>
        <NavEmptyDiv></NavEmptyDiv>
      </NavDiv>
    </>
  );
};

export default NoticeNav;
