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

const Login = (props) => {
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
      <div className="LoginPage">
      <div className="">
          <h4 style={{ marginLeft: "-160px" }}>
            <b>Login</b> 
          </h4>
        </div> 
      <p
          style={{
            width: "7.5%",
            height: "3.25px",
            marginLeft: "-288px",
            marginTop: "5px",
            border: "1px solid #E50035",
            backgroundColor: "#E50035",
          }}
        ></p>

        
        <form className="LoginForm" onSubmit={handleSubmit}>
          <input
            className="formInput"
            onChange={handleChange}
            value={Luser.email}
            id="email"
            type="email"
            placeholder="Email"
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={Luser.password}
            id="password"
            // error={errors.password}
            type="password"
            placeholder="Password"
          />
          
          <p style={{ color: "red" }}>
            {error && (
              <>
                <small>{error}</small>
              </>
            )}
          </p>
          <div style={{ display: "flex", marginTop: "10px",flexDirection:"row",justifyContent:"space-between" }}>
        <label style={{fontSize:"13px"}}>
          
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMe}
            
          /> Remember Me
        </label>
        <p className="text_tag">
              Forgot Password?<br></br>
              
            </p>
      </div>
          <div style={{ marginTop: "10px" }}>
            <button className="formBtn">Login</button>
            <button
            value="register"
            style={{
              cursor: "pointer",
              backgroundColor: "#ffff",
              color:"#1A73E8",
              border: "1px solid #1A73E8",
              borderRadius: "8px",
              fontSize: "12px",
              padding: "3px",
              width:"200px",
              height:"30px",
              marginTop:"25px",
            marginLeft:"50px"
            }}
            onClick={(e) => setForm(e.target.value)}
          >
            Create new account
          </button>
          </div>
        
        </form>
      </div>
    </>
  );
};
export default Login;
