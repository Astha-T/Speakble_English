import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { DeleteCourses, Getcourses } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';


const AdminCourses = () => {

  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses.courseslist);

  useEffect(()=>{
   dispatch(Getcourses())
  },[dispatch])

 const DeleteCourse = (e) => {
  console.log("course_id", e)
   dispatch(DeleteCourses(e))
   window.location.reload();
  }

  const navigate = useNavigate()
  const EditCourse= (e) => {
   navigate(`/Admin-Dashboard/Courses/edit-Courses/${e}`)
 }



  return (
    <>
    <AdminNav/>
    <div className='Course_mainPage_style'>
    <div className='Course_header_style'>
        <h6 className='text-dark'>Courses Table</h6>
        <Link to='/Admin-Dashboard/Courses/add-courses'>
          <button className='btn btn-outline-success'>Add Course</button>
        </Link>
      </div>
      <div className='Course_list_style mt-3'>
        {/* <table className="table table-hover table-responsive table-borderless">
          <thead className='table-transparent'>
            <tr>
              <th className='th'>Course Name</th>
              <th className='th'>Assigned Teacher's</th>
              <th className='th'>Purchase Price</th>
              <th className='th'>Course Description</th>
              <th className='th'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course)=>{
              return <tr style={{boxShadow:'0px 2px 5px rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)'}} key={course._id}>
                <td className='td'>{course.Course_Name}</td>
                <td className='td'>
                  {course.Teachers_Details.map((teacher) => (
                    <span key={teacher._id}>{teacher.Username},</span>
                  ))}
                </td>
                <td className='td'>{course.Purchase_Price}</td>
                <td className='td'>{course.Description}</td>
                <td className='td'>
                  <button onClick={()=>DeleteCourse(course._id)} className='btn btn-outline-danger btn-course' >Delete</button>
                  <button onClick={()=>EditCourse(course._id)} className='btn btn-outline-danger btn-course'>Edit</button>
                </td>
              </tr>
            })}
          </tbody>
        </table> */}
         {courses?.map((Courses) => (
                        <div key={Courses._id} className='Courses_card p-2'>
                          <div className='Courses_card_img_div'>
                            <img src={`${Courses.Course_Images}`} alt=''/>
                          </div>
                          <h5>{Courses.Course_Name}</h5>
                          <p>{Courses.Description}</p>
                          <h6>Teachers Assigned</h6>
                          <div className='d-flex flex-wrap justify-content-center w-100'>
                              {Courses?.Teachers_Details?.map((teacher) => (
                                      <span className='Courses_card_teacher_span mx-1' key={teacher._id}>{teacher.Username}</span>
                                ))}
                           </div>
                          <div className='w-100 d-flex justify-content-center admincoursetbn_div'>
                          <button onClick={(e) => EditCourse(Courses._id) } className='btn btn-outline-success mx-3'>Edit Course</button>
                          <button onClick={(e) => DeleteCourse(Courses._id) } className='btn btn-outline-danger'>Delete Course</button>
                          </div>
                        </div>         
                    ))}
      </div>
    </div>
    </>
  )
}

export default AdminCourses