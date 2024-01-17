import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Signup_Student } from '../../store/actions/studentsActions';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';

const AdminAddStudents = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({      
        Username: '',
        Password: '', 
        Phone_Number: '',
        Address: '',
        Email:'',
        Enquiry_Student: [], 
        media: []
    });

    console.log(formData.media)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit =async (e) => {
      e.preventDefault();
      try{
        await dispatch(Signup_Student(formData));
        setFormData({      
            Username: '',
            Password: '', 
            Phone_Number: '',
            Address: '',
            Email:'',
            Enquiry_Student: [], 
            media: []
        })
        navigate('/Admin-Dashboard/Students')
      }catch(error){
        console.error('Error adding student:', error);
      }    
  }
    
  return (
    <>
    <AdminNav/>
    <div className='AddStudentstyle'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="Username">Student Name</label>
            <input
                type="text"
                className="form-control"
                id="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                required
            />
             <label htmlFor="Password">Email</label>
            <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
                type="password"
                className="form-control"
                id="Password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Phone_Number">Phone Number</label>
            <input
                type="number"
                className="form-control"
                id="Phone_Number"
                name="Phone_Number"
                value={formData.Phone_Number}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit" className="btn btn-outline-success mt-3">
             Submit
            </button>
      </form>
    </div>
    </>
  );
}

export default AdminAddStudents



