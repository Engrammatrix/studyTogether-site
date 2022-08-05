import '../App.css';
import Navbar from './Navigation'
import axios from 'axios'
import React, {useEffect} from 'react'
import {useParams } from "react-router-dom";
import CryptoJS from "crypto-js"
function Profile(){

  const {id} = useParams();
  useEffect(() => {
  const api_url_myProfile = `http://localhost:8080/user/${id}`

  const getMyProfile = () =>{    
    axios.get(api_url_myProfile, {
    }).then(res=>{
       const Fname = res.data.user.firstName;
        const Lname = res.data.user.lastName;
        const email = res.data.user.email;
        const ensecurityCode = res.data.user.securityCode;

        console.log(res);
        console.log(Fname);
        console.log(Lname);
        console.log(email);
        console.log(ensecurityCode);

        var ptag = document.createElement("p");
        var firstName = document.createTextNode(res.data.user.firstName);
        

        const displayUser = document.getElementsByClassName('UserFirstName');
        var ptag1 = document.createElement("p");
        var ptag2 = document.createElement("p");
        var ptag3 = document.createElement("p");


        
        var lastName = document.createTextNode(res.data.user.lastName);
        var Emailuser = document.createTextNode(res.data.user.email);
        var encryptedsecurityCode = document.createTextNode(res.data.user.securityCode);

        const dencryptedsecurityCode = document.createTextNode(CryptoJS.AES.decrypt(ensecurityCode,res.data.user.password).toString(CryptoJS.enc.Utf8));
        
        const displayUser2 = document.getElementsByClassName('UserLastName');
        const displayUser3 = document.getElementsByClassName('UserEmail');
        const displayUser4 = document.getElementsByClassName('UserRecoverycode');

        console.log(dencryptedsecurityCode);
        ptag.appendChild(firstName);
        ptag1.appendChild(lastName);
        ptag2.appendChild(Emailuser);
        ptag3.appendChild(dencryptedsecurityCode);

        

        displayUser[0].appendChild(ptag);
        displayUser2[0].appendChild(ptag1);
        displayUser3[0].appendChild(ptag2);
        displayUser4[0].appendChild(ptag3);







      
    }).catch(err => {
        console.log(err)
    })
  }

  

  
  getMyProfile()
}, [id]);

  return(
    <div>
      <Navbar />
      <div className="row">

      <div className="centerColumn" >
          <div div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>User Profile</u></h2>
            <div className='UserFirstName'> 
            <h4>First Name:</h4></div>
            <div className='UserLastName'>
            <h4>Last Name:</h4> </div>
            <div className='UserEmail'> 
            <h4>Email:</h4></div>
            <div className='UserRecoverycode'> 
            <h4>Recoverycode:</h4></div>

            <br></br>
          </div>
        </div>

      </div>
    </div>
  );
}
export default Profile;
