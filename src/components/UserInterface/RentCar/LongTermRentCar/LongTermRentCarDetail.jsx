import RentCarNav from "../../Common/Nav/RentCarNav";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  RentContainerDiv,
  StyledDatePicker,
  RentDetailBodyDiv,
} from "../RentCarCommon/RentCar.styles";

import DatePicker from "react-datepicker";
import axios from "axios";

import { PaymentButton } from "./PaymentButton";

const calculateEndDate = (start, monthsToAdd) => {
  const date = new Date(start);
  date.setMonth(date.getMonth() + monthsToAdd);

  return date; // YYYY-MM-DD 포맷
};

const LongTermRentCarDetail = () => {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const location = useLocation();
  const rentCarNo = location.state?.rentCarNo;
  const [startDate, setStartDate] = useState(new Date());
  const [returnDateText, setReturnDateText] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("24개월");
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionList, setOptionList] = useState([]);

  const userName = localStorage.getItem("memberName");

  const OPTION_ICONS = {
    1: "/rentCar/gps-navigation.png",
    2: "/rentCar/Rear View Camera.png",
    3: "/rentCar/driving assist.png",
    4: "/rentCar/bluetooth.png",
    5: "/rentCar/heat sheats.png",
    6: "/rentCar/real hi pass.png",
    7: "/rentCar/surround view.png",
    8: "/rentCar/heat-wheel.png",
    9: "/rentCar/menory seat.png",
  };

  const [car, setCar] = useState(null);

  useEffect(() => {
    if (!car) return;
    const months = selectedPeriod === "30개월" ? 30 : 24;
    const returnDate = calculateEndDate(startDate, months);
    setEndDate(returnDate);
    setReturnDateText(returnDate.toISOString().split("T")[0]);
  }, [selectedPeriod, startDate, car]);

  useEffect(() => {
    axios
      .get(`${ENV_URL}/rentCar/options`)
      .then((res) => {
        setOptionList(res.data); // [{ optionNo:1, optionName: "내비게이션" }, ... ]
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!rentCarNo) {
      console.warn("렌트카 번호 없음");
      return;
    }
    axios
      .get(`${ENV_URL}/rentCar/rentCaroptions`, {
        params: { rentCarNo: rentCarNo },
      })
      .then((res) => {
        console.log(rentCarNo);
        console.log(res.data);
        setSelectedOptions(res.data.map((o) => o.optionNo));
      })
      .catch(console.error);

    axios
      .get(`${ENV_URL}/user-rentcars/${rentCarNo}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => {
        console.error("🚨 차량 조회 실패", err);
      });
  }, [rentCarNo]);

  if (!car) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h4>차량 정보를 불러오는 중입니다...</h4>
      </div>
    );
  }

  const getDiscountInfo = () => {
    const months = selectedPeriod === "30개월" ? 30 : 24;
    const baseDiscount = selectedPeriod === "30개월" ? 0.1 : 0.05;
    const hotdealDiscount = car.ingHotdeal === "1" ? car.dealPercent / 100 : 0;
    const totalDiscount = baseDiscount + hotdealDiscount;
    const originalPrice = car.rentCarPrice;
    const monthlyPrice = Math.round(originalPrice / months);
    const discountedTotal = Math.round(originalPrice * (1 - totalDiscount));

    const monthlyPaymentOriginal = Math.round(originalPrice / months);
    const monthlyPayment = Math.round(discountedTotal / months);

    return {
      months,
      baseDiscount,
      hotdealDiscount,
      totalDiscount,
      monthlyPrice,
      originalPrice,
      discountedTotal,
      monthlyPaymentOriginal,
      monthlyPayment,
    };
  };

  const {
    months,
    baseDiscount,
    hotdealDiscount,
    originalPrice,
    discountedTotal,
    monthlyPaymentOriginal, // 변경
    monthlyPayment, // 변경
  } = getDiscountInfo();

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
                    src={car.fileLoad}
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
                        <h4>{car.carName}</h4>
                        <div className="text-muted">
                          {car.carYear} / {car.regionSido}
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
                              <div style={{ paddingTop: "5px" }}>
                                {returnDateText}
                              </div>
                            </Col>
                            <Col></Col>
                          </Row>
                        </StyledDatePicker>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="mb-3 px-3">
                      <Col>
                        <h5 className="fw-bold">상품 옵션</h5>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            rowGap: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          {optionList.map((opt) => (
                            <div
                              key={opt.optionNo}
                              style={{
                                width: "30%", // 줄당 3개
                                textAlign: "center",
                                opacity: selectedOptions.includes(opt.optionNo)
                                  ? 1
                                  : 0.2,
                                transition: "opacity 0.2s",
                              }}
                            >
                              <Image
                                src={OPTION_ICONS[opt.optionNo]}
                                alt={opt.optionName}
                                fluid
                                style={{ maxHeight: 40 }}
                              />
                              <div style={{ fontSize: 18, marginTop: 4 }}>
                                {opt.optionName}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>

                    <hr />

                    {/* 요금 정보 */}
                    <Row className="mb-3 px-3">
                      <Col>
                        <h6 className="fw-bold">요금 정보</h6>
                        <>
                          <Row>
                            <Col>
                              {months}개월 할인 ({baseDiscount * 100}%)
                            </Col>
                            <Col className="text-end">
                              -
                              {Math.round(
                                originalPrice * baseDiscount
                              ).toLocaleString()}
                              원
                            </Col>
                          </Row>
                          {hotdealDiscount > 0 && (
                            <Row>
                              <Col>
                                🔥 핫딜 추가 할인 ({hotdealDiscount * 100}
                                %)
                              </Col>
                              <Col className="text-end">
                                -
                                {Math.round(
                                  originalPrice * hotdealDiscount
                                ).toLocaleString()}
                                원
                              </Col>
                            </Row>
                          )}
                          <Row>
                            <Col>월 요금</Col>
                            <Col className="text-end">
                              {monthlyPaymentOriginal.toLocaleString()}원
                            </Col>
                          </Row>
                          <Row>
                            <Col>원래 가격 / 실제 가격</Col>
                            <Col className="text-end">
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  marginRight: 8,
                                  color: "#999",
                                }}
                              >
                                {originalPrice.toLocaleString()}원 /{" "}
                              </span>
                              <span>{discountedTotal.toLocaleString()}원</span>
                            </Col>
                          </Row>
                        </>
                      </Col>
                    </Row>

                    <hr />

                    {/* 계산 가격 + 결제 */}
                    <Row className="mb-3 px-3" style={{ marginTop: "40px" }}>
                      <Col>
                        <Row className="mb-3 px-3">
                          <Col>
                            <Row className="align-items-center">
                              <Col md={2}>
                                <strong>총 가격</strong>
                              </Col>
                              <Col className="text-end" md={6}>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: 8,
                                    color: "#999",
                                  }}
                                >
                                  월 {monthlyPaymentOriginal.toLocaleString()}원
                                </span>
                                <span>
                                  / 월 {monthlyPayment.toLocaleString()}원
                                </span>
                              </Col>
                              <Col className="text-end" md={4}>
                                <PaymentButton
                                  startDate={startDate}
                                  endDate={endDate}
                                  memberNo={localStorage.getItem("memberNo")}
                                  rentCarNo={rentCarNo}
                                  amount={monthlyPayment}
                                  customerName={userName}
                                  carName={car.carName}
                                  selectedPeriod={selectedPeriod}
                                />
                              </Col>
                            </Row>
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
