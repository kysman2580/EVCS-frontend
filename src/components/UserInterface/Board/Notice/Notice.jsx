import React, { useState, useEffect } from "react";
import "../Notice/Notice.css";

function Notice() {
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("notices");
    return saved
      ? JSON.parse(saved)
      : [
          {
            title: "안녕하세요 공지사항 입니다. ",
            date: "2025.07.05",
            author: "admin",
            content: "이것은 예시 공지사항 내용입니다.",
          },
        ];
  });

  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  const handleRowClick = (index) => {
    setSelectedNoticeIndex(index === selectedNoticeIndex ? null : index); // 클릭된 항목 다시 누르면 닫기
  };

  return (
    <div className="Notice">
      <h1>공지사항</h1>
      <div className="Notice-container">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성일시</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => handleRowClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{notice.title}</td>
                  <td>{notice.date}</td>
                  <td>{notice.author}</td>
                </tr>
                {selectedNoticeIndex === index && (
                  <tr className="Notice-detail-row">
                    <td colSpan="3">
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
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notice;
