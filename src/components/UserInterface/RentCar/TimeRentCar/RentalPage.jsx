import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RentCarNav from "../../Common/Nav/RentCarNav";
import CarMap from "./CarMap";
import {
  Wrapper,
  RentBodyDiv,
  RentContainerDiv,
  H1,
  H3,
} from "./RentalPage.styles";

import { StyledDatePicker } from "../RentCarCommon/RentCar.styles";

const RentalPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <H1>시간별 렌트카 대여하기</H1>

          <br />
          <br />

          <H3>1. 대여시간 설정</H3>
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
              />
            </StyledDatePicker>
            <StyledDatePicker>
              <div>반납시각</div>
              <DatePicker
                className="datepicker"
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yy/MM/dd/HH:mm"
                showTimeSelect
              />
            </StyledDatePicker>
          </Wrapper>

          <br />
          <br />

          <H3>2. 대여위치 및 차량 설정</H3>
          <CarMap />
          <br />
          <br />

          <H3>3. 결제하기</H3>
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};
export default RentalPage;
