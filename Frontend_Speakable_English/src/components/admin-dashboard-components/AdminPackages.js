import React, {useEffect} from 'react';
import AdminNav from './AdminNav';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllpackages, Deletepackage} from '../../store/actions/packagesAction';

const AdminPackages = () => {
  // Dummy packages data for testing
  const dispatch = useDispatch()
  const packages = useSelector((state) => state.packages.Allpackagelist);
  console.log(packages)
 
   useEffect(()=>{
    dispatch(fetchAllpackages())
   },[dispatch])

   const DeletePackage = (e) => {
    dispatch(Deletepackage(e))
    window.location.reload(true)
   }

   const navigate = useNavigate('')

   const EditPackage = (e) =>{
    navigate(`/${e}`)
   }

 

  return (
    <>
      <AdminNav />
      <div className='Packages_mainPage_style'>
        <div className='Packages_header_style'>
          <h6 className='text-dark'>Packages Table</h6>
          <Link to='/Admin-Dashboard/Packages/add-package'>
            <button className='btn btn-outline-success'>Add Packages</button>
          </Link>
        </div>
        <div className='Packages_list_style d-flex flex-wrap flex-row'>
          <table className='table table-hover table-responsive table-borderless'>
            <thead className='table-transparent'>
              <tr>
                <th className='th'>Teacher's ID</th>
                <th className='th'>Course Name</th>
                <th className='th'>Amount</th>
                <th className='th'>Number of Lectures</th>
                <th>Actions</th>
                {/* Add more table headers based on your schema */}
              </tr>
            </thead>
            <tbody>
              {packages.map((pack) => (
                <tr style={{boxShadow:'0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)',borderRadius:"8px"}}  key={pack._id}>

                  <td className='td'>{pack.Teachers_ID}</td>
                  <td className='td'>{pack.Course_Name}</td>
                  <td className='td'>{pack.Amount}</td>
                  <td className='td'>{pack.Number_of_Lectures}</td>
                  <td className='td'>
                 <button onClick={()=>EditPackage(pack._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-pen-fill"></i></button>
                 <button onClick={()=>DeletePackage(pack._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="bi bi-trash-fill"></i></button>
                {/* Add more table data based on your schema */}
                </td>
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

export default AdminPackages;
