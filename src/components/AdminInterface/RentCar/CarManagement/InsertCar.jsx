import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";
/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

const InsertCar = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const navi = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    year: "",
    company: "",
    battery: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = (e) => {
    navi(-1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    setForm({ ...form, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const formData = new FormData();
    formData.append("carName", form.name);
    formData.append("carType", form.type);
    formData.append("carYear", form.year);
    formData.append("carCompany", form.company);
    formData.append("carBattery", form.battery);
    formData.append("image", form.image);

    axios
      .post("http://localhost/car/insert", formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("등록된 데이터:", result);
        alert("차량이 등록되었습니다!");
        navi("/admin/carManagement");
      })
      .catch((error) => {
        console.log(error);
        alert("오류");
      });
  };
  return (
    <>
      <RentContainerDiv>
        <AdminRentCarNav />

        <RentBodyDiv>
          <Container style={{ maxWidth: "600px" }}>
            <Card className="p-4 shadow-sm">
              {/* 이미지 업로드 */}
              <div className="mb-3 text-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="차 미리보기"
                    fluid
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      backgroundColor: "#ddd",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span>차 사진</span>
                  </div>
                )}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2"
                />
              </div>

              <Form>
                {/* 차 이름 */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group className="mb-3" controlId="carName">
                      <Form.Label className="fw-bold ">모델명 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="carType">
                      <Form.Label className="fw-bold ">차종 :</Form.Label>
                      <Form.Select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                      >
                        <option value="">선택</option>
                        <option value="CompactCar">경차</option>
                        <option value="SmallCar">소형차</option>
                        <option value="MidSizeCar">중형차</option>
                        <option value="BigCar">대형차</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* 연식 + 카테고리 */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="carYear">
                      <Form.Label className="fw-bold ">연식 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="carCompany">
                      <Form.Label className="fw-bold ">제조사 :</Form.Label>
                      <Form.Select
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                      >
                        <option value="">선택</option>
                        <option value="HYUNDAI">HYUNDAI</option>
                        <option value="KIA">KIA</option>
                        <option value="VOLVO">VOLVO</option>
                        <option value="TESLA">TESLA</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* 배터리 용량 */}
                <Form.Group className="mb-3" controlId="Battery">
                  <Form.Label className="fw-bold ">배터리 용량 :</Form.Label>
                  <Form.Control
                    type="text"
                    name="battery"
                    value={form.battery}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="dark"
                    onClick={handleSubmit}
                    style={{ margin: "20px" }}
                  >
                    등록하기
                  </Button>
                  <Button type="submit" variant="dark" onClick={handleCancel}>
                    취소하기
                  </Button>
                </div>
              </Form>
            </Card>
          </Container>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default InsertCar;
