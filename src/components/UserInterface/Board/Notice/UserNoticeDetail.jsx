import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../Notice/UserNotice.css";
import axios from "axios";

function UserNoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = location.state?.page || queryParams.get("page") || 1;

  const [notice, setNotice] = useState(null);

  const backendUrl = window.ENV?.API_URL || `http://localhost:80`;

  useEffect(() => {
    axios
      .get(`${backendUrl}/notices/${id}`)
      .then((res) => setNotice(res.data))
      .catch(() => alert("공지사항을 불러올 수 없습니다."));
  }, [id]);

  if (!notice) return <div>📭 공지사항을 불러오는 중...</div>;

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-card">
        <h1>{notice.noticeTitle}</h1>
        <div className="notice-meta">
          <span>🖊 작성자: {notice.noticeWriter}</span>
          <span>🗓 작성일: {notice.enrollDate}</span>
        </div>
        <div
          className="notice-content"
          dangerouslySetInnerHTML={{ __html: notice.noticeContent }}
        ></div>
        <div className="notice-actions">
          <button
            className="back-btn"
            onClick={() => navigate(`/notice?page=${page}`)}
          >
            🏠 목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserNoticeDetail;
