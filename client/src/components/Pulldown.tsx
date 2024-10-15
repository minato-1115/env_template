import { FormControl ,MenuItem,InputLabel, Select, SelectChangeEvent} from "@mui/material";
import React,{ useState } from "react";

interface PulldownProps{
    options:string[]
    selectValue:(value:string)=>void
    itemName:string
}
const Pulldown = ({options,selectValue,itemName}:PulldownProps)=>{
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedOption(event.target.value);
        selectValue(event.target.value)
      };
      
    return(
    <FormControl fullWidth>
        <InputLabel style={{fontSize:14,marginLeft:"15%",marginTop:"0%",fontWeight:"bold"}}>{itemName}</InputLabel>
        <Select
        
        value = {selectedOption}
        onChange={handleChange}
        label = "選択"
        style ={{margin:8,width:"70%",alignSelf:"center"}}
        >
            {options.map((option,index)=><MenuItem key={index} value = {option}>{option}</MenuItem>)}
        </Select>
    </FormControl>)
}
export default Pulldown