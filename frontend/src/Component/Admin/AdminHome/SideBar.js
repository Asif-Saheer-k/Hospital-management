import React, { useEffect } from "react";
import "./SideBar.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logInAdmin } from "../../Redux/Slices/adminData";
import { useDispatch } from "react-redux";

function SideBar() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const admin = useSelector((state) => state.admin.value);
  console.log(admin, "admubn");
  useEffect(() => {
    if (!admin) {
      navigator("/admin");
    }
  }, []);
  const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
  var sidebar = body.querySelector("nav");
  var sidebarToggle = body.querySelector(".sidebar-toggle");

  let getMode = localStorage.getItem("mode");
  if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
  }

  let getStatus = localStorage.getItem("status");
  if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
  }

  // modeToggle.addEventListener("click", () =>{
  //     body.classList.toggle("dark");
  //     if(body.classList.contains("dark")){
  //         localStorage.setItem("mode", "dark");
  //     }else{
  //         localStorage.setItem("mode", "light");
  //     }
  // });

  // sidebarToggle.addEventListener("click", () => {
  //     sidebar.classList.toggle("close");
  //     if(sidebar.classList.contains("close")){
  //         localStorage.setItem("status", "close");
  //     }else{
  //         localStorage.setItem("status", "open");
  //     }
  // })

  const Logout = () => {
    const user = window.alert("are you want logout");
    dispatch(logInAdmin(null));
    navigator("/admin");
  };

  return (
    <div>
      <div class="nav" style={{ backgroundColor: "#328090" }}>
        <div class="logo-name">
          <div class="logo-image">
            <img src="images/logo.png" alt="" />
          </div>

          <span class="logo_name">ADMIN</span>
        </div>

        <div class="menu-items">
          <ul class="nav-links">
            <li>
              <Link className="text-decoration-none" to="/admin/adminHome">
                <i class="uil uil-hospital" style={{ color: "white" }}></i>
                <span class="link-name">Dahsboard</span>
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none" to="/admin/all-users">
                <i class="uil uil-user" style={{ color: "white" }}></i>
                <span class="link-name">Users</span>
              </Link>
            </li>
            <li>
              <Link className="text-decoration-none" to="/admin/all-doctors">
                <i class="uil uil-stethoscope" style={{ color: "white" }}></i>
                <span class="link-name">Doctors</span>
              </Link>
            </li>
            <li>
              <Link to='/admin/view-all-patients'>
                <i class="uil uil-pen" style={{ color: "whitesmoke" }}></i>
                <span class="link-name">Patient</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/view-all-Appointment">
                <i class="uil uil-book" style={{ color: "white" }}></i>
                <span class="link-name">Appointment</span>
              </Link>
            </li>
            <li>
              <Link
                className="text-decoration-none"
                to="/admin/view-Department"
              >
                <i class="uil uil-file-plus-alt" style={{ color: "white" }}></i>
                <span class="link-name">Department</span>
              </Link>
            </li>

            {/* <li><a href="#">
                <i class="uil uil-share"></i>
                <span class="link-name">Share</span>
            </a></li> */}
          </ul>

          <ul class="logout-mode">
            <li>
              <a href="#">
                <i class="uil uil-signout" style={{ color: "white" }}></i>
                <span class="link-name" onClick={Logout}>
                  Logout
                </span>
              </a>
            </li>

            {/* <li class="mode">
                <a href="#">
                    <i class="uil uil-moon"></i>
                <span class="link-name">Dark Mode</span>
            </a>

            <div class="mode-toggle">
              <span class="switch"></span>
            </div>
        </li> */}
          </ul>
        </div>
        {/* <section class="dashboard"  >
    <div class="top" style={{backgroundColor:"#328090"}}>
        <i class="uil uil-bars sidebar-toggle"></i>

        <div class="search-box" style={{backgroundColor:"white"}}>
            <i class="uil uil-search"></i>
            <input type="text" placeholder="Search here..." />
        </div>
        
        <img src="images/profile.jpg" alt=""/>
    </div>
    </section> */}
      </div>
    </div>
  );
}

export default SideBar;
