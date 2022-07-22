import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";

function Profile() {
  const [time, setTime] = useState([]);
  // const [doctor,setDoctor]=useState({})
  const doctor = useSelector((state) => state.doctor.value);
  // setDoctor(doctor)
  useEffect(()=>{
    setTime(doctor.time)
  },[])
 

  const availableDays = [];
  {
    time.map((obj) => {
      if (obj.Time) {      
        availableDays.push({ time:obj.Time, Days:obj.Day });
      }
    });
  }

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
                    <p className="ps-2"> {doctor.email}</p>
                  </div>
                  <div class="media">
                    <label>Phone:</label>
                    <p>{doctor.Phone}</p>
                    {/* <p className='ps-2'>{doctor.Qualification}</p> */}
                  </div>

                  <div class="media">
                    <label>place</label>
                    <p>{doctor.place}</p>
                  </div>
                  <div class="media">
                    <label>Address</label>
                    <p className="ps-2"> {doctor.addres}</p>
                  </div>
                  <div class="media">
                    <label>Qualification</label>
                    <p className="ps-4"> {doctor.Qualification}</p>
                  </div>
                </div>
              </div>
              <div class="row about-list">
                <div class="col-md-12">
                  <h4>Available Time</h4>
                  {availableDays.map((obj) => {
                    return (
                      <div class="media">
                        <label>{obj.Days}</label>
                        <p className="ps-2">{obj.time}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-avatar">
              <img src={doctor.url} title="" alt="" />
            </div>
          </div>
        </div>
        <div class="counter">
          <div class="row">
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="500" data-speed="500">
                  500
                </h6>
                <p class="m-0px font-w-600">Happy Clients</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="150" data-speed="150">
                  150
                </h6>
                <p class="m-0px font-w-600">Project Completed</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="850" data-speed="850">
                  850
                </h6>
                <p class="m-0px font-w-600">Photo Capture</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="190" data-speed="190">
                  190
                </h6>
                <p class="m-0px font-w-600">Telephonic Talk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
