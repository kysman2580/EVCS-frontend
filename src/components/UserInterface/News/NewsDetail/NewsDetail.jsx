import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./NewsDetail.styles";
import { Button } from "react-bootstrap";
import axios from "axios";

const NewsDetail = ({ backendUrl = "http://localhost:8080" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, description, pubDate, imageUrl, originallink, query } =
    location.state || {};
  const [article, setArticle] = useState(null); // ← 서버에서 받아온 news로 대체
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [hateCount, setHateCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

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

  const handleLike = () => {
    axios
      .post(`${backendUrl}/api/news/like`, {
        newsNo: article.newsNo,
        memberNo: 1,
      })
      .then(() => setLikeCount((prev) => prev + 1))
      .catch((err) =>
        alert(err.response?.data || "이미 좋아요를 누르셨습니다.")
      );
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
            <S.ActionButton>👎 {hateCount}</S.ActionButton>
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
