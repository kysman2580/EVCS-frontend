import { useEffect, useState } from "react";
import * as S from "./NewsDetail.styles";
import { Button } from "react-bootstrap";
import axios from "axios";

const CommentSection = ({ newsNo, backendUrl }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const memberNo = Number(localStorage.getItem("memberNo"));

  useEffect(() => {
    fetchComments();
  }, [newsNo]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/news/comment/list`, {
        params: { newsNo, memberNo }, // memberNo 같이 보내야 hasLiked/hasHated 받을 수 있다
      });
      setComments(res.data); // 서버가 likes, dislikes, hasLiked, hasHated 모두 내려준다
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(`${backendUrl}/api/news/comment`, {
        newsNo,
        memberNo,
        content: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };

  const handleAddReply = async (parentId) => {
    if (!replyContent.trim()) return;
    try {
      await axios.post(`${backendUrl}/api/news/comment`, {
        newsNo,
        memberNo,
        content: replyContent,
        parentId,
      });
      setReplyContent("");
      setReplyTargetId(null);
      fetchComments();
    } catch (error) {
      console.error("답글 작성 실패", error);
    }
  };

  const toggleLike = async (commentId) => {
    if (!memberNo) {
      alert("로그인 필요");
      return;
    }
    try {
      const current = comments.find((c) => c.id === commentId);
      if (!current) return;

      if (current.hasLiked) {
        await axios.delete(`${backendUrl}/api/news/comment/like`, {
          params: { newsCmtId: commentId, memberNo },
        });
      } else {
        if (current.hasHated) {
          await axios.delete(`${backendUrl}/api/news/comment/hate`, {
            params: { newsCmtId: commentId, memberNo },
          });
        }
        await axios.post(`${backendUrl}/api/news/comment/like`, null, {
          params: { newsCmtId: commentId, memberNo },
        });
      }
      fetchComments(); // 상태를 다시 불러온다
    } catch (error) {
      console.error("좋아요 토글 실패", error);
    }
  };

  const toggleHate = async (commentId) => {
    if (!memberNo) {
      alert("로그인 필요");
      return;
    }
    try {
      const current = comments.find((c) => c.id === commentId);
      if (!current) return;

      if (current.hasHated) {
        await axios.delete(`${backendUrl}/api/news/comment/hate`, {
          params: { newsCmtId: commentId, memberNo },
        });
      } else {
        if (current.hasLiked) {
          await axios.delete(`${backendUrl}/api/news/comment/like`, {
            params: { newsCmtId: commentId, memberNo },
          });
        }
        await axios.post(`${backendUrl}/api/news/comment/hate`, null, {
          params: { newsCmtId: commentId, memberNo },
        });
      }
      fetchComments(); // 상태를 다시 불러온다
    } catch (error) {
      console.error("싫어요 토글 실패", error);
    }
  };

  const handleEditComment = async () => {
    if (!editContent.trim()) return;
    try {
      await axios.put(`${backendUrl}/api/news/comment`, {
        commentId: editingCommentId,
        content: editContent,
      });
      setEditingCommentId(null);
      setEditContent("");
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 실패", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제할까요?")) return;
    try {
      await axios.delete(`${backendUrl}/api/news/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  const renderComments = (comments, parentId = null, depth = 0) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div
          key={comment.id}
          style={{ marginLeft: depth * 20, marginTop: "10px" }}
        >
          <S.CommentItem>
            <S.CommentHeader>
              <strong>{comment.memberNick || "익명"}</strong>
              <span>{comment.commentDate?.split("T")[0]}</span>
            </S.CommentHeader>
            <S.CommentBody>
              {editingCommentId === comment.id ? (
                <>
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ width: "80%" }}
                  />
                  <Button
                    size="sm"
                    onClick={handleEditComment}
                    variant="success"
                    style={{ marginLeft: "8px" }}
                  >
                    저장
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditingCommentId(null)}
                    style={{ marginLeft: "5px" }}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <div>{comment.content}</div>
                  <S.CommentActions>
                    <Button
                      size="sm"
                      variant={comment.hasLiked ? "primary" : "outline-primary"}
                      onClick={() => toggleLike(comment.id)}
                    >
                      👍 {comment.likes || 0}
                    </Button>
                    <Button
                      size="sm"
                      variant={comment.hasHated ? "danger" : "outline-danger"}
                      onClick={() => toggleHate(comment.id)}
                    >
                      👎 {comment.dislikes || 0}
                    </Button>
                    {depth < 1 && (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => setReplyTargetId(comment.id)}
                      >
                        답글 달기
                      </Button>
                    )}
                    {comment.memberNo === memberNo && (
                      <>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditContent(comment.content);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                  </S.CommentActions>
                  {replyTargetId === comment.id && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="답글을 입력하세요"
                        style={{ width: "80%", marginRight: "8px" }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddReply(comment.id)}
                        variant="success"
                      >
                        답글 작성
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setReplyTargetId(null)}
                        variant="secondary"
                        style={{ marginLeft: "5px" }}
                      >
                        취소
                      </Button>
                    </div>
                  )}
                </>
              )}
            </S.CommentBody>
          </S.CommentItem>
          {renderComments(comments, comment.id, depth + 1)}
        </div>
      ));
  };

  return (
    <S.CommentSectionContainer>
      <S.CommentInputWrapper>
        <S.CommentInput
          placeholder="댓글 작성 공간"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <S.CommentButton onClick={handleAddComment}>작성</S.CommentButton>
      </S.CommentInputWrapper>
      <S.CommentList>{renderComments(comments)}</S.CommentList>
    </S.CommentSectionContainer>
  );
};

export default CommentSection;
