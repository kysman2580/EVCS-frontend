import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const StartTimeInput = ({ value, onChange }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.target?.focus()}
      style={{ border: "solid 1px pink" }}
    />
  );

  const EndTimeInput = ({ value, onChange }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.target?.focus()}
      style={{ border: "solid 1px pink" }}
    />
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "10%" }}></div>
        <div style={{ width: "90%" }}>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeInput
            customTimeInput={<StartTimeInput />}
          />

          <DatePicker
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeInput
            customTimeInput={<EndTimeInput />}
          />
        </div>
      </div>
    </>
  );
};
export default RentalPage;
