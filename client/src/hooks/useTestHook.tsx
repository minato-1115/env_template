import React, { createContext, useState, ReactNode, FC } from "react";
import dayjs, { Dayjs } from "dayjs";
// コンテキストの型を定義
interface ValueProps {
  title: string;
  teacher: string;
  grade: string;
  dayOfWeek: Dayjs;
  number: string;
  name: string;
  submitDay: Dayjs;
  experimentDay1: Dayjs;
  experimentDay2: Dayjs;
  coNumber: string;
  coName1: string;
  co1Number: string;
  coName2: string;
  co2Number: string;
}
type MyContextType = {
  state: ValueProps;
  setState: React.Dispatch<React.SetStateAction<ValueProps>>;
};

// コンテキストの作成（初期値はundefinedにし、適切に管理）
export const MyContext = createContext<MyContextType | undefined>(undefined);

// カスタムプロバイダーコンポーネント
export const MyContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState({
    title: "",
    teacher: "",
    grade: "",
    dayOfWeek: dayjs(),
    number: "",
    name: "",
    submitDay: dayjs(),
    experimentDay1: dayjs(),
    experimentDay2: dayjs(),
    coNumber: "",
    coName1: "",
    coName2: "",
    co1Number: "",
    co2Number: "",
  });

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
