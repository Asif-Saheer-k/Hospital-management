import React, { useState } from "react";
import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  var genders;
  const gender = (e) => {
    console.log(e);
    genders = e;
  };

  const onSubmit = async (data) => {
    console.log(data);
    const username=data.username
    const phoneNumber=data.phoneNumber
    const password=data.Password
    const email=data.email
    const address=data.Address
    const cPassword=data.cPassword
    if(password==cPassword){
     
    try {
      const confiq = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/register",
        {
          username,
          email,
          password,
          address,
          phoneNumber,
          genders
        },
        confiq
      );
      console.log("hoi");
      navigate("/login");

      console.log(data);
    } catch(error) {
      console.log("kjkjkj");
    
  
      setError("User Already Exist");
    }
  }else{
    console.log("not");
    setError("password not match");

  }
  };

  return (
    <div class="container register">
      <div class="row">
        <div class="col-md-3 register-left">
          {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/> */}
          <h3>Welcome</h3>
          <p>You are 30 seconds away from earning your own money!</p>
          <input type="submit" name="" value="Login" />
          <br />
        </div>
        <div class="col-md-9 register-right">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 class="register-heading">Register Patient</h3>
                <div class="row register-form">
                  <div class="col-md-6">
                    <div class="form-group mt-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="user name*"
                        {...register("username", {
                          required: "user name is required",
                          pattern: {
                            value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                            message:
                              "invalid user name,only character are allowed",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("username");
                        }}
                      />
                    </div>
                    {errors.username && (
                      <small className="text-danger">
                        {errors.username.message}
                      </small>
                    )}
                    {/* <div class="form-group mt-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name *"
                       
                        {...register("LastName", {
                            required: "Last Name is required",
                            pattern: {
                              value: /^[a-zA-Z]{8,22}$/,
                              message: "invalid Last Name address",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("LastName");
                          }}
                      />
                    </div>
                    {errors.LastName && (
                  <small className="text-danger">{errors.LastName.message}</small>
                )} */}
                    <div class="form-group mt-2">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password *"
                        {...register("Password", {
                          required: "Password is required",
                          pattern: {
                            value:  /^[a-zA-Z]+$/,
                            message:
                              "invalid password,only Charecter  are allowed",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("Password");
                        }}
                      />
                    </div>
                    {errors.Password && (
                      <small className="text-danger">
                        {errors.Password.message}
                      </small>
                    )}
                    <div class="form-group mt-2">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password *"
                        {...register("cPassword", {
                          required: "Password is required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message:
                              "invalid password,only Charecters are allowed",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("cPassword");
                        }}
                      />
                    </div>
                    {errors.cPassword && (
                      <small className="text-danger">
                        {errors.cPassword.message}
                      </small>
                    )}
                    <div class="form-group mt-2">
                      <div class="maxl mt-2">
                        <label class="radio inline ">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            onClick={(e) => {
                              gender(e.target.value);
                            }}
                          />
                          <span> Male </span>
                        </label>
                        <label class="radio inline ms-3">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            onClick={(e) => {
                              gender(e.target.value);
                            }}
                          />
                          <span>Female </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mt-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Your Email *"
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
                    </div>
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                    <div class="form-group mt-2">
                      <input
                        type="text"
                        minlength="10"
                        maxlength="10"
                        class="form-control"
                        placeholder="Your Phone *"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Invalid phone number",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("phoneNumber");
                        }}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <small className="text-danger">
                        {errors.phoneNumber.message}
                      </small>
                    )}
                    {/* <div class="form-group mt-2">
                      <select class="form-control">
                        <option class="hidden" selected disabled>
                          Please select your Sequrity Question
                        </option>
                        <option>What is your Birthdate?</option>
                        <option>What is Your old Phone Number</option>
                        <option>What is your Pet Name?</option>
                      </select>
                    </div> */}
                    <div class="form-group mt-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Answer *"
                        {...register("Address", {
                          required: "Address is required",
                          pattern: {
                            value: /^[#.0-9a-zA-Z\s,-]+$/,
                            message: "Invalid Address",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("Address");
                        }}
                      />
                    </div>
                    {errors.Address && (
                      <small className="text-danger">
                        {errors.Address.message}
                      </small>
                    )}
                    <input type="submit" class="btnRegister" value="Register" />
                  </div>
                  {error && <div className="error_msg">{error}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
