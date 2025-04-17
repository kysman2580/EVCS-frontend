"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as S from "./NewsMain.styles";

const NewsMain = ({ backendUrl = "http://localhost:8080" }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 URL 감지
  const [query, setQuery] = useState("전기차");
  const [results, setResults] = useState([]);
  const [imageResults, setImageResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topNews, setTopNews] = useState([]);
  const [mainNews, setMainNews] = useState([]);
  const [listNews, setListNews] = useState([]);

  const keywords = ["전기차", "에너지", "태양광", "풍력", "수소"];

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      setError("뉴스 요청 중 오류 발생");
    }, 10000);

    axios
      .get(`${backendUrl}/api/naver-news`, {
        params: { query: searchQuery, display: 20, start: 1 },
      })
      .then((res) => {
        clearTimeout(timeoutId);
        const newsItems = res.data.items || [];

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

  const removeHtmlTags = (text) => (text ? text.replace(/<[^>]+>/g, "") : "");
  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
  };

  const getImageUrl = (item) => {
    if (!item) return "/lodaing.png";
    return imageResults[item.title] || "/lodaing.png";
  };

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

  // ✅ 뒤로가기 시에도 다시 불러오도록
  useEffect(() => {
    handleSearch();
  }, [location.key]); // location.key가 바뀌면 다시 fetch

  return (
    <S.FullWidthContainer>
      <S.Container>
        <S.PageHeader>뉴스 검색</S.PageHeader>

        <S.SearchContainer>
          <S.SearchBarWrapper>
            <S.SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="검색어를 입력하세요"
            />
            <S.SearchButton onClick={handleSearch}>🔍</S.SearchButton>
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

        {/* 주요 뉴스 */}
        <S.SectionHeader>
          <S.SectionIcon>|</S.SectionIcon> 주요 뉴스
        </S.SectionHeader>
        <S.TopNewsContainer>
          {topNews.map((item, index) => (
            <S.TopNewsItem key={index} style={{ position: "relative" }}>
              <S.ThumbnailLink
                href={item?.originallink || item?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
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
              {item && getImageUrl(item) !== "/lodaing.png" && (
                <S.ChatIconWrapper
                  top="10px"
                  left="10px"
                  right="auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChatClick(item);
                  }}
                >
                  <S.ChatIcon src="/images/chat_icon_Anggara.png" alt="Chat" />
                </S.ChatIconWrapper>
              )}
            </S.TopNewsItem>
          ))}
        </S.TopNewsContainer>

        {/* 오늘의 주요 기사 */}
        <S.SectionHeader>
          <S.SectionIcon>|</S.SectionIcon> 오늘의 주요 기사
        </S.SectionHeader>
        <S.MainNewsSection>
          <S.MainNewsContent style={{ position: "relative" }}>
            {mainNews[0] && (
              <>
                <S.ThumbnailLink
                  href={mainNews[0]?.originallink || mainNews[0]?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.ThumbnailLarge imageUrl={getImageUrl(mainNews[0])} />
                  <S.ContentInfo>
                    <S.Title>{removeHtmlTags(mainNews[0].title)}</S.Title>
                    <S.Description>
                      {removeHtmlTags(mainNews[0].description)}
                    </S.Description>
                    <S.Metadata>{formatDate(mainNews[0].pubDate)}</S.Metadata>
                  </S.ContentInfo>
                </S.ThumbnailLink>
                <S.ChatIconWrapper
                  top="20px"
                  left="20px"
                  right="auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChatClick(mainNews[0]);
                  }}
                >
                  <S.ChatIcon src="/images/chat_icon_Anggara.png" alt="Chat" />
                </S.ChatIconWrapper>
              </>
            )}
          </S.MainNewsContent>

          <S.SideContent>
            <S.SideGrid>
              {mainNews.slice(1).map((item, index) => (
                <S.SideItem key={index} style={{ position: "relative" }}>
                  <S.ThumbnailLink
                    href={item?.originallink || item?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <S.ThumbnailSmall imageUrl={getImageUrl(item)} />
                    <S.ContentInfo>
                      <S.SmallTitle>{removeHtmlTags(item.title)}</S.SmallTitle>
                      <S.SmallMetadata>
                        {formatDate(item.pubDate)}
                      </S.SmallMetadata>
                    </S.ContentInfo>
                  </S.ThumbnailLink>
                  <S.ChatIconWrapper
                    top="15px"
                    left="15px"
                    right="auto"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleChatClick(item);
                    }}
                  >
                    <S.ChatIcon
                      src="/images/chat_icon_Anggara.png"
                      alt="Chat"
                    />
                  </S.ChatIconWrapper>
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
              <S.NewsItem key={index} style={{ position: "relative" }}>
                <S.NewsLink
                  href={item?.originallink || item?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.NewsTitle>
                    {removeHtmlTags(item.title)}
                    <S.NewsDate>{formatDate(item.pubDate)}</S.NewsDate>
                  </S.NewsTitle>
                </S.NewsLink>
                <S.ChatIconWrapper
                  top="-5px"
                  right="70px"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChatClick(item);
                  }}
                >
                  <S.ChatIcon src="/images/chat_icon_Anggara.png" alt="Chat" />
                </S.ChatIconWrapper>
              </S.NewsItem>
            ))}
          </S.NewsItems>
          <S.LoadMoreButton onClick={() => {}}>더보기</S.LoadMoreButton>
        </S.NewsList>
      </S.Container>
    </S.FullWidthContainer>
  );
};

export default NewsMain;
