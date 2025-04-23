import { useEffect, useState } from "react";
import styled from "styled-components";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./CarMap.css"; // 필요하면 유지
import "bootstrap/dist/css/bootstrap.min.css";

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
        styled={{ width: "00px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>차량 상세 정보</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          차량 정보를 여기에 넣으세요.
          <br />
          예: 차량 이름, 연식, 제조사 등등...
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CarMap;
