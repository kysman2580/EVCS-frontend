import {
  StyledHeaderDiv,
  StyledHomeDiv,
  StyledHeaderBtn,
  StyledHomeCenterDiv,
  StyledMemberDiv,
  StyledLogoDiv,
  LogoImg,
  NavLink,
} from "./AdminHeader.styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navi = useNavigate();
  return (
    <>
      <StyledHeaderDiv>
        <StyledLogoDiv>
          <NavLink onClick={() => navi("/admin/main")}>
            <LogoImg src="/images/Logo.png" />
          </NavLink>
        </StyledLogoDiv>
        <StyledHomeCenterDiv>
          <StyledHeaderBtn onClick={() => navi("/admin/carManagement")}>
            렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn>커뮤니티</StyledHeaderBtn>
          <StyledHeaderBtn>공지사항</StyledHeaderBtn>
          <StyledHeaderBtn>회원관리</StyledHeaderBtn>
        </StyledHomeCenterDiv>
        <StyledMemberDiv>
          <StyledHeaderBtn onClick={() => navi("/")}>
            유저 인터페이스로 이동 ~
          </StyledHeaderBtn>
        </StyledMemberDiv>
      </StyledHeaderDiv>
    </>
  );
};

export default Header;
