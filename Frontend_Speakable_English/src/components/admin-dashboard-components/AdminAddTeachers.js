
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import TimePicker from 'react-time-picker'; // Import the react-time-picker component
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { AddNewTeacher, imageUpload } from '../../store/actions/teachersActions';
import { Getcourses } from '../../store/actions/coursesActions';
import AdminNav from './AdminNav';

const AdminAddTeachers = () => {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses.courseslist )
  console.log(courses)

  const [formData, setFormData] = useState({
    teacherName: '',
    password: '',
    phoneNumber: '',
    address: '',
    coursesAssign: [],
    purchasePrice: '',
    description:'',
    shortTitle:'',
    Email:'',
    availability: [
      {
        Date: new Date(),
        Time: [
          {
            Start_time: '10:00',
            End_time: '14:00',
          },
        ],
      },
    ],
    media: [],
    socialLinks: [
      { platform: 'facebook', link: '' },
      { platform: 'twitter', link: '' },
      { platform: 'instagram', link: '' },
      // Add more social media platforms if needed
    ], 
  });
  
  useEffect(() => {
   dispatch(Getcourses())
  }, [])

  const handleCheckboxChange = (course) => {
    setFormData((prevData) => {
      const isSelected = prevData.coursesAssign.includes(course);
      if (isSelected) {
        return {
          ...prevData,
          coursesAssign: prevData.coursesAssign.filter((id) => id !== course),
        };
      } else {
        return {
          ...prevData,
          coursesAssign: [...prevData.coursesAssign, course],
        };
      }
    });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      media: formData.media?.length
        ? [...formData.media, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleAddTime = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [
        ...prevData.availability,
        {
          Date: new Date(),
          Time: [
            {
              Start_time: '00:00',
              End_time: '00:00',
            },
          ],
        },
      ],
    }));
  };

  const handleDateChange = (date, index) => {
    setFormData((prevData) => {
      const updatedAvailability = [...prevData.availability];
      updatedAvailability[index].Date = new Date(date);
      return {
        ...prevData,
        availability: updatedAvailability,
      };
    });
  };

  const handleTimeChange = (time, index, isStartTime) => {
    setFormData((prevData) => {
      const updatedAvailability = [...prevData.availability];
      const timeType = isStartTime ? 'Start_time' : 'End_time';
      updatedAvailability[index].Time[0][timeType] = time;
      return {
        ...prevData,
        availability: updatedAvailability,
      };
    });
  };

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.socialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        socialLinks: updatedSocialLinks,
      };
    });
  };

  console.log(formData)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    await dispatch(
        AddNewTeacher({
            Username: formData.teacherName,
            Password: formData.password,
            Phone_Number: formData.phoneNumber,
            Address: formData.address,
            Description: formData.description, // Add the correct field name
            Short_Title: formData.shortTitle, // Add the correct field name
            Purchase_Price: formData.purchasePrice,
            Availability_Date: formData.availability,
            media:formData.media,
            SocialLinks:formData.socialLinks,
            Courses_assign:formData.coursesAssign,
            Email:formData.Email
            
        }));
       setFormData({ teacherName: '',
       password: '',
       phoneNumber: '',
       address: '',
       coursesAssign: '',
       purchasePrice: '',
       description:'',
       shortTitle:'',
       availability: [
         {
           Date: new Date(),
           Time: [
             {
               Start_time: '00:00',
               End_time: '00:00',
             },
           ],
         },
       ],
       media: [],
       socialLinks: [
         { platform: 'facebook', link: '' },
         { platform: 'twitter', link: '' },
         { platform: 'instagram', link: '' },
         // Add more social media platforms if needed
       ], 
     })
     navigate('/Admin-Dashboard/Teachers')
  };

  const handleDeleteTime = (index) => {
    setFormData((prevData) => {
      const updatedAvailability = [...prevData.availability];
      updatedAvailability.splice(index, 1);
      return {
        ...prevData,
        availability: updatedAvailability,
      };
    });
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      media: [...formData.media.filter((img) => img != val)],
    });
        // setMedia([...media.filter((img) => img != val)]);
  };

  return (
    <>
      <AdminNav/>
    <div className='Add_Teachers_main_div'>
      <form onSubmit={handleSubmit}>
        {/* Image div */}
        <div className='Addteacherimage_box'>
            {formData.media?.map((md, index) => {
                  return (
                      <div
                          className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
                          key={index}
                        >
                        <a href="#">
                          <img
                            className="w-100 active"
                            src={"http://localhost:3000/images/" + md}
                          />
                        </a>
                        <span
                          className="badge bg-danger badge-pill badge-round ml-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleImageRemoval(md);
                          }}
                        >
                          Delete
                        </span>
                      </div>  
                    );
            })}
         </div>
        {/* Image input Links */}    
        {formData.media?.length < 10 && (
              <div className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2">
                <div className="card-body">
                  <p style={{fontSize:"12px"}} className="card-text">Select image file to upload.</p>
                  {/* Basic file uploader */}
                  <input
                    className="form-control"
                    encType="multipart/form-data"
                    type="file"
                    name="images"
                    id="formFile"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
         )}
        <div className='form_group_div  mt-2'>
            {/* Teacher Links */}
            <div className="form-group w-25">
              {/* <label htmlFor="teacherName"></label> */}
              <input
                type="text"
                className="form-control"
                id="teacherName"
                name="teacherName"
                placeholder='Teacher Name'
                value={formData.teacherName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group w-25 mx-5">
              {/* <label htmlFor="description"></label> */}
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
             {/* Phone number Links */}
             <div className="form-group w-25 ">
              {/* <label htmlFor="phoneNumber"></label> */}
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
        </div>
        <div className='form_group_div mt-2'>
            {/* Password Links */}
            <div className="form-group w-25 ">
              {/* <label htmlFor="Password"></label> */}
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
             {/* Address Links */}
             <div className="form-group w-25 mx-5">
              {/* <label htmlFor="address"></label> */}
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
            <div className="form-group w-25 ">
              {/* <label htmlFor="shortTitle"></label> */}
              <input
                type="text"
                className="form-control"
                id="shortTitle"
                placeholder='shortTitle'
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                required
              />
            </div>
        </div>
        <div className='form_group_div mt-2'>
            {/* Course Assign Links */}
            <div className="form-group">
            <label htmlFor="Status">Select Courses</label> &nbsp;&nbsp;
            {courses?.map((values) => (
            <div key={values._id} className="form-check">
              <input
                type="checkbox"
                id={values._id}
                value={values._id}
                checked={formData.coursesAssign.includes(values._id)}
                onChange={() => handleCheckboxChange(values._id)}
                className="form-check-input"
              />
              <label htmlFor={values._id} className="form-check-label">
                {values.Course_Name}
              </label>
            </div>
          ))}
            </div>
            {/* Purchase Links */}
            <div className="form-group w-25 mx-5">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="number"
                className="form-control"
                id="purchasePrice"
                name="purchasePrice"
                placeholder='Purchase Price'
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </div>
             {/* Purchase Links */}
             <div className="form-group w-25 ">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                placeholder='Email'
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
        </div> 
        {/* <label>Social Links</label> */}
        <div className="form-group w-100 mt-2 d-flex justify-content-between">
                {formData.socialLinks.map((socialLink, index) => (
                  <div key={index} className="social-link-item w-25 ">
                    <div className="form-group justify-content-between">
                      {/* <label>{socialLink.platform}</label> */}
                      <input
                        type="text"
                        className="form-control "
                        placeholder={socialLink.platform}
                        value={socialLink.link}
                        onChange={(e) =>
                          handleSocialLinkChange(index, socialLink.platform, e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
        </div>
        {/* Availability Links */}
        <div className="form-group mt-2">
          <label htmlFor="availability">Availability</label>
          {formData.availability.map((slot, index) => (
            <div key={index} className="availability-item p-2 mb-2">
              <div className="form-group">
                <label>Date</label>
                <DatePicker
                  className='mx-2 form-control'
                  selected={new Date(slot.Date)}
                  onChange={(date) => handleDateChange(date, index)}
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <TimePicker
                  value={slot.Time[0].Start_time}
                  onChange={(time) => handleTimeChange(time, index, true)}
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <TimePicker
                  value={slot.Time[0].End_time}
                  onChange={(time) => handleTimeChange(time, index, true)}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger btn-delete-teacher delete-time"
                onClick={() => handleDeleteTime(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-success btn-add-teacher add-time mb-2"
            onClick={handleAddTime}
          >
            Add Time
          </button>
        </div>
        {/* Social Links */}
        {/* Submit button */}                
        <button type="submit" className="btn btn-outline-success mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AdminAddTeachers;
