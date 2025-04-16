import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Wrapper, H2 } from "./InsertCar.styles";

const InsertCar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <H2>차종 등록하기</H2>
      <Wrapper>
        <Col md={2} className="m-4">
          <FloatingLabel controlId="floatingInputGrid" label="차종 번호">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
        <Row className="g-2">
          <Col md={2} className="m-4">
            <FloatingLabel controlId="floatingInputGrid" label="차종명">
              <Form.Control type="email" />
            </FloatingLabel>
          </Col>
          <Col md={3} className="m-4">
            <FloatingLabel controlId="floatingSelectGrid" label="제조사">
              <Form.Select aria-label="Floating label select example">
                <option>제조사를 선택해주세요</option>
                <option value="1">BMW</option>
                <option value="2">HYUNDAI</option>
                <option value="3">KIA</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Col md={2} className="m-4">
          <FloatingLabel controlId="floatingInputGrid" label="출시일">
            <Form.Control type="email" />
          </FloatingLabel>
        </Col>
        <Col md={2} className="m-4">
          <FloatingLabel
            controlId="floatingInputGrid"
            label="배터리용량(단위 : 머시기)"
          >
            <Form.Control type="email" />
          </FloatingLabel>
        </Col>
        <Col md={3} className="m-4">
          <FloatingLabel controlId="floatingInputGrid" label="등록일시">
            <Form.Control type="text" defaultValue={date.toLocaleString()} />
          </FloatingLabel>
        </Col>
        <Button variant="outline-success" className="m-4">
          등록하기
        </Button>
      </Wrapper>
    </>
  );
};
export default InsertCar;
