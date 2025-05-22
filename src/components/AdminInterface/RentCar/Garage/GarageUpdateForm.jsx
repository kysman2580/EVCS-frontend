import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { RentContainerDiv } from "../../../UserInterface/RentCar/RentCarCommon/RentCar.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const GarageUpdateForm = () => {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const navigate = useNavigate();
  const location = useLocation();
  const garage = location.state?.garage;

  const [addressInfo, setAddressInfo] = useState({
    allAddress: "",
    regionSido: "",
    regionSigungu: "",
    regionDong: "",
    address: "",
    postAdd: "",
  });

  useEffect(() => {
    if (garage) {
      setAddressInfo({
        allAddress: garage.allAddress || "",
        regionSido: garage.regionSido || "",
        regionSigungu: garage.regionSigungu || "",
        regionDong: garage.regionDong || "",
        address: garage.address || "",
        postAdd: garage.postAdd || "", // 혹시 없으면 공백으로
      });
    }
  }, [garage]);

  const openPostcode = () => {
    const elementLayer = document.getElementById("layer");

    new window.daum.Postcode({
      oncomplete: function (data) {
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
      garageNo: garage.garageNo,
      allAddress: addressInfo.allAddress,
      regionSido: addressInfo.regionSido,
      regionSigungu: addressInfo.regionSigungu,
      regionDong: addressInfo.regionDong,
      address: addressInfo.address,
      postAdd: addressInfo.postAdd,
    };

    axios
      .put(`${ENV_URL}/admin-garages/${garage.garageNo}`, garageData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("차고지 정보가 수정되었습니다.");
        navigate("/admin/garagePage");
      })
      .catch((error) => {
        console.error("수정 실패:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const deleteGarage = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios
      .delete(`${ENV_URL}/admin-garages/${garage.garageNo}`)
      .then(() => {
        alert("차고지가 삭제되었습니다.");
        navigate("/admin/garagePage", { replace: true });
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <RentContainerDiv style={{ marginTop: "30px" }}>
      <AdminRentCarNav />
      <Container style={{ maxWidth: "800px" }}>
        <h1>차고지 수정</h1>
        <Card className="p-4 shadow-sm">
          <Form onSubmit={handleSubmit}>
            {/* 주소 + 우편번호 */}
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
                  setAddressInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
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
                  style={{ marginRight: "30px" }}
                  onClick={deleteGarage}
                >
                  삭제하기
                </Button>
                <Button variant="dark" type="submit">
                  수정하기
                </Button>
              </div>
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

export default GarageUpdateForm;
