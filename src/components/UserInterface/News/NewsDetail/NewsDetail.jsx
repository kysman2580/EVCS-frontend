import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./NewsDetail.styles";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const NewsDetail = ({ backendUrl = "http://localhost:80" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, description, pubDate, imageUrl, originallink, query } =
    location.state || {};
  const { auth } = useAuth(); // ← 여기서 auth 꺼내고
  const [article, setArticle] = useState(null); // ← 서버에서 받아온 news로 대체
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [hateCount, setHateCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasHated, setHasHated] = useState(false);
  const memberNo = Number(auth?.user?.memberNo);

  useEffect(() => {
    console.log("location.state 확인:", location.state);

    if (!title || !originallink) return;

    axios
      .post(`${backendUrl}/api/news/detail`, {
        title,
        originUrl: originallink,
        description,
        imageUrl,
        pubDate,
        query,
      })
      .then((res) => {
        const data = res.data;
        console.log("서버 응답 데이터:", data);

        setArticle(data.news);
        setComments(data.comments);
        setLikeCount(data.likeCount); // ✅ 좋아요 수
        setHateCount(data.hateCount); // ✅ 싫어요 수
        setBookmarked(data.bookmarked); // ✅ 북마크 여부

        console.log(likeCount, hateCount, bookmarked);
      })
      .catch((err) => {
        console.error("뉴스 상세 요청 실패:", err);
      });
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

  const handleLike = () => {
    axios
      .post(`${backendUrl}/api/news/like`, {
        newsNo: article.newsNo,
        memberNo,
      })
      .then(() => {
        // 토글 상태만 클라이언트에서 반영
        setHasLiked((prev) => !prev);
        if (hasHated) setHasHated(false);

        // count는 서버에서 다시 가져옴 (정확하게 유지)
        axios
          .get(`${backendUrl}/api/news/like`, {
            params: { newsNo: article.newsNo },
          })
          .then((res) => setLikeCount(res.data));

        if (hasHated) {
          axios
            .get(`${backendUrl}/api/news/hate`, {
              params: { newsNo: article.newsNo },
            })
            .then((res) => setHateCount(res.data));
        }
      })
      .catch((err) =>
        alert(err.response?.data || "좋아요 처리 중 오류가 발생했습니다.")
      );
  };

  const handleHate = () => {
    axios
      .post(`${backendUrl}/api/news/hate`, {
        newsNo: article.newsNo,
        memberNo,
      })
      .then(() => {
        setHasHated((prev) => !prev);
        if (hasLiked) setHasLiked(false);

        axios
          .get(`${backendUrl}/api/news/hate`, {
            params: { newsNo: article.newsNo },
          })
          .then((res) => setHateCount(res.data));

        if (hasLiked) {
          axios
            .get(`${backendUrl}/api/news/like`, {
              params: { newsNo: article.newsNo },
            })
            .then((res) => setLikeCount(res.data));
        }
      })
      .catch((err) =>
        alert(err.response?.data || "싫어요 처리 중 오류가 발생했습니다.")
      );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "사용자",
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  if (!article) return <S.Loading>기사를 불러오는 중입니다...</S.Loading>;

  return (
    <S.Container>
      <S.ArticleTitle>
        <strong>토론 게시판</strong>
      </S.ArticleTitle>

      <S.ArticleBox>
        <S.ArticleContent>
          <S.ArticleCategory>{article.query}</S.ArticleCategory>
          <S.ArticleCategory>{article.pubDate}</S.ArticleCategory>
          <S.ArticleText>
            <h2>{article.title}</h2>
            <h5>기사의 요약 내용</h5>
            <div>{article.description}</div>
            <div>기사 이미지</div>
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
              style={{
                backgroundColor: "#03c75a",
                color: "#fff",
                border: "none",
              }}
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </Button>
            <S.ActionButton onClick={handleLike}>👍 {likeCount}</S.ActionButton>
            <S.ActionButton onClick={handleHate}>👎 {hateCount}</S.ActionButton>
          </S.ArticleActions>
        </S.ArticleContent>
      </S.ArticleBox>

      <S.CommentInputWrapper>
        <S.CommentInput
          placeholder="댓글 작성 공간"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <S.CommentButton onClick={handleAddComment}>작성</S.CommentButton>
      </S.CommentInputWrapper>

      <S.CommentList>
        {comments.map((comment) => (
          <S.CommentItem key={comment.id}>
            <S.CommentHeader>
              <strong>user</strong>
              <span>{comment.date.split("T")[0]}</span>
            </S.CommentHeader>
            <S.CommentBody>
              <div>{comment.content}</div>
              <S.CommentActions></S.CommentActions>
            </S.CommentBody>
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.Container>
  );
};

export default NewsDetail;
