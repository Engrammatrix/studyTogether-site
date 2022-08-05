//Written By Raham Moghaddam
import '../App.css';
import '../css/login.css';
import axios from 'axios';
import Navbar from './NavigationLoggedOut';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import bcrypt from 'bcryptjs'
import CryptoJS from "crypto-js"
import {v4 as uuid} from "uuid"; 
const api_url = 'http://localhost:8080/user2'
// this function checks to see if passwords match in the forgot password
function matchPasswords(details){
  if(details.password===details.passwordConfirm){
    return true;
  }
  else{
    return false;
  }
}

// this function handles forgot password, first it checks if the all inputs are filled or not, then it sees if the password match
// then it checks if securty code and email are matching thus if they are it changes the password
async function UserForgotHandler(details,navigate,setErrorM,regularExpression){
  //console.log(details);
  const hashedpassword = await bcrypt.hash(details.password,10);
      console.log(hashedpassword);
  if(details.email === "" || details.password === "" || details.passwordConfirm === "" || details.securityCode === ""){
    setErrorM("all field must be filled");
  }
  else{
  if (matchPasswords(details)){
    if(regularExpression.test(details.password)){
      //var ecnrtpytedsec = CryptoJS.AES.encrypt(details.securityCode, 'my-secret-key@123').toString()
      //console.log(ecnrtpytedsec)
  axios.post(api_url,{
      email:details.email,
      securityCode: details.securityCode
  }).then(res=>{
    const ciphersecurityCode = JSON.parse(JSON.stringify(res.data.user.securityCode))
    const oldhashed = res.data.user.password;
    const decryptedsecurityCode  =  CryptoJS.AES.decrypt(ciphersecurityCode,oldhashed).toString(CryptoJS.enc.Utf8)
if(decryptedsecurityCode==details.securityCode){
      const id = JSON.parse(JSON.stringify(res.data.user._id))
      axios.put(`http://localhost:8080/update/:${id}`,{
        password: hashedpassword,
        securityCode: CryptoJS.AES.encrypt(uuid(), hashedpassword).toString()
      })
      alert(`Your recovery code has changed please check your profile\n\n`)
      navigate(`/Login`) }
      else{console.log("credintial not matching")
      setErrorM("email or securityCode is incorrect, please re-try");}
      //navigate(`/dashboard/:${id}`)
  }).catch(err => {
      console.log("credintial not matching")
      setErrorM("email or securityCode is incorrect, please re-try");

      //navigate(`/Login`) 
  })
  }
else{
  setErrorM("Passwords is not following the rules, it must be between 8-68 character, one upper case, lower case, special charachter and number");
}
}
else{
  setErrorM("Passwords do not match, please re-try");

}
}
}

function ForgotPassword(){
    // the inputs of the user as well as error messages
    const [details, setDetails] = useState({email:"",password:"",passwordConfirm:"",securityCode:""});
    const navigate = useNavigate();
    const [errorM, setErrorM] = useState("")
    //const [errorM2, setErrorM2] = useState("")

    //source for regex: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,68}$/;




    const submitHandler = e =>{
        e.preventDefault();
        UserForgotHandler(details,navigate,setErrorM,regularExpression);
    }

    return (
      //Registration form validates user input and simulate the user registering
      <div className="Registration">
      <Navbar/>  
        <div style={{padding: "8%"}}>

        <h1><i><u>Study Together</u></i></h1>
        <h1>Forgot Password</h1>
        <form onSubmit={submitHandler}>
          <div id="registerBox">
          <div>
            <label className='label'>
              Email
            </label>
            <input type="text" placeholder="Enter your email" name="email" id="email" size="30" onChange={e => setDetails({...details,email: e.target.value})} value={details.email} ></input>
            <label className='label'>
              Password
            </label>
            <input type="password" placeholder="Enter new password" name="password" id="password" size="30"  onChange={e => setDetails({...details,password: e.target.value})} value={details.password}></input>
            <label className='label'>
              Confirm Password
            </label>
            <input type="password" placeholder="Confirm new password" name="passwordConfirm" id="passwordConfirm" size="30"  onChange={e => setDetails({...details,passwordConfirm: e.target.value})} value={details.passwordConfirm}></input>
            <label className='label'>
              Security Code
            </label>
            <input type="text" placeholder="Enter security code" name="securityCode" id="securityCode" size="30" onChange={e => setDetails({...details,securityCode: e.target.value})} value={details.securityCode} ></input>
          </div>

          <input type="submit" value="Submit"></input>
          </div> 
          <h6>{errorM}</h6>
        </form>
      </div>
      </div>
    );
  }
  export default ForgotPassword;