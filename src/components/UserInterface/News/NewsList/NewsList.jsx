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

  // URL 쿼리 파라미터나 기본값("전기차")으로 초기화
  const [query, setQuery] = useState(queryParams.get("query") || "전기차");
  const [sort, setSort] = useState(queryParams.get("sort") || "sim");
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const size = 10;

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageResults, setImageResults] = useState({});
  const [keywords, setKeywords] = useState([]);

  // 실제 뉴스 API 호출
  const fetchNews = async (targetPage = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/naver-news-list`, {
        params: { query, sort, page: targetPage, size },
      });

      const rawItems = res.data.items || [];
      // 중복 제거
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

  // 검색 버튼 클릭 또는 키워드 버튼 클릭 핸들러
  // searchQuery 파라미터가 있으면 그걸, 없으면 현재 query state를 사용
  const handleSearch = (searchQuery) => {
    const q = (searchQuery ?? query).trim() || "전기차";
    setQuery(q);
    fetchNews(1);
  };

  // 카테고리(키워드) 불러오기
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

  // 컴포넌트 처음 마운트 시
  useEffect(() => {
    fetchNews(1);
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(Math.min(total, 1000) / size);
  const currentBlock = Math.floor((page - 1) / 10);
  const startPage = currentBlock * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // 페이지 변경 핸들러
  const handlePageChange = (targetPage) => fetchNews(targetPage);
  const handleBlockPrev = () => {
    const prev = startPage - 10;
    if (prev >= 1) handlePageChange(prev);
  };
  const handleBlockNext = () => {
    const next = startPage + 10;
    if (next <= totalPages) handlePageChange(next);
  };

  // 아이템 클릭 → 상세 페이지로 이동
  const handleChatClick = (item) => {
    navigate("/newsDetail", {
      state: {
        title: removeHtmlTags(item.title),
        description: removeHtmlTags(item.description),
        pubDate: formatDate(item.pubDate),
        imageUrl: item.imageUrl,
        originallink: item.originallink,
        query,
      },
    });
  };

  return (
    <S.FullWidthContainer>
      <S.Container>
        <S.PageHeader>뉴스 전체 보기</S.PageHeader>

        {/* 수정된 SearchBar */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          keywords={keywords}
        />

        <S.SectionHeader>
          <S.SectionIcon>|</S.SectionIcon> 전체 뉴스 리스트
        </S.SectionHeader>
        <S.SortButtons>
          <S.KeywordButton
            onClick={() => {
              setSort("date");
              fetchNews(1);
            }}
            active={sort === "date"}
          >
            최신순
          </S.KeywordButton>
          <S.KeywordButton
            onClick={() => {
              setSort("sim");
              fetchNews(1);
            }}
            active={sort === "sim"}
          >
            유사도순
          </S.KeywordButton>
        </S.SortButtons>

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

        {/* 페이지네이션 */}
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
