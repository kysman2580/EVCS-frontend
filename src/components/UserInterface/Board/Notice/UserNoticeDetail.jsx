import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../Notice/UserNotice.css";

const UserNoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState(null);

  const prevPage = location.state?.page || 1;

  useEffect(() => {
    // 1차 시도: 백엔드에서 공지사항 조회
    fetch(`http://localhost:8080/api/notices/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("API 실패");
        return res.json();
      })
      .then((data) => setNotice(data))
      .catch(() => {
        // 2차 시도: 로컬 스토리지에서 찾기
        const stored = localStorage.getItem("notices");
        const notices = stored ? JSON.parse(stored) : [];
        const localNotice = notices.find((n) => n.id === id);
        setNotice(localNotice);
      });
  }, [id]);

  return (
    <div className="Notice" style={{ paddingTop: "30px" }}>
      <h1>📢 공지사항 상세보기</h1>
      <div className="Notice-detail-container">
        <button
          className="back-button"
          onClick={() =>
            navigate(`/notice?page=${prevPage}`, {
              state: { page: prevPage },
            })
          }
        >
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
