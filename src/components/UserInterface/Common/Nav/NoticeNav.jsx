import {
  NavDiv,
  StyledHeaderBtn,
  NavContentDiv,
  NavEmptyDiv,
} from "./Nav.styled";

const NoticeNav = () => {
  return (
    <>
      <NavDiv>
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
