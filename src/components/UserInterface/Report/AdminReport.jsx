import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminReport = () => {
  const navi = useNavigate();
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/reports", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        console.log(response);
        setReports([...reports, ...response.data]);
        if (response.data.length < 5) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      {reports.map((report) => (
        <div
          key={report.boardNo}
          onClick={() => navi(`/reports/${report.boardNo}`)}
          style={{ clear: "both" }}
        >
          <div>저런 아직 만들지않은 항목입니다</div>
        </div>
      ))}
      <div>
        {hasMore && (
          <div
            onClick={handleMore}
            style={{ margin: "auto", marginTop: "20px" }}
          >
            더보기
          </div>
        )}
      </div>
    </>
  );
};

export default AdminReport;
