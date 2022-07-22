import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SingleDoctor() {
  const [doctor, setDoctor] = useState({});
  const [time, setTime] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(Date);
  const [selectedTime, setSelectedTime] = useState("");
  const user = useSelector((state) => state.user.value);
  console.log("useridds", user._id);
  const doctorId = useParams();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/user/view-single-doctor/${doctorId.id}`,
          config
        );
        console.log(data, "ddddddddddddddddd");
        setDoctor(data);
        setTime(data.time);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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

  const onSubmit = async (data) => {
    const week=['sunday','monday','tusday','wednesday','Thursday','thursday','saturday']
    
    const date=data.date;
 const LocalFormat=new Date(date)
 const index=LocalFormat.getDay()
 const day=week[index]


//  if(day==mons || day==)

    // console.log(value);
    // console.log(selectedTime);
    // const name = data.Name;
    // const phone = data.Number;
    // const message = data.message;
    // const doctorId = doctor._id;
    // const userId = user._id;
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   console.log("messahe", message);
    //   const { data } = await axios.post(
    //     "/user/patient-details",
    //     {
    //       name,
    //       phone,
    //       message,
    //       date,
    //       selectedTime,
    //       doctorId,
    //       userId,
    //     },
    //     config
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <section class="section doctor-single">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="doctor-img-block">
              <img src={doctor.url} alt="" class="img" />

              <div class="info-block mt-4">
                <h4 class="mb-0">{doctor.Name}</h4>
                <p>{doctor.specailist}</p>
                <p>{doctor.Qualification}</p>

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
            <div class="doctor-details mt-lg-0" style={{ marginLeft: "0%" }}>
              <h2 class="text-md">About</h2>
              <div class="divider"></div>
              <p>{doctor.About}</p>
              <div className="col-12 d-flex">
                <div className="col-md-6 " style={{ marginTop: "20%" }}>
                  <Link
                    to=""
                    class="btn btn-main-2 btn-round-full"
                    style={{ backgroundColor: "#223A66" }}
                    onClick={handleOpen}
                  >
                    Make Ofline Appoinment
                    <i class="icofont-simple-right ml-2  "></i>
                  </Link>

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <section class="appoinment section">
                          <div class="container">
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="appoinment-wrap mt-5 mt-lg-0 pl-lg-5">
                                  <h2 class="mb-2 title-color">
                                    Book an appoinment
                                  </h2>
                                  <p class="mb-4">
                                    Mollitia dicta commodi est recusandae iste,
                                    natus eum asperiores corrupti qui velit .
                                    Iste dolorum atque similique praesentium
                                    soluta.
                                  </p>
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                    <div class="row">
                                      {/* <div class="col-lg-6">
                            <div class="form-group">
                                <select class="form-control" id="exampleFormControlSelect1">
                                  <option>Choose Department</option>
                                  <option>Software Design</option>
                                  <option>Development cycle</option>
                                  <option>Software Development</option>
                                  <option>Maintenance</option>
                                  <option>Process Query</option>
                                  <option>Cost and Duration</option>
                                  <option>Modal Delivery</option>
                                </select>
                            </div>
                        </div> */}
                                      {/* <div class="col-lg-6">
                            <div class="form-group">
                                <select class="form-control" id="exampleFormControlSelect2">
                                  <option>Select Doctors</option>
                                  <option>Software Design</option>
                                  <option>Development cycle</option>
                                  <option>Software Development</option>
                                  <option>Maintenance</option>
                                  <option>Process Query</option>
                                  <option>Cost and Duration</option>
                                  <option>Modal Delivery</option>
                                </select>
                            </div>
                        </div> */}

                                      <div class="col-lg-6">
                                        <div class="form-group">
                                          <input
                                            type="date"
                                            id="start"
                                            class="form-control"
                                            name="trip-start"
                                      
                                            min="2020-01-01"
                                            max="2030-12-31"
                                            {...register("date", {
                                              required: "Name is required",
                                            })}
                                            onKeyUp={() => {
                                              trigger("Date");
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div class="col-lg-6">
                                        <div class="form-group">
                                          <select
                                            class="form-control"
                                            id="exampleFormControlSelect2"
                                            onChange={(e) =>
                                              setSelectedTime(e.target.value)
                                            }
                                          >
                                            <option>Select Time</option>
                                            {monday && (
                                              <option value={monday}>
                                                {monday}
                                              </option>
                                            )}
                                            {tusday && (
                                              <option value={tusday}>
                                                {tusday}
                                              </option>
                                            )}
                                            {wednesday && (
                                              <option value={wednesday}>
                                                {wednesday}
                                              </option>
                                            )}
                                            {thursday && (
                                              <option value={thursday}>
                                                {thursday}
                                              </option>
                                            )}
                                            {friday && (
                                              <option value={friday}>
                                                {friday}
                                              </option>
                                            )}
                                            {saturday && (
                                              <option value={saturday}>
                                                {saturday}
                                              </option>
                                            )}
                                            {sunday && (
                                              <option value={sunday}>
                                                {sunday}
                                              </option>
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                      <div class="col-lg-6">
                                        <div class="form-group">
                                          <input
                                            name="name"
                                            id="name"
                                            type="text"
                                            class="form-control"
                                            placeholder="Full Name"
                                            {...register("Name", {
                                              required: "Name is required",
                                            })}
                                            onKeyUp={() => {
                                              trigger("Name");
                                            }}
                                          />
                                        </div>
                                        {errors.Name && (
                                          <small className="text-danger">
                                            {errors.Name.message}
                                          </small>
                                        )}
                                      </div>

                                      <div class="col-lg-6">
                                        <div class="form-group">
                                          <input
                                            name="phone"
                                            id="phone"
                                            type="Number"
                                            class="form-control"
                                            placeholder="Phone Number"
                                            {...register("Number", {
                                              required: "Number is required",
                                            })}
                                            onKeyUp={() => {
                                              trigger("Number");
                                            }}
                                          />
                                        </div>
                                        {errors.Number && (
                                          <small className="text-danger">
                                            {errors.Number.message}
                                          </small>
                                        )}
                                      </div>
                                    </div>
                                    <div class="form-group-2 mb-4">
                                      <textarea
                                        class="form-control"
                                        rows="6"
                                        placeholder="Your Message"
                                        {...register("message", {
                                          required: "Message is required",
                                        })}
                                        onKeyUp={() => {
                                          trigger("message");
                                        }}
                                      ></textarea>
                                    </div>

                                    <button
                                      class="btn btn-main btn-primary btn-round-full"
                                      type="submit"
                                    >
                                      Make Appoinment
                                      <i class="icofont-simple-right ml-2"></i>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </Box>
                    </Fade>
                  </Modal>

                  <Link
                    to=""
                    class="btn btn-main-2 btn-round-full "
                    style={{ backgroundColor: "#123A66", marginTop: "5%" }}
                  >
                    Make Online Appoinment
                    <i class="icofont-simple-right ml-2  "></i>
                  </Link>
                </div>

                <div className="col-md-6" style={{ marginLeft: "0%" }}>
                  <div class="sidebar-widget schedule-widget mb-3">
                    <h5 class="mb-4">Time Schedule</h5>

                    <ul class="list-unstyled">
                      {monday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Monday</a>
                          <span>{monday}</span>
                        </li>
                      )}
                      {thursday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Tuesday</a>
                          <span>{thursday}</span>
                        </li>
                      )}
                      {wednesday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Wednesday</a>
                          <span>{wednesday}</span>
                        </li>
                      )}
                      {tusday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Thursday</a>
                          <span>{tusday}</span>
                        </li>
                      )}
                      {friday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Friday</a>
                          <span>{friday}</span>
                        </li>
                      )}
                      {saturday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Saturday</a>
                          <span>{saturday}</span>
                        </li>
                      )}
                      {sunday && (
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Sunday</a>
                          <span>{sunday}</span>
                        </li>
                      )}
                    </ul>

                    <div class="sidebar-contatct-info mt-4">
                      <p class="mb-0">Need Urgent Help?</p>
                      <h5>{doctor.phone}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleDoctor;
