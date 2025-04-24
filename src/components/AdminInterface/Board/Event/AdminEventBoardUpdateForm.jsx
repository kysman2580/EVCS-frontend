import NoticeNav from "../../AdminCommon/AdminNav/AdminNoitceNav";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BoardContainerDiv } from "../../../UserInterface/Board/Board.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// import { StyledDatePicker } from "../../../UserInterface/RentCar/RentCarCommon/RentCar.styles";
import { StyledDatePicker } from "./AdminEventBoard.styled";

import DatePicker from "react-datepicker";
import { Wrapper } from "../../RentCar/CarManagement/InsertCar.styles";

const AdminEventBoardUpdateForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();

  // 로컬 상태로 바꿔주기
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(post?.image || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: axios로 수정 API 호출
    console.log({ title, content, imageFile });
    navigate(-1); // 완료 후 뒤로
  };

  return (
    <>
      <BoardContainerDiv style={{ height: "auto", paddingBottom: "60px" }}>
        <NoticeNav />
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                  {/* 이미지 업로드 */}
                  <Form.Group className="mb-4 text-center">
                    {preview && (
                      <img
                        src={preview}
                        alt="미리보기"
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    )}
                    <Form.Label className="d-block">
                      이벤트 이미지
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2"
                      />
                    </Form.Label>
                  </Form.Group>

                  {/* 제목 수정 */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold ">이벤트 제목</Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                    />
                  </Form.Group>
                  <Row className="mb-4 align-items-center">
                    {/* 픽업 */}
                    <Form.Group as={Row} className="mb-4">
                      {/* 픽업 일자 */}
                      <Form.Label
                        column
                        xs={1}
                        className="fw-bold text-center d-flex align-items-center"
                      >
                        이벤트 시작
                      </Form.Label>
                      <Col xs={2} className="d-flex align-items-center">
                        <StyledDatePicker style={{ margin: "0,0,0,0" }}>
                          <DatePicker
                            className="datepicker"
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yy/MM/dd"
                          />
                        </StyledDatePicker>
                      </Col>
                      <Col xs={4} /> {/* 반납 일자 */}
                      <Form.Label
                        column
                        xs={1}
                        className="fw-bold text-center d-flex align-items-center"
                      >
                        이벤트 마감
                      </Form.Label>
                      <Col xs={4} className="d-flex align-items-center">
                        <StyledDatePicker>
                          <DatePicker
                            className="datepicker"
                            showIcon
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yy/MM/dd"
                          />
                        </StyledDatePicker>
                      </Col>
                    </Form.Group>
                  </Row>

                  {/* 내용 수정 */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold ">이벤트 내용</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="내용을 입력하세요"
                    />
                  </Form.Group>

                  {/* 버튼 */}
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                      취소
                    </Button>
                    <Button variant="primary" type="submit">
                      저장하기
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </BoardContainerDiv>
    </>
  );
};

export default AdminEventBoardUpdateForm;
