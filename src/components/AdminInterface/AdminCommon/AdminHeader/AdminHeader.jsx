import { useNavigate } from "react-router-dom";
import {
  StyledHeaderDiv,
  StyledHeaderTop,
  StyledLogoDiv,
  LogoImage,
  LogoText,
  StyledAuthButtons,
  StyledLoginButton,
  StyledNavbar,
  StyledNavLink,
} from "../../../UserInterface/Common/Header/Header.styles";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderDiv>
      {/* Top Bar: Logo + User Interface Button */}
      <StyledHeaderTop>
        <StyledLogoDiv onClick={() => navigate("/admin/memberManagement")}>
          <LogoImage src="/images/hourRent.png" alt="Logo" />
          <LogoText style={{ color: "#b5b6b7" }}>전기충만</LogoText>
        </StyledLogoDiv>
        <StyledAuthButtons>
          <StyledLoginButton onClick={() => navigate("/")}>
            유저 인터페이스로 이동
          </StyledLoginButton>
        </StyledAuthButtons>
      </StyledHeaderTop>

      {/* Admin Navigation */}
      <StyledNavbar style={{ backgroundColor: "#b5b6b7" }}>
        <StyledNavLink
          style={{ color: "#ffffff" }}
          onClick={() => navigate("/admin/carManagement")}
        >
          렌트카
        </StyledNavLink>
        <StyledNavLink
          style={{ color: "#ffffff" }}
          onClick={() => navigate("/admin/adminNews")}
        >
          커뮤니티
        </StyledNavLink>
        <StyledNavLink
          style={{ color: "#ffffff" }}
          onClick={() => navigate("/admin/notice")}
        >
          공지사항
        </StyledNavLink>
        <StyledNavLink
          style={{ color: "#ffffff" }}
          onClick={() => navigate("/admin/memberManagement")}
        >
          회원관리
        </StyledNavLink>
      </StyledNavbar>
    </StyledHeaderDiv>
  );
};

export default AdminHeader;
