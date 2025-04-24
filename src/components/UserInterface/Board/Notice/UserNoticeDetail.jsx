import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Notice/UserNotice.css";

const UserNoticeDetail = () => {
  const { id } = useParams();
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
      <h1>📢 공지사항 상세보기</h1>
      <div className="Notice-detail-container">
        <button className="back-button" onClick={() => navigate("/notice")}>
          ◀ 목록으로 돌아가기
        </button>

        {notice ? (
          <div className="Notice-detail-box">
            <h2 className="detail-title">{notice.title}</h2>
            <div className="detail-meta">
              <span>
                <strong>작성일:</strong> {notice.date}
              </span>
              <span>
                <strong>작성자:</strong> {notice.author}
              </span>
            </div>
            <div className="Notice-content detail-content">
              <p>{notice.content}</p>
            </div>
          </div>
        ) : (
          <p>해당 공지사항을 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default UserNoticeDetail;
