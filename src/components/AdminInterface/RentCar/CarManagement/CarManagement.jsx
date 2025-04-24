import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

const CarManagement = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 예시용 차량 리스트
  const carList = [
    {
      id: 1,
      number: "48너4373",
      name: "쏘렌토",
      category: "SUV",
      year: "2021",
      company: "KIA",
      battery: "210",
      enrollDate: "22",
    },
    {
      id: 2,
      number: "42양4373",
      name: "소나타",
      category: "세단",
      year: "2023",
      company: "HYUNDAI",
      battery: "210",
      enrollDate: "22",
    },
  ];

  const handleSearch = () => {
    // 여기서 검색 기능 추가할 수 있음
    alert(
      `검색어: ${searchKeyword}, 제조사: ${manufacturer}, 카테고리: ${category}`
    );
  };

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
                    onClick={() => navigate("/admin/insertCar")} // 등록 페이지로 이동
                  >
                    등록하기
                  </Button>
                </Col>
              </Row>

              {/* 차량 리스트 테이블 */}
              <Table bordered hover responsive>
                <thead className="table-secondary">
                  <tr>
                    <th>차량번호</th>
                    <th>모델명</th>
                    <th>카테고리</th>
                    <th>연식</th>
                    <th>제조사</th>
                    <th>배터리 용량</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {carList.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        등록된 차량이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    carList.map((car) => (
                      <tr
                        key={car.id}
                        onClick={() =>
                          navigate("/admin/carDetails", {
                            state: { car }, // ← 여기서 객체 넘기기
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>{car.number}</td>
                        <td>{car.name}</td>
                        <td>{car.category}</td>
                        <td>{car.year}</td>
                        <td>{car.company}</td>
                        <td>{car.battery}</td>
                        <td>{car.enrollDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Container>
            {/* 페이징 처리 (간단히만 보여줌) */}
            <div className="text-center mt-4">페이징 처리</div>
          </RentBodyDiv>
        </div>
      </RentContainerDiv>
    </>
  );
};

export default CarManagement;
