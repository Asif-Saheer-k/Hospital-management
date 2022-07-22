import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

function ViewDoctor() {
  const [doctorDetails, setDoctorDetails] = useState({});
  const [time, setTime] = useState([]);
  const doctorId = useParams();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.value);
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
          `/admin/view-single-doctor/${doctorId.id}`,
          config
        );
        const times = data.time;
        setTime(times);
        setDoctorDetails(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const availableDays = [];
  {
    time.map((obj) => {
      if (obj.Time) {
        availableDays.push({ time: obj.Time, Days: obj.Day });
      }
    });
  }


  const verifyTrue = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "appplication/json",
          "auth-token":admin.token
        },
      };
      const { data } = await axios.post(`/admin/doctor-status/${id}`, config);
      console.log(data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDoctors = async (id) => {
    console.log("delete", id);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token":admin.token
        },
      };
      const { data } = await axios.post(`/admin/delete-doctors/${id}`, config);
      navigate("/admin");
    } catch (eror) {
      console.log(eror);
    }
  };

  return (
    <section class="dashboard">
      <div class="top d-flex" style={{ backgroundColor: "#328090" }}>
        <i class="uil uil-bars sidebar-toggle"></i>

        <div class="search-box" style={{ backgroundColor: "white" }}>
          <i class="uil uil-search"></i>
          <input type="text" placeholder="Search here..." />
        </div>
      </div>

      <section class="section doctor-single" style={{ marginLeft: "10%" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="doctor-img-block">
                <img src={doctorDetails.url} alt="" class="img-fluid w-100" />

                <div class="info-block mt-4">
                  <h4 class="mb-0">{doctorDetails.Name}</h4>
                  <p>{doctorDetails.specailist}</p>

                  <ul class="list-inline mt-4 doctor-social-links">
                    <li class="list-inline-item">
                      <a href="#">
                        <i class="icofont-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#">
                        <i class="icofont-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#">
                        <i class="icofont-skype"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#">
                        <i class="icofont-linkedin"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#">
                        <i class="icofont-pinterest"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-8 col-md-6">
              <div class="doctor-details mt-4 mt-lg-0">
                <h2 class="text-md">Introducing to myself</h2>
                <div class="divider my-4"></div>
                <p>{}</p>
                <div>
                  <p>{doctorDetails.About}</p>
                </div>
                {/* <a
                  href="appoinment.html"
                  class="btn btn-main-2 btn-round-full mt-3"
                >
                  Make an Appoinment<i class="icofont-simple-right ml-2  "></i>
                </a> */}
              </div>
              <div className="d-flex">
                <div>
                  <p>
                    <pre>EMAIL: {doctorDetails.email}</pre>
                  </p>
                  <p>
                    <pre>Address: {doctorDetails.address}</pre>
                  </p>
                  <p>
                    <pre>Place: {doctorDetails.place}</pre>
                  </p>
                  <p>
                    <pre style={{ textTransform: "uppercase" }}>
                      Qualification: {doctorDetails.Qualification}
                    </pre>
                  </p>
                  <p>
                    <pre>Phone: {doctorDetails.phone}</pre>
                  </p>
                </div>
                <div style={{ marginLeft: "10%" }}>
                  <h4>Available Time</h4>
                  {availableDays.map((obj) => {
                        return (
                           <pre>{obj.Days}: {obj.time}</pre>
                        )})}
                 
                </div>
              </div>
            </div>
          </div>
        </div>       
        <div className="text-center">
          <button
            className="btn btn-success"
            onClick={() => {
              verifyTrue(doctorDetails._id);
            }}
          >
            <i class="fa-solid fa-check" style={{color: "white"}}></i>
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => {
              deleteDoctors(doctorDetails._id);
            }}
          >
            <i class="fa-solid fa-xmark"></i>{" "}
          </button>
        </div>
      </section>
    </section>
  );
}

export default ViewDoctor;
