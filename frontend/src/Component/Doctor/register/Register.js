import React from "react";
import { useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox from "@mui/material/Checkbox";

function AddDoctors() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [monday, setMonday] = useState();
  const [tusday, setTusday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();
  const [saturday, setSaturday] = useState();
  const [sunday, setSunday] = useState();
  const [userDeatails, setuserDetails] = useState([]);

  const [currency, setCurrency] = React.useState("EUR");
  const [url, setUrl] = useState("");
  const [error, setError] = useState();
  const [department, setDepartment] = useState([]);

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
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const uploadImage = async (base64EncodedImage) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("ddddddd", base64EncodedImage);
    const image = JSON.stringify({ data: base64EncodedImage });

    try {
      const user = await axios.post(
        "/admin/add-doctors/uploadImage",
        {
          base64EncodedImage,
        },
        config
      );
      console.log("user", user.data);
      setUrl(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (!url) {
      setError("please upload image");
    } else {
      // if(!selectedFile) return;
      // const url = await uploadImage(previewSource);
      const Name = data.Name;
      const About = data.about;
      const email = data.email;
      const password = data.password;
      const phone = data.PhoneNumber;
      const Qualification = data.Qualification;
      const address = data.address;
      const place = data.Place;
      const specailist = currency;
      const Day = days;
      const time = [
        { Time: monday ,Day:"Monday"},
        { Time: tusday,Day:"Tuesday"},
        { Time: wednesday,Day:"Wednesday"},
        { Time: thursday ,Day:"Thurdsday"},
        { Time: friday,Day:"Friday"},
        { Time: saturday ,Day:"Saturday"},
        { Time: sunday,Day:"Sunday" },
      ];
      try {
        const config = {
          headers: {
            "Contant-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/doctor/register",
          {         
            Name,
            email,
            password, 
            phone,
            Qualification,
            place,
            specailist,
            address,
            Day,
            time,
            url,
            About,
          },
          config
        );
        navigate("/doctor");
      } catch (error) {
        console.log(error);
        setError("please upload details");
      }
    }
  };

  //specailist
  const handleChanges = (event) => {
    setCurrency(event.target.value);
  };

  //cuenciew

  //check box
  const [days, setState] = React.useState({
    Monday: true,
    Tusday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const handleChange = (event) => {
    setState({
      ...days,
      [event.target.name]: event.target.checked,
    });
  };

  const { Monday, Tusday, Wednesday, Thursday, Friday, Saturday, Sunday } =
    days;
  const handleFileInputChange = (e) => {
    console.log("jjj");
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    console.log("hi image");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <section class="dashboard">
      <div class="top" style={{ backgroundColor: "#328090" }}>
        <i class="uil uil-bars sidebar-toggle"></i>

        {/* <div class="search-box" style={{ backgroundColor: "white" }}>
          <i class="uil uil-search"></i>
          <input type="text" placeholder="Search here..." />
        </div>

        <img src="images/profile.jpg" alt="" /> */}
      </div>
      <div className="text-center" style={{ marginTop: "10%" }}>
        <h4>Enter Doctor Details</h4>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" d-flex">
          <div>
            <TextField
              id="Name"
              label="Enter Your Name"
              type="filled"
              {...register("Name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-z]+\s[a-z ]+$/i,
                  message: "invalid user name,only character are allowed",
                },
              })}
              onKeyUp={() => {
                trigger("Name");
              }}
            />
            <div>
              {errors.Name && (
                <small className="text-danger">{errors.Name.message}</small>
              )}
            </div>
          </div>

          <div>
            <TextField
              id="specialities"
              select
              label="Please select your Department"
              value={currency}
              onChange={handleChanges}
            >
              {department.map((option) => (
                <MenuItem key={option.Departments} value={option.Departments}>
                  {option.Departments}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="email"
              label="Enter Your email"
              type="filled"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "invalid email address",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />
            <div>
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
          </div>
          <div>
            <TextField
              id="password"
              label="Enter Your password"
              type="filled"
              {...register("password", {
                required: "password is required",
              })}
              onKeyUp={() => {
                trigger("password");
              }}
            />
            <div>
              {errors.cPassword && (
                <small className="text-danger">
                  {errors.cPassword.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <TextField
              id="PhoneNumber"
              label="Enter Phone Number"
              type="number"
              {...register("PhoneNumber", {
                required: "Password is required",
              })}
              onKeyUp={() => {
                trigger("PhoneNumber");
              }}
            />{" "}
            <div>
              {errors.PhoneNumber && (
                <small className="text-danger">
                  {errors.PhoneNumber.message}
                </small>
              )}
            </div>
          </div>
          <div>
            <TextField
              inputProps={{ style: { textTransform: "uppercase" } }}
              id="Qualification"
              label="Enter Your Qualification"
              type="filled"
              {...register("Qualification", {
                required: "Qualification is required",
              })}
              onKeyUp={() => {
                trigger("Qualification");
              }}
            />
            <div>
              {errors.Qualification && (
                <small className="text-danger">
                  {errors.Qualification.message}
                </small>
              )}
            </div>
          </div>

          {/* <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        /> */}
          <div>
            <TextField
              id="Place"
              label="Enter Your Place"
              type="filled"
              {...register("Place", {
                required: "Place is required",
                pattern: {
                  value: /^[a-z]+\s[a-z ]+$/i,
                  message: "invalid password,only Charecters are allowed",
                },
              })}
              onKeyUp={() => {
                trigger("Place");
              }}
            />
            <div>
              {errors.Place && (
                <small className="text-danger">{errors.Place.message}</small>
              )}
            </div>
          </div>
          <div>
            <TextField
              id="address"
              label="Enter Your address"
              type="filled"
              {...register("address", {
                required: "address is required",
              })}
              onKeyUp={() => {
                trigger("address");
              }}
            />
            <div>
              {errors.address && (
                <small className="text-danger">{errors.address.message}</small>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <TextField
              id="outlined-multiline-static"
              label="about"
              multiline
              rows={5}
              {...register("about", {
                required: "about is required",
              })}
              onKeyUp={() => {
                trigger("about");
              }}
            />
            <div>
              {errors.about && (
                <small className="text-danger">{errors.about.message}</small>
              )}
            </div>
          </div>
          <div>
            <h4>Upload</h4>
            <input
              type="file"
              name="image"
              onChange={handleFileInputChange}
              className="form-control"
              value={fileInputState}
            />
            <div style={{ marginTop: "1%" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  uploadImage(previewSource);
                }}
              >
                Upload
              </button>
            </div>
          </div>
          <div style={{ marginLeft: "5%" }}>
            {previewSource && (
              <img
                src={previewSource}
                name="image"
                alt="chosen"
                style={{ height: "200px", width: "300px" }}
              />
            )}
          </div>
        </div>

        <div className="d-flex" style={{ marginTop: "4%" }}>
          {/* <div>
            <h4>Upload</h4>
            <input
              type="file"
              name="image"
              onChange={handleFileInputChange}
              className="form-control"
              value={fileInputState}
            />
            <div style={{ marginTop: "1%" }}>
              <button className="btn btn-primary" type="button">
                Upload
              </button>
            </div>
            <div>
              {previewSource && (
                <img
                  src={previewSource}
                  name="image"
                  alt="chosen"
                  style={{ height: "300px" }}
                />
              )}
            </div>
          </div> */}
          <div>
            <h4>Available Days And Time</h4>

            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">DAYS</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Monday}
                      onChange={handleChange}
                      name="Monday"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Tusday}
                      onChange={handleChange}
                      name="Tusday"
                    />
                  }
                  label="Tusday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Wednesday}
                      onChange={handleChange}
                      name="Wednesday"
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Thursday}
                      onChange={handleChange}
                      name="Thursday"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Friday}
                      onChange={handleChange}
                      name="Friday"
                    />
                  }
                  label="Friday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Saturday}
                      onChange={handleChange}
                      name="Saturday"
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Sunday}
                      onChange={handleChange}
                      name="Sunday"
                    />
                  }
                  label="Sunday"
                />
              </FormGroup>
            </FormControl>

            <FormControl style={{ marginTop: "8%" }}>
              <FormLabel component="legend">TIME</FormLabel>
              <FormGroup>
                <div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "1%" }}
                    onChange={(e) => {
                      setMonday(e.target.value);
                    }}
                  >
                    <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "5%" }}
                    onChange={(e) => {
                      setTusday(e.target.value);
                    }}
                  >
                   <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "5%" }}
                    onChange={(e) => {
                      setWednesday(e.target.value);
                    }}
                  >
                    <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "6%" }}
                    onChange={(e) => {
                      setThursday(e.target.value);
                    }}
                  >
                  <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "6%" }}
                    onChange={(e) => {
                      setFriday(e.target.value);
                    }}
                  >
                   <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "7%" }}
                    onChange={(e) => {
                      setSaturday(e.target.value);
                    }}
                  >
                    <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ marginTop: "8%" }}
                    onChange={(e) => {
                      setSunday(e.target.value);
                    }}
                  >
                    <option value="9-11 (am)">9-11(am)</option>
                    <option value="11-01 (am-pm)">11-01 (am-pm)</option>
                    <option value="01-03 (pm)">01-03 (pm)</option>
                    <option value="03-05 (pm)">03-05 (pm)</option>
                    <option value="05-08 (pm)">05-08 (pm)</option>
                  </select>
                </div>
              </FormGroup>
            </FormControl>

            {/* <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">DAYS</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Monday}
                      onChange={handleChange}
                      name="Monday"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Tusday}
                      onChange={handleChange}
                      name="Tusday"
                    />
                  }
                  label="Tusday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Wednesday}
                      onChange={handleChange}
                      name="Wednesday"
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Thursday}
                      onChange={handleChange}
                      name="Thursday"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Friday}
                      onChange={handleChange}
                      name="Friday"
                    />
                  }
                  label="Friday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Saturday}
                      onChange={handleChange}
                      name="Saturday"
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Sunday}
                      onChange={handleChange}
                      name="Sunday"
                    />
                  }
                  label="Sunday"
                />
              </FormGroup>
            </FormControl>  */}

            {/* 
            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">DAYS</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Monday}
                      onChange={handleChange}
                      name="Monday"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Tusday}
                      onChange={handleChange}
                      name="Tusday"
                    />
                  }
                  label="Tusday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Wednesday}
                      onChange={handleChange}
                      name="Wednesday"
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Thursday}
                      onChange={handleChange}
                      name="Thursday"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Friday}
                      onChange={handleChange}
                      name="Friday"
                    />
                  }
                  label="Friday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Saturday}
                      onChange={handleChange}
                      name="Saturday"
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Sunday}
                      onChange={handleChange}
                      name="Sunday"
                    />
                  }
                  label="Sunday"
                />
              </FormGroup>
            </FormControl> 




            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">DAYS</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Monday}
                      onChange={handleChange}
                      name="Monday"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Tusday}
                      onChange={handleChange}
                      name="Tusday"
                    />
                  }
                  label="Tusday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Wednesday}
                      onChange={handleChange}
                      name="Wednesday"
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Thursday}
                      onChange={handleChange}
                      name="Thursday"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Friday}
                      onChange={handleChange}
                      name="Friday"
                    />
                  }
                  label="Friday"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Saturday}
                      onChange={handleChange}
                      name="Saturday"
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Sunday}
                      onChange={handleChange}
                      name="Sunday"
                    />
                  }
                  label="Sunday"
                />
              </FormGroup>
            </FormControl> 
*/}
          </div>
        </div>
        <div className="text-center">
          {error && <small className="text-danger">{error}</small>}
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </div>
      </Box>
    </section>
  );
}

export default AddDoctors;
