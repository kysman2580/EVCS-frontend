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
      .get("http://localhost/notices")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = notices.filter(
    (n) =>
      n.noticeTitle.toLowerCase().includes(search.toLowerCase()) ||
      n.noticeWriter.toLowerCase().includes(search.toLowerCase()) ||
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

          <div className="Notice-container">
            <table>
              <thead>
                <colgroup>
                  <col style={{ width: "60%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <tr>
                  <th>제목</th>
                  <th>작성일시</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((notice) => (
                  <tr
                    key={notice.id}
                    onClick={() => navigate(`/admin/notice/${notice.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{notice.noticeTitle}</td>
                    <td>{notice.enrollDate}</td>
                    <td>{notice.noticeWriter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
