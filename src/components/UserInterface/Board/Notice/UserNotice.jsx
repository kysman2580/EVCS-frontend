import React, { useState, useEffect } from "react";
import "../Notice/UserNotice.css";
import NoticeNav from "../../Common/Nav/NoticeNav";
import { BoardContainerDiv, BoardBodyDiv } from "../Board.styles";

function Notice() {
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("notices");
    return saved
      ? JSON.parse(saved)
      : [
          {
            title: "안녕하세요 공지사항 입니다.",
            date: "2025.07.05",
            author: "admin",
            content: "이것은 예시 공지사항 내용입니다.",
          },
        ];
  });

  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  const handleRowClick = (index) => {
    setSelectedNoticeIndex(index === selectedNoticeIndex ? null : index);
  };

  // 검색 필터
  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.author.toLowerCase().includes(search.toLowerCase()) ||
      n.date.toLowerCase().includes(search.toLowerCase())
  );

  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const startIndex = (currentPage - 1) * noticesPerPage;
  const paginatedNotices = filteredNotices.slice(
    startIndex,
    startIndex + noticesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedNoticeIndex(null); // 페이지 바뀌면 상세 닫기
  };

  return (
    <BoardContainerDiv>
      <NoticeNav />
      <BoardBodyDiv>
        <div className="Notice">
          <h1>공지사항</h1>

          {/* 검색창 */}
          <input
            type="text"
            placeholder="제목 또는 작성일시,작성자 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
          />

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
                {paginatedNotices.map((notice, index) => {
                  const globalIndex = startIndex + index;
                  return (
                    <React.Fragment key={globalIndex}>
                      <tr
                        onClick={() => handleRowClick(globalIndex)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{notice.title}</td>
                        <td>{notice.date}</td>
                        <td>{notice.author}</td>
                      </tr>
                      {selectedNoticeIndex === globalIndex && (
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
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="Notice-pagination" style={{ marginTop: "20px" }}>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              ◀ 처음
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀ 이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  margin: "0 5px",
                  fontWeight: currentPage === i + 1 ? "bold" : "normal",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음 ▶
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              끝 ▶
            </button>
          </div>
        </div>
      </BoardBodyDiv>
    </BoardContainerDiv>
  );
}

export default Notice;
