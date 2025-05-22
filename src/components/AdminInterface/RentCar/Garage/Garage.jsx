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
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const navigate = useNavigate();
  const [regionSido, setRegionSido] = useState("");
  const [regionSigungu, setRegionSigungu] = useState("");
  const [regionDong, setRegionDong] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [garages, setGarages] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [status, setStatus] = useState("");

  // 중복 제거 함수
  const getUniqueList = (arr, key) => {
    const seen = new Set();
    return arr.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  };

  const filteredSigungu = regionList.filter(
    (item) => item.regionSido === regionSido
  );
  const filteredDong = filteredSigungu.filter(
    (item) => item.regionSigungu === regionSigungu
  );

  const sidoOptions = getUniqueList(regionList, "regionSido");
  const sigunguOptions = getUniqueList(filteredSigungu, "regionSigungu");
  const dongOptions = getUniqueList(filteredDong, "regionDong");

  useEffect(() => {
    axios
      .get(`${ENV_URL}/admin-garages`, {
        params: {
          regionSido,
          regionSigungu,
          regionDong,
          searchKeyword,
          status,
          searchCategory,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGarages(res.data.garageList || []);
        setRegionList(res.data.regionList || []);
      })
      .catch(console.error);
  }, [regionSido, regionSigungu, regionDong, status, searchCategory]);

  const handleSearch = () => {
    axios
      .get(`${ENV_URL}/admin-garages`, {
        params: {
          regionSido,
          regionSigungu,
          regionDong,
          searchKeyword,
          status,
          searchCategory,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGarages(res.data.garageList || []);
        setRegionList(res.data.regionList || []);
      })
      .catch(console.error);
  };

  return (
    <RentContainerDiv style={{ marginTop: "30px" }}>
      <AdminRentCarNav />
      <Container className="flex-grow-1 mt-4">
        <Row className="mb-3">
          <Col md={1} style={{ width: "120px" }}>
            <Form.Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setSearchKeyword(""); // 선택 시 검색어 초기화
              }}
            >
              <option value="">전체</option>
              <option value="ing">사용중</option>
              <option value="noIng">사용중지</option>
            </Form.Select>
          </Col>
          <Col md={1}>
            <Form.Select
              value={regionSido}
              onChange={(e) => {
                setRegionSido(e.target.value);
                setRegionSigungu("");
                setRegionDong("");
                setSearchKeyword("");
              }}
            >
              <option value="">시/도 선택</option>
              {sidoOptions.map((item) => (
                <option key={item.regionSido} value={item.regionSido}>
                  {item.regionSido}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={1} style={{ width: "150px" }}>
            <Form.Select
              value={regionSigungu}
              onChange={(e) => {
                setRegionSigungu(e.target.value);
                setRegionDong("");
                setSearchKeyword("");
              }}
              disabled={!regionSido}
            >
              <option value="">시군구 선택</option>
              {sigunguOptions.map((item) => (
                <option key={item.regionSigungu} value={item.regionSigungu}>
                  {item.regionSigungu}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={1} style={{ width: "150px" }}>
            <Form.Select
              value={regionDong}
              onChange={(e) => {
                setRegionDong(e.target.value);
                setSearchKeyword("");
              }}
              disabled={!regionSigungu}
            >
              <option value="">동 선택</option>
              {dongOptions.map((item) => (
                <option key={item.regionDong} value={item.regionDong}>
                  {item.regionDong}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={1} style={{ width: "200px" }}>
            <Form.Select
              value={searchCategory}
              onChange={(e) => {
                setSearchCategory(e.target.value);
                setSearchKeyword("");
              }}
            >
              <option value="">전체</option>
              <option value="searchPostAdd">우편번호</option>
              <option value="searchAdd">주소</option>
            </Form.Select>
          </Col>
          <Col md={2}>
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
                <div style={{ maxHeight: "800px", overflowY: "auto" }}>
                  <Table striped bordered hover className="text-center mb-0">
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>전체 주소</th>
                        <th>우편번호</th>
                        <th>상세 주소</th>
                        <th>등록일</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(garages) && garages.length === 0 ? (
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
                            <td>{garage.postAdd}</td>
                            <td>{garage.address}</td>
                            <td>{garage.enrollDate}</td>
                            <td
                              className={
                                garage.statusName === "사용중"
                                  ? "text-success fw-bold"
                                  : garage.statusName === "사용중지"
                                  ? "text-danger fw-bold"
                                  : ""
                              }
                            >
                              {garage.statusName}
                            </td>
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
