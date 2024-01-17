
// Navbar component
import React from 'react';
import { Link } from 'react-scroll';
import Speakableimg from "../../Speakableimg.jpg"

const Navbar = () => {
  return (
    <div className='col-md-12 col-sm-12 Navbar_main'>
      <div className='Navbar_nav_firstdiv'>
        <img src={Speakableimg} alt='' />
      </div>
      <div className='Navbar_nav_div'>
        <Link
          to='Home'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className='d_center text-decoration-none Navlink'
          activeClass='active'
        >
          Home
        </Link>
        <Link
          to='Courses'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          activeClass='active'
          className='d_center text-decoration-none Navlink'
        >
          Courses
        </Link>
        <Link
          to='About'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          activeClass='active'
          className='d_center text-decoration-none Navlink'
        >
          About
        </Link>
        <Link
          to='OurTeachers'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          activeClass='active'
          className='d_center text-decoration-none Navlink'
        >
          Our Teachers
        </Link>
       
        <Link
          to='Reviews'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          activeClass='active'
          className='d_center text-decoration-none Navlink'
        >
          Reviews
        </Link>
        <Link
          to='Contact'
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          activeClass='active'
          className='d_center text-decoration-none Navlink'
        >
          Contact
        </Link>
      </div>
      <div className='Navbar_nav_lastdiv'>
        <span className='Phone_span'>
          <i className="bi bi-telephone-fill"></i>
        </span>
        <span>+6263571539</span>
      </div>
    </div>
  );
}

export default Navbar;
