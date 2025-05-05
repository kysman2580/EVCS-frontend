import { useEffect, useState } from "react";
import styled from "styled-components";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./CarMap.css"; // 필요하면 유지
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";
import { ContainerDiv, DetailDiv } from "./CarMap.styles";
import axios from "axios";
import { set } from "date-fns";

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [timeRentCarResult, setTimeRentCarResult] = useState([]);
  const [carResult, setCarResult] = useState([]);
  const [enrollPlace, setEnrollPlace] = useState([]);
  const [enrollPosition, setEnrollPosition] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition(new window.kakao.maps.LatLng(latitude, longitude));
      });
    }
  }, []);

  useEffect(() => {
    // 시간별 렌트카 정보를 조회해옴
    axios
      .get("http://localhost/rentCar/timeRentCarInfo")
      .then((result) => {
        console.log(result.data);
        setCarResult(result.data.carResult);
        setTimeRentCarResult(result.data.timeRentCarResult);
        const enrollPlaceDatas = result.data.timeRentCarResult.map(
          (item) => item.enrollPlace
        );
        setEnrollPlace(enrollPlaceDatas);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (enrollPlace.length === 0) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    const getCoords = (address) =>
      new Promise((resolve, reject) => {
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            resolve(coords);
          } else {
            reject(`Geocode failed for ${address}`);
          }
        });
      });

    const fetchAllCoords = async () => {
      try {
        const promises = enrollPlace.map((address) => getCoords(address));
        const results = await Promise.all(promises);
        setEnrollPosition(results);
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    };
    fetchAllCoords();
  }, [enrollPlace]);

  console.log("enrollPosition", enrollPosition);
  console.log("carResult", carResult);
  console.log("timeRentCarResult", timeRentCarResult);

  useEffect(() => {
    if (!loaded || enrollPosition.length === 0 || carResult.length === 0)
      return;

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: currentPosition,
      level: 5,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const uniquePositions = [
      ...new Set(enrollPosition.map((item) => `${item.Ma}-${item.La}`)),
    ];

    const positions = uniquePositions.map((key) => {
      const [Ma, La] = key.split("-");
      const latlng = new window.kakao.maps.LatLng(Ma, La);

      const carsAtSamePosition = enrollPosition
        .map((pos, index) => ({ pos, index }))
        .filter(
          ({ pos }) =>
            parseFloat(pos.Ma) === parseFloat(Ma) &&
            parseFloat(pos.La) === parseFloat(La)
        );

      const content = `
        <div class="wrap">
          <div class="info">
            <div class="title">이용 가능한 차량<div class="close" title="닫기"></div></div>
            ${carsAtSamePosition
              .map(
                ({ index }) => `
              <div class="wrapper">
                <div class="customBody" style="cursor:pointer; padding:5px;">
                  <div class="img">
                    <img src="images/아이오닉 5.png" width="43" height="40">
                  </div>
                  <div class="desc">
                    <div class="carTitle">${carResult[index].carName}</div>
                    <div class="carPrice">${timeRentCarResult[index].rentCarPrice}</div>
                  </div>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </div>
      `;

      return { latlng, content, carsAtSamePosition };
    });

    for (let i = 0; i < positions.length; i++) {
      const { latlng, content, carsAtSamePosition } = positions[i];

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
      });

      const container = document.createElement("div");
      container.innerHTML = positions[i].content;

      const bodies = container.querySelectorAll(".customBody");
      bodies.forEach((el, index) => {
        el.addEventListener("click", () => {
          const carIndex = carsAtSamePosition[index].index;
          setSelectedCar({
            carBattery: carResult[carIndex].carBattery,
            carCompany: carResult[carIndex].carCompany,
            carName: carResult[carIndex].carName,
            carNo: carResult[carIndex].carNo,
            carType: carResult[carIndex].carType,
            carYear: carResult[carIndex].carYear,
            categoryName: timeRentCarResult[carIndex].categoryName,
            enrollPlace: timeRentCarResult[carIndex].enrollPlace,
            garageNo: timeRentCarResult[carIndex].garageNo,
            postAdd: timeRentCarResult[carIndex].postAdd,
            rentCarNo: timeRentCarResult[carIndex].rentCarNo,
            rentCarPrice: timeRentCarResult[carIndex].rentCarPrice,
            status: timeRentCarResult[carIndex].status,
          });
          handleShow();
        });
      });

      const overlay = new window.kakao.maps.CustomOverlay({
        content: container,
        position: positions[i].latlng,
        map: null,
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
        map.setCenter(positions[i].latlng);
      });

      const closeBtn = container.querySelector(".close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          overlay.setMap(null);
        });
      }
    }
  }, [loaded, enrollPosition, carResult, timeRentCarResult, currentPosition]);

  return (
    <>
      <Map id="map" />

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
                        src={"images/아이오닉 5.png"} // 필요시 차량마다 다르게 처리도 가능
                        alt="차 이미지"
                        fluid
                        style={{
                          height: "300px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />

                      <Card.Body>
                        <Row className="text-center mb-3">
                          <Col>
                            <h4>{selectedCar?.carName || "차량명"}</h4>
                            <div className="text-muted">
                              {selectedCar?.carYear} / {selectedCar?.carCompany}
                            </div>
                          </Col>
                        </Row>

                        <hr />

                        <Row className="mb-3 px-3">
                          <Col>
                            <h6 className="fw-bold">요금 정보</h6>
                            <Row>
                              <Col>월 요금</Col>
                              <Col className="text-end">
                                {selectedCar?.rentCarPrice?.toLocaleString()}원
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
