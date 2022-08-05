//Created by Nafiz Mazumder - B00811858
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useParams } from "react-router-dom";
import '../App.css';

//logo from: https://thenounproject.com/icon/study-643060/
import studyTogetherLogo from "../images/noun-study-643060.png";

function Navigation(){
  const navigate = useNavigate();

  const {id} = useParams();
    
  const navDash = () => {
    navigate(`/dashboard/${id}`)
  }
  const navCreate = () => {
    navigate(`/creategroup/${id}`)
  }
  const navProfile = () => {
    navigate(`/profile/${id}`)
  }
  const navSearch = () => {
    navigate(`/search/${id}`)
  }
  const navHelp = () => {
    navigate(`/help/${id}`)
  }
  const navLogout = () => {
    navigate(`/`)
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
        <img src={studyTogetherLogo} alt="logo"></img>
        <li className='leftNav'> Study Together</li>
        <li className='leftNav' onClick={navDash}> Dashboard </li>
        <li className='leftNav' onClick={navRegister}> Register </li>
        <li className='rightNav' onClick={navHelp}> Help </li>
        <li className='rightNav' onClick={navSearch}> Search </li>
        <li className='rightNav' onClick={navLogin}> Login </li>
      </ul>
    </div>
  );
}
export default Navigation;
