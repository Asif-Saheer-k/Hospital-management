import React, { useEffect, useState } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

const columns = [
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "phone", label: "Phone Numer", minWidth: 100, align: "center" },
  { id: "date", label: "Appointment Date", minWidth: 100, align: "center" },
  {
    id: "selectedTime",
    label: "Appointment Time",
    minWidth: 100,
    align: "center",
  },
  { id: "message", label: "Message", minWidth: 100, align: "center" },

  //   {
  //     id: 'size',
  //     label: 'Size\u00a0(km\u00b2)',
  //     minWidth: 170,
  //     align: 'right',
  //     format: (value) => value.toLocaleString('en-US'),
  //   },
  //   {
  //     id: 'density',
  //     label: 'Density',
  //     minWidth: 170,
  //     align: 'right',
  //     format: (value) => value.toFixed(2),
  //   },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function Patient() {
  const [page, setPage] = React.useState(0);
  const [doctId, setDoctorId] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Patients, setPatients] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const doctor = useSelector((state) => state.doctor.value);

  var ID = doctor.id;

  useEffect(() => {
    // const DoctorID=ID
    (async function (id) {
      try {
        console.log("ddddd", id);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        }

        const { data } = await axios.get(
          `/doctor/view-all-patient/${id}`,
          config
        );
        console.log(data);
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    })(ID);
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                ALL PATIENTS LIST
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Patients.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={
            Patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
