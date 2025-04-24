import {
  StyledHeaderDiv,
  StyledHomeDiv,
  StyledHeaderBtn,
  StyledHomeCenterDiv,
  StyledMemberDiv,
  StyledLogoDiv,
  LogoImg,
  NavLink,
} from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const Header = () => {
  const navi = useNavigate();
  const { auth, logout } = useAuth();

    return (
      <>
        <StyledHeaderDiv>
          <StyledLogoDiv>
            <NavLink onClick={() => navi("/")}>
              <LogoImg src="/images/Logo.png" />
            </NavLink>
          </StyledLogoDiv>
          <StyledHomeCenterDiv>
            <StyledHeaderBtn onClick={() => navi("/timerentalPage")}>
              렌트카
            </StyledHeaderBtn>
            <StyledHeaderBtn onClick={() => navi("/driveRouteBoard")}>
            커뮤니티
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/chargingMap")}>
            충전소 조회
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/newsMain")}>
            뉴스
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/notice")}>
            공지사항
          </StyledHeaderBtn>
        </StyledHomeCenterDiv>
        <StyledMemberDiv>
          {auth.isAuthenticated ? (
            <>
              <StyledHeaderBtn>{auth.memberName}님</StyledHeaderBtn>
              <StyledHeaderBtn onClick={logout}>로그아웃</StyledHeaderBtn>
              <StyledHeaderBtn>아이콘</StyledHeaderBtn>
            </>
          ) : (
            <>
              <StyledHeaderBtn onClick={() => navi("/loginPage")}>로그인</StyledHeaderBtn>
              <StyledHeaderBtn onClick={() => navi("/signUpPage")}>회원가입</StyledHeaderBtn>
            </>
          )}
          <StyledHeaderBtn onClick={() => navi("/admin/main")}>
            관리자페이지로
          </StyledHeaderBtn>
        </StyledMemberDiv>
      </StyledHeaderDiv>
    </>
  );
};

export default Header;
