"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./NewsMain.styles";

const NewsMain = ({ backendUrl = "http://localhost:8080" }) => {
  const [query, setQuery] = useState("전기차");
  const [results, setResults] = useState([]);
  const [imageResults, setImageResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topNews, setTopNews] = useState(new Array(3).fill(null));
  const [mainNews, setMainNews] = useState(new Array(5).fill(null));
  const [listNews, setListNews] = useState(new Array(10).fill(null));

  const keywords = ["전기차", "에너지", "태양광", "풍력", "수소"];

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      setError("뉴스 요청 중 오류 발생");
    }, 10000); // 10초 후 에러 메시지 표시

    axios
      .get(`${backendUrl}/api/naver-news`, {
        params: { query: searchQuery, display: 20, start: 1 },
      })
      .then((res) => {
        clearTimeout(timeoutId);

        const newsItems = res.data.items || [];

        if (newsItems.length === 0) {
          setTopNews([]);
          setMainNews([]);
          setListNews([]);
          setLoading(false);
          setError("검색 결과가 없습니다");
          return;
        }

        setTopNews(newsItems.slice(0, 3));
        setMainNews(newsItems.slice(3, 8));
        setListNews(newsItems.slice(0, 10));
        setResults(newsItems);

        fetchUpToNImages(newsItems, 8, () => {
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
        imageCache[article.title] = "/lodaing.png";
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
            items?.[0]?.thumbnail || items?.[0]?.link || "/lodaing.png";
          successCount++;
          setTimeout(processNext, 100);
        })
        .catch((err) => {
          console.error("이미지 검색 오류:", err);
          imageCache[article.title] = "/lodaing.png";
          setTimeout(processNext, 100);
        });
    };

    processNext();
  };

  const extractKeywords = (title) => {
    const clean = title
      .replace(/<[^>]+>/g, "")
      .replace(/[^가-힣a-zA-Z0-9 ]/g, "");
    const stopwords = ["보도", "한다", "이다", "및", "관련", "위해"];
    const words = clean
      .split(" ")
      .filter((w) => w.length >= 2 && !stopwords.includes(w));
    return words.slice(0, 2).join(" ");
  };

  const removeHtmlTags = (text) => {
    return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
  };

  const getImageUrl = (item) => {
    if (!item) return "/lodaing.png";
    return imageResults[item.title] || "/lodaing.png";
  };

  const handleLinkClick = (url, e) => {
    if (!url) {
      e.preventDefault();
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLoadMore = () => {
    // 동작 없음
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <S.FullWidthContainer>
      <S.Container>
        <S.PageHeader>뉴스 검색</S.PageHeader>
        <S.SearchContainer>
          <S.SearchBarWrapper>
            <S.SearchInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <S.SearchButton onClick={() => handleSearch()} disabled={false}>
              🔍
            </S.SearchButton>
          </S.SearchBarWrapper>

          <S.KeywordButtonContainer>
            {keywords.map((keyword) => (
              <S.KeywordButton
                key={keyword}
                onClick={() => {
                  setQuery(keyword);
                  handleSearch(keyword);
                }}
                active={query === keyword}
              >
                {keyword}
              </S.KeywordButton>
            ))}
          </S.KeywordButtonContainer>
        </S.SearchContainer>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        {!error && (
          <>
            {/* 상단 주요 뉴스 */}
            <S.SectionHeader>
              <S.SectionIcon>|</S.SectionIcon> 주요 뉴스
            </S.SectionHeader>
            <S.TopNewsContainer>
              {topNews.map((item, index) => (
                <S.TopNewsItem key={index}>
                  <S.ThumbnailLink
                    href={item?.originallink || item?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) =>
                      item && handleLinkClick(item.originallink || item.link, e)
                    }
                  >
                    <S.ThumbnailMedium imageUrl={getImageUrl(item)} />
                    <S.ContentInfo>
                      <S.Title>
                        {item ? removeHtmlTags(item.title) : "로딩 중..."}
                      </S.Title>
                      <S.Metadata>
                        {item ? formatDate(item.pubDate) : "⏳"}
                      </S.Metadata>
                    </S.ContentInfo>
                  </S.ThumbnailLink>
                </S.TopNewsItem>
              ))}
            </S.TopNewsContainer>

            {/* 주요 기사 */}
            <S.SectionHeader>
              <S.SectionIcon>|</S.SectionIcon> 오늘의 주요 기사
            </S.SectionHeader>
            <S.MainNewsSection>
              <S.MainNewsContent>
                <S.ThumbnailLink
                  href={mainNews[0]?.originallink || mainNews[0]?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) =>
                    mainNews[0] &&
                    handleLinkClick(
                      mainNews[0].originallink || mainNews[0].link,
                      e
                    )
                  }
                >
                  <S.ThumbnailLarge imageUrl={getImageUrl(mainNews[0])} />
                  <S.ContentInfo>
                    <S.Title>
                      {mainNews[0]
                        ? removeHtmlTags(mainNews[0].title)
                        : "로딩 중..."}
                    </S.Title>
                    <S.Description>
                      {mainNews[0]
                        ? removeHtmlTags(mainNews[0].description)
                        : "잠시만 기다려주세요..."}
                    </S.Description>
                    <S.Metadata>
                      {mainNews[0] ? formatDate(mainNews[0].pubDate) : "⏳"}
                    </S.Metadata>
                  </S.ContentInfo>
                </S.ThumbnailLink>
              </S.MainNewsContent>

              <S.SideContent>
                <S.SideGrid>
                  {mainNews.slice(1).map((item, index) => (
                    <S.SideItem key={index}>
                      <S.ThumbnailLink
                        href={item?.originallink || item?.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) =>
                          item &&
                          handleLinkClick(item.originallink || item.link, e)
                        }
                      >
                        <S.ThumbnailSmall imageUrl={getImageUrl(item)} />
                        <S.ContentInfo>
                          <S.SmallTitle>
                            {item ? removeHtmlTags(item.title) : "로딩 중..."}
                          </S.SmallTitle>
                          <S.SmallMetadata>
                            {item ? formatDate(item.pubDate) : "⏳"}
                          </S.SmallMetadata>
                        </S.ContentInfo>
                      </S.ThumbnailLink>
                    </S.SideItem>
                  ))}
                </S.SideGrid>
              </S.SideContent>
            </S.MainNewsSection>

            {/* 뉴스 리스트 */}
            <S.NewsList>
              <S.NewsHeader>뉴스 리스트</S.NewsHeader>
              <S.NewsItems>
                {listNews.map((item, index) => (
                  <S.NewsItem key={index}>
                    <S.NewsLink
                      href={item?.originallink || item?.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) =>
                        item &&
                        handleLinkClick(item.originallink || item.link, e)
                      }
                    >
                      <S.NewsTitle>
                        {item ? removeHtmlTags(item.title) : "로딩 중..."}
                        <S.NewsDate>
                          {item ? formatDate(item.pubDate) : "⏳"}
                        </S.NewsDate>
                      </S.NewsTitle>
                    </S.NewsLink>
                  </S.NewsItem>
                ))}
              </S.NewsItems>
              <S.LoadMoreButton onClick={handleLoadMore}>
                더보기
              </S.LoadMoreButton>
            </S.NewsList>
          </>
        )}
      </S.Container>
    </S.FullWidthContainer>
  );
};

export default NewsMain;
