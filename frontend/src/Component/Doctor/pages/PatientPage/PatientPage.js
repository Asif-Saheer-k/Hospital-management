import React from 'react'
import NavBar from '../../navBar/NavBar'
import Patient from '../../patient/Patient';
import Sidebar from '../../Sidebar/Sidebar'
function PatientPage() {
  return (
    <div id="wrapper">
    <Sidebar/>
    <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
        <NavBar/>
        <div class="container-fluid">
           <Patient/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default PatientPage;