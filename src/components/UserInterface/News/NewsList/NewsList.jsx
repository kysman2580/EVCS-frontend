import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  ListNewsItem,
  SearchBar,
  removeHtmlTags,
  formatDate,
} from "../NewsMain/NewsItemComponents";
import * as S from "../NewsMain/NewsMain.styles";

const NewsList = ({ backendUrl = "http://localhost:80" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [query, setQuery] = useState(queryParams.get("query") || "전기차");
  const [sort, setSort] = useState(queryParams.get("sort") || "sim");
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const [size] = useState(10);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageResults, setImageResults] = useState({});
  const [keywords, setKeywords] = useState([]);

  const fetchNews = async (targetPage = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/naver-news-list`, {
        params: { query, sort, page: targetPage, size },
      });

      const rawItems = res.data.items || [];
      const uniqueItems = Array.from(
        new Map(rawItems.map((item) => [item.originallink, item])).values()
      );

      setItems(uniqueItems);
      setTotal(res.data.total || 0);
      setPage(targetPage);
    } catch (err) {
      console.error("뉴스 리스트 요청 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    const key = removeHtmlTags(item.title);
    return imageResults[key] || "/images/loading.png";
  };

  const extractKeywords = (title) => {
    const clean = title
      .replace(/<[^>]+>/g, "")
      .replace(/[^가-힣a-zA-Z0-9 ]/g, "");
    return clean
      .split(" ")
      .filter((w) => w.length >= 2)
      .slice(0, 2)
      .join(" ");
  };

  const handleChatClick = async (item) => {
    const key = removeHtmlTags(item.title);
    let imageUrl = getImageUrl(item);

    if (imageUrl === "/images/loading.png") {
      try {
        const kws = extractKeywords(key);
        const res = await axios.get(`${backendUrl}/api/naver-image`, {
          params: { query: kws },
        });
        const hits = res.data.items || [];
        imageUrl = hits[0]?.thumbnail || hits[0]?.link || "/images/loading.png";
        setImageResults((prev) => ({ ...prev, [key]: imageUrl }));
      } catch (e) {
        console.error("ChatIcon 클릭 시 이미지 재요청 실패:", e);
      }
    }

    navigate("/newsDetail", {
      state: {
        title: removeHtmlTags(item.title),
        description: removeHtmlTags(item.description),
        pubDate: formatDate(item.pubDate),
        imageUrl,
        originallink: item.originallink,
        query,
      },
    });
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/news/categories`);
      const list = res.data
        .map((item) => item.newsCategory)
        .filter((name) => name && name !== "기타");
      setKeywords(list);
    } catch (err) {
      console.error("카테고리 로딩 실패:", err);
      setKeywords(["전기차"]);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [query, sort]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(Math.min(total, 1000) / size);
  const currentBlock = Math.floor((page - 1) / 10);
  const startPage = currentBlock * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (targetPage) => {
    fetchNews(targetPage);
  };

  const handleBlockPrev = () => {
    const prevBlockStart = startPage - 10;
    if (prevBlockStart >= 1) handlePageChange(prevBlockStart);
  };

  const handleBlockNext = () => {
    const nextBlockStart = startPage + 10;
    if (nextBlockStart <= totalPages) handlePageChange(nextBlockStart);
  };

  return (
    <S.FullWidthContainer>
      <S.Container>
        <S.PageHeader>뉴스 전체 보기</S.PageHeader>

        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={() => fetchNews(1)}
          keywords={keywords}
        />

        <S.SectionHeader>
          <S.SectionIcon>|</S.SectionIcon> 정렬 기준
        </S.SectionHeader>
        <S.SortButtons>
          <button onClick={() => setSort("sim")} disabled={sort === "sim"}>
            유사도순
          </button>
          <button onClick={() => setSort("date")} disabled={sort === "date"}>
            최신순
          </button>
        </S.SortButtons>

        <S.SectionHeader>
          <S.SectionIcon>|</S.SectionIcon> 전체 뉴스 리스트
        </S.SectionHeader>

        <S.NewsList>
          <S.NewsItems>
            {items.map((item) => (
              <ListNewsItem
                key={item.originallink}
                item={item}
                onChatClick={handleChatClick}
                loading={loading}
              />
            ))}
          </S.NewsItems>
        </S.NewsList>

        <S.Pagination>
          {page > 1 && (
            <button onClick={() => handlePageChange(1)}>{"<<"}</button>
          )}
          {startPage > 1 && <button onClick={handleBlockPrev}>{"<"}</button>}

          {visiblePages.map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              disabled={p === page}
            >
              {p}
            </button>
          ))}

          {endPage < totalPages && (
            <button onClick={handleBlockNext}>{">"}</button>
          )}
          {page < totalPages && (
            <button onClick={() => handlePageChange(totalPages)}>{">>"}</button>
          )}
        </S.Pagination>
      </S.Container>
    </S.FullWidthContainer>
  );
};

export default NewsList;
