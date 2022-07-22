import React from 'react'
import NavBar from '../../navBar/NavBar'
import Appoinment from '../../appoinmets/Appointment'
import Sidebar from '../../Sidebar/Sidebar'
function Allappointment() {
  return (
    <div id="wrapper">
    <Sidebar/>
    <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
        <NavBar/>
        <div class="container-fluid">
           <Appoinment/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Allappointment