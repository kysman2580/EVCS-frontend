import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { RentContainerDiv } from "../../../UserInterface/RentCar/RentCarCommon/RentCar.styles";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import axios from "axios";

const GarageEnrollForm = () => {
  const navigate = useNavigate();
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;

  const [addressInfo, setAddressInfo] = useState({
    allAddress: "",
    regionSido: "",
    regionSigungu: "",
    regionDong: "",
    address: "",
    postAdd: "",
  });

  const openPostcode = () => {
    const elementLayer = document.getElementById("layer");

    new window.daum.Postcode({
      oncomplete: function (data) {
        console.log("선택된 주소 정보: ", data);

        setAddressInfo((prev) => ({
          ...prev,
          allAddress: data.roadAddress || data.address,
          regionSido: data.sido,
          regionSigungu: data.sigungu,
          regionDong: data.bname,
          postAdd: data.zonecode,
        }));
        elementLayer.style.display = "none";
      },
      width: "100%",
      height: "100%",
    }).embed(elementLayer);

    elementLayer.style.display = "block";
    centerLayer();
  };

  const centerLayer = () => {
    const width = 500;
    const height = 600;
    const elementLayer = document.getElementById("layer");

    elementLayer.style.width = `${width}px`;
    elementLayer.style.height = `${height}px`;
    elementLayer.style.position = "fixed";
    elementLayer.style.top = "50%";
    elementLayer.style.left = "50%";
    elementLayer.style.transform = "translate(-50%, -50%)";
    elementLayer.style.border = "1px solid #ccc";
    elementLayer.style.backgroundColor = "#fff";
    elementLayer.style.zIndex = "1000";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const garageData = {
      allAddress: addressInfo.allAddress,
      regionSido: addressInfo.regionSido,
      regionSigungu: addressInfo.regionSigungu,
      regionDong: addressInfo.regionDong,
      address: addressInfo.address,
      postAdd: addressInfo.postAdd,
    };

    console.log("garageData : ", garageData);
    axios
      .post(`${ENV_URL}/admin-garages`, garageData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("차고지가 등록되었습니다.");
        navigate("/admin/garagePage");
      })
      .catch((error) => {
        console.error("등록 실패:", error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <RentContainerDiv style={{ marginTop: "30px" }}>
      <AdminRentCarNav />
      <Container style={{ maxWidth: "800px" }}>
        <h1>차고지 등록</h1>
        <Card className="p-4 shadow-sm">
          <Form onSubmit={handleSubmit}>
            {/* 주소 검색 */}
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">주소</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  value={addressInfo.allAddress}
                  readOnly
                  className="me-2"
                  style={{ height: "40px" }}
                />
                <Form.Control
                  type="text"
                  value={addressInfo.postAdd}
                  readOnly
                  className="me-2"
                  style={{ width: "100px", height: "40px" }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={openPostcode}
                  style={{ whiteSpace: "nowrap", height: "40px" }}
                >
                  주소 검색
                </Button>
              </div>
            </Form.Group>

            {/* 대/중/소분류 */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">대분류</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressInfo.regionSido}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">중분류</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressInfo.regionSigungu}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">소분류</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressInfo.regionDong}
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
                value={addressInfo.address}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* 버튼 */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                취소
              </Button>
              <Button variant="dark" type="submit">
                등록하기
              </Button>
            </div>
          </Form>
        </Card>
      </Container>

      {/* 주소 레이어 삽입용 div */}
      <div id="layer" style={{ display: "none" }}>
        <div
          style={{
            textAlign: "right",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              document.getElementById("layer").style.display = "none";
            }}
          >
            닫기
          </Button>
        </div>
      </div>
    </RentContainerDiv>
  );
};

export default GarageEnrollForm;
