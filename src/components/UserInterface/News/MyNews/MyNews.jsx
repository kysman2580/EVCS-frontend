import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import axios from "axios";
import { removeHtmlTags, formatDate } from "../NewsMain/NewsItemComponents";
import MyPageNav from "../../Common/Nav/MyPageNav";
import { MyPageDiv } from "../../Member/Mypage/MyPage.styles";

const backendUrl = "http://localhost:80";

const MyNews = () => {
  const { auth } = useAuth();
  const memberNo = auth?.user?.memberNo;
  const [searchParams, setSearchParams] = useSearchParams();
  const [fullList, setFullList] = useState([]);
  const [imageResults, setImageResults] = useState({});
  const [activeTab, setActiveTab] = useState("likes");

  const page = parseInt(searchParams.get("page") || "1");
  const size = 3;
  const navigate = useNavigate();

  useEffect(() => {
    if (!memberNo) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/news/mypage/${activeTab}`,
          {
            params: { memberNo },
          }
        );
        setFullList(res.data || []);
        const updatedImages = {};
        for (const news of res.data || []) {
          if (news.imageUrl) updatedImages[news.title] = news.imageUrl;
        }
        setImageResults(updatedImages);
      } catch (err) {
        console.error("마이뉴스 불러오기 실패", err);
      }
    };

    fetchData();
    setSearchParams({ page: 1 });
  }, [activeTab, memberNo]);

  const handleChatClick = async (item) => {
    const key = removeHtmlTags(item.title);
    let imageUrl = imageResults[key] || "/images/loading.png";

    if (imageUrl === "/images/loading.png") {
      try {
        const res = await axios.get(`${backendUrl}/api/naver-image`, {
          params: { query: key },
        });
        const hits = res.data.items || [];
        const fetched =
          hits[0]?.thumbnail || hits[0]?.link || "/images/loading.png";
        setImageResults((prev) => ({ ...prev, [key]: fetched }));
        imageUrl = fetched;
      } catch (e) {
        console.error("이미지 재조회 실패", e);
      }
    }

    navigate("/newsDetail", {
      state: {
        title: removeHtmlTags(item.title),
        description: removeHtmlTags(item.description),
        pubDate: formatDate(item.pubDate),
        imageUrl,
        originallink: item.originUrl,
        query: item.query,
      },
    });
  };

  const pagedList = fullList.slice((page - 1) * size, page * size);
  const totalPages = Math.ceil(fullList.length / size);

  return (
    <MyPageDiv>
      <MyPageNav />
      <div style={{ flex: 1, padding: "2rem" }}>
        <h2>내 뉴스</h2>
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => setActiveTab("likes")}
            style={{ fontWeight: activeTab === "likes" ? "bold" : "normal" }}
          >
            좋아요한 뉴스
          </button>
          {" | "}
          <button
            onClick={() => setActiveTab("bookmarks")}
            style={{
              fontWeight: activeTab === "bookmarks" ? "bold" : "normal",
            }}
          >
            북마크한 뉴스
          </button>
        </div>
        <ul>
          {pagedList.map((item) => (
            <li key={item.newsNo} style={{ marginBottom: "1rem" }}>
              <strong
                onClick={() => handleChatClick(item)}
                style={{
                  cursor: "pointer",
                  color: "#0366d6",
                  textDecoration: "underline",
                }}
              >
                {removeHtmlTags(item.title)}
              </strong>
              <p>{removeHtmlTags(item.description)}</p>
              {imageResults[item.title] && (
                <img src={imageResults[item.title]} alt="" width={100} />
              )}
            </li>
          ))}
        </ul>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setSearchParams({ page: i + 1 })}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </MyPageDiv>
  );
};

export default MyNews;
