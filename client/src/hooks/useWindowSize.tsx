import { useState,useEffect } from "react";

const useWindowSize = ()=>{
   
    const [windowSize,setWindowSize] = useState({width:window.innerWidth,height:window.innerHeight})
    useEffect(()=>{
        const changeWindowsize = ()=>{
            setWindowSize({width:window.innerWidth,height:window.innerHeight})
        }
        window.addEventListener("resize",changeWindowsize)
        return () =>window.removeEventListener("resize",changeWindowsize)

    },[])
    return windowSize
}

export default useWindowSize