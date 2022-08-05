//Created by Nafiz Mazumder - B00811858
import axios from 'axios'
import React, {useEffect} from 'react'
import {useParams } from "react-router-dom";
import '../css/login.css';
import '../App.css';
import Navbar from './Navigation'

function Dashboard(){
    const {id} = useParams();
    useEffect(() => {
   
    const api_url_publicGroups = `http://localhost:8080/publicgroups`
    const api_url_myProfile = `http://localhost:8080/user/${id}`

    const getMyGroups = () =>{  
      axios.get(api_url_myProfile, {
      }).then(res=>{
        const id2 = res.data.user._id

        axios.get(`http://localhost:8080/mygroups/${id2}`, {
        }).then(res=>{
            const myGroups = res.data.groups;
            const length = myGroups.length;
            
            for (var i=length-1; i >= 0; i--) {
              var h4tag = document.createElement("h4");
              var ptag = document.createElement("p");
              var groupName = document.createTextNode(res.data.groups[i].name); 
              var groupDescription = document.createTextNode(res.data.groups[i].description); 
  
              h4tag.appendChild(groupName);
              ptag.appendChild(groupDescription);
              const displayGroups = document.getElementsByClassName('myGroups');
              displayGroups[0].appendChild(h4tag);
              displayGroups[0].appendChild(ptag);
            } 
        }).catch(err => {
            console.log(err)
        })
      })  
      
    }

    const getGroupAnnouncements = () =>{
      axios.get(api_url_myProfile, {

      }).then(res=>{
        const id2 = res.data.user._id
      axios.get(`http://localhost:8080/mygroups/${id2}`, {
      }).then(res=>{
          const myGroups = res.data.groups;
          const length = myGroups.length;
          var count = 0;
          for (var x=length-1; x >= 0; x--) {
            var addCounts = res.data.groups[x].announcements.length-1
            count+=addCounts
          }
          console.log(count)
          
          for (var i=length-1; i >= 0; i--) {
            var h4tag = document.createElement("h4");
            
            if(res.data.groups[i].announcements.length > 1){
              var groupName = document.createTextNode(res.data.groups[i].name); 
              h4tag.appendChild(groupName);
              const displayGroups = document.getElementsByClassName('groupAnnouncements');
              displayGroups[0].appendChild(h4tag);
              for (var a=res.data.groups[i].announcements.length-1; a > 0; a--) {
                var ptag = document.createElement("p");
                var groupAnnouncements = document.createTextNode(res.data.groups[i].announcements[a]); 
                ptag.appendChild(groupAnnouncements);
                displayGroups[0].appendChild(ptag);
              }
            }
          } 
      }).catch(err => {
          console.log(err)
      })
    })
    }

    const getPublicGroups = () =>{    
      axios.get(api_url_publicGroups, {
      }).then(res=>{
          const publicGroups = res.data.groups;
          const length = publicGroups.length;
          
          for (var i=length-1; i >= 0; i--) {
            var h4tag = document.createElement("h4");
            var ptag = document.createElement("p");
            var groupName = document.createTextNode(res.data.groups[i].name); 
            var groupDescription = document.createTextNode(res.data.groups[i].description); 

            h4tag.appendChild(groupName);
            ptag.appendChild(groupDescription);
            const displayGroups = document.getElementsByClassName('publicGroups');
            displayGroups[0].appendChild(h4tag);
            displayGroups[0].appendChild(ptag);
          } 
      }).catch(err => {
          console.log(err)
      })
    }
    //getGroupAnnouncements()
    getMyGroups()
    getPublicGroups()
  }, [id]);
  
  return(
    <div>
      <Navbar />
      <div className="row">
        <div className="column" >
          <div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>My Groups</u></h2>
            <div className='myGroups' > </div>
          </div>
        </div>
        <div className="centerColumn" >
          <div div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>Group Announcements</u></h2>
            <div className='groupAnnouncements' > </div>
            <br></br>
          </div>
        </div>
        <div className="column" >
          <div div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>Public Groups</u></h2>
            <div className='publicGroups'> </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
