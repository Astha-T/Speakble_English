import React from 'react'

const Contact = () => {
  return (
    <div className='contact_main_page_div col-md-12 col-sm-12' id='Contact'>
        <div className='contact_main_page_left_div'>
            <div className='contact_main_page_left_div_header'>
              <h2>Contact us</h2>
              <small>we love conversations. let us talk!</small>
            </div>
            <input
              className='contact_main_page_left_div_input'
              placeholder='Enter Full Name'
            />
             <input
              className='contact_main_page_left_div_input'
              placeholder='Enter email address'
            />
            <textarea
              className='contact_main_page_left_div_input-textaraa'
              placeholder='Tell us about your message'
            />
            <button className='contact_main_page_left_div_submit_btn btn btn-outline-success'>Send Message</button>
        </div>
        <div className='contact_main_page_right_div'>
              <div className='contact_main_page_right_img_div'>
                  <img src='https://themewagon.github.io/known/images/contact-image.jpg' alt='' />
              </div>
        </div>
    </div>
  )
}

export default Contact