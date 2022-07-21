import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useSelector} from "react-redux";
import { useNavigate, Link } from "react-router-dom";


export default function BasicTable() {
  const [userDeatails, setuserDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("EUR");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.value);
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
        setuserDetails(data);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);

  const deleteDoctor = async (id) => {
    if (window.confirm(`Sure to Delete?`)) {
      var index=0
      userDeatails.map((obj) => {
          console.log("fsdf", obj);
          if (obj._id == id) {
             index = userDeatails.indexOf(obj);      
          }
        });
      const test = [...userDeatails];
  
      test.splice(index, 1);
      setuserDetails(test);
    console.log(id);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": admin.token,
       
        },
      };
      const deleteDoctor = await axios.post(
        `/admin/doctor-status/${id}`,
        config
      );
    } catch (error) {
      console.log(error);
    }

  
  }
  };
  const viewDoctors = (id) => {
    navigate(`/admin/view-single-doctor/${id}`)
  };

  return (
    <section class="dashboard">
      <div class="top" style={{ backgroundColor: "#328090" }}>
        <i class="uil uil-bars sidebar-toggle"></i>

        <div class="search-box" style={{ backgroundColor: "white" }}>
          <i class="uil uil-search"></i>
          <input type="text" placeholder="Search here..." />
        </div>

        <img src="images/profile.jpg" alt="" />
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          ></Modal>
        </div>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "10%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Doctor Name</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDeatails.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">

                 
                  <img onClick={()=>{viewDoctors(row._id)}}
                    src={row.url}
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50px",
                      
                    }}
                  />
                 
                </TableCell>
                <TableCell align="center">{row.Name}</TableCell>
                <TableCell align="center">{row.specailist}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  {" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteDoctor(row._id);
                    }}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
