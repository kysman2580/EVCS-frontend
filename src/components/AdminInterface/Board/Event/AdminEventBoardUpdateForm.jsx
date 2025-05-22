import NoticeNav from "../../AdminCommon/AdminNav/AdminNoitceNav";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BoardContainerDiv } from "../../../UserInterface/Board/Board.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

// import { StyledDatePicker } from "../../../UserInterface/RentCar/RentCarCommon/RentCar.styles";
import { StyledDatePicker } from "./AdminEventBoard.styled";

import DatePicker from "react-datepicker";
import axios from "axios";

const AdminEventBoardUpdateForm = () => {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const location = useLocation();
  const event = location.state?.event;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date(event.startDate));
  const [endDate, setEndDate] = useState(new Date(event.endDate));

  // 로컬 상태로 바꿔주기
  const [title, setTitle] = useState(event?.eventName || "");
  const initialContent = event?.eventContent
    ? event.eventContent.replace(/<br\s*\/?>/gi, "\n")
    : "";

  const [content, setContent] = useState(initialContent);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(event?.filePath || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const titleRef = useRef();
  const contentRef = useRef();
  const fileRef = useRef();

  const validateForm = () => {
    if (!title.trim()) {
      alert("이벤트 제목을 입력하세요.");
      titleRef.current.focus();
      return false;
    }
    if (!content.trim()) {
      alert("이벤트 내용을 입력하세요.");
      contentRef.current.focus();
      return false;
    }
    if (!startDate || !endDate) {
      alert("이벤트 날짜를 선택하세요.");
      return false;
    }
    if (!imageFile && !preview) {
      alert("이벤트 이미지를 업로드하세요.");
      fileRef.current.focus();
      return false;
    }
    if (startDate > endDate) {
      alert("이벤트 시작일은 마감일보다 빨라야 합니다.");
      return false;
    }
    return true;
  };

  const insertEvent = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // 검증 실패 시 종료
    }

    const formData = new FormData();
    formData.append("eventName", title);
    formData.append("eventContent", content);
    formData.append("startDate", startDate.toISOString().split("T")[0]); // yyyy-MM-dd
    formData.append("endDate", endDate.toISOString().split("T")[0]);
    formData.append("eventNo", event.eventNo);

    if (imageFile) {
      formData.append("file", imageFile); // key 이름이 백엔드와 일치해야 함
    }

    axios
      .put(`${ENV_URL}/admin-events/${event.eventNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        alert("이벤트가 수정되었습니다.");
        navigate("/admin/adminEventBoard", { replace: true });
      })
      .catch((error) => {
        console.error("수정 실패:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const deleteEvent = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios
      .delete(`${ENV_URL}/admin-events/${event.eventNo}`)
      .then(() => {
        alert("이벤트가 삭제되었습니다.");
        navigate("/admin/adminEventBoard", { replace: true });
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      });
  };
  return (
    <>
      <BoardContainerDiv style={{ height: "800px", paddingBottom: "60px" }}>
        <NoticeNav />
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4">
                <Form onSubmit={insertEvent}>
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
                        ref={fileRef}
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
                      ref={titleRef}
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
                      ref={contentRef}
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
                    <div>
                      <Button
                        variant="danger"
                        type="button"
                        onClick={deleteEvent}
                      >
                        삭제하기
                      </Button>
                      <Button
                        variant="dark"
                        type="submit"
                        style={{ marginLeft: "10px" }}
                      >
                        수정하기
                      </Button>
                    </div>
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
