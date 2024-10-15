import CustomInput from "./CustomInput";
import React,{ useContext } from "react";
import { MyContext } from "../hooks/useTestHook";
import  PickDate from "./PickDate";
import { Dayjs } from "dayjs";
import Pulldown from "./Pulldown";
import { selectItem } from "../common/constants/selectItems";
import useWindowSize from "../hooks/useWindowSize";
import ConvertButton from "./ConvertButton";
const InputForm = ()=>{
    const context = useContext(MyContext);
    const windowSize = useWindowSize()
  // コンテキストがundefinedの場合のエラーハンドリング
  if (!context) {
    throw new Error('MyContext.Provider が正しく設定されていません');
  }

  const {state,setState} = context;
    return(
        <div style ={{paddingTop:"10%",alignSelf:"center",backgroundColor:"#fff" , overflowY:"auto" ,width:windowSize.width*0.3,height:windowSize.height}}>
         <Pulldown options={selectItem.title} itemName="タイトル" selectValue ={(newValue:string)=>{setState((prevState)=>({...prevState,title:newValue}))}}/>
         <Pulldown options={selectItem.teacher} itemName="担当教員" selectValue ={(newValue:string)=>{setState((prevState)=>({...prevState,teacher:newValue}))}}/>
         <CustomInput label="学籍番号" catchValue={(text) => setState((prevState) => ({
            ...prevState, number: text
        }))} />
        <CustomInput label="氏名" catchValue={(text) => setState((prevState) => ({
            ...prevState, name: text
        }))} />
        
        <PickDate label="提出年月日" selectDate={(selectedDate:Dayjs)=>setState((prevState)=>({...prevState,submitDay:selectedDate}))}/>
        <PickDate label="実験実施日1" grade={state.grade} selectDate={(selectedDate:Dayjs)=>setState((prevState)=>({...prevState,dayOfWeek:selectedDate}))}/>
        <PickDate label="実験実施日2" grade={state.grade} selectDate={(selectedDate:Dayjs)=>setState((prevState)=>({...prevState,dayOfWeek:selectedDate}))}/>
        <CustomInput label="共同実験者1" catchValue={(text) => setState((prevState) => ({
            ...prevState, coName: text
        }))} />
        <CustomInput label="共同実験者2" catchValue={(text) => setState((prevState) => ({
            ...prevState, coName: text
        }))} />
        <ConvertButton/>
        </div>
        
    )
}
export default InputForm