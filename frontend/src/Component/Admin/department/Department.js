import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Department() {
  const [Department, setDepartment] = useState([]);
  const [load, setLoad] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      console.log("ffffffffffffffffffffffffffffffffffffffffffffffffff");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.get("/admin/view-department", config);

        console.log(data);
        console.log("ddfdfdf", data);
        setDepartment(data);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoad(false);
  }, [load]);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    var a = 0;
    const department = data.department;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        "/admin/add-department",
        {
          department,
        },
        config
      );

      setLoad(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDepartment = async (id) => {
    if (window.confirm(`Sure to Delete?`)) {
      var index = 0;
      Department.map((obj) => {
        console.log("fsdf", obj);
        if (obj._id == id) {
          index = Department.indexOf(obj);
        }
      });
      const test = [...Department];

      test.splice(index, 1);
      setDepartment(test);
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { Delete } = await axios.delete(
        "/admin/delete/department",
        {
          id,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
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
      </div>
      <div className="text-center" style={{ marginTop: "10%" }}>
        <h4>Department Details</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <div style={{ width: "30%" }}>
              <input
                type="text"
                name="department"
                className="form-control"
                placeholder="Enter Department"
                style={{ width: "100%" }}
                {...register("department", {
                  required: "department is required",
                  pattern: {
                    value: /^[a-z]+\s[a-z ]+$/i,
                    message: "invalid department",
                  },
                })}
                onKeyUp={() => {
                  trigger("department");
                }}
              />
              {errors.department && (
                <small className="text-danger">
                  {errors.department.message}
                </small>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-primary ms-3">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                {/* <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Department.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Departments}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteDepartment(row._id);
                      }}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>{" "}
                  </TableCell>
                  {/* <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}

export default Department;
