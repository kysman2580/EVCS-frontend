import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Notice/Notice.css";

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

  const [showForm, setShowForm] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    date: "",
    author: "",
    content: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // 자동 날짜 생성
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0].replace(/-/g, ".");
  };

  // 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // 등록 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, content } = newNotice;
    const date = getToday(); // 오늘 날짜 자동 생성

    if (title && author && content) {
      const noticeToSave = { title, author, content, date };

      if (editIndex !== null) {
        const updated = [...notices];
        updated[editIndex] = noticeToSave;
        setNotices(updated);
        setEditIndex(null);
      } else {
        setNotices([noticeToSave, ...notices]);
      }

      setNewNotice({ title: "", author: "", content: "", date: "" });
      setShowForm(false);
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  // 공지 삭제
  const handleDelete = (index) => {
    setNotices(notices.filter((_, i) => i !== index));
  };

  // 공지 수정
  const handleEdit = (index) => {
    setNewNotice(notices[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // 검색 관련
  const [search, setSearch] = useState("");
  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.author.toLowerCase().includes(search.toLowerCase())
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
      <div style={{ width: "10%" }}>{/* nav 들어갈 자리 */}</div>
      <div style={{ width: "90%" }}>
        <div className="Notice">
          <h1>공지사항</h1>
          <div className="Notice-container">
            <table>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>작성일시</th>
                  <th>작성자</th>
                  <th>삭제</th>
                  <th>수정</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNotices.map((notice, index) => (
                  <tr key={startIndex + index}>
                    <td
                      onClick={() =>
                        navigate(`/admin/notice/${startIndex + index}`)
                      }
                      style={{
                        cursor: "pointer",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {notice.title}
                    </td>
                    <td>{notice.date}</td>
                    <td>{notice.author}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(startIndex + index);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(startIndex + index);
                        }}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="Notice-pagination">
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
          </div>

          {/* 작성 버튼 */}
          <div className="Notice-write-button">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setNewNotice({ title: "", date: "", author: "", content: "" });
                setEditIndex(null); // 폼 열 때 수정 모드 해제
              }}
            >
              {showForm ? "작성 취소" : "공지사항 작성"}
            </button>
          </div>

          {/* 작성/수정 폼 */}
          {showForm && (
            <form className="Notice-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="제목"
                value={newNotice.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="author"
                placeholder="작성자"
                value={newNotice.author}
                onChange={handleChange}
                required
              />
              <textarea
                name="content"
                placeholder="공지 내용"
                value={newNotice.content}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">
                {editIndex !== null ? "수정 완료" : "등록"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Notice;
