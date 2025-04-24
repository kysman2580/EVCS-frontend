import { useEffect, useState } from "react";
import styled from "styled-components";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./CarMap.css"; // 필요하면 유지
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";
import RentCarNav from "../../Common/Nav/RentCarNav";
import { ContainerDiv, DetailDiv } from "./CarMap.styles";

const Map = styled.div`
  width: 800px;
  height: 500px;
  margin: 50px auto;
  border: 2px solid black;
  border-radius: 1em;
  position: relative;
  z-index: 1;
`;

const CarMap = () => {
  const [loaded, setLoaded] = useState(false);
  const [carModal, setCarModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const car = {
    image: "images/아이오닉 5.png", // 이미지 URL 넣을 수 있음
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

  useEffect(() => {
    window.kakao.maps.load(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(lat, lon),
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const positions = [
          {
            content: `
              <div class="wrap">
                <div class="info">
                  <div class="title">
                    카카오 스페이스닷원
                    <div class="close" title="닫기"/></div>
                  </div>
                  <div class="wrapper">
                    <div class="customBody" style="cursor:pointer; padding:5px;">
                      <div class="img">
                        <img src="images/아이오닉 5.png" width="43" height="40">
                      </div>
                      <div class="desc">
                        <div class="carTitle">2121 아이오닉 5</div>
                        <div class="jibun carTitle">HYUNDAI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `,
            latlng: new window.kakao.maps.LatLng(37.5652352, 126.9891072),
          },
        ];

        for (let i = 0; i < positions.length; i++) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
          });

          const container = document.createElement("div");
          container.innerHTML = positions[i].content;

          const customBody = container.querySelector(".customBody");
          if (customBody) {
            customBody.addEventListener("click", () => {
              console.log("클릭됨");
              handleShow();
            });
          }

          const overlay = new window.kakao.maps.CustomOverlay({
            content: container,
            position: positions[i].latlng,
            map: null,
          });

          // 마커 클릭 시 오버레이 표시
          window.kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(map);
          });

          // 오버레이 닫기용 함수도 만들면 이렇게 가능
          const closeBtn = container.querySelector(".close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              overlay.setMap(null);
            });
          }
        }
      });
    }
  }, [loaded]);

  return (
    <>
      <Map id="map" />

      {/* 오프캔버스: customBody 클릭 시 나타남 */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>차량 상세 정보</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ height: "100%", width: "100%" }}>
          <ContainerDiv>
            <DetailDiv>
              <Container style={{ height: "100%", width: "100%" }}>
                <Row
                  className="justify-content-center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Col md={6} style={{ height: "100%", width: "100%" }}>
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
            </DetailDiv>
          </ContainerDiv>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CarMap;
