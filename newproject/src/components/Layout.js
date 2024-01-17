// Layout component
import React from 'react';
import Navbar from './landingcomponents/Navbar';
import ChatBotButton from './landingcomponents/ChatBotButton';
import Ourteacher from './landingcomponents/Ourteacher';
import Home from './landingcomponents/Home';
import About from './landingcomponents/About';
import Courses from './landingcomponents/Courses';
import Reviews from './landingcomponents/Reviews';
import Contact from './landingcomponents/Contact';
import Foot from './landingcomponents/Foot';
import Teacher from './landingcomponents/Teacher';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Layout = () => {

  const isAuthenticated  = useSelector((state) => state.students.isAuthenticated);
  const navigate = useNavigate()



  if(!isAuthenticated){
     console.log("not authenticated !")
  return <>
    <div>
        <Navbar />
        <br />
        <br />
        <br />
        <Home name='Home'/>
        <Courses name='Courses'/>
        <Teacher name='Teacher'/>
        <About name='About'/>
        <Ourteacher name='OurTeachers'/>
        <Reviews name='Reviews'/>
        <Contact name='Contact'/>
        <Foot name='Foot'/>
        <ChatBotButton/>
    </div>
    </>
  
  }
  else{
    navigate('/dashboard')
  }
}

export default Layout;
