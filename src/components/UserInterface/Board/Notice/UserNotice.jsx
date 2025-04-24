import React, { useState, useEffect } from "react";
import "../Notice/UserNotice.css";
import NoticeNav from "../../Common/Nav/NoticeNav";
import { BoardContainerDiv, BoardBodyDiv } from "../Board.styles";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Notice() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("notices");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: uuidv4(),
            title: "안녕하세요 공지사항 입니다.",
            date: "2025.07.05",
            author: "admin",
            content: "이것은 예시 공지사항 내용입니다.",
          },
        ];
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  // 공지사항에 UUID 보장 및 저장
  useEffect(() => {
    const fixedNotices = notices.map((n) => ({
      ...n,
      id: n.id || uuidv4(), // id가 없으면 새로 생성
    }));
    setNotices(fixedNotices);
    localStorage.setItem("notices", JSON.stringify(fixedNotices));
  }, []);

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.author.toLowerCase().includes(search.toLowerCase()) ||
      n.date.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const paginatedNotices = filteredNotices.slice(
    startIndex,
    startIndex + noticesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <BoardContainerDiv>
      <NoticeNav />
      <BoardBodyDiv>
        <div className="Notice">
          <h1>공지사항</h1>

          <input
            type="text"
            placeholder="제목 또는 작성일시, 작성자 검색"
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
                {paginatedNotices.map((notice) => (
                  <tr
                    key={notice.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/notice/${notice.id}`)}
                  >
                    <td>{notice.title}</td>
                    <td>{notice.date}</td>
                    <td>{notice.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
