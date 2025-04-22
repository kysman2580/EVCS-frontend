import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notices = JSON.parse(localStorage.getItem("notices") || "[]");
  const notice = notices[parseInt(id)];

  if (!notice) {
    return <p>공지사항을 찾을 수 없습니다.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{notice.title}</h1>
      <p>
        <strong>작성일:</strong> {notice.date}
      </p>
      <p>
        <strong>작성자:</strong> {notice.author}
      </p>
      <hr />
      <p>{notice.content}</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        목록으로 돌아가기
      </button>
    </div>
  );
}

export default NoticeDetail;
