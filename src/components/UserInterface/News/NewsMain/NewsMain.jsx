import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as S from "./NewsMain.styles";
import {
  TopNewsItem,
  MainNewsItem,
  SideNewsItem,
  ListNewsItem,
  SearchBar,
  removeHtmlTags,
  formatDate,
} from "./NewsItemComponents";

// 뉴스 메인 컴포넌트
const NewsMain = ({ backendUrl = "http://localhost:8080" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 상태 관리
  const [query, setQuery] = useState("전기차"); // 기본 검색어 설정
  const [results, setResults] = useState([]); // 검색 결과 저장
  const [imageResults, setImageResults] = useState({}); // 기사별 이미지 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [delayedVisible, setDelayedVisible] = useState(false); // 3초 후 표시되는 UI 요소
  const [error, setError] = useState(null); // 에러 메시지 저장
  const [topNews, setTopNews] = useState([]); // 상위 뉴스
  const [mainNews, setMainNews] = useState([]); // 주요 뉴스
  const [listNews, setListNews] = useState([]); // 뉴스 리스트

  // 검색 가능한 키워드 목록
  const keywords = ["전기차", "에너지", "태양광", "풍력", "수소"];

  // 뉴스 검색 함수
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      setError("뉴스 요청 중 오류 발생");
    }, 10000); // 10초 후 오류 메시지 표시

    axios
      .get(`${backendUrl}/api/naver-news`, {
        params: { query: searchQuery, display: 20, start: 1 },
      })
      .then((res) => {
        clearTimeout(timeoutId);
        const newsItems = res.data.items || [];

        // 중복된 제목 제거
        const uniqueNews = Array.from(
          new Map(
            newsItems.map((item) => [removeHtmlTags(item.title), item])
          ).values()
        );

        setTopNews(uniqueNews.slice(0, 3));
        setMainNews(uniqueNews.slice(3, 8));
        setListNews(uniqueNews.slice(0, 10));
        setResults(uniqueNews);

        fetchUpToNImages(uniqueNews, 8, () => {
          setLoading(false);
        });
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error("뉴스 요청 실패:", err);
        setError("뉴스 요청 중 오류 발생");
        setLoading(false);
      });
  };

  // 최대 N개의 이미지 검색
  const fetchUpToNImages = (articles, maxImages, callback) => {
    const imageCache = { ...imageResults };
    let index = 0;
    let successCount = 0;

    const processNext = () => {
      if (successCount >= maxImages || index >= articles.length) {
        setImageResults(imageCache);
        if (callback) callback();
        return;
      }

      const article = articles[index++];
      if (!article || imageCache[article.title]) {
        successCount++;
        setTimeout(processNext, 100);
        return;
      }

      const cleanTitle = removeHtmlTags(article.title);
      const searchKeywords = extractKeywords(cleanTitle);
      if (!searchKeywords) {
        imageCache[article.title] = "/loading.png";
        setTimeout(processNext, 100);
        return;
      }

      axios
        .get(`${backendUrl}/api/naver-image`, {
          params: { query: searchKeywords },
        })
        .then((res) => {
          const items = res.data.items;
          imageCache[article.title] =
            items?.[0]?.thumbnail || items?.[0]?.link || "/loading.png";
          successCount++;
          setTimeout(processNext, 100);
        })
        .catch((err) => {
          console.error("이미지 검색 오류:", err);
          imageCache[article.title] = "/loading.png";
          setTimeout(processNext, 100);
        });
    };

    processNext();
  };

  // 뉴스 제목에서 키워드를 추출하는 함수
  const extractKeywords = (title) => {
    const clean = title
      .replace(/<[^>]+>/g, "") // HTML 태그 제거
      .replace(/[^가-힣a-zA-Z0-9 ]/g, ""); // 특수 문자 제거
    const stopwords = ["보도", "한다", "이다", "및", "관련", "위해"]; // 불필요한 단어 제거
    const words = clean
      .split(" ")
      .filter((w) => w.length >= 2 && !stopwords.includes(w));
    return words.slice(0, 2).join(" "); // 최대 2개의 키워드 추출
  };

  // 이미지 URL을 가져오는 함수
  const getImageUrl = (item) => {
    return item && imageResults[item.title]
      ? imageResults[item.title]
      : "/loading.png";
  };

  // 뉴스 상세 페이지로 이동
  const handleChatClick = (item) => {
    const query = new URLSearchParams({
      title: item.title,
      description: item.description,
      pubDate: item.pubDate,
      originallink: item.originallink || item.link || "",
      imageUrl: getImageUrl(item),
    }).toString();
    navigate(`/newsDetail?${query}`);
  };

  // 뒤로 가기 시에도 뉴스 다시 검색
  useEffect(() => {
    setLoading(true);
    handleSearch();

    const timer = setTimeout(() => setDelayedVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [location.key]);

  // 뉴스 섹션 렌더링 함수
  const renderTopNewsSection = () => (
    <>
      <S.SectionHeader>
        <S.SectionIcon>|</S.SectionIcon> 주요 뉴스
      </S.SectionHeader>
      <S.TopNewsContainer>
        {topNews.map((item, index) => (
          <TopNewsItem
            key={index}
            item={item}
            getImageUrl={getImageUrl}
            onChatClick={handleChatClick}
          />
        ))}
      </S.TopNewsContainer>
    </>
  );

  const renderMainNewsSection = () => (
    <>
      <S.SectionHeader>
        <S.SectionIcon>|</S.SectionIcon> 오늘의 주요 기사
      </S.SectionHeader>
      <S.MainNewsSection>
        <S.MainNewsContent>
          {mainNews[0] && (
            <MainNewsItem
              item={mainNews[0]}
              getImageUrl={getImageUrl}
              onChatClick={handleChatClick}
            />
          )}
        </S.MainNewsContent>

        <S.SideContent>
          <S.SideGrid>
            {mainNews.slice(1).map((item, index) => (
              <SideNewsItem
                key={index}
                item={item}
                getImageUrl={getImageUrl}
                onChatClick={handleChatClick}
              />
            ))}
          </S.SideGrid>
        </S.SideContent>
      </S.MainNewsSection>
    </>
  );

  const renderNewsList = () => (
    <S.NewsList>
      <S.NewsHeader>뉴스 리스트</S.NewsHeader>
      <S.NewsItems>
        {listNews.map((item, index) => (
          <ListNewsItem
            key={index}
            item={item}
            delayedVisible={delayedVisible}
            onChatClick={handleChatClick}
          />
        ))}
      </S.NewsItems>
      <S.LoadMoreButton onClick={() => {}}>더보기</S.LoadMoreButton>
    </S.NewsList>
  );

  return (
    <S.FullWidthContainer>
      <S.Container>
        <S.PageHeader>뉴스 검색</S.PageHeader>

        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          keywords={keywords}
        />

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        {renderTopNewsSection()}
        {renderMainNewsSection()}
        {renderNewsList()}
      </S.Container>
    </S.FullWidthContainer>
  );
};

export default NewsMain;
