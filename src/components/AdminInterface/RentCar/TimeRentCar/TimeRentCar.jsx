import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const Table = styled.table``;

const TimeRentCar = () => {
  const navi = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [startPage, setStartPage] = useState(1); // 0부터 시작!

  const pageNumbers = [];
  for (let i = 0; i < 5; i++) {
    if (startPage + i <= totalPageCount) {
      pageNumbers.push(startPage + i);
    }
  }

  const Previous = () => {
    if (startPage > 5) {
      setStartPage(startPage - 5);
      setPage(startPage - 5);
    }
  };

  const Next = () => {
    if (startPage + 5 <= totalPageCount) {
      setStartPage(startPage + 5);
      setPage(startPage + 5);
    }
  };

  return (
    <>
      <div>
        <table>
          <th>
            <tr>차 식별번호</tr>
            <tr>차종</tr>
            <tr>대여시각</tr>
            <tr>반납시각</tr>
            <tr>반납여부</tr>
          </th>
          <td>
            <tr>12312</tr>
            <tr>12312</tr>
            <tr>12312</tr>
            <tr>12312</tr>
            <tr>12312</tr>
          </td>
        </table>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={Previous}>이전</button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            style={{
              margin: "0 5px",
              fontWeight: page === num ? "bold" : "normal",
            }}
          >
            {num}
          </button>
        ))}

        <button onClick={Next}>다음</button>
      </div>
    </>
  );
};
export default TimeRentCar;
