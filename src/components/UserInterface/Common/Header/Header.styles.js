// components/Header/Header.styles.js
import styled from "styled-components";

// Header 전체 스타일
export const StyledHeaderDiv = styled.header`
  width: 100%;
  background-color: #ffffff;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

// 상단 로고 및 인증 버튼 영역
export const StyledHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 로고 클릭 영역
export const StyledLogoDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-right: 0.75rem;
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #62c554;
`;

// 인증 버튼 그룹
export const StyledAuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// 로그인 버튼
export const StyledLoginButton = styled.button`
  background: none;
  border: none;
  color: #606367;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: #313131;
  }
`;

// 회원가입 / 로그아웃 버튼
export const StyledSignupButton = styled.button`
  background-color: #62c554;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #58a942;
  }
`;

// 네비게이션 바
export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0.5rem 0;
  background-color: #d5ffdc;
  border-radius: 0.375rem;
  margin-top: 1rem;
`;

// 네비게이션 링크
export const StyledNavLink = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #606367;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    color: #313131;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
  }
`;

// 로그인 후 사용자 메뉴 영역
export const StyledMemberDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
