import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";


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
  const [selectedDate, setSelectedDate] = useState();
  const [availableTime, setAvailableTime] = useState(null);
  const [error, setError] = useState(null);
  const [appointmentError,setAppointmentError]=useState()
  const user = useSelector((state) => state.user.value);

  const doctorId = useParams();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  const pick = new Date();
  const TodayDate = pick.toLocaleDateString("en-CA");

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

        setDoctor(data);

        setTime(data.time);
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
  const onSubmit = async (data) => {
    if(availableTime){
    console.log(data,"ddddddddddddddddddddddddddddd");
    console.log(selectedDate);
    console.log(availableTime);
  
    const name = data.Name;
    const phone = data.Number;
    const message = data.message;
    const date=selectedDate;
    const selectedTime=availableTime;
    const doctorId = doctor._id;
    const userId = user._id;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("messahe", message);
      const { data } = await axios.post(
        "/user/patient-details",
        {
          name,
          phone,
          message,
          date,
          selectedTime,
          doctorId,
          userId,
        },
        config
      );
      navigate('/view-doctors')
    } catch (error) {
      setAppointmentError(error.response.data)
      console.log(error);
    } 
  }        
  };
  const changeTime = (date) => {
    setAvailableTime(null);
    setSelectedDate(date);
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const LocalFormat = new Date(date);
    const index = LocalFormat.getDay();
    const day = week[index];
    console.log(day, "clik");

    {
      availableDays.map((obj) => {
        if (day == obj.Days) {
          setAvailableTime(obj.time);
          setError(null);
        }
      });
    }
    console.log("objtime", availableTime);
   
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
                                            min={TodayDate}
                                            max="2030-12-31"
                                            onChange={(e) => {
                                              changeTime(e.target.value);
                                            }}
                                            // {...register("date", {
                                            //   required: "Name is required",

                                            // })}
                                            // onKeyUp={() => {
                                            //   trigger("Date");
                                            // }}
                                          />
                                        </div>
                                        {error && (
                                          <small className="text-danger">
                                            {error}
                                          </small>
                                        )}
                                      </div>

                                      <div class="col-lg-6">
                                        <div class="form-group">
                                          <select
                                            class="form-control"
                                            id="exampleFormControlSelect2"
                                            {...register("Settime", {
                                              required: " Please Select Valid Date",
                                            })}
                                            onClick={() => {
                                              trigger("Settime");
                                            }}
                                          
                                          >
                                            {availableTime ? (
                                              <option value={availableTime}>
                                                {availableTime}
                                              </option>
                                            ) : (
                                              <option>
                                                Please Select Date
                                              </option>
                                            )}
                                          </select>
                                        </div>
                                        {availableTime ?(<small></small>): (
                                          <small className="text-danger">
                                            Please Select Valid Date
                                          </small>
                                        )}

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
                                    {appointmentError &&
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        <AlertTitle>info</AlertTitle>
                                      This is an info alert — <strong>{appointmentError}</strong>
                                     </Alert>
                                      </Stack>}

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
                      {availableDays.map((obj) => {
                        return (
                          <li class="d-flex justify-content-between align-items-center">
                            <a href="#">{obj.Days}</a>
                            <span>{obj.time}</span>
                          </li>
                        );
                      })}
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
