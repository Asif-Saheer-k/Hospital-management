import React from 'react'
import './App.css';
import "./bootstrap.min.css";

import { Header } from './Component/User/Header/Header';
import {Route, Routes} from 'react-router-dom'
import Banner from './Component/User/Banner/Landing';
import Login from './Component/User/Login/Login';
import DoctorLogin from './Component/Doctor/Login/Login';
import Otppage from './Component/User/Otppage/Otppage';
import Signup from './Component/User/Signup/Signup';
import Phone from './Component/User/Phone/Phone';
import SideBar from './Component/Admin/AdminHome/SideBar';
import Dashboard from './Component/Admin/Dashboard/Dashboard';
import User from './Component/Admin/users/User';
import Doctors from './Component/Admin/Doctors/Doctors';
import AddDoctors from './Component/Doctor/register/Register';
import Footer from './Component/User/Footer/Footer'
import DoctorSidebar from './Component/Doctor/Sidebar/Sidebar'
import Appoinment from './Component/User/Appoinment/Appoinment';
import About from './Component/User/About/About';
import Services from './Component/User/Services/Services';
import Register from './Component/Doctor/register/Register'
import ViewDoctor from './Component/Admin/viewSingleDoctor/ViewDoctor'
import Department from './Component/Admin/department/Department';

function Router() {
  return (
 
    <Routes>
      <Route path='/' element={[<Header/>,<Banner/>,<Footer/>]}/>  
      <Route path='/login' element={[<Header/>,<Login title="user"/>,<Footer/>]}/>  
      <Route path='/signup' element={[<Header/>,<Signup/>,<Footer/>]}/> 
      <Route path='/otp/:phone' element={[<Header></Header>,<Otppage></Otppage>]}/>
      <Route path='/phone' element={[<Header></Header>,<Phone></Phone>]}/>
      <Route path='/appoinment' element={[<Header/>,<Appoinment/>,<Footer/>]}/>
      <Route path='/about' element={[<Header/>,<About/>,<Footer/>]}/> 
      <Route path='/services' element={[<Header/>,<Services/>,<Footer/>]}/>
      


      <Route path='/admin' element={[<Login title="admin"/>]}/> 
      <Route path='/admin/adminHome' element={[<SideBar/>,<Dashboard/>]}/>
      <Route path='/admin/all-users' element={[<SideBar/>,<User/>]}/>
      <Route path='/admin/all-doctors' element={[<SideBar/>,<Doctors/>]}/>
      <Route path='/admin/view-single-doctor/:id' element={[<SideBar/>,<ViewDoctor/>]}/>
      <Route path='/admin/view-Department' element={[<SideBar/>,<Department/>]}/>
      

      <Route path='/register' element={[< AddDoctors/>]}/>
      <Route path='/doctor' element={[<DoctorLogin/>]}/>
      <Route path='/doctors/doctors-home' element={[<DoctorSidebar/>]}/> 

      
      
     

    </Routes> 
 
  )
}

export default Router