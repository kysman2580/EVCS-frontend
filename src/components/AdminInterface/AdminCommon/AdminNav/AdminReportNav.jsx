import { NavDiv, StyledHeaderBtn, NavRentContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const AdminReportNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavRentContentDiv>
          <StyledHeaderBtn onClick={() => navi("/admin/memberManagement")}>
            회원 관리
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/adminReport")}>
            게시글 신고 관리
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/adminReportCom")}>
            댓글 신고 관리
          </StyledHeaderBtn>
        </NavRentContentDiv>
      </NavDiv>
    </>
  );
};
export default AdminReportNav;
