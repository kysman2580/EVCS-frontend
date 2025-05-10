import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RentCarNav from "../../Common/Nav/RentCarNav";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  Wrapper,
  RentBodyDiv,
  RentContainerDiv,
  H1,
  H3,
} from "./RentalPage.styles";

import { StyledDatePicker } from "../RentCarCommon/RentCar.styles";

const RentalPage = () => {
  const now = new Date();
  const navi = useNavigate();
  const currentTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + 1,
    0,
    0,
    0
  );
  // YYYY-MM-DD HH:mm 포맷 헬퍼 (로컬 타임존 기준)
  const formatLocalDateTime = (date) => {
    const y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return `${y}-${M}-${d}T${h}:${m}`;
  };

  const [startDate, setStartDate] = useState(currentTime);
  const [endDate, setEndDate] = useState(currentTime);

  const handleEndDate = (date) => {
    if (date <= startDate) {
      alert("반납 시각은 대여 시각보다 늦어야 합니다.");
      return;
    }
    setEndDate(date);
  };
  const handleConfirm = () => {
    navi("/rentCarMap", {
      state: {
        startDate: formatLocalDateTime(startDate),
        endDate: formatLocalDateTime(endDate),
      },
    });
  };
  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <H1>시간별 렌트카 대여하기</H1>

          <br />
          <br />

          <H3>대여시간 설정</H3>
          <Wrapper>
            <StyledDatePicker>
              <div>대여시각</div>
              <DatePicker
                className="datepicker"
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yy/MM/dd/HH:mm"
                showTimeSelect
                timeIntervals={30}
                minDate={startDate}
                minTime={
                  startDate.toDateString() === new Date().toDateString()
                    ? new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate(),
                        now.getHours() + 1,
                        0,
                        0,
                        0
                      )
                    : new Date(0, 0, 0, 0, 0)
                }
                maxTime={new Date(0, 0, 0, 23, 59)}
              />
            </StyledDatePicker>

            <StyledDatePicker>
              <div>반납시각</div>
              <DatePicker
                className="datepicker"
                showIcon
                selected={endDate}
                onChange={(date) => handleEndDate(date)}
                dateFormat="yy/MM/dd HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                timeIntervals={30} // 옵션: 30분 간격
                minDate={startDate}
                maxDate={
                  new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() + 7,
                    now.getHours(),
                    0,
                    0,
                    0
                  )
                }
              />
            </StyledDatePicker>
          </Wrapper>

          {/* 이용시간 안내 영역 */}
          <div
            style={{
              marginTop: "100px",
              textAlign: "left",
              marginLeft: "560px",
            }}
          >
            <h5 style={{ fontSize: "30px", fontWeight: "bold", color: "#333" }}>
              🚘 이용 시간 안내
            </h5>
            <div style={{ fontSize: "20px", marginTop: "20px", color: "#555" }}>
              {startDate.toLocaleString()} ~ {endDate.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "10px",
                color: "#007bff",
              }}
            >
              총 {Math.round((endDate - startDate) / (1000 * 60 * 60))}시간 이용
            </div>
          </div>

          {/* 확인 버튼 */}
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Button
              variant="primary"
              onClick={handleConfirm}
              style={{ marginLeft: "600px" }}
            >
              다음으로
            </Button>
          </div>

          <br />
          <br />
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};
export default RentalPage;
