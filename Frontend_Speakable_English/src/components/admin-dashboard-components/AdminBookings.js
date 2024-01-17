
import React , {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from './AdminNav';
 import { fetchAllbookings, Deletebooking} from '../../store/actions/bookingActions';

const AdminBookings = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.bookings.Allbookinglist);
  console.log(bookings)
 
   useEffect(()=>{
    dispatch(fetchAllbookings())
   },[])

   const DeleteBooking = (e) => {
    dispatch(Deletebooking(e))
    window.location.reload(true)
   }

   const EditBooking= (e) => {
    navigate(`/Admin-Dashboard/Bookings/edit-booking/${e}`)
  }


  return (
    <>
    <AdminNav/>
    
    <div className='Booking_mainPage_style'>
      <div className='Booking_header_style'>
        <h6 className='text-dark'>Booking Table</h6>
        <Link to='/Admin-Dashboard/Bookings/add-booking'>
            <button className='btn btn-outline-success'>Add Booking</button>
        </Link>
      </div>
      <div className='Booking_list_style d-flex flex-wrap flex-row'>
        <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Student ID</th>
              <th className='th'>Note for Teacher</th>
              <th className='th'>Scheduled Date</th>
              {/* <th>Time Slot</th> */}
              <th className='th'>Teacher ID</th>
              <th className='th'>Meeting ID</th>
              <th className='th'>Status</th>
              <th className='th'>Actions</th>
              {/* Add more table headers based on your schema */}
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr  style={{boxShadow:'0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)',borderRadius:"8px"}} key={booking._id}>
                <td className='td'>{booking.Student_ID}</td>
                <td className='td'>{booking.Note_for_teacher.substring(0,25)}</td>
                <td className='td'>{new Date(booking.Scheduled_Date).toLocaleDateString()}</td>
                {/* <td>
                  From: {booking.Time_Slot.From_Time}<br />
                  To: {booking.Time_Slot.To_Time}<br />
                  Scheduled Hours: {booking.Time_Slot.Sehduled_Hour}
                </td> */}
                <td className='td'>{booking.Teachers_ID}</td>
                <td className='td'>{booking.Meeting_ID}</td>
                <td className='td'>{booking.Status}</td>
                <td>
                <button onClick={()=>EditBooking(booking._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-pen-fill"></i></button>
                <button onClick={()=>DeleteBooking(booking._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-trash-fill"></i></button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default AdminBookings