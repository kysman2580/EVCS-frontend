import { useEffect, useRef, useState } from "react";
import { SelectRoute, ResetRoute, ShowRoute } from "./DriveRouteMap.styles";
import axios from "axios";

function DriveRouteMap({ mapUrl }) {
  const mapRef = useRef();
  const markerArrRef = useRef([]);
  const polylineArrRef = useRef([]);
  const [positions, setPositions] = useState([]);
  var resultInfoArr = [];

  useEffect(() => {
    if (mapRef.current) return; // => 지도가 생성되었으면 안만듦.....

    const map = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(37.5652045, 126.98702028),
      width: "100%",
      height: "600px",
      zoom: 17,
      zoomControl: true,
      scrollwheel: true,
    });

    mapRef.current = map;

    map.addListener("click", (e) => {
      const lat = e.latLng._lat;
      const lng = e.latLng._lng;

      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(lat, lng),
        map: mapRef.current,
      });
      markerArrRef.current.push(marker);

      axios
        .get(
          "https://apis.openapi.sk.com/tmap/geo/coordconvert?version=1&format=json",
          {
            headers: {
              appKey: "j9dvm8U8CF6BqckQanXn090Mb30d9b4b8aeOXvaO",
            },
            params: {
              lat: lat,
              lon: lng,
            },
          }
        )
        .then((result) => {
          const position = result.data.coordinate;
          console.log(position);
          setPositions((prev) => [
            ...prev,
            { lat: position.lat, lon: position.lon },
          ]);
        })
        .catch((error) => {
          console.error("좌표 변환 실패:", error);
        });
    });
  }, []);

  console.log(positions);
  if (positions.length > 0) {
    console.log(positions[0].lat, positions[0].lon);
    console.log(
      positions[positions.length - 1].lat,
      positions[positions.length - 1].lon
    );
  }

  const passList = [];

  const handleRouteSearch = () => {
    if (positions.length < 2) {
      alert("출발지와 도착지를 포함해 최소 2개의 위치를 선택해주세요.");
      return;
    }

    const viaPoints = positions
      .slice(1, positions.length - 1)
      .map((position, index) => {
        passList.push(`${position.lon},${position.lat}`);
        return {
          viaPointId: `via${index + 1}`,
          viaPointName: `경유지${index + 1}`,
          viaX: position.lon.toString(),
          viaY: position.lat.toString(),
        };
      });

    const body = {
      startName: "출발지",
      startX: positions[0].lon.toString(),
      startY: positions[0].lat.toString(),
      startTime: "201708081103",
      endName: "도착지",
      endX: `${positions[positions.length - 1].lon}`,
      endY: positions[positions.length - 1].lat.toString(),
      viaPoints: viaPoints,
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      searchOption: "2",
    };

    axios
      .post(
        "https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json",
        JSON.stringify(body),
        {
          headers: {
            appKey: "j9dvm8U8CF6BqckQanXn090Mb30d9b4b8aeOXvaO",
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log("경로 탐색 성공:", result.data);
        let resultFeatures = result.data.features;

        if (resultInfoArr.length > 0) {
          for (let i in resultInfoArr) {
            resultInfoArr[i].setMap(null);
          }
          resultInfoArr = [];
        }

        for (let i in resultFeatures) {
          var geometry = resultFeatures[i].geometry;

          let drawInfoArr = [];

          if (geometry.type == "LineString") {
            for (var j in geometry.coordinates) {
              // 경로들의 결과값(구간)들을 포인트 객체로 변환
              var latlng = new Tmapv2.Point(
                geometry.coordinates[j][0],
                geometry.coordinates[j][1]
              );
              // 포인트 객체를 받아 좌표값으로 변환
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
              // 포인트객체의 정보로 좌표값 변환 객체로 저장
              var convertChange = new Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );

              drawInfoArr.push(convertChange);
            }

            const polyline_ = new Tmapv2.Polyline({
              path: drawInfoArr,
              strokeColor: "#FF0000",
              strokeWeight: 6,
              map: mapRef.current,
            });
            polylineArrRef.current.push(polyline_);
          }
        }
      })
      .catch((error) => {
        console.error("경로 탐색 실패:", error);
      });
  };

  const handleReset = () => {
    // 마커 삭제
    markerArrRef.current.forEach((marker) => marker.setMap(null));
    markerArrRef.current = [];

    // 경로 선 삭제
    polylineArrRef.current.forEach((line) => line.setMap(null));
    polylineArrRef.current = [];

    // 위치 초기화
    setPositions([]);
  };

  const handleSaveImage = () => {
    const passListStr = passList.join("_");

    console.log(passListStr);

    const url =
      `https://apis.openapi.sk.com/tmap/routeStaticMap?appKey=j9dvm8U8CF6BqckQanXn090Mb30d9b4b8aeOXvaO` +
      `&startX=${positions[0].lon}&startY=${positions[0].lat}` +
      `&endX=${positions[positions.length - 1].lon}&endY=${
        positions[positions.length - 1].lat
      }` +
      `&passList=${passListStr}` +
      `&lineColor=0,0,255&width=1000&height=700&reqCoordType=WGS84GEO`;

    console.log(url);
    mapUrl(url);
  };

  return (
    <div>
      <div id="map_div" style={{ width: "90%", height: "600px" }}></div>

      <SelectRoute onClick={handleRouteSearch} style={{ marginTop: "10px" }}>
        경로표시
      </SelectRoute>
      <ResetRoute onClick={handleReset}>초기화</ResetRoute>
      <ShowRoute onClick={handleSaveImage}>선택하기</ShowRoute>
    </div>
  );
}

export default DriveRouteMap;
