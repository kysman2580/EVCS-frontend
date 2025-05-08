import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../Notice/UserNotice.css";
import axios from "axios";

const UserNoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState(null);
  const prevPage = location.state?.page || 1;

  useEffect(() => {
    axios
      .get(`http://localhost/api/notices/${id}`)
      .then((res) => setNotice(res.data))
      .catch((err) => console.error("공지사항 상세 불러오기 실패:", err));
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
            <h2 className="detail-title">{notice.eventTitle}</h2>
            <div className="detail-meta">
              <span>
                <strong>작성일:</strong> {notice.enrollDate}
              </span>
            </div>
            <div className="Notice-content detail-content">
              <p>{notice.eventContent}</p>
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
