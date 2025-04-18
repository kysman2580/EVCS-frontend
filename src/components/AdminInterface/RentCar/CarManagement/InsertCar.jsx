import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Wrapper, H2 } from "./InsertCar.styles";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

/* nav 관련 애들 */
import AdminRentCarNav from "../../AdminCommon/AdminNav/AdminRentCarNav";
import {
  RentContainerDiv,
  RentBodyDiv,
} from "../AdminRentCarCommon/AdminRentCar.styles";

const InsertCar = () => {
  const navi = useNavigate();
  const [date, setDate] = useState(new Date());

  return (
    <>
      <RentContainerDiv>
        <AdminRentCarNav />
        <RentBodyDiv>
          <Wrapper className="border border-secondary rounded-3 p-4 w-50 mx-auto">
            <H2 className="mb-2">차종 등록하기</H2>
            <Container>
              <Row className="g-2">
                <Col md={12}>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="차종 번호"
                  >
                    <Form.Control type="text" />
                  </FloatingLabel>
                </Col>
                <Col md={12}>
                  <FloatingLabel controlId="floatingInputGrid" label="차종명">
                    <Form.Control type="email" />
                  </FloatingLabel>
                </Col>
                <Col md={12}>
                  <FloatingLabel controlId="floatingSelectGrid" label="제조사">
                    <Form.Select aria-label="Floating label select example">
                      <option>제조사를 선택해주세요</option>
                      <option value="1">BMW</option>
                      <option value="2">HYUNDAI</option>
                      <option value="3">KIA</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="floatingInputGrid" label="출시일">
                    <Form.Control type="email" />
                  </FloatingLabel>
                </Col>
                <Col md={12}>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="배터리용량(단위 : 머시기)"
                  >
                    <Form.Control type="email" />
                  </FloatingLabel>
                </Col>
                <Col md={6}>
                  <FloatingLabel controlId="floatingInputGrid" label="등록일시">
                    <Form.Control
                      type="text"
                      defaultValue={date.toLocaleString()}
                    />
                  </FloatingLabel>
                </Col>
                <Button variant="outline-success">등록하기</Button>
                <Button
                  size="sm"
                  onClick={() => navi(-1)}
                  variant="outline-secondary"
                >
                  돌아가기
                </Button>
              </Row>
            </Container>
          </Wrapper>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};
export default InsertCar;
