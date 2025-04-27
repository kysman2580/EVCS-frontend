import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

const defaultCars = [
  { id: 1, name: "쏘나타 EV", price: 100000 },
  { id: 2, name: "아반떼 하이브리드", price: 80000 },
  { id: 3, name: "그랜저", price: 120000 },
  { id: 4, name: "K5", price: 90000 },
  { id: 5, name: "싼타페", price: 110000 },
  { id: 6, name: "모하비", price: 130000 },
  { id: 7, name: "베뉴", price: 70000 },
  { id: 8, name: "투싼", price: 95000 },
  { id: 9, name: "쏘렌토", price: 115000 },
  { id: 10, name: "카니발", price: 140000 },
  { id: 11, name: "GV70", price: 150000 },
  { id: 12, name: "GV80", price: 160000 },
  { id: 13, name: "티볼리", price: 80000 },
  { id: 14, name: "스포티지", price: 98000 },
];

const AdminHotDealRentCarUpdate = ({
  // 2) carOptions prop이 없으면 defaultCars를 쓰도록
  carOptions = defaultCars,
}) => {
  const [category, setCategory] = useState("all"); // 카테고리 선택
  const [maker, setMaker] = useState("all"); // 제조사 선택
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [selectedCars, setSelectedCars] = useState({});
  const [filterOption, setFilterOption] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [discountRate, setDiscountRate] = useState(30);

  const filteredCars = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return carOptions.filter(
      (car) =>
        car.name.toLowerCase().includes(term) || String(car.id).includes(term)
    );
  }, [searchTerm, carOptions]);

  const toggleCar = (id) =>
    setSelectedCars((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      cars: Object.keys(selectedCars).filter((id) => selectedCars[id]),
      startDate,
      endDate,
      discountRate,
    };
    console.log("등록할 핫딜:", payload);
    alert("🔥 핫딜 이벤트가 등록되었어요!");
  };
  return (
    <>
      <RentContainerDiv>
        <AdminRentCarNav />
        <RentBodyDiv>
          <div style={{ width: "80%" }}>
            <h1>핫딜 등록하기</h1>
            <Container fluid className="mt-4">
              <Row>
                {/* 좌측: 검색 + 드롭다운 + 스크롤 리스트 */}
                <Col md={8} style={{ margin: "0" }}>
                  <Row>
                    <Col md={2}>
                      <Form.Select
                        style={{ maxWidth: "150px" }}
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className="ms-2"
                      >
                        <option value="all">전체보기</option>
                        <option value="ev">전기차</option>
                        <option value="sedan">세단</option>
                        <option value="suv">SUV</option>
                      </Form.Select>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        placeholder="차량 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Col>
                    <Col md={2}>
                      <InputGroup.Text>🔍</InputGroup.Text>
                    </Col>
                  </Row>
                  <br />
                  <Card style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    <ListGroup variant="flush">
                      {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                          <ListGroup.Item
                            key={car.id}
                            className="d-flex align-items-center"
                          >
                            <Form.Check
                              type="checkbox"
                              id={`car-${car.id}`}
                              className="me-2"
                              checked={!!selectedCars[car.id]}
                              onChange={() => toggleCar(car.id)}
                            />
                            <div>
                              <strong>{car.name}</strong>
                              <br />
                              <small>₩{car.price.toLocaleString()}</small>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <ListGroup.Item className="text-center text-muted">
                          검색 결과가 없어요
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card>
                </Col>

                {/* 우측: 기간・할인 설정 폼 */}
                <Col md={4}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="hotdeal-start">
                          <Form.Label className="fw-bold">시작 기간</Form.Label>
                          <DatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="hotdeal-end">
                          <Form.Label className="fw-bold">종료 기간</Form.Label>
                          <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={4}>
                        <Form.Group controlId="hotdeal-discount">
                          <Form.Label className="fw-bold">
                            할인율 (%)
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            max={100}
                            value={discountRate}
                            onChange={(e) =>
                              setDiscountRate(Number(e.target.value))
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ textAlign: "center" }}>
                      <Col md={12}>
                        <Button variant="dark" type="submit">
                          🔥 핫딜 수정하기
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default AdminHotDealRentCarUpdate;
