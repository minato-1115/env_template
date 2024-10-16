import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useEffect } from "react";
interface PickDateProps {
  grade?: string;
  selectDate: (selectedDay: Dayjs) => void;
  label: string;
}
const PickDate = ({ grade = "3", selectDate, label }: PickDateProps) => {
  const [value, setValue] = useState<Dayjs | null>();
  useEffect(() => {
    if (value) {
      selectDate(value);
      console.log(value);
    }
  }, [value]);

  const selectableDate = (date: Dayjs | null) => {
    if (!date) {
      return false;
    } else {
      //case文で学年の判定を入れることで、選択できる曜日の制限を掛ける
      const day = date.day();
      return !(day === 1 || day === 5);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          marginTop: 2,
          marginLeft: 2,
          width: "70%",
          "& .MuiInputBase-input": {
            fontWeight: "bold",
          },
        }}
        label={label}
        format="YYYY/MM/DD"
        shouldDisableDate={selectableDate}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default PickDate;
