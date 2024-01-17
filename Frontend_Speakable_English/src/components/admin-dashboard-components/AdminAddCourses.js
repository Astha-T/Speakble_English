import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeachers } from '../../store/actions/teachersActions';
import { CreateCourse } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';

const AdminAddCourses = () => {
  const teachers = useSelector((state) => state.teachers.Teacherslist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Course_Name: '',
    Description: '',
    Purchase_Price: '',
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataupdate = { ...formData, Teachers_Details: selectedOption };
      await dispatch(CreateCourse(formDataupdate));
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
    <>
        <AdminNav/>
        <div className='AddCoursestyle'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="Course_Name">Course Name</label>
            <input
                type="text"
                className="form-control"
                id="Course_Name"
                name="Course_Name"
                value={formData.Course_Name}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input
                type="text"
                className="form-control"
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Status">Select Teacher</label> &nbsp;&nbsp;
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {teachers?.map((values, index) => (
                <option key={values._id} value={values._id}>
                    {values.Username}
                </option>
                ))}
            </select>
            </div>
            <div className="form-group">
            <label htmlFor="Purchase_Price">Purchase Price</label>
            <input
                type="text"
                className="form-control"
                id="Purchase_Price"
                name="Purchase_Price"
                value={formData.Purchase_Price}
                onChange={handleChange}
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

export default AdminAddCourses;
