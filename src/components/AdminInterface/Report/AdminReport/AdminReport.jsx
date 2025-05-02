import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Report2, Report3는 스타일드 컨테이너입니다.
import { Report2, Report3 } from "./AdminReport.styled";
import axios from "axios";
import AdminReportNav from "../../AdminCommon/AdminNav/AdminReportNav";

const AdminReport = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [titleQuery, setTitleQuery] = useState("");

  // API에서 신고 내역을 가져오는 함수
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        title: titleQuery || undefined,
        page: 0,
        size: 10,
      };
      const response = await axios.get("http://localhost:80/api/reports", {
        params,
      });
      const payload = response.data;
      // data가 배열인지, 아니면 Page 객체(content)인지 확인
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.content)
        ? payload.content
        : [];
      setReports(list);
    } catch (err) {
      console.error(err);
      setError("신고 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, titleQuery]);

  // 마운트 및 필터 변경 시마다 재조회
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // 검색 버튼
  const handleSearch = () => {
    fetchReports();
  };

  // 기간 단축 버튼
  const handlePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  // 행 클릭 시 상세 페이지로 이동
  const handleRowClick = (boardNo) => {
    navigate(`http://localhost:80/admin/reports/${boardNo}`);
  };

  return (
    <Report2>
      <AdminReportNav />
      <Report3>
        <h2>관리자용 신고 내역</h2>

        <div className="report-filters">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="제목 검색"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
          />
          <button onClick={() => handlePreset(7)}>1주일</button>
          <button onClick={() => handlePreset(30)}>1개월</button>
          <button onClick={() => handlePreset(90)}>3개월</button>
          <button onClick={() => handlePreset(180)}>6개월</button>
          <button onClick={() => handlePreset(365)}>1년</button>
          <button className="search-button" onClick={handleSearch}>
            검색
          </button>
        </div>

        <div className="report-table-container">
          {loading && <p>불러오는 중...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && reports.length === 0 && !error && (
            <p>신고 내역이 없습니다.</p>
          )}

          {reports.length > 0 && (
            <table className="report-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>신고자</th>
                  <th>피의자</th>
                  <th>신청일</th>
                  <th>진행상황</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.boardNo} onClick={() => handleRowClick(r.boardNo)}>
                    <td>{r.rpNo}</td>
                    <td className="report-title">{r.content}</td>
                    <td>{r.memberNo}</td>
                    <td>{r.fileNo}</td>
                    <td>{r.enrollDate}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Report3>
    </Report2>
  );
};

export default AdminReport;
