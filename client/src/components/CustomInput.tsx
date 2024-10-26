import { TextField } from "@mui/material";
interface CustomInputProps {
  catchValue: (text: string) => void;
  label: string;
  placeholder?: string;
}
const CustomInput = ({
  catchValue,
  label,
  placeholder = "入力してください",
}: CustomInputProps) => {
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
        placeholder={placeholder}
        onChange={(e) => {
          catchValue(e.target.value);
        }}
      ></TextField>
    </>
  );
};

export default CustomInput;
