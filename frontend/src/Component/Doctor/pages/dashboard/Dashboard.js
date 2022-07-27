import React from 'react'
import React from 'react'
import NavBar from '../../navBar/NavBar'
import Sidebar from '../../Sidebar/Sidebar'

function Dashboard() {
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

export default Dashboard