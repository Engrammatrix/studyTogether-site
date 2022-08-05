//Created by Nafiz Mazumder - B00811858
import axios from 'axios'
import React, {useEffect} from 'react'
import '../App.css';
import Navbar from './NavigationLoggedOut'

function DashboardRegister(){
  //simulate dashboard before the user is registered

   useEffect(() => {
    const api_url_publicGroups = `http://localhost:8080/publicgroups`
    //const api_url_publicGroups = `https://group21studytogether-api.herokuapp.com/publicgroups`

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
    getPublicGroups()
  }, []);
  return(
    <div>
      <Navbar />
      <div class="row">
        <div class="column" >
          <div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>My Groups</u></h2>
            <h4>You must login to view your groups</h4>
          </div>
        </div>
        <div class="centerColumn" >
        <div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>Group Announcements</u></h2>
            <h4>You must login to view group announcements</h4>
          </div>
          
        </div>
        <div class="column" >
          <div div className='colContent'>
            <h2 style={{textAlign: "center"}}><u>Public Groups</u></h2>
            <p className='publicGroups'> </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardRegister;
