import React from 'react'
import NavBar from '../../navBar/NavBar'
import Profile from '../../profile/Profile'
import Sidebar from '../../Sidebar/Sidebar'

function ProfilePage() {
    
  return (
    <div id="wrapper">
        <Sidebar/>
        <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
            <NavBar/>
            <div class="container-fluid">
                <Profile/>
            </div>
            </div>
            </div>
        </div>
  )
}

export default ProfilePage