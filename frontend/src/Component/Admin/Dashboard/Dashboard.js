import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Dashboard() {
  const admin = useSelector((state) => state.admin.value);
  const [doctor, setDoctors] = useState([]);
  const [totaldoctors, setToatalDoctors] = useState();
  const [totalpatient, setTotalpatient] = useState();
  const [totaluser, setTotalUSer] = useState();
  const [doctors, setDoctorss] = useState([]);
  const [todayAppointment, setTodayAppointment] = useState([]);

  const navigate = useNavigate();
  var count = 0;
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": admin.token,
          },
        };

        const { data } = await axios.get("/admin/view-doctors-request", config);

        console.log(data);
        setDoctors(data);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": admin.token,
          },
        };

        const { data } = await axios.get("/admin/all-doctors", config);
        console.log("bfvbvb", data);
        setDoctorss(data);
        setToatalDoctors(data.length);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios("/admin/view-all-patients");
        setTotalpatient(data.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": admin.token,
          },
        };

        const { data } = await axios.get("/admin/all-user", config);
        console.log("bfvbvb", data);
        setTotalUSer(data.length);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/admin/view-today-appointments");
        console.log(data);
        setTodayAppointment(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  var count = doctor.length;
  const viewDoctors = (id) => {
    navigate(`/admin/view-single-doctor/${id}`);
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
              <i class="fas fa-bell fa-fw" style={{ color: "white" }}></i>

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
                        <img src={obj.url} alt="" />
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
                <span class="number">{totaluser}</span>
              </div>
              <div class="box box2" style={{ backgroundColor: "#6437E8" }}>
                <i class="fa-solid fa-bed"></i>
                <span class="text">Total Patient</span>
                <span class="number">{totalpatient}</span>
              </div>
              <div class="box box3" style={{ backgroundColor: "#4544E8" }}>
                <i class="fa-solid fa-user-doctor"></i>
                <span class="text">Total Doctors</span>
                <span class="number">{totaldoctors}</span>
              </div>
            </div>
          </div>

          <div class="activity">
            <div class="title">
              <i class="uil uil-clock-three"></i>
              <span class="text">Today Appoinment</span>
            </div>

            {/* <div class="activity-data">
              <div class="data names">
                <span class="data-title">Name</span>
                {todayAppointment.map((obj)=>{
                  return(
                    <span class="data-list">{obj.name}</span>
                  )
                })}
               
              </div>
              <div class="data email">
                <span class="data-title">Email</span>
                {todayAppointment.map((obj)=>{
                  return(
                    <span class="data-list">{obj.Name}</span>
                  )
                })}
              </div>
              <div class="data joined">
                <span class="data-title">Joined</span>
                <span class="data-list">2022-02-12</span>
              </div>
              <div class="data type">
                <span class="data-title">Type</span>
                <span class="data-list">New</span>
              </div>
              <div class="data status">
                <span class="data-title">Status</span>
                <span class="data-list">Liked</span>
  
              </div>
            </div> */}
           <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">Patient Name</TableCell>
              <TableCell align="center">Doctor Name</TableCell>
              <TableCell align="center">Appoinment Date</TableCell>
              <TableCell align="center">Appoinment Time</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todayAppointment.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.name}</TableCell>
                {doctors.map((obj) => {
                    if(row.doctorId==obj._id){
                        return (
                  <TableCell align="center">{obj.Name}</TableCell>
                        )     
                    }
                })}

                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.selectedTime}</TableCell>
                <TableCell align="center">{row.Age}</TableCell>
                <TableCell align="center">
                {row.phone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
