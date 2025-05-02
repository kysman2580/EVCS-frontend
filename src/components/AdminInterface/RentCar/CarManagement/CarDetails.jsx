import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const navi = useNavigate();

  const { no, name, type, year, company, battery, enrollDate } = location.state;

  const [form, setForm] = useState({
    carNo: no,
    carName: name,
    carType: type,
    carYear: year,
    carCompany: company,
    carBattery: battery,
    enrollDate: enrollDate,
  });

  console.log(form);

  useEffect(() => {
    axios
      .get(`http://localhost/car/image/${name}`)
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

  const handleWrite = (e) => {
    setDisabled(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(form);

    const formData = new FormData();
    formData.append("carNo", form.carNo);
    formData.append("carName", form.carName);
    formData.append("carType", form.carType);
    formData.append("carYear", form.carYear);
    formData.append("carCompany", form.carCompany);
    formData.append("carBattery", form.carBattery);
    formData.append("image", form.image);

    axios
      .post("http://localhost/car/update", formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      })
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
      .post("http://localhost/car/delete", form, {
        headers: {
          "content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log("삭제된 데이터:", result);
        alert("차량이 삭제되었습니다.");
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
                  disabled={disabled}
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
                        name="carName"
                        onChange={handleChange}
                        value={form.carName}
                        disabled={disabled}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="carType">
                      <Form.Label className="fw-bold ">차종 :</Form.Label>
                      <Form.Select
                        name="carType"
                        value={form.carType}
                        onChange={handleChange}
                        disabled={disabled}
                      >
                        <option value="">선택</option>
                        <option value="SUV">SUV</option>
                        <option value="SEDAN">SEDAN</option>
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
                        name="carYear"
                        value={form.carYear}
                        onChange={handleChange}
                        disabled={disabled}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="carCompany">
                      <Form.Label className="fw-bold ">제조사 :</Form.Label>
                      <Form.Select
                        name="carCompany"
                        value={form.carCompany}
                        onChange={handleChange}
                        disabled={disabled}
                      >
                        <option value="">선택</option>
                        <option value="HYUNDAI">HYUNDAI</option>
                        <option value="KIA">KIA</option>
                        <option value="VOLVO">VOLVO</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* 배터리 용량 */}
                <Form.Group className="mb-3" controlId="carBattery">
                  <Form.Label className="fw-bold ">배터리 용량 :</Form.Label>
                  <Form.Control
                    type="text"
                    name="carBattery"
                    value={form.carBattery}
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

export default InsertCar;
