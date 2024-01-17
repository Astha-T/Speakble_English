import React from 'react'
// import {Link } from 'react-router-dom'

const Packages = () => {
  const PackageData = [
    {Course_Name:"General English", Amount:"200", Teacher_name:"Teacher1",Total_Lectures:10, Attended_Lectures:3,Booking_Date:4/1/24, Next_Lecture:10/1/24 },
    {Course_Name:"English for Kids", Amount:"400", Teacher_name:"Teacher2",Total_Lectures:8, Attended_Lectures:4, Booking_Date:4/1/24, Next_Lecture:10/1/24},
    
]

  return (
    <div className='Student_mainPage_style'>
      <div className='Student_header_style'>
        <h6 className='text-dark'>Package Table</h6>
      </div>
      <div className='Student_list_style mt-3'>
        <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Course_Name</th>
              <th className='th'>Teacher's Name</th>
              <th className='th'>Amount</th>
              <th className='th'>Total Lectures</th>
              <th className='th'>Attended Lectures</th>
              {/* Add more table headers based on your schema */}
            </tr>
          </thead>
          <tbody>
            {PackageData?.map((Package,index) => (
              <tr style={{ boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}  key={index}>
                <td className='td'>{Package.Course_Name}</td>
                <td className='td'>{Package.Teacher_name}</td>
                <td className='td'>{Package.Amount}</td>
                <td className='td'>{Package.Total_Lectures}</td>
                <td className='td'>{Package.Attended_Lectures}</td>
                {/* Add more table data based on your schema */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Packages