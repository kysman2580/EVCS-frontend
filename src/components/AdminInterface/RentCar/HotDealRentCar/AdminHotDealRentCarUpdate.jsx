import React, { useState, useEffect, useMemo } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

const AdminHotDealRentCarUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotdeal } = location.state || {};

  // 핫딜 초기값 세팅용 state
  const [hotdealName, setHotdealName] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // API 데이터
  const [rentCarInfo, setRentCarInfo] = useState([]);
  const [carInfo, setCarInfo] = useState([]);
  // 체크박스 상태
  const [selectedCars, setSelectedCars] = useState({});
  // 검색/필터 상태
  const [filterStatus, setFilterStatus] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [criteria, setCriteria] = useState({
    status: "",
    category: "",
    from: null,
    to: null,
    keyword: "",
  });

  // 모달용 state
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    if (hotdeal) {
      setHotdealName(hotdeal.hotdealName);
      setDiscountRate(parseInt(hotdeal.discountRate, 10) || 0);

      // "YYYY.MM.DD HH:mm ~ YYYY.MM.DD[.HH:mm]" 파싱
      const [startStr, endStr] = hotdeal.hotdealPeriod
        .split("~")
        .map((s) => s.trim());

      // normalize 함수 전체 교체
      const normalize = (str) => {
        // 끝에 .HH:mm 패턴을 " HH:mm" 으로 변경
        const withSpace = str.replace(/\.(\d{2}:\d{2})$/, " $1");
        // 날짜 구분점(.)을 하이픈(-)으로 변경
        return withSpace.replace(/\./g, "-");
      };

      setStartDate(new Date(normalize(startStr)));
      setEndDate(new Date(normalize(endStr)));
    }
  }, [hotdeal]);
  // 1) 데이터 로드
  useEffect(() => {
    axios
      .get("http://localhost/rentCar/1", {
        params: { useStatus: "", category: "", searchKeyword: "" },
      })
      .then((res) => {
        const data = res.data;
        setRentCarInfo(
          data.rentCarInfo.map((r) => ({
            rentCarNo: r.rentCarNo,
            categoryName: r.categoryName,
            carNo: r.carNo,
            rentCarPrice: r.rentCarPrice,
            enrollPlace: r.enrollPlace,
            postAdd: r.postAdd,
            enrollDate: r.enrollDate,
            statusName: r.statusName,
            status: r.status,
            imageUrl: r.fileLoad,
          }))
        );
        setCarInfo(
          data.carInfo.map((c) => ({
            carNo: c.carNo,
            carName: c.carName,
            carType: c.carType,
            carYear: c.carYear,
            carCompany: c.carCompany,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  // 2) 전체선택 토글
  const handleSelectAll = () => {
    const ids = filteredRows.map((r) => r.rentCarNo);
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
    setCriteria({
      status: filterStatus,
      category: category1 || category2,
      from: dateFrom,
      to: dateTo,
      keyword: searchTerm.trim(),
    });
  };

  // 5) 데이터 머징
  const mergedRows = useMemo(
    () =>
      rentCarInfo.map((r) => {
        const car = carInfo.find((c) => c.carNo === r.carNo) || {};
        return { ...r, ...car };
      }),
    [rentCarInfo, carInfo]
  );

  // 6) 필터링
  const filteredRows = useMemo(
    () =>
      mergedRows.filter((item) => {
        if (criteria.status && item.statusName !== criteria.status)
          return false;
        if (criteria.category && item.categoryName !== criteria.category)
          return false;
        const ed = new Date(item.enrollDate);
        if (criteria.from && ed < criteria.from) return false;
        if (criteria.to && ed > criteria.to) return false;
        if (
          criteria.keyword &&
          !(
            String(item.rentCarNo).includes(criteria.keyword) ||
            item.carName.includes(criteria.keyword)
          )
        )
          return false;
        return true;
      }),
    [mergedRows, criteria]
  );

  // 7) 핫딜 수정
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      hotdealName,
      discountRate,
      startDate,
      endDate,
      cars: Object.keys(selectedCars).filter((id) => selectedCars[id]),
    };
    console.log("🔥 수정할 핫딜:", payload);
    alert("핫딜이 수정되었습니다!");
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="sm"
              >
                <option value="">전체 상태</option>
                <option value="진행중">진행중</option>
                <option value="마감">마감</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Form.Select
                value={category1}
                onChange={(e) => setCategory1(e.target.value)}
                size="sm"
              >
                <option value="">전체</option>
                <option value="시간별렌트카">시간별렌트카</option>
                <option value="장기렌트카">장기렌트카</option>
                <option value="구독렌트카">구독렌트카</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Form.Select
                value={category2}
                onChange={(e) => setCategory2(e.target.value)}
                size="sm"
              >
                <option value="">전체</option>
                <option value="주소">등록주소지</option>
                <option value="차종">차종</option>
                <option value="제조사">제조사</option>
                <option value="모델명">모델명</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="검색어"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  maxHeight: "80vh",
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
                            filteredRows.length > 0 &&
                            filteredRows.every((r) => selectedCars[r.rentCarNo])
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
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center text-muted">
                          조회된 차량이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((r) => (
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
                          <td>{r.carType}</td>
                          <td>{r.carCompany}</td>
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
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4 d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0 me-2">
                        핫딜 이름 :
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={hotdealName}
                        onChange={(e) => setHotdealName(e.target.value)}
                        className="w-75"
                      />
                    </Form.Group>

                    <Form.Group controlId="hotdealStart" className="mb-3">
                      <Form.Label
                        className="fw-bold mb-1"
                        style={{ marginRight: "10px" }}
                      >
                        시작일자 :
                      </Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </Form.Group>

                    <Form.Group controlId="hotdealEnd" className="mb-3">
                      <Form.Label
                        className="fw-bold mb-1"
                        style={{ marginRight: "10px" }}
                      >
                        종료일자 :{" "}
                      </Form.Label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 d-flex align-items-center">
                      <Form.Label className="fw-bold mb-0 me-2">
                        할인율 (%) :
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        max={100}
                        value={discountRate}
                        onChange={(e) =>
                          setDiscountRate(Number(e.target.value))
                        }
                        className="w-25"
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={() => navigate(-1)}>
                        취소
                      </Button>
                      <div>
                        <Button
                          variant="danger"
                          type="button"
                          style={{ marginRight: "30px" }}
                          // onClick={deleteHotdeal}
                        >
                          삭제하기
                        </Button>
                        <Button variant="dark" type="submit">
                          수정하기
                        </Button>
                      </div>
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
                      src={selectedCar.imageUrl}
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
                          <strong>제조사:</strong> {selectedCar.carCompany}
                        </Col>
                        <Col>
                          <strong>차종:</strong> {selectedCar.carType}
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

export default AdminHotDealRentCarUpdate;
