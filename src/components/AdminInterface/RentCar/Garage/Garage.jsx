import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
} from "react-bootstrap";
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import "./Garage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RentContainerDiv } from "../../../UserInterface/RentCar/RentCarCommon/RentCar.styles";

const Garage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [regionSido, setRegionSido] = useState("all");
  const [regionSigungu, setRegionSigungu] = useState("all");
  const [resigonDong, setResigonDong] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/garage-list", {
        params: { category, searchKeyword },
      })
      .then((res) => {
        setGarages(res.data.garageList);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // 예시 데이터
    const dummyGarages = Array.from({ length: 20 }, (_, i) => ({
      garageNo: i + 1,
      allAddress: `서울특별시 강남구 테헤란로 ${10 + i}길`,
      postcode: `060${10 + i}`,
      detailAddress: `빌딩 ${i + 1}층`,
      enrollDate: `2024-05-${String(i + 1).padStart(2, "0")}`,
    }));

    setGarages(dummyGarages);
  }, []);

  const handleSearch = () => {
    axios
      .get("http://localhost/garage-list", {
        params: { category, searchKeyword },
      })
      .then((res) => {
        setGarages(res.data.garageList);
      })
      .catch(console.error);
  };

  return (
    <RentContainerDiv style={{ marginTop: "30px" }}>
      <AdminRentCarNav />
      <Container className="flex-grow-1 mt-4">
        <Row className="mb-3">
          <Col md={2}>
            <Form.Select onChange={(e) => setRegionSido(e.target.value)}>
              <option value="all">전체</option>
              <option value="서울특별시">서울특별시</option>
              <option value="경기도">경기도</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select
              value={category}
              onChange={(e) => setRegionSigungu(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="detailAddress">상세 주소</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select
              value={category}
              onChange={(e) => setResigonDong(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="detailAddress">상세 주소</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="검색어 입력"
            />
          </Col>
          <Col md={1}>
            <Button
              className="w-100"
              variant="secondary"
              onClick={handleSearch}
            >
              검색
            </Button>
          </Col>
          <Col md={1}>
            <Button
              className="w-100"
              variant="dark"
              onClick={() => navigate("/admin/goGarageEnrollForm")}
            >
              등록
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Header className="bg-secondary text-white">
                차고지 목록
              </Card.Header>
              <Card.Body className="p-0">
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Table striped bordered hover className="text-center mb-0">
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>전체 주소</th>
                        <th>우편번호</th>
                        <th>상세 주소</th>
                        <th>등록일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {garages.length === 0 ? (
                        <tr>
                          <td colSpan="5">검색 결과가 없습니다.</td>
                        </tr>
                      ) : (
                        garages.map((garage) => (
                          <tr
                            key={garage.garageNo}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate("/admin/goGarageDetail", {
                                state: { garage },
                              })
                            }
                          >
                            <td>{garage.garageNo}</td>
                            <td>{garage.allAddress}</td>
                            <td>{garage.postcode}</td>
                            <td>{garage.detailAddress}</td>
                            <td>{garage.enrollDate}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </RentContainerDiv>
  );
};

export default Garage;
