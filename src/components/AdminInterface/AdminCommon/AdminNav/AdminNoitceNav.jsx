import { NavDiv, StyledHeaderBtn, NavBoardContentDiv } from "./Nav.styles";

const NoticeNav = () => {
  return (
    <>
      <NavDiv>
        <NavBoardContentDiv>
          <StyledHeaderBtn onClick={() => navi("/admin/carManagement")}>
            이벤트 게시판
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/carManagement")}>
            공지 사항
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/carManagement")}>
            문의 사항
          </StyledHeaderBtn>
        </NavBoardContentDiv>
      </NavDiv>
    </>
  );
};

export default NoticeNav;
