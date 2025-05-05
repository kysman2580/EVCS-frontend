import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
  Modal,
  Table,
} from "react-bootstrap";

/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";
import { add } from "date-fns";

const InsertRentCar = () => {
  const navi = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState([]);
  const [carInfo, setCarInfo] = useState([]);
  const [form, setForm] = useState({
    rentCarNo: "",
    categoryName: "",
    carNo: "",
    rentCarPrice: "",
    carName: "",
    enrollPlace: "",
    carCompany: "",
    carYear: "",
    carType: "",
    garageNo: "",
  });

  // --- 주소 찾기 모달 관련 상태들 추가  ---
  const [addressModal, setAddressModal] = useState(false);
  const [regionList, setRegionList] = useState([]); // 전체 지역 데이터
  const [garages, setGarages] = useState([]); // 검색된 차고지 (주소) 리스트
  const [regionSido, setRegionSido] = useState("");
  const [regionSigungu, setRegionSigungu] = useState("");
  const [regionDong, setRegionDong] = useState("");
  const [status, setStatus] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 중복 제거 함수
  const getUniqueList = (arr, key) => {
    const seen = new Set();
    return arr.filter((item) => {
      const v = item[key];
      if (seen.has(v)) return false;
      seen.add(v);
      return true;
    });
  };

  // 시/도, 시군구, 동 필터된 옵션들
  const filteredSigungu = regionList.filter((i) => i.regionSido === regionSido);
  const filteredDong = filteredSigungu.filter(
    (i) => i.regionSigungu === regionSigungu
  );
  const sidoOptions = getUniqueList(regionList, "regionSido");
  const sigunguOptions = getUniqueList(filteredSigungu, "regionSigungu");
  const dongOptions = getUniqueList(filteredDong, "regionDong");

  // 주소 모달 열릴 때 & 검색 파라미터 바뀔 때마다 데이터 조회
  useEffect(() => {
    if (!addressModal) return;
    axios
      .get("http://localhost/admin-garages", {
        params: {
          regionSido,
          regionSigungu,
          regionDong,
          status: "ing",
          searchKeyword,
        },
      })
      .then((res) => {
        setGarages(res.data.garageList || []);
        setRegionList(res.data.regionList || []);
      })
      .catch(console.error);
  }, [
    addressModal,
    regionSido,
    regionSigungu,
    regionDong,
    status,
    searchKeyword,
  ]);

  const handleRegionSearch = () => {
    // 모달 열려있을 때 같은 effect 를 강제 실행
    axios
      .get("http://localhost/admin-garages", {
        params: {
          regionSido,
          regionSigungu,
          regionDong,
          status,
          searchKeyword,
        },
      })
      .then((res) => {
        setGarages(res.data.garageList || []);
        setRegionList(res.data.regionList || []);
      })
      .catch(console.error);
  };

  useEffect(() => {
    axios
      .get("http://localhost/rentCar/category")
      .then((result) => {
        console.log(result.data);
        setCategory(result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost/rentCar/carInfo")
      .then((result) => {
        console.log(result.data);
        const carData = result.data.carInfoResult.map((item, index) => ({
          carNo: item.carNo,
          carName: item.carName,
          carType: item.carType,
          carCompany: item.carCompany,
          carYear: item.carYear,
          carImage: result.data.imageResult[index].fileLoad,
        }));
        setCarInfo(carData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAdress = () => {
    setAddressModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCarName = (e) => {
    carInfo.map((item) => {
      if (item.carName == e.target.value) {
        setForm({
          ...form,
          carNo: item.carNo,
          carName: item.carName,
          carType: item.carType,
          carCompany: item.carCompany,
          carYear: item.carYear,
        });
        setImagePreview(item.carImage);
      }
    });
  };

  // 사용 안하는 메서드라 주석
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  //  필드별 ref 선언
  const carCompanyRef = useRef();
  const carTypeRef = useRef();
  const carNameRef = useRef();
  const rentCarNoRef = useRef();
  const categoryNameRef = useRef();
  const rentCarPriceRef = useRef();
  const enrollPlaceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 빈 값 체크 & ref 매핑
    const checks = [
      { val: form.carCompany, name: "제조사", ref: carCompanyRef },
      { val: form.carType, name: "차종", ref: carTypeRef },
      { val: form.carName, name: "모델명", ref: carNameRef },
      { val: form.rentCarNo, name: "차 번호", ref: rentCarNoRef },
      { val: form.categoryName, name: "카테고리", ref: categoryNameRef },
      { val: form.rentCarPrice, name: "가격", ref: rentCarPriceRef },
      { val: form.garageNo, name: "차고지", ref: enrollPlaceRef },
    ];
    const missing = checks.find((c) => !c.val?.toString().trim());
    if (missing) {
      alert(`${missing.name}를 입력해주세요.`);
      missing.ref.current.focus();
      return;
    }
    axios
      .post("http://localhost/rentCar/insert", {
        rentCarNo: form.rentCarNo,
        categoryName: form.categoryName,
        carNo: form.carNo,
        rentCarPrice: form.rentCarPrice,
        garageNo: form.garageNo,
      })
      .then((result) => {
        alert("차량이 등록되었습니다!");
        navi("/admin/rentCarManagement");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("category :", category);
  console.log("form :", form);
  console.log("carInfo :", carInfo);

  const companyOptions = Array.from(
    new Set(carInfo.map((item) => item.carCompany))
  );
  const typeOptions = form.carCompany
    ? Array.from(
        new Set(
          carInfo
            .filter((item) => item.carCompany === form.carCompany)
            .map((item) => item.carType)
        )
      )
    : [];

  return (
    <>
      <RentContainerDiv>
        <AdminRentCarNav />

        <RentBodyDiv>
          <Container style={{ maxWidth: "600px" }}>
            <Card className="p-4 shadow-sm">
              {/* 이미지 업로드 */}
              <div className="mb-3 text-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="차 미리보기"
                    fluid
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      backgroundColor: "#ddd",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span>차 사진</span>
                  </div>
                )}
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="carCompany">
                      <Form.Label className="fw-bold">제조사 :</Form.Label>
                      <Form.Select
                        name="carCompany"
                        value={form.carCompany}
                        ref={carCompanyRef}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            carCompany: e.target.value,
                            carType: "", // 선택 바뀌면 차종 초기화
                            carName: "", // 모델명 초기화
                            carNo: "",
                            carYear: "",
                          });
                          setImagePreview(null);
                        }}
                      >
                        <option value="">제조사 선택</option>
                        {companyOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* ✨ 수정: 차종 드롭박스 */}
                    <Form.Group className="mb-3" controlId="carType">
                      <Form.Label className="fw-bold">차종 :</Form.Label>
                      <Form.Select
                        name="carType"
                        value={form.carType}
                        ref={carTypeRef}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            carType: e.target.value,
                            carName: "", // 모델명 초기화
                            carNo: "",
                            carYear: "",
                          });
                          setImagePreview(null);
                        }}
                        disabled={!form.carCompany}
                      >
                        <option value="">차종 선택</option>
                        {typeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* 차 이름 */}
                    <Form.Group className="mb-3" controlId="carName">
                      <Form.Label className="fw-bold ">모델명 :</Form.Label>
                      <Form.Select
                        name="carName"
                        value={form.carName}
                        onChange={handleCarName}
                        ref={carNameRef}
                        disabled={!form.carCompany || !form.carType}
                      >
                        <option>선택</option>
                        {carInfo
                          .filter(
                            (item) =>
                              item.carCompany === form.carCompany && // 1) 회사 일치
                              item.carType === form.carType // 2) 차종 일치
                          )
                          .map((item) => (
                            <option key={item.carNo} value={item.carName}>
                              {item.carName}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* 연식 + 카테고리 */}
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="carYear">
                      <Form.Label className="fw-bold ">연식 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="carYear"
                        value={form.carYear}
                        onChange={handleChange}
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="rentCarNo">
                      <Form.Label className="fw-bold ">차 번호 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="rentCarNo"
                        ref={rentCarNoRef}
                        value={form.rentCarNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* 가격 */}
                <Row>
                  <Col>
                    <Form.Group controlId="categoryName">
                      <Form.Label className="fw-bold ">카테고리 :</Form.Label>
                      <Form.Select
                        name="categoryName"
                        value={form.categoryName}
                        ref={categoryNameRef}
                        onChange={handleChange}
                      >
                        <option>선택</option>
                        {category.map((item) => {
                          return <option key={item}>{item}</option>;
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="rentCarPrice">
                      <Form.Label className="fw-bold">가격 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="rentCarPrice"
                        ref={rentCarPriceRef}
                        value={form.rentCarPrice}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* 변경된 부분: enrollPlace + postAdd를 한 줄에 */}
                <Row className="mb-4" style={{ alignItems: "flex-end" }}>
                  {/* 등록 주소 */}
                  <Col md={7}>
                    <Form.Group controlId="enrollPlace">
                      <Form.Label className="fw-bold">등록 주소 :</Form.Label>
                      <Form.Control
                        type="text"
                        name="enrollPlace"
                        ref={enrollPlaceRef}
                        value={form.enrollPlace}
                        placeholder="주소 찾기 버튼을 눌러주세요"
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* 우편번호 */}
                  <Col md={2}>
                    <Form.Group controlId="postAdd">
                      <Form.Control
                        type="text"
                        name="postAdd"
                        value={form.postAdd}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* 주소 찾기 버튼 */}
                  <Col md={3} className="text-end">
                    <Button
                      variant="secondary"
                      onClick={() => setAddressModal(true)}
                    >
                      주소 찾기
                    </Button>
                  </Col>
                </Row>
                <div
                  style={{
                    marginTop: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Button variant="secondary" onClick={() => navi(-1)}>
                      뒤로가기
                    </Button>
                  </div>
                  <div>
                    <Button type="submit" variant="dark">
                      등록하기
                    </Button>
                  </div>
                </div>
              </Form>
            </Card>
          </Container>
        </RentBodyDiv>
      </RentContainerDiv>

      <Modal
        show={addressModal}
        onHide={() => setAddressModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>주소 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-3">
              {/* 상태(전체/사용중/사용중지) */}
              {/* 시/도 */}
              <Col md={2}>
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
                  {sidoOptions.map((o) => (
                    <option key={o.regionSido} value={o.regionSido}>
                      {o.regionSido}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              {/* 시군구 */}
              <Col md={2}>
                <Form.Select
                  value={regionSigungu}
                  disabled={!regionSido}
                  onChange={(e) => {
                    setRegionSigungu(e.target.value);
                    setRegionDong("");
                    setSearchKeyword("");
                  }}
                >
                  <option value="">시군구 선택</option>
                  {sigunguOptions.map((o) => (
                    <option key={o.regionSigungu} value={o.regionSigungu}>
                      {o.regionSigungu}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              {/* 동 */}
              <Col md={2}>
                <Form.Select
                  value={regionDong}
                  disabled={!regionSigungu}
                  onChange={(e) => {
                    setRegionDong(e.target.value);
                    setSearchKeyword("");
                  }}
                >
                  <option value="">동 선택</option>
                  {dongOptions.map((o) => (
                    <option key={o.regionDong} value={o.regionDong}>
                      {o.regionDong}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              {/* 검색어 */}
              <Col md={4}>
                <Form.Control
                  value={searchKeyword}
                  placeholder="검색어"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleRegionSearch();
                    }
                  }}
                />
              </Col>
              <Col md={2}>
                <Button
                  className="w-100"
                  variant="secondary"
                  onClick={handleRegionSearch}
                >
                  검색
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <div
                  style={{
                    maxHeight: "300px", // 테이블 영역 최대 높이
                    overflowY: "auto", // 세로 스크롤 활성화
                    marginTop: "1rem",
                    border: "1px solid #dee2e6",
                    borderRadius: "0.25rem",
                  }}
                >
                  <Table striped bordered hover size="sm">
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
                      {garages.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            검색 결과가 없습니다.
                          </td>
                        </tr>
                      ) : (
                        garages.map((g) => (
                          <tr
                            key={g.garageNo}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              // 클릭 시 모달 닫고, form.enrollPlace에 allAddress 세팅
                              setForm((f) => ({
                                ...f,
                                enrollPlace: g.allAddress,
                                postAdd: g.postAdd,
                                garageNo: g.garageNo,
                              }));
                              setAddressModal(false);
                            }}
                          >
                            <td>{g.garageNo}</td>
                            <td>{g.allAddress}</td>
                            <td>{g.postAdd}</td>
                            <td>{g.address}</td>
                            <td>{g.enrollDate}</td>
                            <td
                              className={
                                g.statusName === "사용중"
                                  ? "text-success fw-bold"
                                  : g.statusName === "사용중지"
                                  ? "text-danger fw-bold"
                                  : ""
                              }
                            >
                              {g.statusName}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddressModal(false)}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InsertRentCar;
