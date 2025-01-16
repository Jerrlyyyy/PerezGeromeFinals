import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pagefirst from './Components/Pagefirst/Pagefirst';
import Studentform from './Components/Studentform/Studentform';
import StudentEventform from './Components/StudentEventform/StudentEventform';
import AddNewEventform from './Components/AddNewEventform/AddNewEventform';
import EventList from './Components/EventList/EventList';
import StudentEventList from './Components/StudentEventList/StudentEventList';
import YearLevel from './Components/YearLevel/BSITYearLevel';
import CoursesList from './Components/CoursesList/CoursesList';
import Login from './Components/Login/Login';
import LoginAdmin from './Components/Login/LoginAdmin';
import LoginProgramHead from './Components/Login/LoginProgramHead.js';
import Adminpage from './Components/Adminpage/Adminpage';
import StudentProfile from './Components/StudentProfile/StudentProfile';
import ProgramHead from './Components/ProgramHead/ProgramHead.js';
import ProgramHeadDashboard from './Components/ProgramHead/ProgramHead.js'; // New import
import EventManagement from './Components/EventManagement/EventManagement';

// BSIT Components
import Firstyearlist from './Components/BSIT/Firstyearlist';
import BSITSecondyearlist from './Components/BSIT/BSITSecondyearlist';
import BSITThirdyearlist from './Components/BSIT/BSITThirdyearlist';
import BSITFourthyearlist from './Components/BSIT/BSITFourthyearlist';

import Updatefirstyear from './Components/BSITUpdate/Updatefirstyear';
import Updatesecondyear from './Components/BSITUpdate/Updatesecondyear';
import Updatethirdyear from './Components/BSITUpdate/Updatethirdyear';
import Updatefourtheyear from './Components/BSITUpdate/Updatefourtheyear';

// BLIS Components
import BLISYearLevel from './Components/YearLevel/BLISYearLevel';
import FirstyrBLIS from './Components/BLIS/FirstyrBLIS';
import SecondYearBLIS from './Components/BLIS/SecondYearBLIS.js';
import ThirdYearBLIS from './Components/BLIS/ThirdYearBLIS.js';
import FourthYearBLIS from './Components/BLIS/FourthYearBLIS.js';

import UpdateFirstyearBLIS from './Components/BLISUpdate/UpdateFirstyearBLIS.js';
import UpdateSecondyearBLIS from './Components/BLISUpdate/UpdateSecondyearBLIS.js';
import Notification from './Components/Notification/Notification.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagefirst />} />

          {/* Log in Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginProgramHead" element={<LoginProgramHead />} />

          {/* Admin landing page */}
          <Route path="/adminpage" element={<Adminpage />} />

          {/* Program Head Routes */}
          <Route path="/programhead" element={<ProgramHead />} />
          <Route path="/programhead/dashboard" element={<ProgramHeadDashboard />} />
          <Route path="/faculty" element={<div>Faculty Page</div>} />
          <Route path="/students" element={<div>Students Page</div>} />
          <Route path="/reports" element={<div>Reports Page</div>} />
          <Route path="/schedule" element={<div>Schedule Page</div>} />

          {/* Event Management Route */}
          <Route path="/event-management" element={<EventManagement />} />

          {/* BSIT year level */}
          <Route path="/yearlevel" element={<YearLevel />} />
          <Route path="/firstyearlist" element={<Firstyearlist />} />
          <Route path="/bsitsecondyearlist" element={<BSITSecondyearlist />} />
          <Route path="/bsitthirdyearlist" element={<BSITThirdyearlist />} />
          <Route path="/bsitfourthyearlist" element={<BSITFourthyearlist />} />

          <Route path="/firstyearlist/updatefrstyear/:id" element={<Updatefirstyear />} />
          <Route path="/bsitsecondyearlist/updatesecondyear/:id" element={<Updatesecondyear />} />
          <Route path="/bsitthirdyearlist/updatethirdyear/:id" element={<Updatethirdyear />} />
          <Route path="/bsitfourthyearlist/updatefourthyear/:id" element={<Updatefourtheyear />} />

          {/* BLIS year level */}
          <Route path="/BLISyearlevel" element={<BLISYearLevel />} />
          <Route path="/BLISfirstyearlist" element={<FirstyrBLIS />} />
          <Route path="/BLISsecondyearlist" element={<SecondYearBLIS />} />
          <Route path="/BLISthirdyearlist" element={<ThirdYearBLIS />} />
          <Route path="/BLISfourthyearlist" element={<FourthYearBLIS />} />

          <Route path="/BLISfirstyearlist/updatefirstyearblis/:id" element={<UpdateFirstyearBLIS />} />
          <Route path="/BLISsecondyearlist/updatesecondyearblis/:id" element={<UpdateSecondyearBLIS />} />

          {/* Other Routes */}
          <Route path="/studentform" element={<Studentform />} />
          <Route path="/studenteventform" element={<StudentEventform />} />
          <Route path="/addeventform" element={<AddNewEventform />} />
          <Route path="/studenteventlist" element={<StudentEventList />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/courselist" element={<CoursesList />} />
          <Route path="/eventlist" element={<EventList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
