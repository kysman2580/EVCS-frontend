import { NavDiv, StyledHeaderBtn, NavBoardContentDiv } from "./Nav.styled";

const NoticeNav = () => {
  return (
    <>
      <NavDiv>
        <NavBoardContentDiv>
          <StyledHeaderBtn>이벤트 게시판</StyledHeaderBtn>
          <StyledHeaderBtn>공지 사항</StyledHeaderBtn>
          <StyledHeaderBtn>문의 사항</StyledHeaderBtn>
        </NavBoardContentDiv>
      </NavDiv>
    </>
  );
};

export default NoticeNav;
