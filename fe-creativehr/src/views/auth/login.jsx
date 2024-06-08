import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import api from '../../service/api'
import { StartLoading } from "../../utils/swal2";
import { isAuth, setAuth } from "../../utils/token";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, IconButton } from "@mui/material";
import { Helmet } from "react-helmet";
import style from './style.module.css'
import { FaUser, FaLock } from 'react-icons/fa';
import logo1 from '../../assets/login1.svg'
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
const Login = () => {
  AOS.init();
  AOS.refresh();
  return (
    <>
      <Helmet>
        <title>Creative HR | Login</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Bagian kanan - Form login */}
        <div className="lg:w-1/2  flex flex-col items-center justify-center p-8 lg:p-0">
          <div className="absolute top-0 left-0">
            <img src={logo} style={{ width: '220px', height: '190px' }} alt="" />
            <h2 className="px-[60px] mt-[-40px] text-2xl lg:text-3xl font-bold mb-4">Log in to your Account</h2>
            <p className="text-[#B3C8CF] px-[60px] mt-[-10px]  font-bold ">Welcome back !</p>
          </div>
          <div className="w-full max-w-md mt-[150px]">
            <form className="bg-white w-[400px] rounded-[20px] px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label> */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    className="shadow appearance-none border rounded-full w-full py-4 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="mb-2">
                {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label> */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 mt-[-15px] flex items-center text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    className="shadow appearance-none border rounded-full w-full py-4 pl-10 pr-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="mb-4 flex">
                <p style={{ fontSize: '13px' }} className="text-blue-500 ms-auto">Forgot Password ?</p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#050C9C] hover:bg-blue-700 w-full text-white font-bold py-4 px-[60px] rounded-full focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                <p style={{ fontSize: '13px', color:'#B3C8CF'}}>Don't have account? <span className="text-blue-500">Create an account</span></p>
              </div>
              <p className="text-center mt-5 text-gray-500 text-xs absolute bottom-0 left-0 px-4 mb-4 font-bold">
                &copy;2024 PT CREATIVE AND TRAINING DEVELOPMENT
              </p>
            </form>
          </div>
        </div>

        {/* Bagian kiri - Warna biru */}
        <div className="lg:w-1/2 flex bg-[#050C9C] items-center justify-center p-8 lg:p-0">
          hehe
        </div>
      </div>
    </>

  );
};

export default Login;
