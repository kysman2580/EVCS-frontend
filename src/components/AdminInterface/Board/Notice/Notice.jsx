import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNoitceNav from "../../AdminCommon/AdminNav/AdminNoitceNav";
import "../Notice/Notice.css";

function Notice() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const noticesPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost/api/notices")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = notices.filter(
    (n) =>
      n.eventTitle.toLowerCase().includes(search.toLowerCase()) ||
      n.writer.toLowerCase().includes(search.toLowerCase()) || // 'author' -> 'writer'
      n.enrollDate.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / noticesPerPage);
  const startIndex = (currentPage - 1) * noticesPerPage;
  const paginated = filtered.slice(startIndex, startIndex + noticesPerPage);

  return (
    <div style={{ display: "flex" }}>
      <AdminNoitceNav />
      <div style={{ width: "90%" }}>
        <div className="Notice">
          <h1>공지사항</h1>
          <input
            type="text"
            placeholder="제목/작성자/날짜 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성일시</th>
                <th>작성자</th> {/* 'author' -> 'writer' */}
              </tr>
            </thead>
            <tbody>
              {paginated.map((notice) => (
                <tr
                  key={notice.id}
                  onClick={() => navigate(`/admin/notice/${notice.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{notice.title}</td>
                  <td>{notice.enrollDate}</td> {/* 'date' -> 'enrollDate' */}
                  <td>{notice.writer}</td> {/* 'author' -> 'writer' */}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="Notice-pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              ◀ 처음
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ◀ 이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  fontWeight: currentPage === i + 1 ? "bold" : "normal",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음 ▶
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              끝 ▶
            </button>
          </div>

          <div className="Notice-write-button">
            <button onClick={() => navigate("/admin/notice/write")}>
              공지사항 작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice;
