import NoticeNav from "../../Common/Nav/NoticeNav";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BoardContainerDiv, BoardBodyDiv } from "../Board.styles";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventBoardDetail = () => {
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

                  {/* 내용 */}
                  <div className="mb-4">
                    <strong>이벤트 내용:</strong>
                    <div
                      className="border rounded p-3 mt-1 bg-light"
                      style={{ minHeight: "300px", whiteSpace: "pre-wrap" }}
                    >
                      {plainContent}
                    </div>
                  </div>

                  {/* 목록으로 돌아가기 */}
                  <div className="text-center">
                    <Button
                      variant="secondary"
                      onClick={() => navigate("/EventBoard")}
                    >
                      목록으로
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </BoardContainerDiv>
    </>
  );
};

export default EventBoardDetail;
