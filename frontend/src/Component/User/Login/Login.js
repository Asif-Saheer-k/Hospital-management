import React, { useEffect, useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const [error, setError] = useState();
  const [who, setWho] = useState();
  const [user, setUser] = useState("");
  console.log("prps", props.title);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.title == "user") {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        navigate("/");
      }
    } else {
      const adminInfo = localStorage.getItem("adminInfo");
      if (adminInfo) {
        navigate("/admin/adminHome");
      }
    }
  }, []);

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

    if (props.title == "user") {
      console.log("hi");
      setUser("user");

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/user/login",
          {
            email,
            password,
          },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log("hoi");

        navigate("/");
        console.log(data);
      } catch (error) {
        console.log("eorr");
        setError("Invalid Email And Password");
      }
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/admin/login",
          {
            email,
            password,
          },
          config
        );
        console.log(data, "admin");
        localStorage.setItem("adminInfo", JSON.stringify(data));
        navigate("/admin/adminHome");
      } catch (error) {
        setError("Invalid Email Password");
      }
    }

    reset();
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

        {who && <div class="text-center mt-4 name">{who}asif</div>}
        <form onSubmit={handleSubmit(onSubmit)} class="p-3 mt-3">
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

        <div class="text-center fs-6">
          <Link to="/phone">OTP LOGIN?</Link>OR{" "}
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
