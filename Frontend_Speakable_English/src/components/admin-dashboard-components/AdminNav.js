import React from 'react'

const AdminNav = () => {
  return (
    <div className='Admin-Dashboard_main_right_nav_div'>
    <div className='Admin-Dashboard_nav_left_div'>
         <i class="bi bi-text-left"></i>
         <i class="bi bi-bell-fill"></i>   
         <i class="bi bi-envelope-fill"></i>
         <i class="bi bi-chat-square-text-fill"></i>
         <i class="bi bi-calendar3"></i>
    </div>
    <div className='Admin-Dashboard_nav_search_div'>
            <i class="bi bi-search"></i>
            <input
                name='search_Input'
                placeholder='Search by Teacher, Student, Fees more details...'
            />
    </div>
    <div className='Admin-Dashboard_nav_right_div'>
            <div className='Admin-Dashboard_nav_right_Name_div'>
                <span>Anushka Sharma</span>
                <div className='Admin-Dashboard_nav_right_Name_status_div'>
                    <div></div>
                    <span>Online</span>
                </div>
            </div>
        <div className='Admin-Dashboard_nav_right_img_div'>
            <img src= 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                 alt='user'/>
        </div>
    </div>
</div>
  )
}

export default AdminNav