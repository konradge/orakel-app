import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";

export default (props) => {
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);

  useEffect(() => {
    props.onDateChange(startDate, endDate);
  }, [startDate, endDate]);
  return (
    <CalendarPicker
      selectedStartDate={startDate}
      selectedEndDate={endDate}
      startFromMonday={true}
      allowRangeSelection={true}
      todayBackgroundColor="#f2e6ff"
      selectedDayColor="#7300e6"
      selectedDayTextColor="#FFFFFF"
      scaleFactor={500}
      onDateChange={(date, type) => {
        if (type === "END_DATE") {
          setEndDate(date);
        } else {
          setStartDate(date);
        }
      }}
    />
  );
};
