import Faq from "react-faq-component"

import '../App.css';
import Navbar from './NavigationLoggedOut'

function Help() {

  // Faq component url: https://www.npmjs.com/package/react-faq-component
  const data = {
      title: "FAQ",
      rows: [
          {
          "title": "How do I create a group?",
          "content": "After Logging in, click on 'Create Group' in the Navigation menu. Then fill in the desired characteristics of the group and select 'Create'.\n"
          },
          {
          "title": "How do I create an account?",
          "content": "In the top right corner of the Navigation menu, you'll see an option that says 'Register'. Select 'Register' and then fill out the required fields then click 'Submit' to create account. After that you can then click 'login' to enter account.\n"
          },
          {
          "title": "How do I join a group?",
          "content": "Type in the searchbar the keywords or names of groups you are looking for, then select join.\n"
          },
          {
          "title": "How do I view my groups or group announcements?",
          "content": "Navigate to the Dashboard by clicking on 'Dashboard' or 'Study Together' in the Navigation menu.\n"
          },
          {
          "title": "How do I join a private group?",
          "content": "Joining a private group requires permission before you can get the study group communication info. You can request access from the Admin to join.\n"
          }
      ]
  };

  const styles = {
      titleTextColor: "grey",
      rowTitleColor: "orange",
  };

  const config = {
      // animate: true,
      // arrowIcon: "V",
      // tabFocus: true
  };
      
  return(
      <div>
        <Navbar />
        <div style={{height: "100vh"}}>
          <div style={{padding: "5%"}}>

          <Faq
              data = {data}
              styles = {styles}
              config = {config}
          />

          </div>
          
        </div>
      </div>
  );
}

export default Help;