import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./NewsDetail.styles";
import * as S1 from "../NewsMain/NewsMain.styles";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import CommentSection from "./CommentSection";

const NewsDetail = ({ backendUrl = "http://localhost:80" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, description, pubDate, imageUrl, originallink, query } =
    location.state || {};
  const { auth } = useAuth();
  const [article, setArticle] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hateCount, setHateCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasHated, setHasHated] = useState(false);
  const memberNo = Number(localStorage.getItem("memberNo"));

  useEffect(() => {
    if (!title || !originallink) return;

    axios
      .post(
        `${backendUrl}/api/news/detail`,
        {
          title,
          originUrl: originallink,
          description,
          imageUrl,
          pubDate,
          query,
        },
        {
          params: {
            memberNo: memberNo,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        setArticle(data.news);
        setLikeCount(data.likeCount);
        setHateCount(data.hateCount);
        setBookmarked(data.bookmarked);
      })
      .catch((err) => console.error("뉴스 상세 요청 실패:", err));
  }, []);

  useEffect(() => {
    if (!article || !auth?.user?.memberNo) return;

    const memberNo = Number(auth.user.memberNo);

    axios
      .get(`${backendUrl}/api/news/like/status`, {
        params: { newsNo: article.newsNo, memberNo },
      })
      .then((res) => setHasLiked(res.data));
    axios
      .get(`${backendUrl}/api/news/hate/status`, {
        params: { newsNo: article.newsNo, memberNo },
      })
      .then((res) => setHasHated(res.data));
  }, [article]);

  useEffect(() => {
    if (!article || !auth?.user?.memberNo) return;

    const safeMemberNo = Number(auth.user.memberNo);
    if (Number.isNaN(safeMemberNo)) return;

    axios
      .get(`${backendUrl}/api/news/bookmark/status`, {
        params: { newsNo: article.newsNo, memberNo: safeMemberNo },
      })
      .then((res) => setBookmarked(res.data))
      .catch(() => console.log("북마크 상태 확인 실패"));
  }, [article, auth]);

  const handleLike = async () => {
    if (!memberNo) {
      alert("로그인을 해야 사용 가능한 기능입니다.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/news/like`, {
        newsNo: article.newsNo,
        memberNo,
      });

      const [likeStatusRes, hateStatusRes, likeCountRes, hateCountRes] =
        await Promise.all([
          axios.get(`${backendUrl}/api/news/like/status`, {
            params: { newsNo: article.newsNo, memberNo },
          }),
          axios.get(`${backendUrl}/api/news/hate/status`, {
            params: { newsNo: article.newsNo, memberNo },
          }),
          axios.get(`${backendUrl}/api/news/like`, {
            params: { newsNo: article.newsNo },
          }),
          axios.get(`${backendUrl}/api/news/hate`, {
            params: { newsNo: article.newsNo },
          }),
        ]);

      setHasLiked(likeStatusRes.data);
      setHasHated(hateStatusRes.data);
      setLikeCount(likeCountRes.data);
      setHateCount(hateCountRes.data);
    } catch (err) {
      alert(err.response?.data || "좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const handleHate = async () => {
    if (!memberNo) {
      alert("로그인을 해야 사용 가능한 기능입니다.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/news/hate`, {
        newsNo: article.newsNo,
        memberNo,
      });

      const [likeStatusRes, hateStatusRes, likeCountRes, hateCountRes] =
        await Promise.all([
          axios.get(`${backendUrl}/api/news/like/status`, {
            params: { newsNo: article.newsNo, memberNo },
          }),
          axios.get(`${backendUrl}/api/news/hate/status`, {
            params: { newsNo: article.newsNo, memberNo },
          }),
          axios.get(`${backendUrl}/api/news/like`, {
            params: { newsNo: article.newsNo },
          }),
          axios.get(`${backendUrl}/api/news/hate`, {
            params: { newsNo: article.newsNo },
          }),
        ]);

      setHasLiked(likeStatusRes.data);
      setHasHated(hateStatusRes.data);
      setLikeCount(likeCountRes.data);
      setHateCount(hateCountRes.data);
    } catch (err) {
      alert(err.response?.data || "싫어요 처리 중 오류가 발생했습니다.");
    }
  };

  const handleBookmark = async () => {
    if (!memberNo) {
      alert("로그인을 해야 사용 가능한 기능입니다.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/news/bookmark`, {
        newsNo: article.newsNo,
        memberNo,
      });

      const res = await axios.get(`${backendUrl}/api/news/bookmark/status`, {
        params: { newsNo: article.newsNo, memberNo },
      });
      setBookmarked(res.data);
    } catch (err) {
      alert(err.response?.data || "북마크 처리 중 오류가 발생했습니다.");
    }
  };

  const handleBlock = () => {
    if (!auth?.user || !article) {
      alert("로그인이 필요하거나 뉴스 정보가 없습니다.");
      return;
    }

    navigate("/reportingPage", {
      state: {
        boardInfo: {
          boardId: article.newsNo,
          boardTitle: article.title,
        },
        reporter: {
          userId: auth.user.memberNo,
          userName: auth.user.name,
        },
        reported: {
          userId: article.newsNo,
          userName: "뉴스 게시판 신고",
        },
      },
    });
  };

  if (!article) return <S.Loading>기사를 불러오는 중입니다...</S.Loading>;

  return (
    <S.Container>
      <S.ArticleTitle>
        <strong>뉴스 게시판</strong>
      </S.ArticleTitle>

      <S.ArticleBox>
        <S.ArticleContent>
          <S.ArticleCategory>{article.query}</S.ArticleCategory>
          <S.ArticleCategory>{article.pubDate}</S.ArticleCategory>
          <S.ArticleText>
            <h2>{article.title}</h2>
            <h5>
              <S1.SectionIcon>|</S1.SectionIcon>기사의 요약 내용
            </h5>
            <div>{article.description}</div>
            <div>
              <S1.SectionIcon>|</S1.SectionIcon>기사 이미지
            </div>
            <img
              src={article.imageUrl}
              alt="기사 이미지"
              style={{ width: "100%", maxWidth: "600px", marginTop: "10px" }}
            />
            <div>원문 링크</div>
            <a
              href={article.originUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.originUrl}
            </a>
          </S.ArticleText>
          <S.ArticleActions>
            <Button
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: "#03c75a",
                color: "#fff",
                border: "none",
              }}
            >
              뒤로가기
            </Button>
            {auth?.user?.isAuthenticated && (
              <>
                <Button
                  size="sm"
                  variant={hasLiked ? "primary" : "outline-primary"}
                  onClick={handleLike}
                >
                  👍 {likeCount}
                </Button>

                <Button
                  size="sm"
                  variant={hasHated ? "danger" : "outline-danger"}
                  onClick={handleHate}
                >
                  👎 {hateCount}
                </Button>

                <Button
                  size="sm"
                  variant={bookmarked ? "success" : "outline-success"}
                  onClick={handleBookmark}
                >
                  {bookmarked ? "🔖 북마크됨" : "📌 북마크"}
                </Button>

                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={handleBlock}
                >
                  ⛔게시판 차단
                </Button>
              </>
            )}
          </S.ArticleActions>
        </S.ArticleContent>
      </S.ArticleBox>

      {auth?.user?.isAuthenticated && (
        <CommentSection newsNo={article.newsNo} backendUrl={backendUrl} />
      )}
    </S.Container>
  );
};

export default NewsDetail;
