import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Pagination,
  Modal,
  Spinner,
} from "react-bootstrap";

import MyPageNav from "../../Common/Nav/MyPageNav";
import { BoardContainerDiv, BoardBodyDiv } from "../../Board/Board.styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyReservationList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    currentPage: 1,
    maxPage: 1,
    count: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/api/orders", {
        params: { page, memberNo: localStorage.getItem("memberNo") },
      })
      .then((res) => {
        console.log("effect data : ", res.data);
        setReservations(res.data.reservationList);
        setPageInfo(res.data.pageInfo);
      })
      .catch(console.error);
  }, [page]);

  const handleRowClick = (r) => {
    const paymentId = r.paymentId; // reservation 객체에 맞춰서 필드명 확인!
    setShowModal(true);
    setLoading(true);
    setError(null);
    setPayment(null);

    axios
      .get(`http://localhost/api/payments/${paymentId}`)
      .then((res) => setPayment(res.data))
      .catch((e) => {
        console.error(e);
        setError("결제정보 로딩 실패");
      })
      .finally(() => setLoading(false));
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
      <BoardContainerDiv>
        <MyPageNav />
        <div style={{ width: "100%" }}>
          <div
            className="page-wrapper d-flex flex-column "
            style={{
              paddingBottom: "60px",
              minHeight: "70vh",
            }}
          >
            <Container className="flex-grow-1">
              <Row style={{ marginTop: "20px" }}>
                <Col></Col>
              </Row>
              {/* 테이블 */}
              <Row>
                <Col>
                  <Card>
                    <Card.Header className="bg-primary text-white d-flex align-items-center">
                      <span className="ms-2">결제 내역</span>
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
                            <th>예약 번호</th>
                            <th>빌린 렌트카 번호</th>
                            <th>픽업시간</th>
                            <th>반납시간</th>
                            <th>결제금액</th>
                            <th>결제상태</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map((reservation) => (
                            <tr
                              key={reservation.reservationNo}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleRowClick(reservation)}
                            >
                              <td>{reservation.reservationNo}</td>
                              <td>{reservation.rentCarNo}</td>
                              <td>{reservation.rentalTime}</td>
                              <td>{reservation.returnTime}</td>
                              <td>{reservation.returnAmount}</td>
                              <td>{reservation.paymentsStatus}</td>
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
      </BoardContainerDiv>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>결제 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
          {!loading && payment && (
            <Container>
              <Row className="mb-2">
                <Col sm={4}>
                  <strong>결제 번호</strong>
                </Col>
                <Col sm={8}>{payment.paymentId}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4}>
                  <strong>결제 금액</strong>
                </Col>
                <Col sm={8}>{payment.returnAmount}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4}>
                  <strong>결제 방식</strong>
                </Col>
                <Col sm={8}>{payment.method}</Col>
              </Row>
              <Row className="mb-2">
                <Col sm={4}>
                  <strong>결제 일자</strong>
                </Col>
                <Col sm={8}>{payment.approvedAt}</Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {" "}
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyReservationList;
