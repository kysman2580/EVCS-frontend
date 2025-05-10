import axios from "axios";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_ck_0RnYX2w532E16aR9MkKP8NeyqApQ";
const customerKey = "EzXesw41RK43-XD79XDjG";

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
  const rentalTime = formatDateToLocalDateTime(new Date(startDate));
  const returnTime = formatDateToLocalDateTime(new Date(endDate));
  const [orderId, setOrderId] = useState("");
  const [amountVal] = useState({
    currency: "KRW",
    value: amount,
  });

  useEffect(() => {
    async function createOrder() {
      try {
        const response = await axios.post(
          "http://localhost/api/orders",
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
        setOrderId(response.data.orderId);
        amountVal.value = response.data.amount;
        console.log(response.data);
      } catch (error) {
        console.error("주문 생성 실패:", error);
      }
    }
    createOrder();
  }, []);

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
  }, [clientKey, customerKey]);

  async function requestPayment() {
    // ✅ 2. Toss 결제창 호출
    await payment.requestPayment({
      method: "CARD",
      amount: amountVal,
      orderId: orderId, // ✅ 반드시 백엔드 orderId 사용
      orderName: `${carName} 차량 ${amount}원 렌트 결제`,
      customerName: customerName,
      successUrl: `${window.location.origin}/success`,
      failUrl: `${window.location.origin}/fail`,

      card: {
        useEscrow: false,
        flowMode: "DEFAULT", // 통합결제창 여는 옵션
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

  return (
    <button className="btn btn-dark" onClick={() => requestPayment()}>
      결제하기
    </button>
  );
}
