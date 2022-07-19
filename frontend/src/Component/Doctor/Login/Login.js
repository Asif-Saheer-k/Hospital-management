import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const config = {
        headers: {
          "Contant-type": "application/json",
        },
      };

      const { doctor } = await axios.post(
        "/doctor/login",
        {
          email,
          password,
        },
        config
      );
    } catch (error) {
      console.log(error);
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

        <div class="text-center mt-4 name">Doctor Login</div>
        <form class="p-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input
              type="text"
              placeholder="email"
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
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              type="password"
              placeholder="password"
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^[a-zA-Z]{8,22}$/,
                  message: "invalid password address",
                },
              })}
              onKeyUp={() => {
                trigger("password");
              }}
            />
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
          {error && <small className="text-danger">{error}</small>}
          <button type="submit" class="btn mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
