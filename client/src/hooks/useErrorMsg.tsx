import { useState, useContext, useEffect } from "react";
import { MyContext } from "./useTestHook";
import { ERROR_MSG } from "../common/constants/errorMsg";

export const useShowErrorMsg = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("MyContext.Provider が正しく設定されていません");
  }
  const { state } = context;
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (
      state.title &&
      state.teacher &&
      state.dayOfWeek &&
      state.name &&
      state.number &&
      state.submitDay &&
      state.experimentDay1 &&
      state.page
    ) {
      setErrorMsg("");
    } else {
      setErrorMsg(ERROR_MSG["input"]);
    }
    console.log(errorMsg);
  }, [
    state.title,
    state.teacher,
    state.dayOfWeek,
    state.name,
    state.number,
    state.submitDay,
    state.experimentDay1,
    state.page,
  ]);
  return errorMsg;
};
