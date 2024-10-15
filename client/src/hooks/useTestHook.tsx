import React, { createContext, useState, ReactNode, FC } from 'react';
import dayjs, {Dayjs} from "dayjs"
// コンテキストの型を定義
interface ValueProps{
  title: string;
  teacher: string;
  grade: string;
  dayOfWeek: Dayjs;
  number: string;
  name: string;
  submitDay: Dayjs;
  experimentDay: Dayjs;
  coNumber: string;
  coName: string;
}
type MyContextType = {
  state:ValueProps;setState :React.Dispatch<React.SetStateAction<ValueProps>>};

// コンテキストの作成（初期値はundefinedにし、適切に管理）
export const MyContext = createContext<MyContextType | undefined>(undefined);

// カスタムプロバイダーコンポーネント
export const MyContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(
    {
      title:"",
      teacher:"",
      grade:"",
      dayOfWeek:dayjs(),
      number: "",
      name: "",
      submitDay: dayjs(),
      experimentDay: dayjs(),
      coNumber: "",
      coName: ""
    });

  return (
    <MyContext.Provider value={{state, setState}}>
      {children}
    </MyContext.Provider>
  );
};
