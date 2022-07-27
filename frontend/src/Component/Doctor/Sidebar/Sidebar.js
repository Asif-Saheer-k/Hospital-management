import React from "react";
import { logInDoctor } from "../../Redux/Slices/doctorData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'



function Sidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const doctor= useSelector((state) => state.doctor.value);

  const Logout = () => {
    dispatch(logInDoctor(null));
    navigate("/doctor");
  };
  return (
   
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            DOCTOR <sup>2</sup>
          </div>
        </a>    

        <hr class="sidebar-divider my-0" />

        <li class="nav-item active">
          <Link to='/doctors/doctors-home' class="nav-link" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboar</span>
          </Link>
        </li>
        <li class="nav-item active">
          <Link to='/doctors/veiw-allPatient' class="nav-link" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Patients</span>
          </Link>
        </li>
        <li class="nav-item active">
          <Link to='/doctors/view-all-appoinment' class="nav-link" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>All Appoinment</span>
          </Link>
        </li>


        <hr class="sidebar-divider d-none d-md-block" />


      </ul>

  

     
    
  );
}

export default Sidebar;
