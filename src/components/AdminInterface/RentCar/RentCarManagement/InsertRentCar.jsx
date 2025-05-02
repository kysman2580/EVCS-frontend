import React, { useState, useEffect } from "react";
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

const InsertRentCar = () => {
  const [form, setForm] = useState({
    carName: "",
    carCompany: "",
    rentCarNo: "",
    carYear: "",
    categoryName: "",
    rentCarPrice: "",
    enrollPlace: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/rentCar/category")
      .then((result) => {
        console.log(result.data);
        setCategory(result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/rentCar/carInfo")
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCarName = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log("form : ", form);
    axios
      .get(`http://localhost/rentCar/${form.carName}`)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  console.log(category);
  console.log(form);

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
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    {/* 차 이름 */}
                    <Form.Group className="mb-3" controlId="carName">
                      <Form.Label className="fw-bold ">모델명 :</Form.Label>
                      <Form.Select
                        name="carName"
                        value={form.carName}
                        onChange={handleCarName}
                      >
                        <option value="">선택</option>
                        <option>모델 y</option>
                        <option>쏘렌토</option>
                        <option>소나타</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* 차 이름 */}
                    <Form.Group className="mb-3" controlId="carCompany">
                      <Form.Label className="fw-bold ">제조사 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="carCompany"
                        value={form.carCompany}
                        onChange={handleChange}
                      />
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
                        name="carYear"
                        value={form.yecarYearar}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="categoryName">
                      <Form.Label className="fw-bold ">카테고리 :</Form.Label>
                      <Form.Select
                        name="categoryName"
                        value={form.categoryName}
                        onChange={handleChange}
                      >
                        <option value="">선택</option>
                        {category.map((item) => {
                          return <option key={item}>{item}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* 가격 */}
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="rentCarPrice">
                      <Form.Label className="fw-bold">가격 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="rentCarPrice"
                        value={form.rentCarPrice}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="rentCarNo">
                      <Form.Label className="fw-bold ">차 번호 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="rentCarNo"
                        value={form.rentCarNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* 주소 */}
                <Form.Group className="mb-4" controlId="enrollPlace">
                  <Form.Label className="fw-bold ">등록 주소 :</Form.Label>
                  <Form.Control
                    type="text"
                    name="enrollPlace"
                    value={form.enrollPlace}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="dark">
                    등록하기
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

export default InsertRentCar;
