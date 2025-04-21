import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./NewsDetail.styles";

const NewsDetail = () => {
  const location = useLocation();
  const { title, description, pubDate, imageUrl, originallink, query } =
    location.state || {};

  const [article] = useState({
    title,
    description,
    pubDate,
    imageUrl,
    originallink,
    query,
  });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log("location.state 확인:", location.state);
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

  const handleVote = (id, type) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          if (type === "like") {
            return { ...comment, likes: comment.likes + 1 };
          } else {
            return { ...comment, dislikes: comment.dislikes + 1 };
          }
        }
        return comment;
      })
    );
  };

  if (!article?.title)
    return <S.Loading>기사를 불러오는 중입니다...</S.Loading>;

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
              href={article.originallink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.originallink}
            </a>
          </S.ArticleText>
          <S.ArticleActions>
            <S.ActionButton>좋아요</S.ActionButton>
            <S.ActionButton>싫어요</S.ActionButton>
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
              <S.CommentActions>
                <S.ActionButton onClick={() => handleVote(comment.id, "like")}>
                  👍 {comment.likes}
                </S.ActionButton>
                <S.ActionButton
                  onClick={() => handleVote(comment.id, "dislike")}
                >
                  👎 {comment.dislikes}
                </S.ActionButton>
              </S.CommentActions>
            </S.CommentBody>
          </S.CommentItem>
        ))}
      </S.CommentList>
    </S.Container>
  );
};

export default NewsDetail;
