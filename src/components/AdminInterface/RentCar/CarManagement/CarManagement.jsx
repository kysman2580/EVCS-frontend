import BasicExample from "./table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Title,
  InsertBtn,
  TableHeader,
  Row,
  Cell,
} from "./CarManagement.styles";

const CarManagement = () => {
  const navi = useNavigate();
  const [page, setPage] = useState(0);
  const [electricCarList, setElectricCarList] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [startPage, setStartPage] = useState(1); // 0부터 시작!

  const btnHandler = (boardNo) => {
    navi(`/boards/${boardNo}`);
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost/boards/page/${page}`)
  //     .then((result) => {
  //       console.log(result.data);
  //       setElectricCarList(result.data.electricCarList);
  //       setTotalPageCount(result.data.totalPageCount);
  //     })
  //     .catch((error) => console.error(error));
  // }, [page]);

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
      <Wrapper>
        <Title>차종 정보</Title>
        <InsertBtn onClick={() => navi("/insertCar")}>차종 등록하기</InsertBtn>

        <TableHeader>
          <Cell width="15%">차종 번호</Cell>
          <Cell width="15%">차종명</Cell>
          <Cell width="15%">출시일</Cell>
          <Cell width="15%">제조사</Cell>
          <Cell width="20%">배터리용량</Cell>
          <Cell width="20%">등록일시</Cell>
        </TableHeader>

        {/* {electricCarList.map((board) => (
          <Row key={board.boardNo}>
            <Cell width="10%">{board.boardNo}</Cell>
            <Cell
              onClick={() => btnHandler(board.boardNo)}
              style={{ cursor: "pointer" }}
              width="50%"
            >
              {board.boardTitle}
            </Cell>
            <Cell width="20%">{board.boardWriter}</Cell>
            <Cell width="20%">{board.createDate}</Cell>
          </Row>
        ))} */}

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
      </Wrapper>
    </>
  );
};

export default CarManagement;
