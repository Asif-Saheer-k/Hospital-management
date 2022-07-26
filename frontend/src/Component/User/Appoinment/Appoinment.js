import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom"
function Appoinment() {
  const [appoinment, setAppointment] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [load,setLoad]=useState(false)
  const user = useSelector((state) => state.user.value);
  const navigate=useNavigate()
  useEffect(() => {
    setLoad(false)
    const viewAllAppointment = async (id) => {
      try {
        console.log(id);
        console.log("hi");
        const { data } = await axios.get(`/user/view-appointments/${id}`);
        setAppointment(data.reverse());
      } catch (eror) {
        console.log(eror.response.data);
      }
    };
    viewAllAppointment(user._id);
  }, [load]);

  useEffect(() => {
    const viewAllDoctors = async () => {
      try {
        const { data } = await axios.get("/user/view-all-doctors");
        console.log(data);
        setDoctor(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    viewAllDoctors();
  }, [load]);

  const cancleAppointment = (id) => {
    setLoad(true)
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `/user/cancel-appointmnets/${id}`
          );
          if (data) {
            var index = 0;
            appoinment.map((obj) => {
              console.log("fsdf", obj);
              if (obj._id == id) {
                index = appoinment.indexOf(obj);
              }
            });
            const test = [...appoinment];
      
            test.splice(index, 1);
            setAppointment(test);
      
            navigate('/view-appointments')
            
            console.log(data);
            Swal.fire("Cancelled", "", "success");
          }
        } catch (error) {
          console.log(error);
        }

        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <section class="section doctor-single">
      <div class="container">
        {appoinment.map((obj) => {
          return (
            <div
              class="row"
              style={{ backgroundColor: "whitesmoke", marginTop: "2%" }}
            >
              <div class="col-lg-4 col-md-6">
                {doctor.map((obj1) => {
                  if (obj.doctorId == obj1._id) {
                    return (
                      <div class="doctor-img-block">
                        <img src={obj1.url} alt="" class="img-fluid w-50" />

                        <div class="info-block mt-4">
                          <h4 class="mb-0">{obj1.Name}</h4>
                          <p>{obj1.specailist}</p>

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
                    );
                  }
                })}
              </div>

              <div class="col-lg-8 col-md-6">
                <div class="doctor-details mt-4 mt-lg-0 ms-auto">
                  <h2 class="text-md">Protocol</h2>
                  <div class="divider my-4"></div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nisi doloremque harum, mollitia, soluta maxime porro
                    veritatis fuga autem impedit corrupti aperiam sint,
                    architecto, error nesciunt temporibus! Vel quod, dolor
                    aliquam!
                  </p>
                  <div className="row">
                    <div className="col-lg-5 col-md-6">
                      <p style={{ color: "black" }}>
                        Appointment Date: {obj.date}
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <p className="ms-5" style={{ color: "black" }}>
                        Time: {obj.selectedTime}
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <p className="ms-5" style={{ color: "black" }}>
                        Token: {obj.Token}
                      </p>
                    </div>
                  </div>

                  <a
                    style={{ color: "red" }}
                    class="btn btn-main-2 btn-round-full mt-3"
                    onClick={() => cancleAppointment(obj._id)}
                  >
                    Cancell
                    <i class="icofont-simple-right ml-2  "></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Appoinment;
