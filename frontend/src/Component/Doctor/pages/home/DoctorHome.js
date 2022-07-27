import React from 'react'
import Banner from '../../banner/Banner'
import NavBar from '../../navBar/NavBar'
import Sidebar from '../../Sidebar/Sidebar'
import TodayAppoitmnet from '../../todayAppointmnets/TodayAppoitmnet'
import './app.css'


function DoctorHome() {
  return (
    <div id="wrapper">
        <Sidebar/>
        <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
            <NavBar/>
            <div class="container-fluid">
            <div class="row">
              <Banner/>
              <TodayAppoitmnet/>
              </div>
              </div>


            </div>
         
            </div>
        </div>
  )
}

export default DoctorHome