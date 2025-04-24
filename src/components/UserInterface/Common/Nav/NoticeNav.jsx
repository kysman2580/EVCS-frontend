import { NavDiv, StyledHeaderBtn, NavBoardContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const NoticeNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavBoardContentDiv>
          <StyledHeaderBtn onClick={() => navi("/eventBoard")}>
            이벤트 게시판
          </StyledHeaderBtn>
          <StyledHeaderBtn>공지 사항</StyledHeaderBtn>
          <StyledHeaderBtn>문의 사항</StyledHeaderBtn>
        </NavBoardContentDiv>
      </NavDiv>
    </>
  );
};

export default NoticeNav;
