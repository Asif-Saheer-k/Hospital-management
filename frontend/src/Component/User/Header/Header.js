import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/css/style.css";
import "../Style/plugins/slick-carousel/slick/slick-theme.css";
import "../Style/plugins/slick-carousel/slick/slick.css";
import "../Style/plugins/icofont/icofont.min.css";
import "../Style/plugins/bootstrap/css/bootstrap.min.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logInUser } from "../../Redux/Slices/userData";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate({});
  const [userInfo, setuserDetails] = useState("");
  const [department, setDepartment] = useState([]);
  const user= useSelector((state) => state.user.value);
  useEffect(() => {
    if (user) {
      
      // console.log(user);
      // const json = JSON.parse(user);
      // const name = json.name;
      setuserDetails(user.name);
      // console.log(name, "fdfdf");
    }
  });

  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get("/user/view-department", config);

        setDepartment(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const LOGOUT = () => {
    dispatch(logInUser(null));
  };

  const viewDepartmets = (dept) => {
    navigate(`/view-doctor-department/${dept}`);
  };
  const daata = useSelector((state) => state.user.value);

  return (
    <div>
      <header>
        <div class="header-top-bar">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <ul class="top-bar-info list-inline-item pl-0 mb-0">
                  <li class="list-inline-item">
                    <a href="mailto:support@gmail.com">
                      <i class="icofont-support-faq mr-2"></i>support@novena.com
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <i class="icofont-location-pin mr-2"></i>Address Ta-134/A,
                    New York, USA{" "}
                  </li>
                </ul>
              </div>
              <div class="col-lg-6">
                <div class="text-lg-right top-right-bar mt-2 mt-lg-0">
                  <a href="tel:+23-345-67890">
                    <span>Call Now : </span>
                    <span class="h4">823-4565-13456</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-expand-lg navigation" id="navbar">
          <div class="container">
            <Link class="navbar-brand" to="/">
              <img
                src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657811514/fqg8cdvhno1hrudscnkk.png"
                alt=""
                class="img-fluid"
              />
            </Link>

            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarmain"
              aria-controls="navbarmain"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="icofont-navigation-menu"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarmain">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <Link class="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/services">
                    Services
                  </Link>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    id="dropdown02"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Department
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="dropdown02">
                    {department.map((obj) => {
                      return (
                        <li>
                          <a
                            class="dropdown-item"
                            key={obj._i}
                            onClick={() => {
                              viewDepartmets(obj.Departments);
                            }}
                          >
                            {obj.Departments}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    id="dropdown03"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Doctors
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="dropdown03">
                    <li>
                      <Link to="/view-doctors" class="dropdown-item">
                        Doctors
                      </Link>
                    </li>
                
                    {/* <li>
                      {userInfo &&
                      <Link to='' class="dropdown-item">
                      View Appoinment
                      </Link>
                         }
                    </li> */}
                  </ul>
                </li>

                {/* <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="blog-sidebar.html"
                    id="dropdown05"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Blog <i class="icofont-thin-down"></i>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="dropdown05">
                    <li>
                      <a class="dropdown-item" href="blog-sidebar.html">
                        Blog with Sidebar
                      </a>
                    </li>

                    <li>
                      <a class="dropdown-item" href="blog-single.html">
                        Blog Single
                      </a>
                    </li>
                  </ul>
                </li> */}

                <li class="nav-item">
                  <a class="nav-link" href="contact.html">
                    Contact
                  </a>
                </li>
                {userInfo ? (
                  <li class="nav-item dropdown" style={{ marginLeft: "15%" }}>
                    <a
                      class="nav-link dropdown-toggle"
                      id="dropdown03"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdown03">
                      <li>
                        <a class="dropdown-item" href="doctor.html">
                          PROFILE
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="doctor-single.html">
                          APPOINMENT
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" onClick={LOGOUT} href="/login">
                          LOGOUT
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <div className="d-flex" style={{ marginLeft: "10%" }}>
                    <li class="nav-item">
                      <Link
                        to="/login"
                        className="btn btn-info rounded-pill text-center"
                      >
                        LOGIN
                      </Link>
                    </li>

                    <li class="nav-item" style={{ marginLeft: "5%" }}>
                      <Link
                        to="/signup"
                        className="btn rounded-pill text-center"
                        style={{ backgroundColor: "#0062CC", color: "white" }}
                      >
                        REGISTER
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Header;
