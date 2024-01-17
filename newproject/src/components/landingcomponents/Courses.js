import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch5courses } from '../../store/actions/coursesActions';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = useSelector((state) => state.courses.courseslist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch5courses());
  }, [dispatch]);

  return (
    <div className='Home_main_lower_div' id='Courses'>
      {courses.map((course, index) => (
        <div key={index} className='Home_main_lower_box'>
          <div className='Home_main_lower_box_circle'>
            <img src={course.Course_Images[0]} alt='' />
          </div>
          <Link className='Home_main_lower_box_Link' to={`/CourseDetails/${course._id}`}>{course.Course_Name}</Link>
          <p>{course.Description}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
