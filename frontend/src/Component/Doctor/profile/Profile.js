import React, { useEffect, useState } from 'react'
import './Profile.css';
import { useSelector } from "react-redux";

function Profile() {
    const [time,setTime]=useState([])
    // const [doctor,setDoctor]=useState({})
    const doctor= useSelector((state) => state.doctor.value);
    // setDoctor(doctor)
    var monday = null;
  var tusday = null;
  var wednesday = null;
  var thursday = null;
  var friday = null;
  var saturday = null;
  var sunday = null;

  {
    time.map((obj) => {
      const mons = obj.Mon;
      const tus = obj.Tus;
      const wen = obj.wen;
      const thu = obj.thur;
      const frid = obj.fri;
      const stat = obj.sta;
      const sun = obj.sund;
      if (mons) {
        monday = mons;
        
      }
      if (tus) {
        tusday = tus;
      }
      if (wen) {
        wednesday = wen;
      }
      if (thu) {
        thursday = thu;
      }
      if (frid) {
        friday = frid;
      }
      if (stat) {
        saturday = stat;
      }
      if (sun) {
        sunday = sun;
      }
    });
  }

    useEffect(()=>{
       
        setTime(doctor.time)

    },[])
    
 
  return (
    
    <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">About Me</h3>
                            <h6 class="theme-color lead">{doctor.Name}</h6>
                            <p>{doctor.About}</p>
                            <div class="row about-list">
                                <div class="col-md-12">
                                <div class="media">
                                        <label>Email</label>
                                        <p className='ps-2'> {doctor.email}</p>
                                    </div>
                                    <div class="media">
                                        <label >Phone:</label>
                                        <p>{doctor.Phone}</p>
                                        {/* <p className='ps-2'>{doctor.Qualification}</p> */}
                                    </div>
                                   
                                    <div class="media">
                                        <label>place</label>
                                        <p>{doctor.place}</p>
                                    </div>
                                    <div class="media">
                                        <label>Address</label>
                                        <p className='ps-2'> {doctor.addres}</p>
                                    </div>
                                    <div class="media">
                                        <label>Qualification</label>
                                        <p className='ps-4'> {doctor.Qualification}</p>
                                    </div>
                                   
                                </div>
                          
                            </div>
                            <div class="row about-list">
                                <div class="col-md-12">
                                    <h4>Available Time</h4>
                                  
                                      
                                         {monday && <div class="media">
                                         <label>Monday</label>
                                         <p className='ps-2'>{monday}</p>
                                     </div>}
                                     {tusday && <div class="media">
                                         <label>Tuesday</label>
                                         <p className='ps-2'>{tusday}</p>
                                     </div>}
                                     {wednesday && <div class="media">
                                         <label>Wednesday</label>
                                         <p className='ps-2'>{wednesday}</p>
                                     </div>}
                                     {thursday && <div class="media">
                                         <label>Thursday</label>
                                         <p className='ps-2'>{thursday}</p>
                                     </div>}
                                     {friday && <div class="media">
                                         <label>Friday</label>
                                         <p className='ps-2'>{friday}</p>
                                     </div>}
                                     {saturday && <div class="media">
                                         <label>Saturday </label>
                                         <p className='ps-2'>{saturday}</p>
                                     </div>}
                                     {sunday && <div class="media">
                                         <label>Friday </label>
                                         <p className='ps-2'>{sunday}</p>
                                     </div>}
                                        
                                   
                               

                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img src={doctor.url} title="" alt=""/>
                        </div>
                    </div>
                </div>
                <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                                <p class="m-0px font-w-600">Happy Clients</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                                <p class="m-0px font-w-600">Project Completed</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                                <p class="m-0px font-w-600">Photo Capture</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                                <p class="m-0px font-w-600">Telephonic Talk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
       
  )
}

export default Profile