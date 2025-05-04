import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

const RentCarManagement = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [totalPages, setTotalPages] = useState();
  const [startPage, setStartPage] = useState(1);
  const [carInfo, setCarInfo] = useState([]);
  const [rentCarInfo, setRentCarInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost/rentCar/${currentPage}`)
      .then((result) => {
        console.log(result.data);
        const res = result.data;

        setRentCarInfo(res.rentCarInfo);
        setStartPage(res.pageInfo.startPage);
        setPageSize(res.pageInfo.pageSize);
        setTotalPages(res.pageInfo.totalPages);

        const carList = res.carInfo.map((carinformation) => ({
          carNo: carinformation.carNo,
          carName: carinformation.carName,
          carType: carinformation.carType,
          carYear: carinformation.carYear,
          carCompany: carinformation.carCompany,
        }));

        setCarInfo(carList);

        const rentCarList = res.rentCarInfo.map((rentCarinformation) => ({
          rentCarNo: rentCarinformation.rentCarNo,
          categoryName: rentCarinformation.categoryName,
          carNo: rentCarinformation.carNo,
          rentCarPrice: rentCarinformation.rentCarPrice,
          enrollPlace: rentCarinformation.enrollPlace,
          enrollDate: rentCarinformation.enrollDate,
          status: rentCarinformation.status,
        }));

        setRentCarInfo(rentCarList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    // 여기서 검색 기능 추가할 수 있음
    alert(
      `검색어: ${searchKeyword}, 제조사: ${manufacturer}, 카테고리: ${category}`
    );
  };

  const Previous = () => {
    if (startPage > 5) {
      setStartPage(startPage - pageSize);
      setCurrentPage(startPage - pageSize);
    }
  };

  const Next = () => {
    if (startPage + 5 <= totalPages) {
      setStartPage(startPage + 5);
      setPage(startPage + 5);
    }
  };
  const pageNumbers = [];
  for (let i = 0; i < pageSize; i++) {
    if (startPage + i <= totalPages) {
      pageNumbers.push(startPage + i);
    }
  }

  console.log("rentCarList :", rentCarInfo);
  console.log("carInfo :", carInfo);

  return (
    <>
      <RentContainerDiv>
        <AdminRentCarNav />
        <div style={{ width: "100%" }}>
          <RentBodyDiv>
            <Container
              className="mt-2 "
              style={{
                minHeight: "600px", // 이거 핵심!! 페이지 전체 높이 확보
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              {/* 상단 필터 영역 */}
              <Row className="mb-3">
                <Col md={2}>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">카테고리</option>
                    <option value="SUV">SUV</option>
                    <option value="세단">세단</option>
                    <option value="전기차">전기차</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Select
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  >
                    <option value="">차/제조사 검색</option>
                    <option value="현대">현대</option>
                    <option value="기아">기아</option>
                    <option value="테슬라">테슬라</option>
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="검색 내용"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Button variant="secondary" onClick={handleSearch}>
                    검색
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    variant="dark"
                    onClick={() => navigate("/admin/insertRentCar")} // 등록 페이지로 이동
                  >
                    등록하기
                  </Button>
                </Col>
              </Row>

              {/* 차량 리스트 테이블 */}
              <Table bordered hover responsive>
                <thead className="table-secondary">
                  <tr>
                    <th>카테고리</th>
                    <th>차 번호</th>
                    <th>모델명</th>
                    <th>차종</th>
                    <th>제조사</th>
                    <th>연식</th>
                    <th>등록 주소지</th>
                    <th>가격</th>
                    <th>예약 여부</th>
                    <th>등록일자</th>
                  </tr>
                </thead>
                <tbody>
                  {rentCarInfo.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        등록된 차량이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    rentCarInfo.map((car, index) => (
                      <tr
                        key={index}
                        onClick={() =>
                          navigate("/admin/rentCarDetails", {
                            state: {
                              carNo: carInfo[index].carNo,
                              carName: carInfo[index].carName,
                              carCompany: carInfo[index].carCompany,
                              carType: carInfo[index].carType,
                              carYear: carInfo[index].carYear,
                              categoryName: car.categoryName,
                              rentCarNo: car.rentCarNo,
                              rentCarPrice: car.rentCarPrice,
                              enrollPlace: car.enrollPlace,
                              status: car.status,
                            },
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>{car.categoryName}</td>
                        <td>{car.rentCarNo}</td>
                        <td>{carInfo[index].carName}</td>
                        <td>{carInfo[index].carType}</td>
                        <td>{carInfo[index].carCompany}</td>
                        <td>{carInfo[index].carYear}</td>
                        <td>{car.enrollPlace}</td>
                        <td>{car.rentCarPrice}</td>
                        <td>{car.status}</td>
                        <td>{car.enrollDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Container>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button onClick={Previous}>이전</button>

              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  style={{
                    margin: "0 5px",
                    fontWeight: currentPage === num ? "bold" : "normal",
                  }}
                >
                  {num}
                </button>
              ))}

              <button onClick={Next}>다음</button>
            </div>
          </RentBodyDiv>
        </div>
      </RentContainerDiv>
    </>
  );
};

export default RentCarManagement;
