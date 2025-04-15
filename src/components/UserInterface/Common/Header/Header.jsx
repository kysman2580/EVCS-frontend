import {
  StyledHeaderDiv,
  StyledHomeDiv,
  StyledHeaderBtn,
  StyledHomeCenterDiv,
  StyledMemberDiv,
  StyledLogoDiv,
  LogoImg,
  NavLink,
} from "./Header.styled";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navi = useNavigate();

  return (
    <>
      <StyledHeaderDiv>
        <StyledLogoDiv>
          <NavLink onClick={() => navi("/")}>
            <LogoImg src="/images/Logo.png" />
          </NavLink>
        </StyledLogoDiv>
        <StyledHomeCenterDiv>
          <StyledHeaderBtn onClick={() => navi("/rentCar")}>
            렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn>커뮤니티</StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/chargingMap")}>
            충전소 조회
          </StyledHeaderBtn>
          <StyledHeaderBtn>뉴스</StyledHeaderBtn>
          <StyledHeaderBtn>공지사항</StyledHeaderBtn>
        </StyledHomeCenterDiv>
        <StyledMemberDiv>
          <StyledHeaderBtn>로그인</StyledHeaderBtn>
          <StyledHeaderBtn>회원가입</StyledHeaderBtn>
          <StyledHeaderBtn>로그아웃</StyledHeaderBtn>
          <StyledHeaderBtn>아이콘</StyledHeaderBtn>
        </StyledMemberDiv>
      </StyledHeaderDiv>
    </>
  );
};

export default Header;
