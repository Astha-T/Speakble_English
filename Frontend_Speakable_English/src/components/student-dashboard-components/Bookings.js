import React from 'react'
// import {Link } from 'react-router-dom'

const Bookings = () => {
  const BookingData = [
    {Note_for_teacher:"I am a beginner", Amount:"200", Teacher_name:"Teacher1",Status:"Scheduled", Scheduled_Date:"30/12/23", Time_Slot:"4:30 PM-6:00 PM" },
    {Note_for_teacher:"I want to learn database", Amount:"500", Teacher_name:"Teacher2",Status:"Scheduled", Scheduled_Date:"4/1/24", Time_Slot:"2:00 PM-3:00 PM" },
    {Note_for_teacher:"Please reschedule the meeting", Amount:"300", Teacher_name:"Teacher3",Status:"Scheduled", Scheduled_Date:"6/1/24", Time_Slot:"12:30 PM-2:30 PM" }
]

  return (
    <div className='Student_mainPage_style'>
      <div className='Student_header_style'>
        <h6 className='text-dark'>Booking Table</h6>
      </div>
      <div className='Student_list_style mt-3'>
        <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Note for Teacher</th>
              <th className='th'>Teacher's Name</th>
              <th className='th'>Status</th>
              <th className='th'>Amount</th>
              <th className='th'>Scheduled Date</th>
              <th className='th'>Time Slot</th>
              {/* Add more table headers based on your schema */}
            </tr>
          </thead>
          <tbody>
            {BookingData?.map((booking,index) => (
              <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}   key={index}>
                <td className='td'>{booking.Note_for_teacher}</td>
                <td className='td'>{booking.Teacher_name}</td>
                <td className='td'>{booking.Status}</td>
                <td className='td'>{booking.Amount}</td>
                <td className='td'>{booking.Scheduled_Date}</td>
                <td className='td'>{booking.Time_Slot}</td>
                {/* Add more table data based on your schema */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Bookings