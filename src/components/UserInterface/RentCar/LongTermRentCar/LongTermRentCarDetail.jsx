import RentCarNav from "../../Common/Nav/RentCarNav";
import { useState } from "react";
import {
  RentContainerDiv,
  RentBodyDiv,
  RentCarListDiv,
  StyledDatePicker,
} from "../RentCarCommon/RentCar.styles";
import DatePicker from "react-datepicker";
import {
  RentCarCardContainer,
  RentCarCardImgDiv,
  RentCarCardContentDiv,
  RentCarCardImg,
  RentCarNameDiv,
  RentCarMiddleDiv,
  RentCarPriceDiv,
  RentCarYearSpan,
  RentCarPlaceSpan,
} from "../RentCarCommon/RentCarCard.styles";

const LongTermRentCarDetail = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <RentContainerDiv>
        <RentCarNav />
        <RentBodyDiv>
          <div>
            <RentCarCardImg src="images/model_Y.png" />
          </div>
          <RentCarNameDiv>Model Y</RentCarNameDiv>
          <RentCarMiddleDiv>
            <RentCarYearSpan>2025년</RentCarYearSpan>
            <RentCarPlaceSpan>천안/아산</RentCarPlaceSpan>
          </RentCarMiddleDiv>
          <div>
            <div>
              <div>이용 조건 선택</div>
              <div>이용 기간</div>
              <div>이용 시작일</div>
            </div>
            <div>
              <div>24개월 30개월</div>
              <div>
                <StyledDatePicker>
                  대여시각
                  <DatePicker
                    className="datepicker"
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yy/MM/dd/HH:mm"
                  />
                </StyledDatePicker>
                <StyledDatePicker>
                  반납시각
                  <DatePicker
                    className="datepicker"
                    showIcon
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yy/MM/dd/HH:mm"
                  />
                </StyledDatePicker>
              </div>
            </div>
          </div>
          <div>{/* 요금정보 */}</div>
          <div>{/* 계산할 가격 결제하기 버튼 있는곳 */}</div>
        </RentBodyDiv>
      </RentContainerDiv>
      ;
    </>
  );
};

export default LongTermRentCarDetail;
