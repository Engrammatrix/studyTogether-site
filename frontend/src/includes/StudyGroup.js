import '../App.css';
import Navbar from './Navigation'

function StudyGroup(){
  return(
    <div>
      <Navbar />
      <ul style={{backgroundColor: "#e79215"}}>
        <li style={{backgroundColor: "#e79215", borderRight: "2px", borderRightColor: "black", borderStyle: "solid", width: "100%"}}>
            <h3 style={{textAlign: "center"}}>Example Group #1</h3>
        </li>
      </ul>
      <div class="row">
        <div class="column" style={{width: "50%"}}>
          <h2 style={{textAlign: "center"}}><u>Group Details</u></h2>
          <h3>Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <h3>Session Days and Times</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <h3>Communication Tool(s)</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus.</p>
          <br></br>
          <h3>Project task</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus.</p>
          <br></br>
          <h3>Group members</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus.</p>
          <br></br>
          
          
        </div>
        <div class="column" style={{width: "49.5%"}}>
          <h2 style={{textAlign: "center"}}><u>Group Announcements</u></h2>
          <h3>Group Announcement</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <h3>Group Announcement</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <h3>Group Announcement</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <h3>Group Announcement</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus ante eu elit efficitur, quis vestibulum metus tincidunt. Nullam vel lacinia dolor, ac varius lacus</p>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}
export default StudyGroup