import React from 'react'

const Startbtn = (props) => {

const btn1request = () =>{
    props.actions.handlebtn1request()

}

const btn2request = () => {
    props.actions.handleHello()

}


  return (
    <div style={{display:"flex"}}>
     <button className='btn btn-outline-success ms-5' onClick={()=>btn1request()}>Lets Know what i capable off !</button>
     <button className='btn btn-outline-success ms-2' onClick={()=>btn2request()} >say Hello !</button>
    </div>
  )
}

export default Startbtn