import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Notice/Notice.css";
import AdminNoitceNav from "../../AdminCommon/AdminNav/AdminNoitceNav";

function Notice() {
  const navigate = useNavigate();

  // 저장된 공지 불러오기
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

  // 공지사항 저장
  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  const [search, setSearch] = useState("");
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
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <AdminNoitceNav />
        <div style={{ width: "90%" }}>
          <div className="Notice">
            <h1>공지사항</h1>

            {/* 검색창 */}
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
                  {paginatedNotices.map((notice, index) => (
                    <tr
                      key={startIndex + index}
                      onClick={() =>
                        navigate(`/admin/notice/${startIndex + index}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{notice.title}</td>
                      <td>{notice.date}</td>
                      <td>{notice.author}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <div className="Notice-pagination">
              {/* 처음 페이지로 이동 */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                ◀ 처음
              </button>

              {/* 이전 페이지 */}
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
              {/* 다음 페이지 */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음 ▶
              </button>

              {/* 마지막 페이지로 이동 */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                끝 ▶
              </button>
            </div>

            {/* 작성 버튼 */}
            <div className="Notice-write-button">
              <button onClick={() => navigate("/admin/notice/write")}>
                공지사항 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notice;
