import styled from "styled-components";

export const StyledDatePicker = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  .datepicker {
    border: 2px solid #4caf50;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    width: 250px;
    height: 50px;
    font-size: 20px;
  }

  .react-datepicker-wrapper {
    margin: 0px;
    width: 100%;
  }

  /* 달력 api 짤려서 추가 kkm */
  position: relative;
  .react-datepicker-popper {
    z-index: 9999 !important; // 지도보다 위로
  }

  /* 이쁘게 꾸며보자 */
  .react-datepicker {
    display: flex; /* ← 핵심! 달력 + 시간 나란히 배치 */
    border: 1px solid #cfe8cc;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    align-items: stretch; /* ← 양쪽 세로 길이 맞추기 핵심 */
  }

  .react-datepicker__header {
    background-color: #e6f4ea;
    border-bottom: none;
    padding: 16px 0px 50px 13px;
    font-weight: bold;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    height: 58.102px;
  }

  .react-datepicker-time__header {
    margin-right: 10px;
    margin-top: 8px;
  }

  .react-datepicker__calendar-icon {
    margin-top: 7px;
    margin-left: 15px;
  }

  /* 날짜 셀 스타일은 그대로 유지 */
  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin: 0 auto;
    transition: background-color 0.2s ease;
  }
  .react-datepicker__day:hover {
    background-color: #d3f2d3;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #4caf50;
    color: white;
    border-radius: 6px; /* ← 원형 말고 네모 느낌으로 */
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: #2e7d32;
  }

  .react-datepicker__month {
    display: block;
  }

  .react-datepicker__triangle {
    display: none; /* 화살표 없애고 싶으면 */
  }
  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin: 0;
    padding: 0;
    height: 40px; /* 날짜 셀과 높이 맞추기 */
  }

  .react-datepicker__day-name {
    line-height: 40px;
    padding: 0;
    margin: 0;
  }
`;
