import RentCarNav from "../../Common/Nav/RentCarNav";
import { useState } from "react";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";

import {
  RentContainerDiv,
  StyledDatePicker,
  RentDetailBodyDiv,
} from "../RentCarCommon/RentCar.styles";

import DatePicker from "react-datepicker";

const LongTermRentCarDetail = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("24개월");

  const car = {
    image: "images/model_Y.png", // 이미지 URL 넣을 수 있음
    name: "쏘나타 EV",
    year: "2023년식",
    location: "서울 강남지점",
    period: "24개월 / 30개월",
    startDate: "25.4.17.(목)",
    monthlyFee: "450,000" + "원",
    originalPrice: "12,000,000" + "원",
    discountedPrice: "10,800,000" + "원",
    totalEstimate: "10,800,000" + "원",
  };

  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentDetailBodyDiv>
          <Container className="mt-3">
            <Row className="justify-content-center">
              <Col md={6}>
                <Card>
                  <Image
                    src={car.image}
                    alt="차 이미지"
                    fluid
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  <Card.Body>
                    {/* 차량 정보 */}
                    <Row className="text-center mb-3">
                      <Col>
                        <h4>{car.name}</h4>
                        <div className="text-muted">
                          {car.year} / {car.location}
                        </div>
                      </Col>
                    </Row>

                    {/* 이용 조건 */}
                    <hr />
                    <Row className="px-3 mb-3 align-items-center">
                      <Col xs={6}>
                        <h5 className="fw-bold mb-0">이용 조건 선택</h5>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button
                          variant={
                            selectedPeriod === "24개월"
                              ? "success"
                              : "outline-secondary"
                          }
                          className="me-2"
                          onClick={() => setSelectedPeriod("24개월")}
                        >
                          24개월
                        </Button>
                        <Button
                          variant={
                            selectedPeriod === "30개월"
                              ? "success"
                              : "outline-secondary"
                          }
                          onClick={() => setSelectedPeriod("30개월")}
                        >
                          30개월
                        </Button>
                      </Col>
                    </Row>

                    <Row className="px-3 mb-3">
                      <Col>
                        <StyledDatePicker>
                          <Row className="align-items-center w-100">
                            <Col xs={4} className="fw-bold">
                              픽업 일자
                            </Col>
                            <Col xs={8} className="text-end">
                              <DatePicker
                                className="datepicker"
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yy/MM/dd"
                              />
                            </Col>
                          </Row>
                        </StyledDatePicker>
                        <StyledDatePicker>
                          <Row className="align-items-center w-100">
                            <Col xs={4} className="fw-bold">
                              반납 일자
                            </Col>
                            <Col xs={8} className="text-end">
                              <DatePicker
                                className="datepicker "
                                showIcon
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yy/MM/dd"
                              />
                            </Col>
                          </Row>
                        </StyledDatePicker>
                      </Col>
                    </Row>

                    <hr />

                    {/* 요금 정보 */}
                    <Row className="mb-3 px-3">
                      <Col>
                        <h6 className="fw-bold">요금 정보</h6>
                        <Row>
                          <Col>월 요금</Col>
                          <Col className="text-end">{car.monthlyFee}</Col>
                        </Row>
                        <Row>
                          <Col>원래 가격 / 실제 가격</Col>
                          <Col className="text-end">
                            {car.originalPrice} / {car.discountedPrice}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <hr />

                    {/* 계산 가격 + 결제 */}
                    <Row className="mb-3 px-3">
                      <Col>
                        <Row className="align-items-center">
                          <Col>
                            <strong>계산할 가격</strong>
                          </Col>
                          <Col className="text-center fw-bold">
                            {car.totalEstimate}
                          </Col>
                          <Col className="text-end">
                            <Button variant="dark">결제하기</Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </RentDetailBodyDiv>
      </RentContainerDiv>
      ;
    </>
  );
};

export default LongTermRentCarDetail;
