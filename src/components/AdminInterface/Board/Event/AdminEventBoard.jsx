import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEventBoard = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("eventName");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    currentPage: 1,
    maxPage: 1,
    count: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost/events", {
        params: { page, category, searchKeyword },
      })
      .then((res) => {
        setEvents(res.data.eventList);
        setPageInfo(res.data.pageInfo);
      })
      .catch(console.error);
  }, [page]);

  const handleSearch = () => {
    console.log(
      "category : " + category + ", searchKeyword : " + searchKeyword
    );
    axios
      .get("http://localhost/events", {
        params: { page, category, searchKeyword },
      })
      .then((res) => {
        console.log("data : ", res.data);
        setEvents(res.data.eventList);
        setPageInfo(res.data.pageInfo);
        setPage(1);
      })
      .catch(console.error);
  };

  const renderPagination = () => {
    const items = [];
    const { startPage, endPage, currentPage, maxPage, count } = pageInfo;

    items.push(
      <Pagination.First
        key="first"
        disabled={currentPage === 1 || count === 0}
        onClick={() => setPage(1)}
      >
        맨앞
      </Pagination.First>,
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1 || count === 0}
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
    <div className="EventContainerDiv">
      <NoticeNav />
      <div className="content-area">
        {/* 세로 flex-container, 높이는 화면의 70vh */}
        <div className="page-wrapper d-flex flex-column">
          {/* flex-grow-1: 검색창＋테이블 영역이 남는 공간을 채움 */}
          <Container className="flex-grow-1">
            <Row className="my-4">
              <Col md={2}>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="eventName">제목</option>
                  <option value="eventContent">내용</option>
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

            <Row>
              <Col>
                <Card>
                  <Card.Header className="bg-secondary text-white">
                    이벤트 게시판
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Table striped bordered hover className="text-center mb-0">
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
                        {events.map((ev) => (
                          <tr
                            key={ev.eventNo}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate("/admin/goAdminEventDetailPage", {
                                state: { event: ev },
                              })
                            }
                          >
                            <td>{ev.eventNo}</td>
                            <td>{ev.eventName}</td>
                            <td>{ev.memberNickname}</td>
                            <td>{ev.startDate}</td>
                            <td>{ev.endDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* 항상 아래에 붙는 페이징 */}
          <footer className="footer-pagination">
            <Pagination className="justify-content-center mb-0">
              {renderPagination()}
            </Pagination>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminEventBoard;
