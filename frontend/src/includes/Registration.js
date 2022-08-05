//Created by Noah Cormier-Ratajczak - B00812758 - For the Registration feature & forgot password security code alert
import '../css/login.css';
import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavigationLoggedOut'
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import {v4 as uuid} from "uuid"; 
import CryptoJS from "crypto-js"



function Registration() {
  //registration form created with the help of: https://www.geeksforgeeks.org/how-to-develop-user-registration-form-in-reactjs/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [post, setPost] = React.useState(null);
  const api_url = 'http://localhost:8080/adduser'
  const navigate = useNavigate();
  //navigate hook used from: https://www.kindacode.com/article/programmatically-navigate-using-react-router/
  const [submitted, setSubmitted] = useState(false);

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  
  const submittedHandler = async (e) => {
    e.preventDefault();
    //email validation regex used from: https://www.w3resource.com/javascript/form/email-validation.php
    //first and last name regex used from: https://www.w3resource.com/javascript/form/all-letters-field.php
    //password regex used from: https://www.codegrepper.com/code-examples/whatever/regex+allow+alphanumeric+and+special+characters
    if(firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '' ||
    password.length < 8 || !(confirmPassword === password) || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    || !/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)){
      alert("Please fill out all the fields or fill them out correctly");
      setSubmitted(false);
    }
    else{
     const hashedpassword = await bcrypt.hash(password,10)
     //const securityCode = uuid()
      setSubmitted(true);
      await axios.post(api_url, {
        email: email,
        password: hashedpassword,
        firstName: firstName,
        lastName: lastName

      }).then((res) => {
        console.log(res.data);
        const id = JSON.parse(JSON.stringify(res.data.user._id))
        const ciphersecurityCode = JSON.parse(JSON.stringify(res.data.user.securityCode))
        const bytes = CryptoJS.AES.decrypt(ciphersecurityCode, hashedpassword);
        //const securityCode  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const securityCode  =  CryptoJS.AES.decrypt(ciphersecurityCode,hashedpassword).toString(CryptoJS.enc.Utf8)
        console.log(securityCode)
        alert(`Write this code down somewhere. You can also find in your profile\n\n
        you will need it if you ever forget your password\n\n
        ${securityCode}`)
        navigate(`/Login`)
      }).catch(err => {
        console.log(err)
      });
      
      //navigate("/Login");
    }
    console.log(submitted);
  };

  return (
    //Registration form validates user input and simulate the user registering
    <div className="Registration">
      <Navbar />
      <div style={{padding: "5%"}}>
        <h1><i><u>Study Together</u></i></h1>
        <h1>Registration</h1>
        <form>
          <div id="registerBox">
          <div>
            <label className='label'>
              <b><u>First Name</u></b>
            </label>
            <p>Only letters are accepted</p>
            <input type="text" size="30" value={firstName} id="email"  onChange={firstNameHandler}></input>

            <label className='label'>
              <b><u>Last Name</u></b>
            </label>
            <p>Only letters are accepted</p>
            <input type="text"  size="30" value={lastName} id="email"  onChange={lastNameHandler}></input>

            <label className='label'>
              <b><u>Email</u></b>
            </label>
            <p>e.g. something@email.com</p>
            <input value={email}  size="30" id="email"  onChange={emailHandler}></input>

            <label className='label'>
              <b><u>Password</u></b>
            </label>
            <p>Minimum 8 characters</p>
              <input value={password} type="password"  id="password" size="30" onChange={passwordHandler}></input>
            <label className='label'>
              <b><u>Confirm Password</u></b>
            </label>
            <p>Must match the password above</p>
            <input value={confirmPassword} type="password" id="password" size="30" onChange={confirmPasswordHandler}></input>
          </div>
          <br/>
          <div>
            <input type ="submit"  value = "Submit" onClick={submittedHandler}></input>
          </div>
          <br/>
          </div> 
        </form>
      </div>
    </div>
  );
}
export default Registration;