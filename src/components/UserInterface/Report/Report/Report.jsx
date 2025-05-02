import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Report2는 스타일드 컨테이너입니다.
import { Report2 } from "./Report.styled";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import axios from "axios";

const Report = ({ useDummyData = false }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const currentUser = auth.user.name; // (필요시 memberNo 대신 이름 표시)

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyQuery, setKeyQuery] = useState("");

  // 데이터 로드
  useEffect(() => {
    if (useDummyData) {
      // 테스트용 더미 데이터가 있다면 여기에 필터 적용
      setReports([]);
      return;
    }

    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get("/api/reports", {
          params: {
            // backend 가 이 파라미터를 처리하도록 구현되어 있어야 합니다.
            reporter: currentUser,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            keyField: keyQuery || undefined,
            page: 0,
            size: 20,
          },
        });
        setReports(data);
      } catch (err) {
        console.error(err);
        setError("신고 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [useDummyData, currentUser, startDate, endDate, keyQuery]);

  // 기간 단축 버튼
  const handlePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  // 검색
  const handleSearch = () => {
    // useEffect 의 의존성에 startDate, endDate, keyQuery 가 포함되어 있으므로
    // 단순히 set* 해주면 재조회됩니다.
  };

  // 행 클릭
  const handleRowClick = (rpNo) => {
    navigate(`/reports/${rpNo}`);
  };

  return (
    <Report2>
      <h2>내 신고 내역 ({currentUser})</h2>

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
          placeholder="신고 대상 키 검색"
          value={keyQuery}
          onChange={(e) => setKeyQuery(e.target.value)}
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
        {loading && <p>신고 내역을 불러오는 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && reports.length === 0 && !error && (
          <p>신고 내역이 없습니다.</p>
        )}

        {reports.length > 0 && (
          <table className="report-table">
            <thead>
              <tr>
                <th>신고번호</th>
                <th>대상(Key)</th>
                <th>분류(Field)</th>
                <th>내용</th>
                <th>파일</th>
                <th>등록일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.rpNo} onClick={() => handleRowClick(r.rpNo)}>
                  <td>{r.rpNo}</td>
                  <td>{r.keyField}</td>
                  <td>{r.field || "-"}</td>
                  <td>
                    {r.content.length > 20
                      ? r.content.slice(0, 20) + "…"
                      : r.content}
                  </td>
                  <td>
                    {r.fileNo ? (
                      <a href={`/api/files/${r.fileNo}`}>{r.fileNo}</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{r.enrollDate?.slice(0, 10)}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Report2>
  );
};

export default Report;
