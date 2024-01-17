const jwt = require('jsonwebtoken');
const Admin  = require('../models/admin')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Payments = require('../models/payment');
const Packages = require('../models/packages')
const Enquiry_Student = require('../models/enquiryStudent');
const User = require('../models/user') 
const Meeting = require('../models/meeting')
const sendToken = require('../utils/sendToken');
const Courses = require('../models/courses')
const Feedback = require('../models/feedback')
const Booking = require('../models/booking')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/ErrorHandler')
const moment = require('moment-timezone');

exports.index = (req,res,next) => {
    res.render('index', { title: 'Express' });
}

exports.currentAdmin = catchAsyncErrors(async (req,res,next) => {
  const student = await Student.findById(req.id).exec();
  res.status(200).json({success:true, student})
}
);

exports.signout= async (req,res,next) =>{
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully Logged Out!" });
}

// ---------------------------------------------------------------------------------------------------  Student controllers  -------------

exports.Signup_Student = async (req, res, next) => {
  try {
      const { Username, Password,Phone_Number, Address, Email  } = req.body;
      // Check if the username already exists
      const existingUser = await Student.findOne({ Username });
      if (existingUser) {
        return res.status(409).json({ message: 'Student Username already exists' });
      }
      // Create a new Student instance
      const newStudent = new Student({
        Username,
        Password,
        Phone_Number,
        Address,
        Email,
      });
      // Save the new Student to the database
      await newStudent.save();
      // Generate a JWT token for the newly registered user
      sendToken(newStudent, res, 201);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

exports.Signin_Student = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const student = await Student.findOne({ Username });
      if (!student) {
        return res.status(401).json({ message: `Authentication failed Student Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await Student.comparePassword(Password, student.Password);
      if (passwordMatch) {
        sendToken(student, res, 201);
      } else {
        res.status(401).json({ message: `Authentication failed Student Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

exports.Delete_Student = async (req,res,next) => {
  try {
    const student_ID = req.params.student_ID
    if (!student_ID) {
      return res.status(400).json({ error: 'Invalid student ID provided' });
    }
    await Student.findByIdAndDelete(student_ID)
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Student =  async (req, res, next) => {
  try {
    const Student_ID = req.params.StudentID;
    // Find the student
    const getStudent = await Student.findById({ _id: Student_ID });
    if (!getStudent) {
      return res.status(404).json({ message: 'Student not found! Student_ID is not valid!' });
    }
    Object.assign(getStudent, req.body);
    const updatedData = await getStudent.save();
    res.json({ message: 'Student data updated successfully', updatedData });
  } catch (error) {
    next(error);
  }
};

exports.FetchAll_Students = async (req,res,next) => {
  try {
    const studentslist =  await Student.find()
    res.json({ message: 'Students fetch  successfully' ,studentslist});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.StudentDetails = async (req,res,next) => {
  try {
    const StudentID = req.params.StudentID
    const StudentDetails =  await Student.findById({_id:StudentID}).populate('Courses_assign')
    res.json({ message: 'Student Details fetch  successfully' , StudentDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ---------------------------------------------------------------------------------------------------  Teacher controllers  -------------
  
exports.Signup_Teacher = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Availability_Date,
      Courses_assign,
      SocialLinks,
      Email
    } = req.body;
    // Check if the username already exists
    const existingTeacher = await Teacher.findOne({ Username });
    if (existingTeacher) {
      return res.status(409).json({ message: 'Teacher Username already exists' });
    }
    // Create a new Teacher instance
    const newTeacher = new Teacher({
      Username,
      Password,
      Phone_Number,
      Address,
      Description,
      Short_Title,
      Purchase_Price,
      Courses_assign,
      Email,
      Profile_Image: [req.body.media], // Assuming media is a valid property in req.body
      Availability: Availability_Date.map((availability) => ({
        Date: (availability.Date),
        Time: availability.Time.map((time) => {
          const utcStart = moment.utc(time.Start_time, 'HH:mm');
          const istStart = utcStart.tz('Asia/Kolkata');
          const utcEnd = moment.utc(time.End_time, 'HH:mm');
          const istEnd = utcEnd.tz('Asia/Kolkata');
    
          return {
            Start_time: istStart.toDate(), // Convert to Date object
            End_time: istEnd.toDate(),     // Convert to Date object
          };
        }),
      })),
      SocialLinks,
    });

    // Save the new Teacher to the database
    await newTeacher.save();
    console.log(newTeacher)
    sendToken(newTeacher, res, 201);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

exports.Signin_Teacher = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const teacher = await Teacher.findOne({ Username });
      if (!teacher) {
        return res.status(401).json({ message: `Authentication failed Teacher Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await Teacher.comparePassword(Password, teacher.Password);
      if (passwordMatch) {
      // Generate a JWT token for the authenticated user
        sendToken(teacher, res, 201);
      } else {
        res.status(401).json({ message: `Authentication failed Teacher Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

exports.Delete_Teacher = async (req,res,next) => {
  try {
    const teacher_ID = req.params.teacher_ID
    if (!teacher_ID) {
      return res.status(400).json({ error: 'Invalid teacher ID provided' });
    }
    await Teacher.findByIdAndDelete(teacher_ID)
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Teacher =  async (req, res, next) => {
  try {
    const Teacher_ID = req.params.TeacherID;
    // Find the teacher
    const getTeacher = await Teacher.findById({ _id: Teacher_ID });
    if (!getTeacher) {
      return res.status(404).json({ message: 'Teacher not found! Teacher_ID is not valid!' });
    }
    Object.assign(getTeacher, req.body);
    const updatedData = await getTeacher.save();
    res.json({ message: 'Teacher data updated successfully', updatedData });
  } catch (error) {
    next(error);
  }
};

exports.Fetch5Teachers = async (req,res,next) => {
  try {
    const teacherslist =  await Teacher.find().limit(4)
    res.json({ message: '5 Teachers fetch  successfully' , teacherslist});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.TeacherDetails = async (req,res,next) => {
  try {
    const TeacherID = req.params.TeacherID
    const teachersDetails =  await Teacher.findById({_id:TeacherID}).populate('Courses_assign')
    res.json({ message: 'Teacher Details fetch  successfully' , teachersDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Fetch1teacher = async (req,res,next) => {
  try {
    const TeacherDetails =  await Teacher.find().limit(1)
    res.json({ message: '1 Teacher fetch  successfully' , TeacherDetails});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getteachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('Courses_assign');
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// ----------------------------------------------------------------------------------------------------  Admin controllers  ---------------

exports.Signup_admin = async (req, res, next) => {
  try {
      const { Username,Email, Password } = req.body;
      // Check if the username already exists
      const existingUser = await Admin.findOne({ Username });
      if (existingUser) {
        return res.status(409).json({ message: 'admin Username already exists' });
      }
      // Create a new admin instance
      const newadmin = new Admin({
        Username,
        Email,
        Password,
      });
      // Save the new admin to the database
      await newadmin.save();
      // Generate a JWT token for the newly registered user
      sendToken(newadmin, res, 201);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};
  
exports.Signin_admin = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const admin = await Admin.findOne({ Username });
      if (!admin) {
        return res.status(401).json({ message: `Authentication failed admin Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await Admin.comparePassword(Password, admin.Password);
      if (passwordMatch) {
      // Generate a JWT token for the authenticated user
       sendToken(admin, res, 201);
      } else {
        res.status(401).json({ message: `Authentication failed admin Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

// -----------------------------------------------------------------------------------------------------  User controllers  ----------------

exports.Signup_user = async (req, res, next) => {
  try {
      const { Username,Email, Password,Phone_Number,Address } = req.body;
      // Check if the username already exists
      const existingUser = await User.findOne({ Username });
      if (existingUser) {
        return res.status(409).json({ message: 'User Username already exists' });
      }
      // Create a new user instance
      const newuser = new User({
        Username,
        Email,
        Password,
        Phone_Number,
        Address
      });
      // Save the new user to the database
      await newuser.save();
      // Generate a JWT token for the newly registered user
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const data = {
        Username:Username,
        userId: newuser._id, 
      };
      const token = jwt.sign(data, jwtSecretKey);
      res.status(201).json({ message: 'User Signup successful', token, newuser });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};
  
exports.Signin_user = async (req, res, next) => {
  try {
      const { Username, Password } = req.body;
      // Check if the username exists
      const user = await User.findOne({ Username });
      if (!user) {
        return res.status(401).json({ message: `Authentication failed User Username didn't exists` });
      }
      // Compare the entered password with the stored hashed password
      const passwordMatch = await User.comparePassword(Password, user.Password);
      if (passwordMatch) {
      // Generate a JWT token for the authenticated user
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {
        Username:Username,
          userId: user._id,
        };
        const token = jwt.sign(data, jwtSecretKey);
        res.status(200).json({ message: 'User Login successful', token , user});
      } else {
        res.status(401).json({ message: `Authentication failed User Password didn't exists` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error',error });
    }
};

// -----------------------------------------------------------------------------------------------------  Enquiry controllers  -------------

// 1. Create API
exports.Create_Enquiry_Student = async (req, res, next) => {
    try {
      const StudentID = req.params.StudentID;
      let student = await Student.findOne({ _id: StudentID });
      const newEnquiryStudent = new Enquiry_Student(req.body);
      const result = await newEnquiryStudent.save();
      // Update the Enquiry_Student array
      student.Enquiry_Student.push(result._id);
      await result.Student_ID.push(StudentID);
      // Update the Enquiry_Student document
      const enquiry = await Enquiry_Student.findByIdAndUpdate(
        { _id: result._id },
        { $set: result },
        { new: true }
      );
      // Save the updated student document
      await student.save();
      res.status(201).json({ enquiry }); 
    } catch (error) {
      next(error);
    }
};

// 2. Fetch API
exports.Fetch_Enquiry_Student =  async (req, res, next) => {
    try {
          const StudentID = req.params.StudentID;
          // Find the student
          const student = await Student.findOne({ _id: StudentID });
          if (!student) {
            return res.status(404).json({ message: 'Student not found!' });
          }
          const Enquiry_StudentIDs = student.Enquiry_Student;
          // Find All the Enquiry_Students
          const Enquiry_Students = await Enquiry_Student.find({
            _id: { $in: Enquiry_StudentIDs }
          });
          res.status(200).json({ enquiry_students: Enquiry_Students });

    } catch (error) {
      next(error);
    }
};
 
// 3. Delete API
exports.Delete_Enquiry_Student =  async (req, res, next) => {
    try {
      const Student_ID = req.params.StudentID
      const Enquiry_ID = req.params.EnquiryID
      // Find the student
      const result = await Student.findById({_id:Student_ID});
      if (!result) {
        return res.status(404).json({ message: ' Student not found Student_ID is not valid !' });
      }
      const all_Enquiry =  result.Enquiry_Student
      // Splice the student
      const enquiryIndex = all_Enquiry.findIndex(enquiry => enquiry.equals(Enquiry_ID));
      if (enquiryIndex === -1) {
        return res.status(404).json({ message: 'Enquiry not found for the given Student_ID and Enquiry_ID!' });
      }
      all_Enquiry.splice(enquiryIndex, 1);
      // save the student
      await result.save();
      // delete the Enquiry_ID form Enquiry_Student
      await Enquiry_Student.findByIdAndDelete(Enquiry_ID);
      res.json({ message: 'Enquiry student deleted successfully' });
    } catch (error) {
      next(error);
    }
};
  
// 4. Update API
exports.Update_Enquiry_Student =  async (req, res, next) => {
    try {
      const Student_ID = req.params.StudentID;
      const Enquiry_ID = req.params.EnquiryID;
      // Find the student
      const studentResult = await Student.findById({ _id: Student_ID });
      if (!studentResult) {
        return res.status(404).json({ message: 'Student not found! Student_ID is not valid!' });
      }
      // Find the Enquiry_Student
      const enquiryResult = await Enquiry_Student.findById({ _id: Enquiry_ID });
      if (!enquiryResult) {
        return res.status(404).json({ message: 'Enquiry not found! Enquiry_ID is not valid!' });
      }
      // Update Enquiry_Student properties based on req.body
      Object.assign(enquiryResult, req.body);
      // Save the updated Enquiry_Student
      const updatedEnquiry = await enquiryResult.save();
      res.json({ message: 'Enquiry student updated successfully', updatedEnquiry });
    } catch (error) {
      next(error);
    }
};

// -----------------------------------------------------------------------------------------------------  Meeting controllers  --------------

exports.Create_Meeting =  async (req, res) => {
  try {
    const CreatedBy_ID = req.params.CreatedBy_ID;
    const Status = req.body.Status;
    const Teacher_ID = req.body.Teacher_ID
    console.log(req.body.Status, req.body.Teacher_ID)

    if (!Status || !Teacher_ID) {
      return res.status(400).json({ error: 'Incomplete data provided error in creating the meeting' });
    }

    const attendeeIds = [ CreatedBy_ID ]; // Start with createdBy as an attendee
    if (!attendeeIds) {
      return res.status(400).json({ error: 'Incomplete data provided error in creating the CreatedBy_ID' });
    }
    // Check if the provided IDs exist in any of the collections (teacher, admin, student, and user)
    const attendeesExist = await Promise.all(
      attendeeIds.map(async (id) => {
        const user = await User.findById(id);
        const teacher = await Teacher.findById(id);
        const admin = await Admin.findById(id);
        const student = await Student.findById(id);

        return user || teacher || admin || student;
      })
    );

    const createdByExists = await Promise.all(
      attendeeIds.map(async (id) => {
        const user = await User.findById(id);
        const teacher = await Teacher.findById(id);
        const admin = await Admin.findById(id);
        const student = await Student.findById(id);

        return user || teacher || admin || student;
      })
    );

    if (!attendeesExist.every((exists) => exists) || !createdByExists) {
      return res.status(400).json({ error: 'Invalid attendee or createdBy ID provided' });
    }

    const zoomMeetingLink = `https://us05web.zoom.us/j/89898542212?pwd=jg0vQ8t61dNkvkorRoqrug6TJcsTJD.1`;

    // Create the meeting
    const meeting = new Meeting({
      Attendee_ID: attendeeIds,
      Joining_Url: zoomMeetingLink,
      Status: Status,
      Teacher_ID: Teacher_ID,
      Created_By: CreatedBy_ID,
    });
    // Save the meeting to the database
    await meeting.save();
    // Send a success response with the Zoom meeting link
    res.status(201).json({ message: 'Meeting created successfully', meeting, zoomMeetingLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Join_Meeting = async (req, res) => {
  try {
    const meetingId = req.params.meetingId;
    const userId = req.params.userId;

    // Validate the data
    if (!meetingId || !userId) {
      return res.status(400).json({ error: 'Incomplete data provided' });
    }

    // Check if the provided IDs exist in any of the collections (teacher, admin, student, and user)
    const user = await User.findById(userId);
    const teacher = await Teacher.findById(userId);
    const admin = await Admin.findById(userId);
    const student = await Student.findById(userId);

    if (!(user || teacher || admin || student)) {
      return res.status(400).json({ error: 'Invalid user ID provided' });
    }

    // Find the meeting based on the provided meeting ID
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(400).json({ error: 'Invalid meeting ID provided' });
    }

    // Update the Atande_ID field
    meeting.Atande_ID.push(userId);

    // Check if the user is a teacher
    if (teacher) {
      meeting.teacher_ID.push(userId);
    }

    // Save the updated meeting to the database
    await meeting.save();

    // Redirect the user to the Zoom meeting link
    // res.redirect(meeting.Joining_Url);

    res.status(200).json({ message: 'User joined the meeting successfully', meeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Meeting = async (req,res,next) => {
  try {
    const meeting_ID = req.params.meeting_ID
    if (!meeting_ID) {
      return res.status(400).json({ error: 'Invalid meeting ID provided' });
    }
    await Meeting.findByIdAndDelete(meeting_ID)
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Meeting =  async (req, res, next) => {
  try {
    const Meeting_ID = req.params.MeetingID;
    // Find the meeting
    const getMeeting = await Meeting.findById({ _id: Meeting_ID });
    if (!getMeeting) {
      return res.status(404).json({ message: 'Meeting not found! Meeting_ID is not valid!' });
    }
    Object.assign(getMeeting, req.body);
    const updatedData = await getMeeting.save();
    res.json({ message: 'Meeting data updated successfully', updatedData });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Course controllers ------------------

exports.Create_Course =  async (req, res) => {
  try {
      const { Course_Name, Description,Teachers_Details, Purchase_Price,Course_Images, } = req.body;
      const existingCourse = await Courses.findOne({ Course_Name });
      if (existingCourse) {
        return res.status(409).json({ message: 'Course already exists' });
      }
      // Create a new Course
      const newCourse = new Courses({
        Course_Name, 
        Description,
        Teachers_Details:[Teachers_Details], 
        Purchase_Price,
        Course_Images
      });
      // Save the new Course to the database
      await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Course = async (req,res,next) => {
  try {
    const CourseID = req.params.CourseID
    if (!CourseID) {
      return res.status(400).json({ error: 'Invalid course ID provided' });
    }
    await Courses.findByIdAndDelete(CourseID)
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Course =  async (req, res, next) => {
  try {
    const CourseID = req.params.CourseID;
    // Find the student
    const getCourse = await Courses.findById({ _id: CourseID });
    if (!getCourse) {
      return res.status(404).json({ message: 'Course not found! Course_ID is not valid!' });
    }
    Object.assign(getCourse, req.body);
    const updatedData = await getCourse.save();
    res.json({ message: 'Course data updated successfully', updatedData });
  } catch (error) {
    next(error);
  }
};

exports.courseDetails = async (req,res,next) => {
  try {
    const CourseID = req.params.CourseID
    const CoursesDetails =  await Courses.findById({_id:CourseID}).populate('Teachers_Details').exec()
    res.json({ message: 'Courses Details fetch  successfully' , CoursesDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Fetch5courses = async (req,res,next) => {
  try {
    const courseslist =  await Courses.find().limit(5)
    res.json({ message: '5 Courses fetch  successfully' , courseslist});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// -------------------------------------------------------------------------------------------------------Feedback Controllers -------------------------------

exports.Add_Feedback =  async (req, res) => {
  try {
      const { Message, Student_ID,Teachers_ID, Rating,Booking_ID } = req.body;
      const newFeedback = new Feedback({
        Message, 
        Student_ID,
        Teachers_ID, 
        Rating,
        Booking_ID 
      });
      // Save the new feedback to the database
      await newFeedback.save();
      res.status(201).json({ message: 'Feedback added successfully', newCourse });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Feedback = async (req,res,next) => {
  try {
    const FeedbackID = req.params.FeedbackID
    if (!FeedbackID) {
      return res.status(400).json({ error: 'Invalid feedback ID provided' });
    }
    await Feedback.findByIdAndDelete(FeedbackID)
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Feedback =  async (req, res, next) => {
  try {
    const FeedbackID = req.params.FeedbackID;
   
    // Find the feedback
    const feedbackResult = await Feedback.findById({ _id: FeedbackID });
    if (!feedbackResult) {
      return res.status(404).json({ message: 'Feedback not found! Feedback_ID is not valid!' });
    }
  
    // Update Feedback properties based on req.body
    Object.assign(req.body);
    // Save the updated Feedback
    const updatedFeedback = await feedbackResult.save();
    res.json({ message: 'Feedback updated successfully', updatedFeedback });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Booking controllers ------------------

exports.Create_Booking =  async (req, res) => {
  try {
      const { Note_for_teacher, Student_ID,Teachers_ID, Status,Meeting_ID,Scheduled_Date } = req.body;
      
      // Create a booking
      const newBooking = new Booking({
        Note_for_teacher, 
        Student_ID,
        Teachers_ID, 
        Status,
        Meeting_ID,
        Scheduled_Date
      });
      // Save the new booking to the database
      await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Booking = async (req,res,next) => {
  try {
    const BookingID = req.params.BookingID
    if (!BookingID) {
      return res.status(400).json({ error: 'Invalid booking ID provided' });
    }
    await Booking.findByIdAndDelete(BookingID)
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Booking =  async (req, res, next) => {
  try {
    const BookingID = req.params.BookingID;
   
    // Find the booking
    const bookingResult = await Booking.findById({ _id: BookingID });
    if (!bookingResult) {
      return res.status(404).json({ message: 'Booking not found! Booking_ID is not valid!' });
    }
  
    // Update Booking properties based on req.body
    Object.assign(req.body);
    // Save the updated Booking
    const updatedBooking = await bookingResult.save();
    res.json({ message: 'Booking updated successfully', updatedBooking });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Payment controllers ------------------

exports.Add_Payment =  async (req, res) => {
  try {
      const { Booking_ID, Student_ID,Teachers_ID, Status,Method, Amount} = req.body;
      
      // Add a payment
      const newPayment = new Payments({
        Amount, 
        Student_ID,
        Teachers_ID, 
        Status,
        Method,
        Booking_ID,
        Created_at,
        // Updated_at
      });
      // Save the new payment to the database
      await newPayment.save();

    res.status(201).json({ message: 'Payment added successfully', newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Payment = async (req,res,next) => {
  try {
    const PaymentID = req.params.PaymentID
    if (!PaymentID) {
      return res.status(400).json({ error: 'Invalid payment ID provided' });
    }
    await Payments.findByIdAndDelete(PaymentID)
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Payment=  async (req, res, next) => {
  try {
    const PaymentID = req.params.PaymentID;
   
    // Find the payment
    const paymentResult = await Payments.findById({ _id:  PaymentID});
    if (!paymentResult) {
      return res.status(404).json({ message: 'Payment not found! Payment ID is not valid!' });
    }
  
    // Update payment properties based on req.body
    Object.assign(req.body);
    // Save the updated Payment
    const updatedPayment = await paymentResult.save();
    res.json({ message: 'Payment updated successfully', updatedPayment });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Package controllers ------------------

exports.Add_Package =  async (req, res) => {
  try {
      const { Course_Name, Student_ID,Teachers_ID, Number_of_Lectures,Amount} = req.body;
      
      // Add a package
      const newPackage = new Packages({
        Amount, 
        Student_ID,
        Teachers_ID, 
        Number_of_Lectures,
        Course_Name,

      });
      // Save the new package to the database
      await newPackage.save();

    res.status(201).json({ message: 'Package added successfully', newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.Delete_Package= async (req,res,next) => {
  try {
    const PackageID = req.params.PackageID 
    if (!PackageID ) {
      return res.status(400).json({ error: 'Invalid package ID provided' });
    }
    await Packages.findByIdAndDelete(PackageID)
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.Update_Package=  async (req, res, next) => {
  try {
    const PackageID  = req.params.PackageID ;
   
    // Find the package
    const packageResult = await Payments.findById({ _id:  PackageID });
    if (!packageResult) {
      return res.status(404).json({ message: 'Package not found! Package ID is not valid!' });
    }
  
    // Update package properties based on req.body
    Object.assign(req.body);
    // Save the updated package
    const updatedpackage = await packageResult.save();
    res.json({ message: 'package updated successfully', packagePayment });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------------------------------- Get controllers ----------------------

exports.getstudentbyID = async (req, res) => {
  try {
    const StudentID = req.params.StudentID
    const student = await Student.findOne({_id :StudentID});
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getmeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getenquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry_Student.find();
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getcourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate('Teachers_Details').exec()
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getfeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getbookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getpayments = async (req, res) => {
  try {
    const payments = await Payments.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getpackages = async (req, res) => {
  try {
    const packages = await Packages.find();
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// --------------------------------------------------------------------------------------------------------Image Controllers -----------------------------------

exports.imageupload = catchAsyncErrors(async (req,res,next) =>{
  try {
        let data = {...req.body}
        if (!data.file || !data.file.trim()) delete data.file;
        if (req.file && req.file.filename){
        data = req.file.filename 
        }
        return res.json({
                        success: true,
                        data,
                        message: 'Image updated successfully'
                      })
      
    } catch (error) {
             console.log(error,'<< error')
             return next(new ErrorHandler("no Property Added  Found",404))   
      
    }
})

