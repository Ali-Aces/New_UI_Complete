import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { loginUser } from "../actions/authActions";
import { useNavigate, Navigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  setAuthenticated,
  SET_CURRENT_USER,
  USER_LOADING,
} from "../actions/types";
import Sheet from "../Sheet/Sheet";
import axios from "axios";
import Acealyze from "../../images/Acealyze.png";

const Otp = (props) => {
  const {
    form,
    setForm,
    Luser,
    setLUser,
    setUserData,
    error,
    setError,
  } = useContext(GlobalContext);
  let navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLUser({
      ...Luser,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: Luser.email,
      password: Luser.password,
      errors: {},
    };
    setError(null);
    setUserData(userData);
    if (userData.email === null || userData.email === "") {
      setError("Please enter a valid email address");
    } else if (userData.password === null || userData.password === "") {
      setError("Please enter Password");
    } else {
      axios
        .post(
          "https://ocean-user-serverbackend.onrender.com/api/users/login",
          userData
        )
        // .post("http://18.117.87.102:5001/api/users/login", userData)

        .then((res) => {
          console.log("working");
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          navigate("/sheet/sheet");
        })
        .catch((err) => {
          console.log(err);
          alert("Email or password invalid");
        });
    }
  };
  return (
    <>
      <div className="home-page">
        <div className="OtpLeftSide">
          <a href="https://www.aces-co.com/" rel="noreferrer" target="_blank">
            <img className="logo" src={Acealyze} alt="logo-img" />
          </a>
        </div>
        <div className="OtpRightSide">
          <div className="OtpPage">
            <div className="">
              <h4 style={{ marginLeft: "-160px" }}>
                <b>Otp</b>
              </h4>
            </div>
            <p
              style={{
                width: "4.5%",
                height: "3.25px",
                marginLeft: "-297px",
                marginTop: "5px",
                border: "1px solid #E50035",
                backgroundColor: "#E50035",
              }}
            ></p>
            <div className="">
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  marginTop: "20px",
                  fontSize: "10px",
                }}
              >
                We have send you a One Time Password(OTP) to your email
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <button className="formBtn" >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Otp;
