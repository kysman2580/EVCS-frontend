import RentCarNav from "../../Common/Nav/RentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
  RentCarListDiv,
  RentCarBtnDiv,
  RentMoreButton,
} from "../RentCarCommon/RentCar.styles";
import RentCarCard from "../RentCarCommon/RentCarCard";
import {
  FilterBar,
  Dropdown,
  TextInput,
  Button,
  ToggleButton,
} from "./LongTermRentCar.styles";

import { useState, useEffect, useMemo } from "react";

import axios from "axios";

const BATCH = 10;

const LongTermRentCar = () => {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const [rentCars, setRentCars] = useState([]); // 백엔드에서 받아온 전체 리스트
  const [visibleCount, setVisibleCount] = useState(10); // 한 번에 보여줄 개수

  // 필터 상태
  const [onlyHotdeal, setOnlyHotdeal] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [inputText, setInputText] = useState(""); // 텍스트박스에 입력 중인 값
  const [searchText, setSearchText] = useState(""); // 버튼 누른 후 적용할 검색어

  useEffect(() => {
    axios
      .get(`${ENV_URL}/user-rentcars/category/2`)
      .then((res) => {
        console.log(res.data);
        setRentCars(res.data);
      })
      .catch(console.error);
  }, []);

  // 필터링 로직
  const filtered = useMemo(() => {
    return rentCars.filter((car) => {
      if (onlyHotdeal && car.ingHotdeal !== "1") return false;

      if (
        filterType === "category" &&
        searchText.trim() !== "" &&
        !car.carTypeName.includes(searchText)
      )
        return false;

      if (
        filterType === "model" &&
        searchText.trim() !== "" &&
        !car.carName.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;

      if (
        filterType === "region" &&
        searchText.trim() !== "" &&
        !car.regionSido.includes(searchText)
      )
        return false;

      if (
        filterType === "company" &&
        searchText.trim() !== "" &&
        !car.companyName.includes(searchText)
      )
        return false;

      return true;
    });
  }, [rentCars, onlyHotdeal, filterType, searchText]);

  // 3) 화면에 보일 목록
  const visibleCars = filtered.slice(0, visibleCount);

  // 4) 더 보기 버튼 핸들러
  const handleLoadMore = () => {
    setVisibleCount((v) => Math.min(v + BATCH, filtered.length));
  };

  const handleSearch = () => {
    // 검색 시 보이는 개수를 다시 초기화
    setSearchText(inputText);
    setVisibleCount(10000000);
  };

  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <FilterBar>
            <ToggleButton
              active={onlyHotdeal}
              onClick={() => setOnlyHotdeal((prev) => !prev)}
            >
              🔥 핫딜만
            </ToggleButton>
            <Dropdown
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setInputText("");
                setSearchText("");
              }}
            >
              <option value="">필터 선택</option>
              <option value="category">차종</option>
              <option value="model">모델명</option>
              <option value="region">지역</option>
              <option value="company">제조사</option>
            </Dropdown>

            <TextInput
              type="text"
              placeholder="검색어 입력"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // 폼 submit 방지
                  setSearchText(inputText);
                  handleSearch(); // 검색 함수 호출
                }
              }}
            />

            <Button
              onClick={() => {
                handleSearch(inputText);
              }}
            >
              검색
            </Button>
          </FilterBar>

          <RentCarListDiv>
            {visibleCars.map((car) => (
              <RentCarCard key={car.rentCarNo} car={car} />
            ))}
          </RentCarListDiv>
          {visibleCount < filtered.length && (
            <RentCarBtnDiv>
              <RentMoreButton onClick={handleLoadMore}>더 보기</RentMoreButton>
            </RentCarBtnDiv>
          )}
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};

export default LongTermRentCar;
