//Written By Raham Moghaddam
import '../App.css';
import '../css/login.css';
import axios from 'axios';
import Navbar from './NavigationLoggedOut';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import bcrypt from 'bcryptjs'
import {v4 as uuid} from "uuid"; 

import {
    Link
  } from "react-router-dom";
const api_url = 'http://localhost:8080/user'
// this function handels login by first checking if email and pass match then if they do it will take the user to the profile , otherwise shows error
async function UserLoginHandler(details,navigate,setErrorM){
console.log(details.email);
axios.post(api_url,{
    email:details.email,
    password:details.password
}).then(res=>{
  const a =   bcrypt.compare(details.password,res.data.user.password);
  if(bcrypt.compareSync(details.password,res.data.user.password)){
    const id = JSON.parse(JSON.stringify(res.data.user._id))
    const sessionCoderandom = uuid()

    const sessionCode = sessionCoderandom.concat("TRUE").concat(uuid()).concat("ABCDEF").concat(uuid()).concat("11111").concat(uuid())
    axios.put(`http://localhost:8080/update/:${id}`,{
      sessionCode: sessionCode
    })
    //const sessionCode = JSON.parse(JSON.stringify(res.data.user.sessionCode))
    console.log(a)
    navigate(`/dashboard/:${sessionCode}`)}
    else {
      console.log("credintial not matching")
    setErrorM("email or password is incorrect, please re-try or click on forgot password");
    }
}).catch(err => {
    console.log("credintial not matching")
    setErrorM("email or password is incorrect, please re-try or click on forgot password");
    //navigate(`/Login`) 
})
}

function LoginUser(){
    //the details of user input as well as error message const
    const [details, setDetails] = useState({email:"",password:""});
    const navigate = useNavigate();
    const [errorM, setErrorM] = useState("")

// this function is called upon form submission and call UserLoginHandler 
    const submitHandler = e =>{
        e.preventDefault();
        UserLoginHandler(details,navigate,setErrorM);
    }

    return (
      //Registration form validates user input and simulate the user registering
      <div className="Registration">
        <Navbar/>  
        <div style={{padding: "8%"}}>
          <h1><i><u>Study Together</u></i></h1>
          <h1>User Login</h1>
          <form onSubmit={submitHandler} className="form1">
            <div id="registerBox">
            <div>
              <label className='label'>
                Email
              </label>
              <input type="text" placeholder="Enter your email" name="email" id="email" size="30" onChange={e => setDetails({...details,email: e.target.value})} value={details.email} ></input>
              <label className='label'>
                Password
              </label>
              <input type="password" placeholder="Enter your password" name="password" id="password" size="30"  onChange={e => setDetails({...details,password: e.target.value})} value={details.password}></input>
            </div>
            <div>
              <input type="submit" value="Login"></input>    
            </div>
            </div> 
            <div>
            <h6>{errorM}</h6>
            </div>
          </form>
          <br></br>   <Link to="/ForgotPassword"><button style={{margin: "auto"}}>Forgot Password</button></Link>
        </div>
      </div>
    );
  }
  export default LoginUser;