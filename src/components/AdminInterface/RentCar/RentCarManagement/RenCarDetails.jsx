import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import RentCarManagement from "./RentCarManagement";

const RentCarDetails = () => {
  const location = useLocation();
  const navi = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [carInfoDisabled, setCarInfoDisabled] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    carNo,
    carName,
    carCompany,
    carType,
    carYear,
    rentCarNo,
    categoryName,
    rentCarPrice,
    enrollPlace,
    status,
  } = location.state;

  const [form, setForm] = useState({
    carNo: carNo,
    carName: carName,
    carCompany: carCompany,
    carType: carType,
    carYear: carYear,
    rentCarNo: rentCarNo,
    categoryName: categoryName,
    rentCarPrice: rentCarPrice,
    enrollPlace: enrollPlace,
    status: status,
  });

  console.log(form);

  useEffect(() => {
    axios
      .get(`http://localhost/car/image/${carName}`)
      .then((result) => {
        console.log(result.data);
        setImagePreview(result.data.fileLoad);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleWrite = (e) => {
    setDisabled(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(form);

    axios
      .post("http://localhost/rentCar/update", form)
      .then((result) => {
        console.log("등록된 데이터:", result);
        alert("차량이 수정되었습니다.");
        setDisabled(true);
      })
      .catch((error) => {
        console.log(error);
        alert("오류");
      });
  };

  const handleDelete = (e) => {
    console.log(form);
    axios
      .post("http://localhost/rentCar/delete", form, {
        headers: {
          "content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log("삭제된 데이터:", result);
        alert("차량이 삭제되었습니다.");
        navi("/admin/rentCarManagement");
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
              </div>
              <Form>
                <Row className="mb-3">
                  {/* 차 이름 */}
                  <Col>
                    <Form.Group className="mb-3" controlId="carName">
                      <Form.Label className="fw-bold ">모델명 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="carName"
                        value={form.carName}
                        disabled={carInfoDisabled}
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
                        disabled={carInfoDisabled}
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
                        value={form.carYear}
                        onChange={handleChange}
                        disabled={carInfoDisabled}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="carType">
                      <Form.Label className="fw-bold ">차종 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="carType"
                        value={form.carType}
                        onChange={handleChange}
                        disabled={carInfoDisabled}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="carCompany">
                      <Form.Label className="fw-bold ">제조사 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="carCompany"
                        value={form.carCompany}
                        onChange={handleChange}
                        disabled={carInfoDisabled}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* 가격 */}
                <Row>
                  <Col>
                    <Form.Group controlId="categoryName">
                      <Form.Label className="fw-bold ">카테고리 :</Form.Label>
                      <Form.Select
                        name="categoryName"
                        value={form.categoryName}
                        onChange={handleChange}
                        disabled={disabled}
                      >
                        <option>선택</option>
                        <option>시간별렌트카</option>
                        <option>장기렌트카</option>
                        <option>구독렌트카</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="rentCarPrice">
                      <Form.Label className="fw-bold ">가격 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="rentCarPrice"
                        value={form.rentCarPrice}
                        onChange={handleChange}
                        disabled={disabled}
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
                    disabled={disabled}
                  />
                </Form.Group>

                <div className="text-center">
                  {disabled ? (
                    <>
                      <Button
                        type="button"
                        variant="dark"
                        onClick={handleWrite}
                        style={{ marginRight: "10px" }}
                      >
                        수정하기
                      </Button>
                      <Button
                        type="button"
                        variant="dark"
                        onClick={handleDelete}
                        style={{ margin: "20px" }}
                      >
                        삭제하기
                      </Button>
                    </>
                  ) : (
                    <Button type="button" variant="dark" onClick={handleUpdate}>
                      수정완료
                    </Button>
                  )}
                </div>
              </Form>
            </Card>
          </Container>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default RentCarDetails;
