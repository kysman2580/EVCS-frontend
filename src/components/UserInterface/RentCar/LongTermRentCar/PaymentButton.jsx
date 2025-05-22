import axios from "axios";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_ck_0RnYX2w532E16aR9MkKP8NeyqApQ";

const pad = (n) => (n < 10 ? "0" + n : n);
const formatDateToLocalDateTime = (date) => {
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
};

export function PaymentButton({
  startDate,
  endDate,
  memberNo,
  rentCarNo,
  amount,
  customerName,
  carName,
  selectedPeriod,
}) {
  const ENV_URL = window.ENV?.API_URL || `http://localhost:2580`;
  const rentalTime = formatDateToLocalDateTime(new Date(startDate));
  const returnTime = formatDateToLocalDateTime(new Date(endDate));

  const [payment, setPayment] = useState(null);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const paymentInstance = tossPayments.payment({
          customerKey: memberNo,
        });
        setPayment(paymentInstance);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [memberNo]);

  async function requestPayment() {
    try {
      // ✅ 버튼 누를 때만 createOrder 실행
      const response = await axios.post(
        `${ENV_URL}/api/orders`,
        {
          memberNo,
          rentCarNo,
          amount,
          rentalTime,
          returnTime,
          selectedPeriod,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const orderId = response.data.orderId;
      const realAmount = response.data.amount;

      await payment.requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: realAmount },
        orderId: orderId,
        orderName: `${carName} 차량 ${amount}원 렌트 결제`,
        customerName: customerName,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
    }
  }

  return (
    <button className="btn btn-dark" onClick={requestPayment}>
      결제하기
    </button>
  );
}
