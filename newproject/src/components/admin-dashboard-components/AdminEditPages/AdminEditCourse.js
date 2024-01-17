import React, { useState, useEffect } from 'react';
import { GetTeachers } from '../../../store/actions/teachersActions';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../AdminNav'
import { updateCourse } from '../../../store/actions/coursesActions';

const AdminEditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const courses = useSelector((state) => state.courses.AllCourseslist);
  const currentCourse = courses.find((course) => course._id === id);

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Course_Name: '',
    Description: '',
    Purchase_Price: '',
    Teachers_Details: [],
  });

  useEffect(() => {
    if (currentCourse) {
      setFormData(currentCourse);
    }
  }, [currentCourse]);

  const handleCheckboxChange = (teacherId) => {
    setFormData((prevData) => {
      const isSelected = prevData.Teachers_Details.includes(teacherId);
      if (isSelected) {
        return {
          ...prevData,
          Teachers_Details: prevData.Teachers_Details.filter((id) => id !== teacherId),
        };
      } else {
        return {
          ...prevData,
          Teachers_Details: [...prevData.Teachers_Details, teacherId],
        };
      }
    });
  };

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseId = id;
    const updatedData = formData
    console.log(updateCourse)
    try {
      await dispatch(updateCourse({ courseId, updatedData }));
      navigate('/Admin-Dashboard/Courses');
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  return (
    <>
    <AdminNav/>
    <div className='EditCoursestyle'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Course_Name">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="Course_Name"
            name="Course_Name"
            value={formData.Course_Name}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, Course_Name: e.target.value }))}
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
            onChange={(e) => setFormData((prevData) => ({ ...prevData, Description: e.target.value }))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Teachers_Details">Select Teachers</label> &nbsp;&nbsp;
          {teachers?.map((values) => (
            <div key={values._id} className="form-check">
              <input
                type="checkbox"
                id={values._id}
                value={values._id}
                checked={formData.Teachers_Details.includes(values._id)}
                onChange={() => handleCheckboxChange(values._id)}
                className="form-check-input"
              />
              <label htmlFor={values._id} className="form-check-label">
                {values.Username}
              </label>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="Purchase_Price">Purchase Price</label>
          <input
            type="text"
            className="form-control"
            id="Purchase_Price"
            name="Purchase_Price"
            value={formData.Purchase_Price}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, Purchase_Price: e.target.value }))}
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

export default AdminEditCourse;
