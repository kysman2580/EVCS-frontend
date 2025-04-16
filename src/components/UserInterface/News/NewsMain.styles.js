import styled from "styled-components";

// 전체 너비 컨테이너 (화면 가득 채우기)
export const FullWidthContainer = styled.div`
  width: 100vw; /* 💡 화면 전체 너비로 설정 */
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden; /* 💡 수평 스크롤 방지 */
`;

// 기본 컨테이너
export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
`;

// 페이지 헤더
export const PageHeader = styled.h1`
  font-weight: bold;
  margin: 20px 0;
  padding: 0 20px;
  color: #333;
  text-align: center;
`;

// 섹션 헤더
export const SectionHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 15px;
  padding: 0 20px;
  color: #333;
  display: flex;
  align-items: center;
`;

export const SectionIcon = styled.span`
  color: #03c75a; // 네이버 그린 색상
  font-weight: bold;
  margin-right: 8px;
  font-size: 20px;
`;

// 섹션 제목
export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 10px;
  color: #333;
  border-left: 4px solid #03c75a;
  padding-left: 10px;
`;

// 검색 바
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 20px;
  gap: 10px;
  background-color: #f5f6f7;
  width: 100%;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border: 1px solid #03c75a;
  border-radius: 24px;
  padding: 5px;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 10px 15px;
  border-radius: 24px;
  outline: none;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  background: #03c75a;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 키워드 버튼
export const KeywordButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
`;

export const KeywordButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#03c75a" : "#e0e0e0")};
  color: ${(props) => (props.active ? "white" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.active ? "#02b350" : "#d0d0d0")};
    transform: translateY(-2px);
  }
`;

// 로딩 및 에러 메시지
export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  font-size: 16px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 20px 0;
`;

// 상단 주요 뉴스 (3개)
export const TopNewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px 20px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TopNewsItem = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ThumbnailLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

// 썸네일
export const ThumbnailSmall = styled.div`
  height: 80px;
  background-color: #eee;
  margin-bottom: 5px;
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  transition: opacity 0.3s;

  ${ThumbnailLink}:hover & {
    opacity: 0.9;
  }
  object-fit: cover;
`;

export const ThumbnailMedium = styled.div`
  height: 150px;
  background-color: #eee;
  margin-bottom: 5px;
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  transition: opacity 0.3s;

  ${ThumbnailLink}:hover & {
    opacity: 0.9;
  }
  object-fit: cover;
`;

export const ThumbnailLarge = styled.div`
  height: 300px;
  background-color: #eee;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  transition: opacity 0.3s;
  border-radius: 5px;

  ${ThumbnailLink}:hover & {
    opacity: 0.9;
  }
  object-fit: cover;
`;

// 콘텐츠 정보
export const ContentInfo = styled.div`
  padding: 10px 12px;
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #333;

  ${ThumbnailLink}:hover & {
    color: #03c75a;
  }
`;

export const SmallTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #333;

  ${ThumbnailLink}:hover & {
    color: #03c75a;
  }
`;

export const Description = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;

export const Metadata = styled.div`
  font-size: 12px;
  color: #777;
`;

export const SmallMetadata = styled.div`
  font-size: 11px;
  color: #777;
`;

// 메인 뉴스 섹션
export const MainNewsSection = styled.div`
  display: flex;
  margin: 0 20px 30px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainNewsContent = styled.div`
  flex: 2;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const SideContent = styled.div`
  flex: 1;
`;

export const SideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const SideItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  padding: 8px;
  transition: transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

// 구분선
export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #ddd;
`;

export const DividerText = styled.div`
  padding: 0 20px;
  color: #666;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
`;

// 그리드 콘텐츠
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 0 20px 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

// 뉴스 리스트
export const NewsList = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin: 0 20px 30px;
`;

export const NewsHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  color: #333;
`;

export const NewsItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NewsItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px dotted #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const NewsLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    color: #03c75a;
  }
`;

export const NewsTitle = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NewsDate = styled.span`
  color: #888;
  font-size: 12px;
  margin-left: 10px;
  white-space: nowrap;
`;

// 더보기 버튼
export const LoadMoreButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #03c75a;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #02b350;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background-color: ${(props) =>
      props.children === "더 이상 결과가 없습니다" ? "#cccccc" : "#03c75a"};
    opacity: ${(props) =>
      props.children === "더 이상 결과가 없습니다" ? "0.7" : "0.5"};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
