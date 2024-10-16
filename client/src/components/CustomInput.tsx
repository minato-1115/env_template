import { TextField } from "@mui/material";
import React from "react";
interface CustomInputProps {
  catchValue: (text: string) => void;
  label: string;
}
const CustomInput = ({ catchValue, label }: CustomInputProps) => {
  return (
    <>
      <TextField
        label={label}
        sx={{
          "& .MuiInputBase-input": {
            fontWeight: "bold",
          },
        }}
        style={{ marginTop: 16, marginLeft: 8, width: "70%" }}
        placeholder="文字を入力してください"
        onChange={(e) => {
          catchValue(e.target.value);
        }}
      ></TextField>
    </>
  );
};

export default CustomInput;
