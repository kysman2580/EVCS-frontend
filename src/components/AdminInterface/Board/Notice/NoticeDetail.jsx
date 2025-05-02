import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost/api/notices/${id}`)
      .then((res) => setNotice(res.data))
      .catch(() => alert("공지사항을 불러올 수 없습니다."));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost/api/notices/${id}`, notice)
      .then(() => {
        setIsEditing(false);
        alert("수정되었습니다.");
      })
      .catch(() => alert("수정 실패"));
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost/api/notices/${id}`)
        .then(() => navigate("/admin/notice"))
        .catch(() => alert("삭제 실패"));
    }
  };

  if (!notice) return <div>📭 공지사항을 불러오는 중...</div>;

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-card">
        {isEditing ? (
          <>
            <h2>공지사항 수정</h2>
            <input name="title" value={notice.title} onChange={handleChange} />
            <input
              name="writer" // 'author' -> 'writer'
              value={notice.writer} // 'author' -> 'writer'
              onChange={handleChange}
            />
            <textarea
              name="content"
              value={notice.content}
              onChange={handleChange}
            />
            <div className="notice-actions">
              <button className="confirm-btn" onClick={handleUpdate}>
                ✅ 수정 완료
              </button>
              <button className="back-btn" onClick={() => setIsEditing(false)}>
                ❌ 수정 취소
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{notice.title}</h1>
            <div className="notice-meta">
              <span>🖊 작성자: {notice.writer}</span>{" "}
              {/* 'author' -> 'writer' */}
              <span>🗓 작성일: {notice.enrollDate}</span>{" "}
              {/* 'date' -> 'enrollDate' */}
            </div>
            <p>{notice.content}</p>
            <div className="notice-actions">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                ✏ 수정하기
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                🗑 삭제하기
              </button>
              <button
                className="back-btn"
                onClick={() => navigate("/admin/notice")}
              >
                🏠 목록으로
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NoticeDetail;
