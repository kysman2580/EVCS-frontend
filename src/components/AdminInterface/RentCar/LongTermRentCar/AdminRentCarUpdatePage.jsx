import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const AdminRentCarEnrollPage = () => {
  const location = useLocation();
  const car = location.state?.car;

  useEffect(() => {
    if (car) {
      setForm({
        name: car.name,
        carNo: car.carNo,
        year: car.year,
        category: car.category,
        price: car.price,
        address: car.address,
      });
    }
  }, [car]);

  const [form, setForm] = useState({
    name: "",
    carNo: "",
    year: "",
    category: "",
    price: "",
    address: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("등록된 데이터:", form);
    alert("차량이 등록되었습니다!");
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

              <Form onSubmit={handleSubmit}>
                {/* 차 이름 */}
                <Form.Group className="mb-3" controlId="carName">
                  <Form.Label className="fw-bold ">차 이름 :</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Form.Group>

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
                    <Form.Group controlId="carCategory">
                      <Form.Label className="fw-bold ">카테고리 :</Form.Label>
                      <Form.Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                      >
                        <option value="">선택</option>
                        <option value="시간별 렌트카">시간별 렌트카</option>
                        <option value="장기 렌트카">장기 렌트카</option>
                        <option value="구독 렌트카">구독 렌트카</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* 가격 */}
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="carPrice">
                      <Form.Label className="fw-bold ">가격 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="carPrice">
                      <Form.Label className="fw-bold ">차 번호 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="carNo"
                        value={form.carNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* 주소 */}
                <Form.Group className="mb-4" controlId="carAddress">
                  <Form.Label className="fw-bold ">등록 주소 :</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="dark">
                    수정하기
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

export default AdminRentCarEnrollPage;
