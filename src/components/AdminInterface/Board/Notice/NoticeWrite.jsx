// NoticeWrite.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoticeWrite() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!title || !author || !content) {
      alert("모든 필드를 작성해 주세요.");
      return;
    }

    const newNotice = {
      title,
      author,
      content,
      date: getToday(),
    };

    // 기존 공지사항 목록 불러오기
    const notices = JSON.parse(localStorage.getItem("notices") || "[]");
    notices.push(newNotice);
    localStorage.setItem("notices", JSON.stringify(notices));

    navigate("/admin/notice"); // 공지사항 목록 페이지로 돌아가기
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0].replace(/-/g, ".");
  };

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-card">
        <h2>공지사항 작성</h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="작성자"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
        ></textarea>
        <div className="notice-actions">
          <button className="confirm-btn" onClick={handleSave}>
            ✅ 저장하기
          </button>
          <button
            className="back-btn"
            onClick={() => navigate("/admin/notice")}
          >
            ❌ 취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeWrite;
