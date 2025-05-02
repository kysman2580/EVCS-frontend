import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ListNewsItem,
  SearchBar,
  removeHtmlTags,
  formatDate,
} from "../NewsMain/NewsItemComponents";
import * as S from "../NewsMain/NewsMain.styles";

const NewsList = ({ backendUrl = "http://localhost:80" }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("전기차");
  const [sort, setSort] = useState("sim");
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageResults, setImageResults] = useState({});

  const fetchNews = async (targetPage = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/naver-news-list`, {
        params: { query, sort, page: targetPage, size },
      });

      const rawItems = res.data.items || [];

      // 중복 제거: originallink 기준
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
    const key = removeHtmlTags(item.title);
    return imageResults[key] || "/images/loading.png";
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

  useEffect(() => {
    fetchNews(1);
  }, [query, sort]);

  const totalPages = Math.ceil(Math.min(total, 1000) / size);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.floor((page - 1) / 10) * 10,
    Math.floor((page - 1) / 10) * 10 + 10
  );

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
        {page > 10 && (
          <button onClick={() => fetchNews(page - 10)}>{`<<`}</button>
        )}
        {page > 1 && <button onClick={() => fetchNews(page - 1)}>{`<`}</button>}

        {visiblePages.map((p) => (
          <button key={p} onClick={() => fetchNews(p)} disabled={p === page}>
            {p}
          </button>
        ))}

        {page < totalPages && (
          <button onClick={() => fetchNews(page + 1)}>{`>`}</button>
        )}
        {page + 10 <= totalPages && (
          <button onClick={() => fetchNews(page + 10)}>{`>>`}</button>
        )}
      </S.Pagination>
    </S.Container>
  );
};

export default NewsList;
