import React from 'react'


const Profile = () => {
  return (
    <div className='StudentProfile_mainPage_style'>
      
        <div className='StudentProfile_header_style'>
         <img align="left" className="StudentProfile_picture_style" src="https://akademi.dexignlab.com/xhtml/images/avatar/9.jpg" alt="Profile image example" width='120' height="120"/>
        </div>
        
        <div className='row StudentName_style'>
            <h1 className='studentName'>Student1</h1>
            <p className='studenttext'>student</p>
        </div> 

        <div className='row'>
          <div className='col-md-6 col-xs-12 '>
            <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-envelope userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Email:</p>
            <p  className='userDetailTextData'>student1@gmail.com</p>
            </div>
            </div>
        </div>
          
          <div className='col-md-6 col-xs-12'>
          <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-geo-alt userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Address:</p>
            <p  className='userDetailTextData'>US</p>
            </div>
        </div>
        </div>

        <div className='col-md-6 col-xs-12'>
          <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-telephone userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Phone:</p>
            <p  className='userDetailTextData'>874384378</p>
            </div>
        </div>
        </div>

        <div className='col-md-6 col-xs-12'>
          <div className='userDetail'>
          <div className='userDetaildiv' >
            <i className="bi bi-person userDetailIcon"></i>
            </div>
            <div className='userDetailText'>
            <p  className='userDetailTextTitle'>Student Id:</p>
            <p  className='userDetailTextData'>657c52e06311aa2453ef0ba8</p>
            </div>
        </div>
        </div>
          </div>
        </div>
        
  )
}

export default Profile