import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Notice/UserNotice.css";

const UserNoticeDetail = () => {
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("notices");
    const notices = stored ? JSON.parse(stored) : [];
    const targetNotice = notices.find((n) => n.id === id);
    setNotice(targetNotice);
  }, [id]);

  return (
    <div className="Notice" style={{ paddingTop: "30px" }}>
      <h1>공지사항 상세보기</h1>
      <button
        onClick={() => navigate("/notice")}
        style={{ marginBottom: "20px" }}
      >
        ◀ 목록으로 돌아가기
      </button>

      {notice ? (
        <div className="Notice-detail">
          <h2>📢 {notice.title}</h2>
          <p>
            <strong>작성일:</strong> {notice.date}
          </p>
          <p>
            <strong>작성자:</strong> {notice.author}
          </p>
          <div className="Notice-content">
            <p>{notice.content}</p>
          </div>
        </div>
      ) : (
        <p>해당 공지사항을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default UserNoticeDetail;
