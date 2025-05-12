import NoticeNav from "../../AdminCommon/AdminNav/AdminNoitceNav";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BoardContainerDiv } from "../../../UserInterface/Board/Board.styles";
import { useNavigate, useLocation } from "react-router-dom";

const AdminEventBoardDetail = () => {
  const location = useLocation();
  const event = location.state?.event;
  const navigate = useNavigate();

  const plainContent = event?.eventContent
    ? event.eventContent.replace(/<br\s*\/?>/gi, "\n")
    : "";

  return (
    <>
      <BoardContainerDiv style={{ height: "1000px" }}>
        <NoticeNav />
        <div style={{ width: "100%" }}>
          <Container className="my-5">
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="p-4">
                  {/* 사진 */}
                  <div className="text-center mb-4">
                    <img
                      src={event.filePath}
                      alt="이벤트 이미지"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </div>

                  {/* 제목 */}
                  <div className="mb-3">
                    <strong>이벤트 제목:</strong>
                    <div className="border rounded p-2 mt-1 bg-light">
                      {event.eventName}
                    </div>
                  </div>

                  {/* 기간 */}
                  <Row>
                    <Col md={4}>
                      <div className="mb-3">
                        <strong>이벤트 기간:</strong>
                        <div className="border rounded p-2 mt-1 bg-light">
                          {event.startDate} ~ {event.endDate}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {/* 내용 */}
                  <div className="mb-4">
                    <strong>이벤트 내용:</strong>
                    <pre
                      className="border rounded p-3 mt-1 bg-light"
                      style={{ minHeight: "300px", whiteSpace: "pre-wrap" }}
                    >
                      {plainContent}
                    </pre>
                  </div>

                  {/* 목록으로 돌아가기 */}
                  <Row className="my-3">
                    <Col className="text-start">
                      <Button variant="secondary" onClick={() => navigate(-1)}>
                        목록으로
                      </Button>
                    </Col>
                    <Col className="text-end">
                      <Button
                        variant="dark"
                        onClick={() =>
                          navigate("/admin/goAdminEventUpdateForm", {
                            state: { event }, // ← 여기서 객체 넘기기
                          })
                        }
                      >
                        수정하기
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </BoardContainerDiv>
    </>
  );
};

export default AdminEventBoardDetail;
