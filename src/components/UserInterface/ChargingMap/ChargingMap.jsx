import React, { useEffect, useState } from "react";
import mappings from "./mappings.json";
import customMarkerSrc from "/images/2.png";

const KakaoMap = () => {
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { provinceMapping, detailedMapping } = mappings;

    // stat: 충전소 상태 매핑
    const statMapping = {
      1: "통신이상",
      2: "충전대기",
      3: "충전중",
      4: "운영중지",
      5: "점검중",
      9: "상태미확인",
    };

    // chgerType: 충전기 타입 매핑
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

    // Kakao 지도 API 스크립트 (services 라이브러리 포함: reverse geocoder용)
    const script = document.createElement("script");
    script.async = true;
    const kakaoServiceKey = "서비스 키 입력후 사용바람 총 2개 넣어야됨";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoServiceKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 기본 지도 설정 (서울시 중심)
        const mapContainer = document.getElementById("map");
        const defaultLatLng = new window.kakao.maps.LatLng(37.5665, 126.978);
        const mapOption = { center: defaultLatLng, level: 3 };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 커스텀 마커 이미지 생성 (마커 크기는 상황에 맞게 조절)
        const customImageSize = new window.kakao.maps.Size(30, 40);
        const customMarkerImage = new window.kakao.maps.MarkerImage(
          customMarkerSrc,
          customImageSize
        );

        // InfoWindow 객체 생성 (클릭 시 표시할 정보창, width 등 스타일을 조절)
        const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // EV 충전소 API 호출 함수
        // 기본 numOfRows 값은 9999, 위치 정보를 획득하지 못한 경우 numOfRows를 100으로 호출
        function fetchEVChargerInfo(
          apiZcode,
          userDetailedZscode,
          numOfRows = 9999
        ) {
          const serviceKey = "서비스 키 입력후 사용바람 총 2개 넣어야됨";
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
                  const statNode = item.getElementsByTagName("stat")[0]; // 충전소 상태
                  const outputNode = item.getElementsByTagName("output")[0]; // 충전 용량
                  const chgerTypeNode = item.getElementsByTagName("chgerType")[0]; // 충전기 타입
                  const noteNode = item.getElementsByTagName("note")[0]; // 주의 메시지
                  const limitYnNode = item.getElementsByTagName("limitYn")[0]; // 제한 여부 ("Y"/"N")
                  const zscodeNode = item.getElementsByTagName("zscode")[0]; // 상세 지역 코드

                  // limitYn이 "Y"면 해당 충전소는 표시하지 않음
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
                    const title = statNmNode
                      ? statNmNode.textContent
                      : "충전소";

                    // stat, output, chgerType, note 처리
                    const statValue = statNode ? statNode.textContent : "";
                    const statText = statMapping[statValue] || statValue;
                    const outputValue = outputNode
                      ? outputNode.textContent
                      : "";
                    const chgerTypeValue = chgerTypeNode
                      ? chgerTypeNode.textContent
                      : "";
                    const chgerTypeText =
                      chgerTypeMapping[chgerTypeValue] || chgerTypeValue;
                    const noteText = noteNode ? noteNode.textContent : "";

                    const markerPosition = new window.kakao.maps.LatLng(
                      lat,
                      lng
                    );
                    const marker = new window.kakao.maps.Marker({
                      map: map,
                      position: markerPosition,
                      title: title,
                      image: customMarkerImage,
                    });

                    // 마커 클릭 이벤트 등록
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

        // 사용자 위치 획득 및 reverse geocoding
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // 위치 정보 획득 성공 (numOfRows=9999)
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
              geocoder.coord2RegionCode(
                userLng,
                userLat,
                function (result, status) {
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
                    if (!provinceName)
                      provinceName = result[0].region_1depth_name;
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
                }
              );
            },
            (error) => {
              console.error("사용자 위치 확인 실패:", error);
              setNotice(
                "사용자 위치 비동의로 서울시 100개의 위치만 출력됩니다."
              );
              fetchEVChargerInfo("11", null, 100);
            }
          );
        } else {
          console.error("Geolocation 미지원");
          setNotice("사용자 위치 비동의로 서울시 100개의 위치만 출력됩니다.");
          fetchEVChargerInfo("11", null, 100);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          background: 'rgba(255, 253, 253, 0.51)',
          color: 'rgb(0, 0, 0)',
          width: '100%',
          height: '700px',
          zIndex: 1000,
          textAlign: 'center',
          lineHeight: '700px',
          fontSize: '64px'
        }}>
          로딩중...
        </div>
      )}
      <div id="map" style={{ width: '100%', height: '700px' }}></div>
      {notice && <div style={{ textAlign: "center", marginTop: "10px", color: "red" }}>{notice}</div>}
    </div>
  );
};

export default KakaoMap;
