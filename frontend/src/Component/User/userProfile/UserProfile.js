import React, { useState } from "react";
import "./UserProfile.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import {useNavigate}  from "react-router-dom"
function UserProfile() {
  const [error,setError]=useState()
  const user = useSelector((state) => state.user.value);
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  const onsubmit = async (data) => {
    const username = data.username;
    const email = data.email;
    const address = data.Address;
    const phoneNumber = data.phoneNumber;
    const oldPassword = data.oldPassword;
    const password = data.newPassword;
    const gender = user.gender;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/user/update-profile",
        {
          username,
          email,
          password,
          phoneNumber,
          address,
          oldPassword,
        },
        config
      );
             
      navigate('/')
      
    } catch (err) {

    const erro=err.response.data
      setError(erro)    
      console.log(erro,"kkkkkkkkk");
    }      
  };

 
  return (
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span class="font-weight-bold">{user.name}</span>
            <span class="text-black-50">{user.email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <form onSubmit={handleSubmit(onsubmit)}>
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    defaultValue={user.name}
                    {...register("username", {
                      required: "user name is required",
                      pattern: {
                        value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                        message: "invalid user name,only character are allowed",
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
                <div class="col-md-6">
                  <label class="labels">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    defaultValue={user.email}
                    placeholder="surname"
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
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Mobile Number</label>
                  <input
                    type="text"
                    class="form-control"
                    defaultValue={user.phone}
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
                <div class="col-md-12">
                  <label class="labels">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    defaultValue={user.Address}
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
                <div class="col-md-12">
                  <label class="labels">Old password</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter old password"
                    {...register("oldPassword", {
                      required: "Password is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "invalid password,only Charecters are allowed",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("oldPassword");
                    }}
                  />
                </div>
                {errors.oldPassword && (
                  <small className="text-danger">
                    {errors.oldPassword.message}
                  </small>
                )}
                <div class="col-md-12">
                  <label class="labels">New Password</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter new password"
                    {...register("newPassword", {
                      required: "Password is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "invalid password,only Charecters are allowed",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("newPassword");
                    }}
                  />
                </div>
                {errors.newPassword && (
                  <small className="text-danger">
                    {errors.newPassword.message}
                  </small>
                )}
              </div>

              <div class="mt-5 text-center">
              {error && (
            <small className="text-danger">{error}</small>
          )}
                <button type="submit" class="btn btn-primary profile-button">
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
