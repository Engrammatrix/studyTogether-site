//Created by Nafiz Mazumder - B00811858
import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css';

//logo from: https://thenounproject.com/icon/study-643060/
import studyTogetherLogo from "../images/noun-study-643060.png";

function Navigation(){
  const navigate = useNavigate();

  const id = "guest";
    
  const navDash = () => {
    navigate(`/dashboardunregistered/${id}`)
  }
  
  const navSearch = () => {
    navigate(`/searchout/`)
  }
  const navHelp = () => {
    navigate(`/helpout/`)
  }

  const navRegister = () => {
    navigate(`/registration`)
  }
  const navLogin = () => {
    navigate(`/login`)
  }
  const navweb = () => {
    navigate(`/`)
  }
  return(
    <div style={{position: "absolute", width: "100vw"}}>
      <ul>
        <img src={studyTogetherLogo} alt="logo" onClick={navweb}></img>
        <li className='leftNav' onClick={navweb}>Study Together</li>
        <li className='leftNav' onClick={navDash}> Dashboard</li>
        <li className='leftNav' onClick={navRegister}>Registration</li>

        <li className='rightNav' onClick={navHelp}> Help </li>
        <li className='rightNav' onClick={navSearch}> Search </li>
        <li className='rightNav' onClick={navLogin}> Login </li>
      </ul>
    </div>
  );
}
export default Navigation;
