import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Phone() {
  const [error, setErorr] = useState();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const phone = data.phone;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user/phone-verify",
        {
          phone,
        },
        config 
      );
      // localStorage.setItem("userInfo", JSON.stringify(data));
      navigator(`/otp/${phone}`);
    } catch (erorr) {
      console.log(erorr);
      setErorr("User does not Exists");
      console.log(erorr);
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
                // pattern: {
                //   value: /^[1-9]{0-10}$/,
                //   message: "invalid Phone address",
                // },
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

export default Phone;
