import React, {useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { GetTeachers,fetchTeacherDetails } from '../../../store/actions/teachersActions';
import { fetchAllstudents } from '../../../store/actions/studentsActions';
import { fetchAllmeetings } from '../../../store/actions/meetingsActions';
import { Updatebooking} from '../../../store/actions/bookingActions';
import AdminNav from '../AdminNav';

function AdminEditBooking() {

  const { id } = useParams();
  console.log(id);
  const bookings = useSelector((state) => state.bookings.Allbookinglist)
  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const teacherbyID = useSelector((state) => state.teachers.TeacherDetails)
  const students = useSelector((state) => state.students.AllStudentlist)
  const meetings = useSelector((state) => state.meetings.Allmeetinglist)
  const currentBooking = bookings.find((booking) => booking._id === id);
  console.log(currentBooking);

  const [note_for_Teacher,setNote_for_Teacher] = useState('')
  const [meeting_ID,setMeeting_ID] = useState('')
  const [teacher_ID,setTeacher_ID] = useState('')
  const [student_ID,setStudent_ID] = useState('')
  const [scheduledDate,setScheduledDate] = useState(new Date())
  //const [timeSlot,setTimeSlot] = useState('')
  const [status,setStatus] = useState('')
  const [requiredMeetings,setRequiredMeetings] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentBooking) {
      setNote_for_Teacher(currentBooking.Note_for_teacher);
      setMeeting_ID(currentBooking.Meeting_ID)
      setTeacher_ID(currentBooking.Teacher_ID)
      setStudent_ID(currentBooking.Student_ID)
      setScheduledDate(new Date(currentBooking.Scheduled_Date));
      setStatus(currentBooking.status)
    }
  }, [currentBooking]);

  useEffect(()=>{
    dispatch(GetTeachers())
    dispatch(fetchAllstudents())
    dispatch(fetchAllmeetings())
  },[dispatch])

  useEffect(()=>{
    dispatch(fetchTeacherDetails(teacher_ID))
  },[dispatch,teacher_ID])

  useEffect(()=>{
    const required = meetings.filter((meeting)=>meeting.Teacher_ID === teacher_ID)
    console.log(required)
    if(required){
        setRequiredMeetings(required)
    }else{
        console.log("No such meeting exists with the selected teacher")
    }
    
  },[teacher_ID])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkMeeting_id = requiredMeetings.filter((meeting)=>meeting._id.includes(meeting_ID))
    console.log(checkMeeting_id)


    const formData = {Note_for_teacher:note_for_Teacher, Student_ID:student_ID, Teachers_ID:teacher_ID, 
        Meeting_ID:meeting_ID, Status:status, Scheduled_Date:scheduledDate }
    console.log(formData)
  
    if(checkMeeting_id){
        const BookingID = id
    try{
      await dispatch(Updatebooking({BookingID,formData}));
     
      }catch(error){
        console.error('Error editing booking', error);
      }
      setNote_for_Teacher('')
      setScheduledDate('')
      setStatus('')
      setMeeting_ID('')
      setTeacher_ID('')
      setStudent_ID('')
      setRequiredMeetings([])
      navigate('/Admin-Dashboard/Bookings')
    }else{
      console.log("No such meeting scheduled with the selected teacher")
    }
  }
   

  return (
    <>
    <AdminNav/>
    <div className='EditCoursestyle'>

      <form onSubmit={handleSubmit}>
        
      <div className="form-group">
          <label htmlFor="note_for_Teacher">Note for teacher</label>
          <input
            type="text"
            className="form-control"
            id="note_for_Teacher"
            name="note_for_Teacher"
            value={note_for_Teacher}
            onChange={(e)=>setNote_for_Teacher(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="student_ID">Select Student</label> &nbsp;&nbsp;
          <select value={student_ID} onChange={(e)=>setStudent_ID(e.target.value)}>
            {students?.map((values, index)=>{
               return <option key={values._id} value={values._id}>
                  {values.Username}
                </option>
        })}
       </select>
        </div>

        <div className="form-group">
          <label htmlFor="teacher_ID">Select Teacher</label> &nbsp;&nbsp;
          <select value={teacher_ID} onChange={(e)=>setTeacher_ID(e.target.value)}>
            {teachers?.map((values,index)=>{
               return <option key={values._id} value={values._id}>
                  {values.Username}
                </option>
        })}
       </select>
        </div>


        <div className="form-group">
          <label htmlFor="scheduledDate">Schedule Date</label> &nbsp;&nbsp;
          <select value={scheduledDate} onChange={(e)=>setScheduledDate(e.target.value)}>
            {teacherbyID.Availability?.map((values)=>{
               return <option key={values.Date} value={new Date(values.Date).toLocaleDateString()}>
                  {new Date(values.Date).toLocaleDateString()}
                </option>
        })}
       </select>
        </div>

        <div className="form-group">
           <label htmlFor="status">Select Status</label> &nbsp;&nbsp;
           <select
               name="status"
               value={status}
               onChange={(e) => setStatus(e.target.value)}
           >
               <option>Select Status</option>
               <option value="Scheduled">Scheduled</option>
               <option value="Completed">Completed</option>
               <option value="Pending">Pending</option>
               <option value="Cancelled">Cancelled</option>
           </select>
           </div>

        <div className="form-group">
          <label htmlFor="meeting_ID">Meeting ID</label>
          <input
            type="text"
            className="form-control"
            id="meeting_ID"
            name="meeting_ID"
            value={meeting_ID}
            onChange={(e)=>setMeeting_ID(e.target.value)}
            required
          />
        </div>
       
        <button type="submit" className="btn btn-outline-success">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};


export default AdminEditBooking
