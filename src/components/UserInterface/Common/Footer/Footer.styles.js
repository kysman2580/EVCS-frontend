// components/Footer/Footer.styles.js
import styled from "styled-components";

// Footer 전체 래퍼
export const FooterWrapper = styled.footer`
  background-color: #333333;
  padding: 3rem 1.5rem;
  width: 100%;
`;

// Footer 내부 컨텐츠 그리드
export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Footer 각 섹션 제목
export const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
`;

// Footer 섹션 소제목
export const FooterSubtitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
`;

// Footer 설명 텍스트
export const FooterText = styled.p`
  font-size: 0.875rem;
  color: #babcbe;
  margin: 0;
`;

// Footer 리스트
export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// 리스트 아이템
export const FooterListItem = styled.li`
  color: #babcbe;
`;

// 링크 스타일
export const FooterLink = styled.a`
  font-size: 0.875rem;
  color: #babcbe;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

// Footer 하단 영역
export const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  text-align: center;
  color: #babcbe;
`;

// 저작권 문구
export const Copyright = styled.p`
  font-size: 0.875rem;
  color: #babcbe;
  margin: 0;
`;
