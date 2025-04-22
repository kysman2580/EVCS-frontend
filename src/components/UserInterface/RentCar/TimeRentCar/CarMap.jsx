import { useEffect, useState } from "react";
import styled from "styled-components";
import "./CarMap.css";

const Map = styled.div`
  width: 800px;
  height: 500px;
  margin: 50px auto;
  border: 2px solid black;
  border-radius: 1em;

  // 달력 api 짤려서 추가 kkm
  position: relative;
  z-index: 1; /* 지도는 밑으로 */
`;

const CarMap = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.kakao.maps.load(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    console.log("KakaoMap");

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        console.log(lat, lon);
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(lat, lon),
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        // 커스텀 오버레이에 표시할 컨텐츠 입니다
        // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
        // 별도의 이벤트 메소드를 제공하지 않습니다

        const positions = [
          {
            content: `
        <div class="wrap">
          <div class="info">
            <div class="title">
              카카오 스페이스닷원
              <div class="close" onclick="closeOverlay()" title="닫기"></div>
            </div>
            <div class="wrapper">
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="43" height="40">
                </div>
                <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    `,
            latlng: new window.kakao.maps.LatLng(36.650879, 126.56994),
          },
        ];

        for (let i = 0; i < positions.length; i++) {
          // 지도에 마커를 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
          });
          // 마커 위에 커스텀오버레이를 표시합니다
          // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
          var overlay = new window.kakao.maps.CustomOverlay({
            content: positions[i].content,
            map: null,
            position: positions[i].latlng,
          });
        }

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        window.kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(map);
        });

        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
        window.closeOverlay = function () {
          overlay.setMap(null);
        };
      });
    }
  }, [loaded]);

  return (
    <>
      <Map id="map"></Map>;
    </>
  );
};

export default CarMap;
