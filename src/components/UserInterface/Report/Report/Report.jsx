import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Report2는 스타일드 컨테이너입니다.
import { Report2 } from "./Report.styled";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import axios from "axios";

// 개발 및 테스트용 더미 데이터 (신고자와 피의자 모두 사람)
const dummyReports = [
  {
    boardNo: 1,
    displayId: 1,
    title: "전기차 충전소 오류 신고",
    reporter: "홍길동",
    defendant: "박영수",
    applicationDate: "2025-04-20",
    status: "접수",
  },
  {
    boardNo: 2,
    displayId: 2,
    title: "충전 대기 시간 지연",
    reporter: "김철수",
    defendant: "최민수",
    applicationDate: "2025-04-18",
    status: "처리중",
  },
  {
    boardNo: 3,
    displayId: 3,
    title: "결제 오류 발생",
    reporter: "이영희",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
  {
    boardNo: 4,
    displayId: 4,
    title: "신고",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
  {
    boardNo: 5,
    displayId: 5,
    title: "신고인데요~",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
  {
    boardNo: 6,
    displayId: 6,
    title: "결제 오류 발생",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
];

const Report = ({ useDummyData = true }) => {
  const navi = useNavigate();
  const { auth } = useAuth(); // ← 여기서 auth 꺼내고
  const currentUser = auth.user.name; // ← name을 currentUser로 사용

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [titleQuery, setTitleQuery] = useState("");

  // 데이터 로드 (현재 사용자 기준)
  useEffect(() => {
    if (useDummyData) {
      setReports(dummyReports.filter((r) => r.reporter === currentUser));
      return;
    }
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get("/api/reports", {
          params: { reporter: currentUser, page: 0, size: 10 },
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
  }, [useDummyData, currentUser]);

  // 검색/필터
  const handleSearch = () => {
    if (useDummyData) {
      let filtered = dummyReports.filter((r) => r.reporter === currentUser);
      if (titleQuery)
        filtered = filtered.filter((r) => r.title.includes(titleQuery));
      if (startDate)
        filtered = filtered.filter((r) => r.applicationDate >= startDate);
      if (endDate)
        filtered = filtered.filter((r) => r.applicationDate <= endDate);
      setReports(filtered);
      return;
    }
    setLoading(true);
    setError(null);
    axios
      .get("/api/reports", {
        params: {
          reporter: currentUser,
          title: titleQuery || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page: 0,
          size: 10,
        },
      })
      .then((res) => setReports(res.data))
      .catch((err) => {
        console.error(err);
        setError("검색 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  };

  // 기간 단축 버튼
  const handlePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  // 행 클릭
  const handleRowClick = (boardNo) => navi(`/reports/${boardNo}`);

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
        {loading && <p>신고 내역을 불러오는 중...</p>}
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
                <th>추진상황</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.boardNo} onClick={() => handleRowClick(r.boardNo)}>
                  <td>{r.displayId}</td>
                  <td className="report-title">{r.title}</td>
                  <td>{r.reporter}</td>
                  <td>{r.defendant}</td>
                  <td>{r.applicationDate}</td>
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
