import React from "react";
import { useParams, Link } from "react-router-dom";

function NoticeDetail() {
  const { id } = useParams();
  const notices = JSON.parse(localStorage.getItem("notices")) || [];
  const notice = notices[id];

  if (!notice) {
    return <p>공지사항을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="NoticeDetail">
      <h2>{notice.title}</h2>
      <p>
        <strong>작성일:</strong> {notice.date}
      </p>
      <p>
        <strong>작성자:</strong> {notice.author}
      </p>
      <hr />
      <p>{notice.content}</p>
      <br />
      <Link to="/notice">← 목록으로 돌아가기</Link>
    </div>
  );
}

export default NoticeDetail;
