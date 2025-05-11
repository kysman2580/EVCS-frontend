import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-danger">❌ 결제가 실패했습니다.</h2>
          <p>문제가 발생했습니다. 다시 시도해 주세요.</p>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            이전 페이지로 돌아가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentFail;
