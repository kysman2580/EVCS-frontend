import {
  StyledHeaderDiv,
  StyledHomeDiv,
  StyledHeaderBtn,
  StyledHomeCenterDiv,
  StyledMemberDiv,
  StyledLogoDiv,
  LogoImg,
} from "./Header.styled";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <StyledHeaderDiv>
        <StyledLogoDiv>
          <Link to="/">
            <LogoImg src="/images/Logo.png" />
          </Link>
        </StyledLogoDiv>
        <StyledHomeCenterDiv>
          <StyledHeaderBtn>렌트카</StyledHeaderBtn>
          <StyledHeaderBtn>커뮤니티</StyledHeaderBtn>
          <StyledHeaderBtn>충전소 조회</StyledHeaderBtn>
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
