import React, { useEffect, useState } from "react";
import mappings from "./mappings.json";
import customMarkerSrc from "/images/chargingRent.png";
import {
  LoadingMaps,
  GuideBook,
  OptionsBar,
  BodyMaps,
  Maps,
} from "./ChargingMap.styles";

const KakaoMap = () => {
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!window.kakao) {
      console.error("Kakao Maps API 스크립트가 로드되지 않았습니다.");
      return;
    }

    window.kakao.maps.load(() => {
      const { provinceMapping, detailedMapping } = mappings;

      // 충전소 상태 매핑 객체
      const statMapping = {
        1: "통신이상",
        2: "충전대기",
        3: "충전중",
        4: "운영중지",
        5: "점검중",
        9: "상태미확인",
      };

      // 충전기 타입 매핑 객체
      const chgerTypeMapping = {
        "01": "DC차데모",
        "02": "AC완속",
        "03": "DC차데모+AC3상",
        "04": "DC콤보",
        "05": "DC차데모+DC콤보",
        "06": "DC차데모+AC3상+DC콤보",
        "07": "AC3상",
        "08": "DC콤보(완속)",
        "09": "NACS",
        10: "DC콤보+NACS",
      };

      // 지도 생성 (서울 중심)
      const mapContainer = document.getElementById("map");
      const defaultLatLng = new window.kakao.maps.LatLng(37.5665, 126.978);
      const mapOption = { center: defaultLatLng, level: 3 };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 커스텀 마커 이미지 생성
      const customImageSize = new window.kakao.maps.Size(30, 40);
      const customMarkerImage = new window.kakao.maps.MarkerImage(
        customMarkerSrc,
        customImageSize
      );

      // 정보창 객체 생성
      const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // EV 충전소 API 호출 함수
      function fetchEVChargerInfo(
        apiZcode,
        userDetailedZscode,
        numOfRows = 9999
      ) {
        const serviceKey =
          "wKLfGPEstHWDqHLmnXYntGh%2Fkio03KXj99NNors5Ndb9n0Z%2B0%2BdISJFbjny5ex1wjBFyS7sOY%2BP1xzkrbhJbPA%3D%3D";
        const apiUrl = `https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=${serviceKey}&pageNo=1&numOfRows=${numOfRows}&zcode=${apiZcode}`;

        fetch(apiUrl)
          .then((response) => response.text())
          .then((xmlText) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            const items = xmlDoc.getElementsByTagName("item");

            if (items.length > 0) {
              for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const latNode = item.getElementsByTagName("lat")[0];
                const lngNode = item.getElementsByTagName("lng")[0];
                const statNmNode = item.getElementsByTagName("statNm")[0];
                const statNode = item.getElementsByTagName("stat")[0];
                const outputNode = item.getElementsByTagName("output")[0];
                const chgerTypeNode = item.getElementsByTagName("chgerType")[0];
                const noteNode = item.getElementsByTagName("note")[0];
                const limitYnNode = item.getElementsByTagName("limitYn")[0];
                const zscodeNode = item.getElementsByTagName("zscode")[0];

                // 제한 충전소는 건너뜁니다.
                if (limitYnNode && limitYnNode.textContent === "Y") continue;

                if (latNode && lngNode && zscodeNode) {
                  const stationZscode = zscodeNode.textContent;
                  if (
                    userDetailedZscode &&
                    stationZscode !== userDetailedZscode
                  )
                    continue;

                  const lat = parseFloat(latNode.textContent);
                  const lng = parseFloat(lngNode.textContent);
                  const title = statNmNode ? statNmNode.textContent : "충전소";

                  const statValue = statNode ? statNode.textContent : "";
                  const statText = statMapping[statValue] || statValue;
                  const outputValue = outputNode ? outputNode.textContent : "";
                  const chgerTypeValue = chgerTypeNode
                    ? chgerTypeNode.textContent
                    : "";
                  const chgerTypeText =
                    chgerTypeMapping[chgerTypeValue] || chgerTypeValue;
                  const noteText = noteNode ? noteNode.textContent : "";

                  const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                  const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: markerPosition,
                    title: title,
                    image: customMarkerImage,
                  });

                  // 마커 클릭 시 정보창 표시
                  window.kakao.maps.event.addListener(
                    marker,
                    "click",
                    function () {
                      const content = `
                      <div style="padding:5px; width:250px;">
                        <strong>${title}</strong><br/>
                        상태: ${statText}<br/>
                        충전 용량: ${outputValue}<br/>
                        충전기 타입: ${chgerTypeText}<br/>
                        ${noteText ? `<br/>주의사항: ${noteText}` : ""}
                      </div>
                    `;
                      infoWindow.setContent(content);
                      infoWindow.open(map, marker);
                    }
                  );
                }
              }
            } else {
              console.error("충전소 데이터를 가져오지 못했습니다.", xmlText);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error("API 호출 에러:", err);
            setLoading(false);
          });
      }

      // 사용자 위치 획득 및 역지오코딩 처리
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userLatLng = new window.kakao.maps.LatLng(userLat, userLng);
            map.setCenter(userLatLng);
            new window.kakao.maps.Marker({
              map: map,
              position: userLatLng,
              title: "현재 위치",
            });

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(userLng, userLat, (result, status) => {
              if (
                status === window.kakao.maps.services.Status.OK &&
                result.length > 0
              ) {
                let provinceName = "";
                let districtName = "";
                for (let i = 0; i < result.length; i++) {
                  if (result[i].region_type === "H") {
                    provinceName = result[i].region_1depth_name;
                    districtName = result[i].region_2depth_name;
                    break;
                  }
                }
                if (!provinceName) provinceName = result[0].region_1depth_name;
                console.log(
                  "provinceName:",
                  provinceName,
                  "districtName:",
                  districtName
                );

                const apiZcode = provinceMapping[provinceName] || "11";
                const provinceDetail = detailedMapping[provinceName];
                const userDetailedZscode = provinceDetail
                  ? provinceDetail[districtName]
                  : null;
                console.log(
                  "API zcode:",
                  apiZcode,
                  "User detailed zscode:",
                  userDetailedZscode
                );

                fetchEVChargerInfo(apiZcode, userDetailedZscode);
              } else {
                console.error("Reverse geocoding 실패");
                fetchEVChargerInfo("11", null);
              }
            });
          },
          (error) => {
            console.error("사용자 위치 확인 실패:", error);
            setNotice("사용자 위치 비동의로 서울시 100개의 위치만 출력됩니다.");
            fetchEVChargerInfo("11", null, 100);
          }
        );
      } else {
        console.error("Geolocation 미지원");
        setNotice("사용자 위치 비동의로 서울시 100개의 위치만 출력됩니다.");
        fetchEVChargerInfo("11", null, 100);
      }
    });
  }, []);

  return (
    <BodyMaps>
      {loading && <LoadingMaps>로딩중...</LoadingMaps>}
      <OptionsBar>옵션 들어갈 예정입니다.</OptionsBar>
      <Maps id="map"></Maps>
      {notice && <GuideBook>{notice}</GuideBook>}
    </BodyMaps>
  );
};

export default KakaoMap;
