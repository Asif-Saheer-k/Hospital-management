import {useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { useSelector} from "react-redux";

export default function BasicTable() {
  const admin = useSelector((state) => state.admin.value);
    const [userDeatails,setuserDetails]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
    
    (async function () {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              "auth-token":admin.token
            },
          };
  
          const { data } = await axios.get("/admin/all-user", config);
          console.log("bfvbvb", data);
          setuserDetails(data);
         
        } catch (error) {
          throw new error(error.response.data.message);
        }
      })();
    }, []);

  return (
    <section class="dashboard">
    <div class="top" style={{backgroundColor:"#328090"}}>
        <i class="uil uil-bars sidebar-toggle"></i>

        <div class="search-box" style={{backgroundColor:"white"}}>
            <i class="uil uil-search"></i>
            <input type="text" placeholder="Search here..." />
        </div>
        
        <img src="images/profile.jpg" alt=""/>
    </div>

    <TableContainer component={Paper} style={{marginTop:"10%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>      
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">phoneNumber</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {userDeatails.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phoneNumber}</TableCell>
             
  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  );
}