import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentsSuccess = () => {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const paymentKey = query.get("paymentKey");
  const orderId = query.get("orderId");
  const amount = query.get("amount");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        await axios.post(
          `${ENV_URL}/api/payments/confirm`,
          { paymentKey, orderId, amount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setLoading(false);
      } catch (err) {
        await axios.post(
          `${ENV_URL}/api/payments/fail`,
          {
            paymentKey,
            orderId,
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    if (paymentKey && orderId && amount) {
      confirmPayment();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [paymentKey, orderId, amount]);

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {loading ? (
            <>
              <Spinner animation="border" />
              <p>결제 확인 중...</p>
            </>
          ) : error ? (
            <>
              <h2>❌ 결제 확인 실패</h2>
              <p>문제가 발생했습니다. 관리자에게 문의하세요.</p>
            </>
          ) : (
            <>
              <h2>🎉 결제가 성공적으로 완료되었습니다!</h2>
              <p>주문이 정상적으로 처리되었습니다.</p>
            </>
          )}
          <Button variant="primary" onClick={() => navigate("/")}>
            홈으로 이동
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentsSuccess;
