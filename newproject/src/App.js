import React, { useEffect } from 'react'
import './App.css';
import Layout from './components/Layout'
import { useDispatch } from 'react-redux';
import { async_loaduser } from './store/actions/studentsActions';
import { Route, Routes } from 'react-router-dom';
import SceduleMeeting from './components/SceduleMeeting';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './helpers/ProtectedRoute';
import Profile from './components/student-dashboard-components/Profile';
import Courses from './components/student-dashboard-components/Courses';
import Meetings from './components/student-dashboard-components/Meetings';
import Feedback from './components/student-dashboard-components/Feedback';
import Packages from './components/student-dashboard-components/Packages';
import Bookings from './components/student-dashboard-components/Bookings';
import Payments from './components/student-dashboard-components/Payments';
import Enquirys from './components/student-dashboard-components/Enquirys';
import StudentSetting from './components/student-dashboard-components/StudentSetting';
import TeacherDetails from './components/TeacherDetails';
import CourseDetails from './components/CourseDetails';
import AdminDashboard from './components/admin-dashboard-components/AdminDashboard';
import AdminTeachers from './components/admin-dashboard-components/AdminTeachers'
import AdminStudents from './components/admin-dashboard-components/AdminStudents'
import AdminCourses from './components/admin-dashboard-components/AdminCourses'
import AdminMeetings from './components/admin-dashboard-components/AdminMeetings'
import AdminPackages from './components/admin-dashboard-components/AdminPackages'
import AdminBookings from './components/admin-dashboard-components/AdminBookings'
import AdminPayments from './components/admin-dashboard-components/AdminPayments'
import AdminEnquirys from './components/admin-dashboard-components/AdminEnquirys'
import AdminSettings from './components/admin-dashboard-components/AdminSettings'
import AdminDash from './components/admin-dashboard-components/AdminDash';
import AdminAddTeachers from './components/admin-dashboard-components/AdminAddTeachers'
import AdminAddStudents from './components/admin-dashboard-components/AdminAddStudents';
import AdminAddCourses from './components/admin-dashboard-components/AdminAddCourses';
import AdminEditCourse from './components/admin-dashboard-components/AdminEditPages/AdminEditCourse';
import AdminTeachersDetails from './components/admin-dashboard-components/AdminEditPages/AdminTeachersDetails';
import AdminEditTeacher from './components/admin-dashboard-components/AdminEditPages/AdminEditTeacher';
import AdminStudentsDetails from './components/admin-dashboard-components/AdminEditPages/AdminStudentsDetails';
import AdminEditStudent from './components/admin-dashboard-components/AdminEditPages/AdminEditStudent'
import AdminAddMeeting from './components/admin-dashboard-components/AdminAddMeeting';
import AdminEditMeeting from './components/admin-dashboard-components/AdminEditPages/AdminEditMeeting';
import AdminAddBooking from './components/admin-dashboard-components/AdminAddBooking';
import AdminEditBooking from './components/admin-dashboard-components/AdminEditPages/AdminEditBooking';
import AdminAddPackage from './components/admin-dashboard-components/AdminAddPackage';


const App = () => {

  const dispatch = useDispatch();
  // load user 
  useEffect(() => {
    dispatch(async_loaduser());
  });
 
  return <>
  
  {/* ---------------------------------------------------------------------------------------------------- */}
  
  <Routes>
      <Route 
        path='/'
        element={<Layout/>}
      />
      <Route   
          path ='/Scedule-Meeting'
          element={<SceduleMeeting/>}
      />
      <Route
          path='/TeacherDetails/:TeacherID'
          element={<TeacherDetails/>}
      
      />
      <Route
          path='/CourseDetails/:CourseID'
          element={<CourseDetails/>}
      />

            {/* Student Dashboard Routes */}
            <Route  
                  path ='/dashboard'
                  element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                  }
                  >
                  <Route
                      path='/dashboard/profile'
                      element={<Profile/>}
                  />
                   <Route
                      path='/dashboard/Courses'
                     element={<Courses/>}
                  /> 
                   <Route
                      path='/dashboard/Meetings'
                      element={<Meetings/>}
                  /> 
                   <Route
                      path='/dashboard/Feedback'
                      element={<Feedback/>}
                  /> 
                   <Route
                      path='/dashboard/Packages'
                      element={<Packages/>}
                  /> 
                   <Route
                      path='/dashboard/Bookings'
                      element={<Bookings/>}
                  /> 
                   <Route
                      path='/dashboard/Payments'
                      element={<Payments/>}
                  /> 
                   <Route
                      path='/dashboard/Enquirys'
                      element={<Enquirys/>}
                  /> 
                   <Route
                      path='/dashboard/setting'
                      element={<StudentSetting/>}
                  />     
            </Route>

            {/* Admin  Dashboard Routes */}
            <Route
                  path='/Admin-Dashboard/'
                  element={<AdminDashboard/>}
                >
                  <Route
                    index
                      path='/Admin-Dashboard/Dashboard'
                      element={<AdminDash/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Teachers'
                      element={<AdminTeachers/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Teachers/add-teacher'
                      element={<AdminAddTeachers/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Teachers/edit-teacher/:id'
                      element={<AdminEditTeacher/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Teachers/teachersDetails/:id'
                      element={<AdminTeachersDetails/>}
                  />  
                  <Route
                      path='/Admin-Dashboard/Students'
                      element={<AdminStudents/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Students/add-student'
                      element={<AdminAddStudents/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Students/edit-student/:id'
                      element={<AdminEditStudent/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Students/studentsDetails/:id'
                      element={<AdminStudentsDetails/>}
                  />  
                  <Route
                      path='/Admin-Dashboard/Courses'
                      element={<AdminCourses/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Courses/add-courses'
                      element={<AdminAddCourses/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Courses/edit-Courses/:id'
                      element={<AdminEditCourse/>}
                  /> 
                  <Route
                      path='/Admin-Dashboard/Meetings'
                      element={<AdminMeetings/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Meetings/add-meeting'
                      element={<AdminAddMeeting/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Meetings/edit-Meetings/:id'
                      element={<AdminEditMeeting/>}
                  />
                  
                  <Route
                      path='/Admin-Dashboard/Packages'
                      element={<AdminPackages/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Packages/add-package'
                      element={<AdminAddPackage/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Bookings'
                      element={<AdminBookings/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Bookings/add-booking'
                      element={<AdminAddBooking/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Bookings/edit-booking/:id'
                      element={<AdminEditBooking/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Payments'
                      element={<AdminPayments/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Enquirys'
                      element={<AdminEnquirys/>}
                  />
                  <Route
                      path='/Admin-Dashboard/Settings'
                      element={<AdminSettings/>}
                  />
                  {/* <Route
                      path='/Admin-Dashboard/Logout'
                      element={<AdminTeachers/>}
                  /> */}
            </Route>


    </Routes>
    
  </> 


}

export default App