import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

import "./AdminHotDealRentCar.css";
import axios from "axios";

const AdminHotDealRentCar = () => {
  const navigate = useNavigate();

  const [ingCategory, setIngCategory] = useState("all"); // all | ing | noIng
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [hotdealList, setHotdealList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    currentPage: 1,
    maxPage: 1,
    count: 0,
  });

  // 로컬 날짜를 "YYYY-MM-DD"로 포맷
  const formatLocalDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    setPage(1);

    // 1) 기본 params 객체
    const params = {
      page: page,
      ing: ingCategory,
      searchKeyword: searchKeyword,
    };

    // 2) startDate가 있을 때만 추가
    if (startDate) {
      params.startDate = formatLocalDate(startDate);
    }

    // 3) endDate가 있을 때만 추가
    if (endDate) {
      params.endDate = formatLocalDate(endDate);
    }

    axios
      .get("http://localhost/admin-hotdeals", { params: params })
      .then((res) => {
        console.log(res.data);
        setHotdealList(res.data.hotdealList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.error(err);
        alert("알 수 없는 오류가 발생했어요.");
      });
  }, [page, ingCategory]);

  // 백엔드 호출 함수
  const fetchHotdeals = () => {
    setPage(1);

    const params = {
      page: page,
      ing: ingCategory,
      searchKeyword: searchKeyword,
    };

    if (startDate) params.startDate = formatLocalDate(startDate);
    if (endDate) params.endDate = formatLocalDate(endDate);

    axios
      .get("http://localhost/admin-hotdeals", {
        params,
      })
      .then((res) => {
        console.log("data 나와라 ", res.data);
        setHotdealList(res.data.hotdealList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.error(err);
        alert("알 수 없는 오류가 발생했어요.");
      });
  };

  const handleSearch = () => {
    setPage(1);
    fetchHotdeals();
  };

  const renderPagination = () => {
    const items = [];
    const { startPage, endPage, currentPage, maxPage, count } = pageInfo;

    items.push(
      <Pagination.First
        key="first"
        disabled={currentPage === 1}
        onClick={() => setPage(1)}
      >
        맨앞
      </Pagination.First>,
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        이전
      </Pagination.Prev>
    );

    for (let num = startPage; num <= endPage && num <= maxPage; num++) {
      items.push(
        <Pagination.Item
          key={num}
          active={num === currentPage}
          onClick={() => setPage(num)}
        >
          {num}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === maxPage || count === 0}
        onClick={() => setPage(currentPage + 1)}
      >
        다음
      </Pagination.Next>,
      <Pagination.Last
        key="last"
        disabled={currentPage === maxPage || count === 0}
        onClick={() => setPage(maxPage)}
      >
        마지막
      </Pagination.Last>
    );

    return items;
  };

  return (
    <>
      <RentContainerDiv>
        <AdminRentCarNav />
        <div style={{ width: "100%" }}>
          <RentBodyDiv>
            <Container
              className="mt-2 "
              style={{
                minHeight: "600px", // 이거 핵심!! 페이지 전체 높이 확보
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              {/* 상단 필터 영역 */}
              <Row className="mb-3">
                <Col md={2}>
                  <Form.Select
                    value={ingCategory}
                    onChange={(e) => setIngCategory(e.target.value)}
                  >
                    <option value="">전체</option>
                    <option value="ing">진행중</option>
                    <option value="noIng">마감</option>
                  </Form.Select>
                </Col>
                {/* 시작일 */}
                <Col md={2}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy.MM.dd"
                    placeholderText="시작일"
                    className="form-control"
                    isClearable
                  />
                </Col>

                {/* 종료일 */}
                <Col md={2}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy.MM.dd"
                    placeholderText="종료일"
                    className="form-control"
                    isClearable
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    placeholder="조회할 핫딜 이름"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // 폼 submit 방지
                        handleSearch(); // 검색 함수 호출
                      }
                    }}
                  />
                </Col>
                <Col md={2}>
                  <Button variant="secondary" onClick={handleSearch}>
                    검색
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    variant="dark"
                    onClick={() => navigate("/admin/goHotdealEnrollForm")} // 등록 페이지로 이동
                  >
                    등록하기
                  </Button>
                </Col>
              </Row>

              {/* 차량 리스트 테이블 */}
              <Table bordered hover responsive>
                <thead className="table-secondary admin-hotdeal-rentcar">
                  <tr>
                    <th>핫딜 번호</th>
                    <th>핫딜 이름</th>
                    <th>기간</th>
                    <th>할인율</th>
                    <th>자동차 수</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {hotdealList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center">
                        조회된 핫딜이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    hotdealList.map((hd) => (
                      <tr
                        key={hd.hotdealNo}
                        onClick={() =>
                          navigate("/admin/goHotdealUpdate", {
                            state: { hotdeal: hd },
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>{hd.hotdealNo}</td>
                        <td>{hd.hotdealName}</td>
                        <td>{hd.period}</td>
                        <td>{hd.dealPercent}%</td>
                        <td>{hd.carCount}</td>
                        <td
                          className={
                            hd.statusName === "진행중"
                              ? "text-success fw-bold"
                              : hd.statusName === "마감"
                              ? "text-danger fw-bold"
                              : ""
                          }
                        >
                          {hd.statusName}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Container>
            {/* 항상 아래에 붙는 페이징 */}
            <footer className="footer-pagination">
              <Pagination className="justify-content-center mb-0">
                {renderPagination()}
              </Pagination>
            </footer>
          </RentBodyDiv>
        </div>
      </RentContainerDiv>
    </>
  );
};

export default AdminHotDealRentCar;
