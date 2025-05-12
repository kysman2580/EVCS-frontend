import { NavDiv, StyledHeaderBtn, NavRentContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

// prettier-ignore
const MyPageNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavRentContentDiv style={{ height: "400px" }}>
          <StyledHeaderBtn onClick={() => navi("/myPage")}>
            내 정보
          </StyledHeaderBtn>

          <StyledHeaderBtn onClick={() => navi("/newsMyPage")}>
            내 뉴스
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/report")}>
            게시글 신고 내역
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/reportCom")}>
            댓글 신고 내역
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/reservationList")}>
            구매 내역
          </StyledHeaderBtn>

        </NavRentContentDiv>
      </NavDiv>
    </>
  );
};
export default MyPageNav;
