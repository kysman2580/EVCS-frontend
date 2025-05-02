import React, { useState, useEffect } from "react";
import "../Notice/UserNotice.css";
import NoticeNav from "../../Common/Nav/NoticeNav";
import { BoardContainerDiv, BoardBodyDiv } from "../Board.styles";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Notice() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 추가
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 페이지 번호 상태
  const noticesPerPage = 5;

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

  // 컴포넌트 로드 시 공지사항 ID를 고정하고 로컬 스토리지에 저장
  useEffect(() => {
    const fixedNotices = notices.map((n) => ({
      ...n,
      id: n.id || uuidv4(),
    }));
    setNotices(fixedNotices);
    localStorage.setItem("notices", JSON.stringify(fixedNotices));
  }, []);

  // 페이지 파라미터 및 state에서 현재 페이지 읽기
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page"), 10);
    const pageFromState = location.state?.page;

    // state에 저장된 페이지 우선, 없으면 URL의 페이지 파라미터 사용
    if (pageFromState && !isNaN(pageFromState)) {
      setCurrentPage(pageFromState);
    } else if (pageFromUrl && !isNaN(pageFromUrl)) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams, location.state]); // location.state 추가

  // 검색 시 페이지 초기화
  useEffect(() => {
    if (search !== "") {
      setCurrentPage(1);
    }
  }, [search]);

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
    navigate(`/notice?page=${page}`, { state: { page } }); // 페이지 정보 상태로 전달
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
              <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>작성일시</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNotices.length > 0 ? (
                  paginatedNotices.map((notice) => (
                    <tr
                      key={notice.id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/notice/${notice.id}`, {
                          state: { page: currentPage }, // 페이지 정보도 함께 전달
                        })
                      }
                    >
                      <td>{notice.title}</td>
                      <td>{notice.date}</td>
                      <td>{notice.author}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      🔍 검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredNotices.length > 0 && (
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
          )}
        </div>
      </BoardBodyDiv>
    </BoardContainerDiv>
  );
}

export default Notice;
