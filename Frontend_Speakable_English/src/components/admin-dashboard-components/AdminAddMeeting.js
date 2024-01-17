import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeachers } from '../../store/actions/teachersActions';
import { Create_meetings } from '../../store/actions/meetingsActions';
import AdminNav from './AdminNav';

const AdminAddMeeting = () => {
  const teachers = useSelector((state) => state.teachers.Teacherslist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const defaultTeacher = teachers.find((val, index) => {
    return index === 0;
});

const defaultId = defaultTeacher ? defaultTeacher._id : null;

  //const getId = JSON.stringify(defaultId._id)
  console.log(defaultId)

  const [teacher_ID,setTeacher_ID] = useState([])
  const [status,setStatus] = useState('')
  const [CreatedBy_ID,setCreatedBy_ID] = useState('')

  const navigate = useNavigate('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(teacher_ID)
    const formData = {Status: status,Teacher_ID: teacher_ID, CreatedBy_ID: CreatedBy_ID}
      console.log(formData)
    try {
      await dispatch(Create_meetings({CreatedBy_ID,formData}));
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
      setTeacher_ID('')
      setStatus('')
      setCreatedBy_ID('')
      navigate('/Admin-Dashboard/Meetings')
  };

  return (
    <>
        <AdminNav/>
        <div className='AddCoursestyle'>
        <form onSubmit={handleSubmit}>
           
            <div className="form-group">
            <label htmlFor="Teacher_ID">Select Teacher</label> &nbsp;&nbsp;
            <select
                name="Teacher_ID"
                value={teacher_ID} 
                onChange={(e)=>setTeacher_ID(e.target.value)}
            >
                {teachers?.map((values, index) => (
                <option key={values._id} value={values._id}>
                    {values.Username}
                </option>
                ))}
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="Status">Select Status</label> &nbsp;&nbsp;
            <select
                name="Status"
                value={status}
                 onChange={(e)=>setStatus(e.target.value)}
            >
                <option>Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="Created_By">Created By</label>
            <input
                type="text"
                className="form-control"
                id="Created_By"
                name="Created_By"
                value={CreatedBy_ID}
                onChange={(e) => setCreatedBy_ID(e.target.value)}
                required
            />
            </div>

            <button type="submit" className="btn btn-outline-success mt-3 btn-course">
            Submit
            </button>
        </form>
        </div>
    </>
  );
};

export default AdminAddMeeting;
