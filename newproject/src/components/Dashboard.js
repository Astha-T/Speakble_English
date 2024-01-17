import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { async_removeuser } from '../store/actions/studentsActions'
      

const Dashboard = () => {
const location = useLocation()
const navigate = useNavigate()
const dispatch = useDispatch()
const logoutHandler = () => {
  dispatch(async_removeuser())
  // setActive()
}
useEffect(() => {
 navigate('/dashboard/profile')
}, [])


  return (
       <div className='col-md-12  Admin-Dashboard_main_div'>
       <div className='Admin-Dashboard_main_left_div'>
           <NavLink to='/dashboard'
                    className='Admin-Dashboard_main_left_header_div'>
                   <h5>Speakable English</h5>
                   <h5>Student</h5>
           </NavLink>
           <div className='Admin-Dashboard_main_left_router_div'>
               <NavLink
                to='/dashboard/profile'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/dashboard/profile' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-person-fill-gear"></i></span>
                 <span>Profile</span>
               </NavLink>
               <NavLink
                to='/dashboard/Packages'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/dashboard/Packages' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-basket3-fill"></i></span>
                 <span>Packages</span>
               </NavLink>
               <NavLink
                to='/dashboard/Bookings'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/dashboard/Bookings' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-bookmark-dash-fill"></i></span>
                 <span>Bookings</span>
               </NavLink>
               <NavLink
                to='/dashboard/Payments'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/dashboard/Payments' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-currency-dollar"></i></span>
                 <span>Payments</span>
               </NavLink>
               <NavLink
                to='/dashboard/Enquirys'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/dashboard/Enquirys' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-chat-right-quote-fill"></i></span>
                 <span>Enquiries</span>
               </NavLink>
               <NavLink
                to='/dashboard/setting'
                className={ `Admin-Dashboard_router_col_ ${
                     location.pathname === '/dashboard/setting' ? 'active' : 'inactive'
                     }`}
                     >
                 <span><i className="bi bi-gear-fill"></i></span>
                 <span>Settings</span>
               </NavLink>
               <NavLink
                onClick={logoutHandler}
                className={ `Admin-Dashboard_router_col_ inactive `
                }
               >
                 <span><i className="bi bi-box-arrow-right"></i></span>
                 <span>Logout</span>
               </NavLink>
           </div>
       </div>
       <div className='Admin-Dashboard_main_right_div'>
                   <Outlet/>
       </div>  
</div>
  )
}

export default Dashboard