import { useState, useEffect } from "react";
import axios from "axios";
import { ListNewsItem, SearchBar } from "../NewsMain/NewsItemComponents";
import * as S from "../NewsMain/NewsMain.styles";

const NewsList = ({ backendUrl = "http://localhost:80" }) => {
  const [query, setQuery] = useState("전기차");
  const [sort, setSort] = useState("sim");
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageResults, setImageResults] = useState({});

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

  const getImageUrl = (item) => {
    const key = item.title.replace(/<[^>]+>/g, "");
    return imageResults[key] || "/images/loading.png";
  };

  const handleChatClick = async (item) => {
    const key = item.title.replace(/<[^>]+>/g, "");
    let imageUrl = getImageUrl(item);

    if (imageUrl === "/images/loading.png") {
      try {
        const keywords = extractKeywords(key);
        const res = await axios.get(`${backendUrl}/api/naver-image`, {
          params: { query: keywords },
        });
        const hits = res.data.items || [];
        imageUrl = hits[0]?.thumbnail || hits[0]?.link || "/images/loading.png";
        setImageResults((prev) => ({ ...prev, [key]: imageUrl }));
      } catch (e) {
        console.error("ChatIcon 클릭 시 이미지 재요청 실패:", e);
      }
    }

    window.location.href = `/newsDetail?title=${encodeURIComponent(
      key
    )}&img=${encodeURIComponent(imageUrl)}`;
  };

  const fetchNews = async (targetPage = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/naver-news-list`, {
        params: { query, sort, page: targetPage, size },
      });
      const rawItems = res.data.items || [];

      // originallink 기준 중복 제거
      const uniqueItems = Array.from(
        new Map(rawItems.map((item) => [item.originallink, item])).values()
      );

      setItems(uniqueItems);
      setTotal(Math.min(res.data.total || 0, 1000)); // 최대 1000 제한
      setPage(targetPage);
    } catch (err) {
      console.error("뉴스 리스트 요청 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1);
  }, [query, sort]);

  // 페이지네이션 그룹 (10개 단위)
  const totalPages = Math.ceil(total / size);
  const groupSize = 10;
  const currentGroup = Math.floor((page - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <S.Container>
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={() => fetchNews(1)}
        keywords={["전기차", "에너지", "태양광", "풍력", "수소"]}
      />

      <S.SortButtons>
        <button onClick={() => setSort("sim")} disabled={sort === "sim"}>
          유사도순
        </button>
        <button onClick={() => setSort("date")} disabled={sort === "date"}>
          최신순
        </button>
      </S.SortButtons>

      <div>총 {total.toLocaleString()}건</div>

      <S.ListContainer>
        {items.map((item) => (
          <ListNewsItem
            key={item.originallink}
            item={item}
            onChatClick={handleChatClick}
            loading={loading}
          />
        ))}
      </S.ListContainer>

      <S.Pagination>
        {startPage > 1 && (
          <button onClick={() => fetchNews(startPage - 1)}>&lt;</button>
        )}
        {pageNumbers.map((p) => (
          <button key={p} onClick={() => fetchNews(p)} disabled={p === page}>
            {p}
          </button>
        ))}
        {endPage < totalPages && (
          <button onClick={() => fetchNews(endPage + 1)}>&gt;</button>
        )}
      </S.Pagination>
    </S.Container>
  );
};

export default NewsList;
