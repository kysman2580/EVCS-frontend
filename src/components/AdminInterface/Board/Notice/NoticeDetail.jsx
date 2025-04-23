import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NoticeDetail.css";

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(id);
  const notices = JSON.parse(localStorage.getItem("notices") || "[]");
  const notice = notices[parsedId];

  const [isEditing, setIsEditing] = useState(false);
  const [editNotice, setEditNotice] = useState(notice || {});

  if (!notice) {
    return (
      <div className="notice-detail-container">
        <div className="notice-detail-card">
          <p>📭 공지사항을 찾을 수 없습니다.</p>
          <button
            className="back-btn"
            onClick={() => navigate("/admin/notice")}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNotice({ ...editNotice, [name]: value });
  };

  const handleUpdate = () => {
    const confirmEdit = window.confirm("정말 수정하시겠습니까?");
    if (!confirmEdit) return;

    const updatedNotices = [...notices];
    updatedNotices[parsedId] = { ...editNotice, date: getToday() };
    localStorage.setItem("notices", JSON.stringify(updatedNotices));
    navigate("/admin/notice");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const updatedNotices = [...notices];
    updatedNotices.splice(parsedId, 1);
    localStorage.setItem("notices", JSON.stringify(updatedNotices));
    navigate("/admin/notice");
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0].replace(/-/g, ".");
  };

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-card">
        {!isEditing ? (
          <>
            <h1 className="notice-title">{notice.title}</h1>
            <div className="notice-meta">
              <span>
                🖊 <strong>작성자:</strong> {notice.author}
              </span>
              <span>
                🗓 <strong>작성일:</strong> {notice.date}
              </span>
            </div>
            <hr />
            <div className="notice-content">
              <p>{notice.content}</p>
            </div>
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
                🏠 목록으로 돌아가기
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>공지사항 수정</h2>
            <input
              type="text"
              name="title"
              value={editNotice.title}
              onChange={handleChange}
              required
              placeholder="제목"
            />
            <input
              type="text"
              name="author"
              value={editNotice.author}
              onChange={handleChange}
              required
              placeholder="작성자"
            />
            <textarea
              name="content"
              value={editNotice.content}
              onChange={handleChange}
              required
              placeholder="내용"
              rows="6"
            ></textarea>
            <div className="notice-actions">
              <button className="confirm-btn" onClick={handleUpdate}>
                ✅ 수정 완료
              </button>
              <button className="back-btn" onClick={() => setIsEditing(false)}>
                ❌ 수정 취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NoticeDetail;
