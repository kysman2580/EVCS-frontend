// components/Main.styles.js
import styled from "styled-components";

// 전체 Main 컨테이너
export const MainContainerDiv = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f3f4;
  padding: 1.5rem;
`;

// Hero Section
export const HeroSection = styled.section`
  width: 100%;
  background: linear-gradient(to bottom right, #d5ffdc, #f1f3f4);
  padding: 3rem 1.5rem;
  border-radius: 10px;
`;
export const HeroContent = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const HeroText = styled.div`
  max-width: 55%;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
`;
export const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #313131;
  margin-bottom: 0.75rem;
`;
export const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #62c554;
  margin-bottom: 1.25rem;
`;
export const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: #606367;
  margin-bottom: 1.75rem;
  max-width: 28rem;
`;
export const CtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #62c554;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #58a942;
  }
`;
export const HeroImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    width: 260px;
    height: 260px;
  }
`;
export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Swiper
export const SwiperDiv = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

// Quick Links
export const MainBtnDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;
export const MainATag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
export const MainBtnImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;
export const MainSpan = styled.span`
  font-size: 0.875rem;
  color: #606367;
  text-align: center;
`;

// Features
export const FeaturesSection = styled.section`
  width: 100%;
  background-color: #ffffff;
  padding: 4rem 1.5rem;
`;
export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #313131;
  text-align: center;
  margin-bottom: 3rem;
`;
export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const FeatureCard = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
export const FeatureIconWrapper = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  background-color: #f1f3f4;
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #313131;
  margin-bottom: 0.5rem;
`;
export const FeatureDescription = styled.p`
  color: #606367;
`;

// News
export const MainBodyDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 1.5rem;
`;
export const MainLeftDiv = styled.div`
  max-width: 800px;
  width: 100%;
`;
export const MainNewsDiv = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// placeholders
export const MainRightDiv = styled.div``;
export const MainNoitceDiv = styled.div``;
export const MainRankingDiv = styled.div``;
