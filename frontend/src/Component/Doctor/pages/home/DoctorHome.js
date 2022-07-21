import React from 'react'
import NavBar from '../../navBar/NavBar'
import Sidebar from '../../Sidebar/Sidebar'
import './app.css'


function DoctorHome() {
  return (
    <div id="wrapper">
        <Sidebar/>
        <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
            <NavBar/>
            </div>
            </div>
        </div>
  )
}

export default DoctorHome