import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function PreventPages({children}) {
    const userDetails=(localStorage.getItem("Details"))
    console.log(userDetails)
    let navigate=useNavigate();
    useEffect(()=>{
        if(!userDetails){
            return navigate('/login');
        }
    },[userDetails])
    
  return children;
}

export default PreventPages