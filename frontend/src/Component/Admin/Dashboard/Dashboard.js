import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";

function Dashboard() {
  const admin = useSelector((state) => state.admin.value);
  const [doctor, setDoctors] = useState([]);
  const navigate = useNavigate();
  var count = 0;
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token":admin.token
          },
        };

        const { data } = await axios.get(
          "/admin/view-doctors-request",
          config
        );

        console.log(data);
        setDoctors(data);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);

  console.log(doctor, "fdfdfdfdffdfdfdfdfdfff");
  var count = doctor.length;
  const viewDoctors = (id) => {
    navigate(`/admin/view-single-doctor/${id}`)
  };

  return (
    <div>
      <section class="dashboard">
        <div class="top d-flex" style={{ backgroundColor: "#328090" }}>
          <i class="uil uil-bars sidebar-toggle"></i>

          <div class="search-box" style={{ backgroundColor: "white" }}>
            <i class="uil uil-search"></i>
            <input type="text" placeholder="Search here..." />
          </div>
          <div
            class="nav-item dropdown no-arrow"
            style={{ marginRight: "21%" }}
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-bell fa-fw" style={{ color:"white" }}></i>

              <span class="badge badge-danger badge-counter">{count}+</span>
            </a>

            <div
              class="dropdown-list dropdown-menu dropdown-menu-left shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 class="dropdown-header">Alerts Center</h6>
              {doctor.map((obj) => {
                return (
                  <a
                    onClick={() => {
                      viewDoctors(obj._id);
                    }}
                    class="dropdown-item d-flex align-items-center"
                  >
                    <div class="mr-3">
                      <div class="icon-circle bg-success">
                        <img
                          src={obj.url}
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      {obj.Name}
                      <div class="small text-gray-500">{obj.date}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div class="dash-content"> 
          <div class="overview">
            <div class="title">
              <i class="uil uil-tachometer-fast-alt"></i>
              <span class="text">Dashboard</span>
            </div>
        
            <div class="boxes">
              <div class="box box1">
                <i class="fa-solid fa-user-group"></i>
                <span class="text">Total Users</span>
                <span class="number">50,120</span>
              </div>
              <div class="box box2" style={{ backgroundColor: "#6437E8" }}>
                <i class="fa-solid fa-bed"></i>
                <span class="text">Total Patient</span>
                <span class="number">20,120</span>
              </div>
              <div class="box box3" style={{ backgroundColor: "#4544E8" }}>
                <i class="fa-solid fa-user-doctor"></i>
                <span class="text">Total Doctors</span>
                <span class="number">10,120</span>
              </div>
            </div>
          </div>

          <div class="activity">
            <div class="title">
              <i class="uil uil-clock-three"></i>
              <span class="text">Recent Activity</span>
            </div>

            <div class="activity-data">
              <div class="data names">
                <span class="data-title">Name</span>
                <span class="data-list">Prem Shahi</span>
                <span class="data-list">Deepa Chand</span>
                <span class="data-list">Manisha Chand</span>
                <span class="data-list">Pratima Shahi</span>
                <span class="data-list">Man Shahi</span>
                <span class="data-list">Ganesh Chand</span>
                <span class="data-list">Bikash Chand</span>
              </div>
              <div class="data email">
                <span class="data-title">Email</span>
                <span class="data-list">premshahi@gmail.com</span>
                <span class="data-list">deepachand@gmail.com</span>
                <span class="data-list">prakashhai@gmail.com</span>
                <span class="data-list">manishachand@gmail.com</span>
                <span class="data-list">pratimashhai@gmail.com</span>
                <span class="data-list">manshahi@gmail.com</span>
                <span class="data-list">ganeshchand@gmail.com</span>
              </div>
              <div class="data joined">
                <span class="data-title">Joined</span>
                <span class="data-list">2022-02-12</span>
                <span class="data-list">2022-02-12</span>
                <span class="data-list">2022-02-13</span>
                <span class="data-list">2022-02-13</span>
                <span class="data-list">2022-02-14</span>
                <span class="data-list">2022-02-14</span>
                <span class="data-list">2022-02-15</span>
              </div>
              <div class="data type">
                <span class="data-title">Type</span>
                <span class="data-list">New</span>
                <span class="data-list">Member</span>
                <span class="data-list">Member</span>
                <span class="data-list">New</span>
                <span class="data-list">Member</span>
                <span class="data-list">New</span>
                <span class="data-list">Member</span>
              </div>
              <div class="data status">
                <span class="data-title">Status</span>
                <span class="data-list">Liked</span>
                <span class="data-list">Liked</span>
                <span class="data-list">Liked</span>
                <span class="data-list">Liked</span>
                <span class="data-list">Liked</span>
                <span class="data-list">Liked</span>
                <span class="data-list">Liked</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
