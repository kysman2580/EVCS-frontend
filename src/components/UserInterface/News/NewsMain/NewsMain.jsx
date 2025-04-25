"use client";

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

const NewsMain = ({ backendUrl = "http://localhost:80" }) => {
  const navigate = useNavigate();

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
        params: { query: searchQuery, display: 100, start: 1 },
      })
      .then((res) => {
        clearTimeout(timeoutId);
        const newsItems = res.data.items || [];
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
        imageCache[article.title] = "/images/loading.png";
        setTimeout(processNext, 100);
        return;
      }

      const imageRequest = axios.get(`${backendUrl}/api/naver-image`, {
        params: { query: searchKeywords },
      });

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Image request timeout")), 5000)
      );

      Promise.race([imageRequest, timeout])
        .then((res) => {
          const items = res.data?.items || [];
          imageCache[article.title] =
            items[0]?.thumbnail || items[0]?.link || "/images/loading.png";
          successCount++;
          setTimeout(processNext, 100);
        })
        .catch((err) => {
          console.error("이미지 검색 오류:", err.message);
          imageCache[article.title] = "/images/loading.png";
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

  const getImageUrl = (item) => {
    return item && imageResults[item.title]
      ? imageResults[item.title]
      : "/images/loading.png";
  };

  const handleChatClick = (item) => {
    navigate("/newsDetail", {
      state: {
        title: removeHtmlTags(item.title),
        description: removeHtmlTags(item.description),
        pubDate: formatDate(item.pubDate),
        imageUrl: getImageUrl(item),
        originallink: item.originallink,
        query: query,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    handleSearch();
  }, []);

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
            loading={loading}
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
              loading={loading}
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
                loading={loading}
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
            onChatClick={handleChatClick}
            loading={loading}
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
