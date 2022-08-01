
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useSelector } from "react-redux";

function Appointment() {
    const [appoitment,setAppointment]=useState([])
    const [doctor,setDoctor]=useState([])
    const admin = useSelector((state) => state.admin.value);
    useEffect(() => {  
        (async function () {
          try {
            const { data } = await axios.get("/admin/view-all-Appointment");
            console.log(data,'l');
            setAppointment(data);
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

        const { data } = await axios.get("/admin/all-doctors", config);
        console.log("bfvbvb", data);
        setDoctor(data);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);

  return (
    <section class="dashboard">
      <div class="top" style={{ backgroundColor: "#328090" }}>
        <i class="uil uil-bars sidebar-toggle"></i>

        <div class="search-box" style={{ backgroundColor: "white" }}>
          <i class="uil uil-search"></i>
          <input type="text" placeholder="Search here..." />
        </div>

        <img src="images/profile.jpg" alt="" />
      </div>
      <TableContainer component={Paper} style={{ marginTop: "10%" }}>
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
            {appoitment.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.name}</TableCell>
                {doctor.map((obj) => {
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
    </section>

  )
}

export default Appointment