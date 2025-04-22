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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminEventBoard = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("title");
  const [searchText, setSearchText] = useState("");

  const posts = [
    {
      evnetNo: 1,
      title: "핫딜 3시간 할인 이벤트 아 뜨겁다 뜨거워 ",
      author: "관리자",
      date: "2025-04-20",
      image: "/event/hot_deal_img.png",
      content: "핫딜 이벤트입니다 미쳐쮸",
    },
    {
      evnetNo: 2,
      title: "첫 사용자 할인 이벤트~ 처음이시면 아 싸다 싸 미쳐따",
      author: "운영팀",
      date: "2025-04-20",
      image: "/event/first_sale_img.png",
      content: "전기충만 처음 이용하시나요? 그럼 할인받으세요 ~",
    },
    {
      evnetNo: 3,
      title: "밤에는 싸게 싸게 타고 노세요 이거 안타면 바보다 바보",
      author: "마케팅팀",
      date: "2025-04-20",
      image: "/event/night_sale_img.png",
      content: "야간에는 싸게 싸게 경치좀 보자",
    },
  ];

  const handleSearch = () => {
    alert(`"${searchType}"에서 "${searchText}" 검색! (예시 alert)`);
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
                  <Form.Select>
                    <option>제목</option>
                    <option>내용</option>
                  </Form.Select>
                </Col>
                <Col md={8}>
                  <Form.Control placeholder="검색어 입력" />
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
                            <th>작성일자</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts.map((post) => (
                            <tr
                              key={post.evnetNo}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate("/admin/goAdminEventDetailPage", {
                                  state: { post }, // ← 여기서 객체 넘기기
                                })
                              }
                            >
                              <td>{post.evnetNo}</td>
                              <td>{post.title}</td>
                              <td>{post.author}</td>
                              <td>{post.date}</td>
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
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
              </Pagination>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEventBoard;
