import '../App.css';
import React, {useState} from 'react'
import Navbar from './Navigation'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

function CreateGroup(){
  const {id} = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [size, setSize] = useState(5)
  const [visibility, setVisibility] = useState("Public")
  const [description, setDescription] = useState("")
  const [response, setResponse] = useState("")

 
 const api_url_myProfile = `http://localhost:8080/user/${id}`

  const handleCreate = () =>{    
    //console.log(session)
    if(name===""){
      setResponse("Please enter a name for the group")    
    }
    else{
      axios.get(api_url_myProfile, {
      }).then(res=>{
        const id2 = res.data.user._id
        console.log(id2)
        axios.post(`http://localhost:8080/addgroup/${id2}`, {
          name: name,
          size: size,
          visibility: visibility,
          description: description,
          }).then(res=>{
            console.log(res.data)
            navigate(`/dashboard/${id}`)
          }).catch(err => {
            console.log(err)
          })
      }).catch(err => {
        console.log(err)
        console.log(id)
    })
     
    }
  }
  const handleCancel = () =>{    
    navigate(`/dashboard/${id}`)
  }

  return(
    <div>
      <Navbar />
        <div className="create">
          <form className='createForm'>
          <h2><u>New Group</u></h2>
          <div>
            <div className='formFields'>
              <label>
                Group Name
                <input 
                  className='labels' 
                  type="text" 
                  placeholder="Enter your study group name" 
                  value={name}
                  onChange={e => setName(e.target.value)}>
                </input>
              </label>
            </div>
            <div className='formFields'>
              <label>
                Size
                <input 
                  className='labels' 
                  type="number" 
                  min="5" 
                  max="30" 
                  placeholder="Enter your study group size" 
                  value={size}
                  onChange={e => setSize(e.target.value)}>
                </input>
              </label>
            </div>
            <div className='formFields'>
              <label>
                Visibility
                <select 
                  className='labels' 
                  value={visibility}
                  onChange={e => setVisibility(e.target.value)}>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </label>
            </div>
            <div className='formFields'>
              <label>
                Description
                <textarea 
                  className='labels' 
                  name="Description" 
                  placeholder="Enter group description here..." 
                  value={description}
                  onChange={e => setDescription(e.target.value)}>
                </textarea>
              </label>
            </div>
            <div className='formFields'>
              <div className='createBtn'>
                <button type ="button" onClick={handleCancel}>Cancel</button>
                <button type ="button" onClick={handleCreate}>Create</button>
              </div>
            </div>
            <h4 style={{color: "red"}}>{response}</h4>
          </div>
        </form>
        </div>   
      </div>  
  );
}
export default CreateGroup;
