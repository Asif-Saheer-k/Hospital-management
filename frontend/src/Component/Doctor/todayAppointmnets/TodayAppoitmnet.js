import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

function TodayAppoitmnet() {
  const [todayAppointment, setTodayAppointment] = useState([]);
  const [next, setNext] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const doctor = useSelector((state) => state.doctor.value);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          `/doctor/Today-appoitment/${doctor.id}`
        );
        setRefresh(false);
        setTodayAppointment(data);
        const nextPatient = data[0];
        console.log(nextPatient, "lll");
        if (nextPatient) {
          setNext(nextPatient);
        }
       
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);

  const onSubmit = async (data) => {
    
    setRefresh(true);
    reset();
    console.log(data);
    console.log("fi");
    const prscrioption = data.message;
    const id = next._id;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch(
        "/doctor/appointment-finished",
        {
          prscrioption,
          id,
        },
        config
      );
    
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAppointment = async (id) => {
    setRefresh(true);
    console.log("fis");
    try {
      const data = await axios.delete(`/doctor/delete-appoinments/${id}`);
 
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Today appointmnets</h6>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">TOKEN NO</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayAppointment.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.Token}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.Age}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* </div> */}
      </div>

      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4 mt-5" style={{ height: "75%" }}>
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Next Patient</h6>
          </div>

          <div class="card-body">
            <div class="chart-pie  ">
              <span class="mr-2 ">Name: {next.name}</span>
              <span class="mr-2 ms-5">age: {next.Age}</span>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                {/* <input
               type='hidden'
                class="form-control"a
                rows="6"
                value={next._id}
                placeholder="Your Message"
                {...register("id", {
                  required: "Message is required",
                })}
                onKeyUp={() => {
                  trigger("id");
                }}
              ></input> */}

                <span class="mr-2 ms-5">
                  <button type="submit" className="btn btn-success  mt-3">
                    <i class="fa-solid fa-check" style={{ color: "white" }}></i>
                  </button>
                  <a
                    className="btn btn-danger ms-2  mt-3"
                    onClick={() => {
                      deleteAppointment(next._id);
                    }}
                  >
                    <i class="fa-solid fa-xmark" style={{ color: "white" }}></i>{" "}
                  </a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayAppoitmnet;
