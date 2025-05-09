import { useEffect, useState } from "react";
import styled from "styled-components";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./CarMap.css"; // 필요하면 유지
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { H1, H3, RentBodyDiv, RentContainerDiv } from "./CarMap.styles";
import { useNavigate, useLocation } from "react-router-dom";
import RentCarNav from "../../Common/Nav/RentCarNav";

const Map = styled.div`
  width: 1200px;
  height: 700px;
  margin: 50px auto;
  border: 2px solid black;
  border-radius: 1em;
  position: relative;
  z-index: 1;
`;

const CarMap = () => {
  const location = useLocation();
  const startDate = new Date(location.state.startDate);
  const endDate = new Date(location.state.endDate);
  const navi = useNavigate();
  const { auth } = useAuth();
  const [memberNo, setMemberNo] = useState(auth.user.memberNo);
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

  useEffect(() => {
    window.kakao.maps.load(() => {
      setLoaded(true);
    });
  }, []);

  console.log("startDate", startDate);
  console.log("endDate", endDate);
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
            <div class="header">
              <div style="display: flex; align-items: center; height: 15px;">
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width="16" height="16" style="margin-right: 8px;" />
                ${timeRentCarResult[carsAtSamePosition[0].index].address}
              </div>
              <div class="close" title="닫기"></div>
            </div>
            <div class="wrapper">
              ${carsAtSamePosition
                .map(
                  ({ index }) => `
                  <div class="customBody" >
                    <div style="display: flex; align-items: center;">
                      <div class="img">
                        <img src="${
                          timeRentCarResult[index].fileLoad
                        }" width="60" height="40" style="object-fit: cover;" />
                      </div>
                      <div class="desc" style="margin-left: 10px;">
                        <div class="carTitle">${carResult[index].carName}</div>
                        <div style="color: #666; font-size: 12px;">
                          ${timeRentCarResult[
                            index
                          ].rentCarPrice.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                    <div class="arrow" style="font-size: 20px; color: #188ceb;">›</div>
                  </div>`
                )
                .join("")}
            </div>
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
            fileLoad: timeRentCarResult[carIndex].fileLoad,
            enrollPlace: timeRentCarResult[carIndex].enrollPlace,
            garageNo: timeRentCarResult[carIndex].garageNo,
            address: timeRentCarResult[carIndex].address,
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

  const handlePayment = () => {
    // 결제 로직을 여기에 추가합니다.
    // 예를 들어, 결제 API를 호출하거나 결제 모달을 띄우는 등의 작업을 수행할 수 있습니다.
    console.log("결제하기 버튼 클릭됨");

    axios
      .post("http://localhost/reservation/insert", {
        memberNo: memberNo,
        rentCarNo: selectedCar.rentCarNo,
        categoryName: selectedCar.categoryName,
        enrollPlace: selectedCar.enrollPlace,
        garageNo: selectedCar.garageNo,
        rentCarPrice: selectedCar.rentCarPrice,
        rentalTime: startDate,
        returnTime: endDate,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error message :", error.response.data.message);
        alert(error.response.data.message);
      });
  };
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <H1>시간별 렌트카 대여하기</H1>

          <br />
          <br />

          <H3>대여위치 및 차량 설정</H3>
          <Map id="map" />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="primary"
              onClick={() => navi(-1)}
              style={{ marginTop: "10px", marginRight: "350px" }}
            >
              이전으로
            </Button>
          </div>
        </RentBodyDiv>
      </RentContainerDiv>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>예약 및 결제하기</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            {/* 차량 기본 정보 */}
            <Row className="mb-4">
              <Col xs={12} className="d-flex align-items-center">
                <Image
                  src={selectedCar?.fileLoad}
                  alt="차 이미지"
                  width={100}
                  height={60}
                  style={{
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>
                    [{selectedCar?.categoryName}] {selectedCar?.carName}
                  </strong>
                  <div style={{ fontSize: "13px", color: "#777" }}>
                    {selectedCar?.carType}
                  </div>
                </div>
              </Col>
            </Row>

            {/* 차량 세부 정보 */}
            <Row className="mb-3">
              <Col>
                <h6>차량 정보</h6>
                <ul style={{ paddingLeft: "1.2em", fontSize: "14px" }}>
                  <li>차량 연식: {selectedCar?.carYear}</li>
                  <li>제조사: {selectedCar?.carCompany}</li>
                  <li>차량 번호: {selectedCar?.carNo}</li>
                  <li>배터리: {selectedCar?.carBattery ?? "정보 없음"}</li>
                </ul>
              </Col>
            </Row>
            {/* 대여 위치 */}
            <Row className="mb-2">
              <Col>
                <h6 className="mb-1">대여 및 반납 장소</h6>
                <div style={{ fontWeight: "bold" }}>
                  {selectedCar?.enrollPlace}
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  {selectedCar?.address}
                </div>
              </Col>
            </Row>

            {/* 이용 시간 (props에서 받아야 함) */}
            <Row className="mb-3">
              <Col>
                <h6>이용 시간</h6>
                <div>
                  {Math.round((endDate - startDate) / (1000 * 60 * 60))}
                </div>
                <div>
                  {startDate.toLocaleString()} ~ {endDate.toLocaleString()}
                </div>{" "}
                {/* 실제 props로 대체 */}
              </Col>
            </Row>

            {/* 요금 정보 */}
            <Row className="mb-3">
              <Col>
                <h6>요금 합계</h6>
                <Row>
                  <Col>대여요금</Col>
                  <Col className="text-end">
                    {selectedCar?.rentCarPrice?.toLocaleString()}원
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* 주행 요금 안내 */}
            <Row className="mb-4">
              <Col>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  주행요금은 반납 후 결제 수단으로 자동 결제됩니다.
                </div>
              </Col>
            </Row>

            {/* 결제 버튼 */}
            <Row>
              <Col>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handlePayment}
                >
                  결제하기
                </Button>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CarMap;
