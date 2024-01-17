import React, {useEffect} from 'react';
import AdminNav from './AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllpayments} from '../../store/actions/paymentActions';

const AdminPayments = () => {
  // Dummy payments data for testing
  const dispatch = useDispatch()
  const payments = useSelector((state) => state.payments.Allpaymentlist);
  console.log(payments)
 
   useEffect(()=>{
    dispatch(fetchAllpayments())
   },[dispatch])


  return (
    <>
      <AdminNav />
      <div className='Payments_mainPage_style'>
        <div className='Payments_header_style'>
          <h6 className='text-dark'>Payments Table</h6>
        </div>
        <div className='Payments_list_style d-flex flex-wrap flex-row'>
          <table className='table table-hover table-responsive table-borderless'>
            <thead className='table-transparent'>
              <tr>
                <th className='th'>Teacher's ID</th>
                <th className='th'>Student's ID</th>
                <th className='th'>Booking ID</th>
                <th className='th'>Amount</th>
                <th className='th'>Date</th>
                <th className='th'>Status</th>
                {/* Add more table headers based on your schema */}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr style={{boxShadow:'0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)',borderRadius:"8px"}}  key={payment._id}>
                  <td className='td'>{payment.Student_ID}</td>
                  <td className='td'>{payment.Teachers_ID}</td>
                  <td className='td'>{payment.Booking_ID}</td>
                  <td className='td'>{payment.Amount}</td>
                  <td className='td'>{payment.Created_at.Date}</td>
                  <td className='td'>{payment.Status}</td>
                  {/* Add more table data based on your schema */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPayments;
