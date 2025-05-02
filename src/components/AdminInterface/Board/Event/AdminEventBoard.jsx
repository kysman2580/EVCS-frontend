import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";

import NoticeNav from "../../AdminCommon/AdminNav/AdminNoitceNav";
import "./AdminEventBoard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEventBoard = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    currentPage: 1,
    maxPage: 1,
  });

  // 1) 페이지나 검색어가 바뀔 때마다 데이터 fetch
  useEffect(() => {
    console.log("category :" + category);
    console.log("searchKeyword :" + searchKeyword);
    axios
      .get("http://localhost/events", {
        params: { page, category: category, searchKeyword: searchKeyword },
      })
      .then((res) => {
        console.log(res.data); // ← 여기에 찍히는 키 확인
        setEvents(res.data.eventList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const handleSearch = () => {
    setPage(1); // 검색할 때는 1페이지로
  };

  // 2) 페이징 버튼 생성 함수
  const renderPagination = () => {
    const items = [];
    const { startPage, endPage, currentPage, maxPage } = pageInfo;

    // 처음 / 이전
    items.push(
      <Pagination.First
        key="first"
        disabled={currentPage === 1}
        onClick={() => setPage(1)}
      />,
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      />
    );

    // 숫자 버튼들
    for (let num = startPage; num <= endPage; num++) {
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

    // 다음 / 마지막
    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === maxPage}
        onClick={() => setPage(currentPage + 1)}
      />,
      <Pagination.Last
        key="last"
        disabled={currentPage === maxPage}
        onClick={() => setPage(maxPage)}
      />
    );

    return items;
  };

  return (
    <>
      <div className="EventContainerDiv">
        <NoticeNav />
        <div style={{ width: "100%" }}>
          <div
            className="page-wrapper d-flex flex-column "
            style={{
              paddingBottom: "60px",
              minHeight: "70vh",
            }}
          >
            <Container className="flex-grow-1">
              {/* 검색창 */}
              <Row className="my-4">
                <Col md={2}>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={"eventName"}>제목</option>
                    <option value={"eventContent"}>내용</option>
                  </Form.Select>
                </Col>
                <Col md={8}>
                  <Form.Control
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="검색어 입력"
                  />
                </Col>
                <Col md={1}>
                  <Button
                    className="w-100"
                    variant="secondary"
                    onClick={handleSearch}
                  >
                    검색
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    className="w-100"
                    variant="dark"
                    onClick={() => navigate("/admin/goAdminEventEnrollForm")}
                  >
                    등록하기
                  </Button>
                </Col>
              </Row>

              {/* 테이블 */}
              <Row>
                <Col>
                  <Card>
                    <Card.Header className="bg-primary text-white d-flex align-items-center">
                      <span role="img" aria-label="icon">
                        🎉
                      </span>
                      <span className="ms-2">이벤트 게시판</span>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <Table
                        striped
                        bordered
                        hover
                        className="text-center mb-0"
                      >
                        <thead>
                          <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>시작일자</th>
                            <th>마감일자</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((event) => (
                            <tr
                              key={event.eventtNo}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate("/admin/goAdminEventDetailPage", {
                                  state: { event }, // ← 여기서 객체 넘기기
                                })
                              }
                            >
                              <td>{event.eventNo}</td>
                              <td>{event.eventName}</td>
                              <td>{event.memberNickname}</td>
                              <td>{event.startDate}</td>
                              <td>{event.endDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>

            <footer className="footer-pagination mt-auto">
              <Pagination className="justify-content-center mb-0">
                {renderPagination()}
              </Pagination>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEventBoard;
