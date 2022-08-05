//Created by Nafiz Mazumder - B00811858
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useParams } from "react-router-dom";
import '../App.css';
import axios from 'axios'

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
    const api_url_myProfile = `http://localhost:8080/user/${id}`
    axios.get(api_url_myProfile, {
    }).then(res=>{
      const id2 = JSON.parse(JSON.stringify(res.data.user._id))
      axios.put(`http://localhost:8080/update/:${id2}`,{
        sessionCode: ""
      })
      navigate(`/`)
    })
    
  }

  return(
    <div style={{position: "absolute", width: "100vw"}}>
      <ul>
        <img src={studyTogetherLogo} alt="logo"></img>
        <li className='leftNav'> Study Together</li>
        <li className='leftNav' onClick={navDash}> Dashboard </li>
        <li className='leftNav' onClick={navCreate}> Create Group </li>
        <li className='leftNav' onClick={navProfile}> Profile </li>
        <li className='rightNav' onClick={navHelp}> Help </li>
        <li className='rightNav' onClick={navSearch}> Search </li>
        <li className='rightNav' onClick={navLogout}> Logout </li>
      </ul>
    </div>
  );
}
export default Navigation;
