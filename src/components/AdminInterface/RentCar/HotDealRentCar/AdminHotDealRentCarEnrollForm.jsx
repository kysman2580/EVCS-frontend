import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Modal,
  Image,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

import { useNavigate } from "react-router-dom";

const AdminHotDealRentCarEnrollForm = () => {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const navigate = useNavigate();
  // API 데이터
  const [rentCarInfo, setRentCarInfo] = useState([]);
  // 체크박스 상태
  const [selectedCars, setSelectedCars] = useState({});
  // 검색/필터 상태
  const [useStatus, setUseStatus] = useState("");
  const [carCategory, setCarCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hotdealName, setHotdealName] = useState("");
  // 핫딜 설정
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dealPercent, setDealPercent] = useState(0);

  // 모달용 state
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const nameRef = useRef();
  const dealPercentRef = useRef();

  // YYYY-MM-DD HH:mm 포맷 헬퍼 (로컬 타임존 기준)
  const formatLocalDateTime = (date) => {
    const y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return `${y}-${M}-${d}T${h}:${m}`;
  };

  const validateForm = () => {
    if (!hotdealName.trim()) {
      alert("핫딜 이름을 입력하세요.");
      nameRef.current.focus();
      return false;
    }
    if (!dealPercent && dealPercent == 0) {
      alert("할인율을 입력하세요.");
      dealPercentRef.current.focus();
      return false;
    }
    if (!startDate || !endDate) {
      alert("이벤트 날짜를 선택하세요.");
      return false;
    }
    if (startDate > endDate) {
      alert("이벤트 시작일은 마감일보다 빨라야 합니다.");
      return false;
    }
    return true;
  };

  // 1) 데이터 로드
  useEffect(() => {
    axios
      .get(`${ENV_URL}/admin-hotdeals/cars`, {
        params: {
          useStatus: useStatus,
          carCategory: carCategory,
          searchCategory: searchCategory,
          searchKeyword: searchKeyword,
        },
      })
      .then((res) => {
        console.log(res.data.rentCarList);
        setRentCarInfo(res.data.rentCarList);
      })
      .catch((err) => console.error(err));
  }, [useStatus, carCategory, dateFrom, dateTo]);

  // 2) 전체선택 토글
  const handleSelectAll = () => {
    const ids = rentCarInfo.map((r) => r.rentCarNo);
    const allSelected = ids.every((id) => selectedCars[id]);
    if (allSelected) {
      setSelectedCars((prev) => {
        const nxt = { ...prev };
        ids.forEach((id) => delete nxt[id]);
        return nxt;
      });
    } else {
      const all = {};
      ids.forEach((id) => (all[id] = true));
      setSelectedCars(all);
    }
  };

  // 3) 개별 체크박스 토글
  const toggleCar = (rentCarNo) =>
    setSelectedCars((prev) => ({
      ...prev,
      [rentCarNo]: !prev[rentCarNo],
    }));

  // 4) 검색 실행
  const handleSearch = () => {
    axios
      .get(`${ENV_URL}/admin-hotdeals/cars`, {
        params: {
          useStatus: useStatus,
          carCategory: carCategory,
          searchCategory: searchCategory,
          searchKeyword: searchKeyword,
        },
      })
      .then((res) => {
        console.log(res.data.rentCarList);
        setRentCarInfo(res.data.rentCarList);
      })
      .catch((err) => console.error(err));
  };

  // 7) 핫딜 등록
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // 검증 실패 시 종료
    }

    const payload = {
      hotdealName,
      startDate: formatLocalDateTime(startDate),
      endDate: formatLocalDateTime(endDate),
      dealPercent,
      carNos: Object.keys(selectedCars).filter((id) => selectedCars[id]),
    };

    axios
      .post(`${ENV_URL}/admin-hotdeals`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        alert("핫딜이 등록되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        const code = error.response?.data?.code;
        const msg = error.response?.data?.message;

        if (code === "HOTDEAL_OVERLAP") {
          alert(msg); // "중복된 차량이 있습니다"
        } else {
          console.error("등록 실패:", error);
          alert("등록 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <RentContainerDiv>
      <AdminRentCarNav />
      <RentBodyDiv>
        <Container fluid className="mt-4">
          {/* 검색/필터 영역 */}
          <Row className="mb-3 g-2 align-items-center">
            <Col md={1}>
              <Form.Select
                value={useStatus}
                onChange={(e) => setUseStatus(e.target.value)}
                size="sm"
              >
                <option value="">전체 상태</option>
                <option value="ing">진행중</option>
                <option value="noIng">마감</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Form.Select
                value={carCategory}
                onChange={(e) => setCarCategory(e.target.value)}
                size="sm"
              >
                <option value="">전체</option>
                <option value="timeRentCar">시간별렌트카</option>
                <option value="longRentCar">장기렌트카</option>
                <option value="subsRentCar">구독렌트카</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Form.Select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                size="sm"
              >
                <option value="">전체</option>
                <option value="allAddress">등록주소지</option>
                <option value="carType">차종</option>
                <option value="carCompany">제조사</option>
                <option value="carName">모델명</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="검색어"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // 폼 submit 방지
                    handleSearch(); // 검색 함수 호출
                  }
                }}
              />
            </Col>
            <Col md={1}>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSearch}
                className="w-100"
              >
                검색
              </Button>
            </Col>
          </Row>

          {/* 테이블 & 카드 영역 */}
          <Row>
            <Col md={8}>
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Table bordered hover size="sm" className="w-100">
                  <thead className="table-secondary text-center">
                    <tr>
                      <th style={{ width: 40 }}>
                        <Form.Check
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            rentCarInfo.length > 0 &&
                            rentCarInfo.every((r) => selectedCars[r.rentCarNo])
                          }
                        />
                      </th>
                      <th>카테고리</th>
                      <th>차 번호</th>
                      <th>모델명</th>
                      <th>차종</th>
                      <th>제조사</th>
                      <th>주소</th>
                      <th>우편번호</th>
                      <th>예약</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentCarInfo.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center text-muted">
                          조회된 차량이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      rentCarInfo.map((r) => (
                        <tr
                          key={r.rentCarNo}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedCar(r);
                            setShowModal(true);
                          }}
                        >
                          <td
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Form.Check
                              type="checkbox"
                              checked={!!selectedCars[r.rentCarNo]}
                              onChange={() => toggleCar(r.rentCarNo)}
                            />
                          </td>
                          <td>{r.categoryName}</td>
                          <td>{r.rentCarNo}</td>
                          <td>{r.carName}</td>
                          <td>{r.carTypeName}</td>
                          <td>{r.companyName}</td>
                          <td>{r.enrollPlace}</td>
                          <td>{r.postAdd}</td>
                          <td>{r.status}</td>
                          <td
                            className={
                              r.statusName === "사용중"
                                ? "text-success fw-bold"
                                : "text-danger fw-bold"
                            }
                          >
                            {r.statusName}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-4 fw-bold">핫딜 설정</h5>
                  {/* 할인율 */}
                  <Form.Group
                    controlId="hotdealDiscount"
                    className="mb-4 d-flex align-items-center"
                  >
                    <Form.Label className="fw-bold mb-0 me-2">
                      핫딜 이름 :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={hotdealName}
                      onChange={(e) => setHotdealName(e.target.value)}
                      className="w-75"
                      ref={nameRef}
                    />
                  </Form.Group>
                  <Form onSubmit={handleSubmit}>
                    {/* 시작일자 */}
                    <Form.Group controlId="hotdealStart" className="mb-3">
                      <Form.Label className="fw-bold mb-0 me-2">
                        시작일자 :
                      </Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </Form.Group>

                    {/* 종료일자 */}
                    <Form.Group controlId="hotdealEnd" className="mb-3">
                      <Form.Label className="fw-bold mb-0 me-2">
                        종료일자 :
                      </Form.Label>
                      <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </Form.Group>

                    {/* 할인율 */}
                    <Form.Group
                      controlId="hotdealDiscount"
                      className="mb-4 d-flex align-items-center"
                    >
                      <Form.Label className="fw-bold mb-0 me-2">
                        할인율 (%) :
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        max={100}
                        value={dealPercent}
                        onChange={(e) => setDealPercent(Number(e.target.value))}
                        className="w-25"
                        ref={dealPercentRef}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={() => navigate(-1)}>
                        취소
                      </Button>
                      <Button variant="dark" type="submit" className="px-4">
                        핫딜 등록
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* 상세 모달 */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>차량 상세 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCar && (
                <>
                  <div className="text-center mb-3">
                    <Image
                      src={selectedCar.fileLoad}
                      alt="차량 이미지"
                      fluid
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <Card>
                    <Card.Body>
                      <Row className="mb-2">
                        <Col>
                          <strong>모델명:</strong> {selectedCar.carName}
                        </Col>
                        <Col>
                          <strong>차 번호:</strong> {selectedCar.rentCarNo}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>제조사:</strong> {selectedCar.companyName}
                        </Col>
                        <Col>
                          <strong>차종:</strong> {selectedCar.carTypeName}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>연식:</strong> {selectedCar.carYear}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>카테고리:</strong> {selectedCar.categoryName}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>가격:</strong> {selectedCar.rentCarPrice}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>등록 주소:</strong> {selectedCar.enrollPlace}
                        </Col>
                        <Col>
                          <strong>우편번호:</strong> {selectedCar.postAdd}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>등록일:</strong> {selectedCar.enrollDate}
                        </Col>
                        <Col>
                          <strong>상태:</strong>{" "}
                          <span
                            className={
                              selectedCar.statusName === "사용중"
                                ? "text-success fw-bold"
                                : "text-danger fw-bold"
                            }
                          >
                            {selectedCar.statusName}
                          </span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </>
              )}
            </Modal.Body>
          </Modal>
        </Container>
      </RentBodyDiv>
    </RentContainerDiv>
  );
};

export default AdminHotDealRentCarEnrollForm;
