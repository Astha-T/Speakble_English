import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetTeachers } from '../../store/actions/teachersActions';
import { Getcourses } from '../../store/actions/coursesActions';
import {Add_package} from '../../store/actions/packagesAction'
import AdminNav from './AdminNav';

const AdminAddPackage = () => {
  const teachers = useSelector((state) => state.teachers.Teacherslist);
  const courses = useSelector((state) => state.courses.courseslist )
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTeachers())
    dispatch(Getcourses());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Teachers_ID: [],
    Course_Name: '',
    Amount:'',
    Number_of_Lectures: ''
  });

  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    try{
      await dispatch(Add_package(formData));
    }catch(error){
      console.error('Error adding package:', error);
    }  
    setFormData({      
      Course_Name:'',
      Teachers_ID:[],
      Amount:"",
      Number_of_Lectures:''
  })
  navigate('/Admin-Dashboard/Packages')  
}

  return (
    <>
        <AdminNav/>
        <div className='AddCoursestyle'>
        <form onSubmit={handleSubmit}>
           <div className="form-group">
            <label htmlFor="Teachers_ID">Select Teacher</label> &nbsp;&nbsp;
            <select
                name="Teachers_ID"
                value={formData.Teachers_ID}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, Teachers_ID: e.target.value }))}
            >
                {teachers?.map((values, index) => (
                <option key={values._id} value={values._id}>
                    {values.Username}
                </option>
                ))}
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="Course_Name">Select Course</label> &nbsp;&nbsp;
            <select
                value={formData.Course_Name}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, Course_Name: e.target.value }))}
            >
                {courses?.map((values, index) => (
                <option key={values._Course_Name} value={values._Course_Name}>
                    {values.Course_Name}
                </option>
                ))}
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="Amount">Amount</label>
            <input
                type="number"
                className="form-control"
                id="Amount"
                name="Amount"
                value={formData.Amount}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, Amount: e.target.value }))}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="Number_of_Lectures">Number of Lectures</label>
            <input
                type="number"
                className="form-control"
                id="Number_of_Lectures"
                name="Number_of_Lectures"
                value={formData.Number_of_Lectures}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, Number_of_Lectures: e.target.value }))}
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

export default AdminAddPackage;
