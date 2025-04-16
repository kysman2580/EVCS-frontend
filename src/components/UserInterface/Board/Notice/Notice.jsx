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
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  const [showForm, setShowForm] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    date: "",
    author: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // 등록 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNotice.title && newNotice.date && newNotice.author) {
      if (editIndex !== null) {
        const updatedNotices = [...notices];
        updatedNotices[editIndex] = newNotice;
        setNotices(updatedNotices);
        setEditIndex(null);
      } else {
        setNotices([newNotice, ...notices]);
      }

      setNewNotice({ title: "", date: "", author: "" });
      setShowForm(false);
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  // 공지 삭제 처리
  const handleDelete = (index) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    setNotices(updatedNotices);
  };

  const handleEdit = (index) => {
    setNewNotice(notices[index]);
    setEditIndex(index);
    setShowForm(true);
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
              <th>삭제</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr key={index}>
                <td>{notice.title}</td>
                <td>{notice.date}</td>
                <td>{notice.author}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>삭제</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(index)}>수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 작성 버튼 */}
      <div className="Notice-write-button">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setNewNotice({ title: "", date: "", author: "" });
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
            name="date"
            placeholder="작성일시 (예: 2025.07.05)"
            value={newNotice.date}
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
          <button type="submit">
            {editIndex !== null ? "수정 완료" : "등록"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Notice;
