import React, { useEffect, useState } from "react";
import "./OtpPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function OtpPage() {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, []);
  
  var phoneNumber = useParams();
  const navigate = useNavigate();

  const [error, setErorr] = useState();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    
    console.log("ggfgfgfg", data);
    const phone = phoneNumber.phone;
    const otp = data.phone;
    console.log(otp);
    console.log(phone);
    try {
      console.log("njf");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user/otp-verification",
        {
          phone,
          otp,
        },
        config
      );
      console.log("fdfd");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (erorr) {
      setErorr("Invalid OTP");
    }
  };

  return (
    <div>
      <div class="wrapper">
        <div class="logo">
          <img
            src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
            alt=""
          />
        </div>
        <div class="text-center mt-4 name">Care Well</div>
        {error && <small className="text-danger">{error}</small>}
        <form onSubmit={handleSubmit(onSubmit)} class="p-3 mt-3">
          <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input
              type="number"
              placeholder="Enter Phone number"
              {...register("phone", {
                required: "Phone is required",
              })}
              onKeyUp={() => {
                trigger("phone");
              }}
            />
          </div>

          <button type="submit" class="btn mt-3">
            Login
          </button>
        </form>
        <div class="text-center fs-6">
          <a href="#">OTP LOGIN?</a> or <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
