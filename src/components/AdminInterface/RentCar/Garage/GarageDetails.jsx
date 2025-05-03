import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { RentContainerDiv } from "../../../UserInterface/RentCar/RentCarCommon/RentCar.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const GarageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  const [addressInfo, setAddressInfo] = useState({
    address: "",
    categoryL: "",
    categoryM: "",
    categoryS: "",
    detailAddress: "",
    postcode: "",
  });

  useEffect(() => {
    if (event) {
      setAddressInfo({
        address: event.allAddress || "",
        categoryL: event.categoryL || "",
        categoryM: event.categoryM || "",
        categoryS: event.categoryS || "",
        detailAddress: event.address || "",
        postcode: event.postcode || "", // 혹시 없으면 공백으로
      });
    }
  }, [event]);

  return (
    <RentContainerDiv style={{ marginTop: "30px" }}>
      <AdminRentCarNav />
      <Container style={{ maxWidth: "800px" }}>
        <h1>차고지 상세</h1>
        <Card className="p-4 shadow-sm">
          <Form>
            {/* 주소 + 우편번호 */}
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">주소</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  value={addressInfo.address}
                  readOnly
                  className="me-2"
                  style={{ height: "40px" }}
                />
                <Form.Control
                  type="text"
                  value={addressInfo.postcode}
                  readOnly
                  className="me-2"
                  style={{ width: "100px", height: "40px" }}
                />
              </div>
            </Form.Group>

            {/* 대/중/소분류 */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">대분류</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressInfo.categoryL}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">중분류</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressInfo.categoryM}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">소분류</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressInfo.categoryS}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* 상세주소 */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">상세 주소</Form.Label>
              <Form.Control
                type="text"
                value={addressInfo.detailAddress}
                readOnly
              />
            </Form.Group>

            {/* 버튼 */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                취소
              </Button>
              <Button
                variant="dark"
                type="button"
                onClick={() =>
                  navigate("/admin/goGarageUpdateForm", {
                    state: { event },
                  })
                }
              >
                수정하기
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </RentContainerDiv>
  );
};

export default GarageDetails;
