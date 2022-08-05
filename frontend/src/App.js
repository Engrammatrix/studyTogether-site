import { Routes, Route,} from "react-router-dom";
import './App.css';
import Registration from './includes/Registration.js';
import DashboardUnregistered from './includes/DashboardUnregistered.js';
import Dashboard from './includes/Dashboard.js';
import Login from './includes/Login.js';


import ForgotPassword from './includes/ForgotPassword.js';
import CreateGroup from './includes/CreateGroup.js';
import StudyGroup from './includes/StudyGroup.js';
import Search from './includes/Search.js'
import Help from './includes/Help.js'
import NotFound from './includes/NotFound';
import Profile from './includes/Profile';
import Searchout from './includes/searchout';
import Helpout from './includes/helpout'

//Created by Noah Cormier-Ratajczak - B00812758
//Updated by Nafiz Mazumder - B00811858
//Updated by Keaton Gibb - B00833276

 export default function App() {
   //React router linking created with the help of: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx
   //React router linking created with the help of: https://www.w3schools.com/react/react_router.asp
  return(
    <div>
      <Routes>
          <Route path="/" element={<DashboardUnregistered />}></Route>
          <Route path="dashboard/:id" element={<Dashboard />}></Route>
          <Route path="profile/:id" element={<Profile />}></Route>
          <Route path="registration" element={<Registration />}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="forgotPassword" element={<ForgotPassword/>}></Route>
          <Route path="studyGroup" element={<StudyGroup/>}></Route>
          <Route path="search/:id" element={<Search/>}></Route>
          <Route path="searchout" element={<Searchout/>}></Route>
          <Route path="createGroup/:id" element={<CreateGroup/>}></Route>
          <Route path="dashboardUnregistered/:id" element={<DashboardUnregistered />}></Route>  
          <Route path="help/:id" element={<Help />}></Route>  
          <Route path="helpout" element={<Helpout />}></Route>  
          <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}