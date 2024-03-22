import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
} from "./../../contexts/auth/authSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const AWSCognito = () => {
//   const navigate = useNavigate();
  const currentToken = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
//   const location = useLocation();

  useEffect(() => {
    if (currentToken) {
        window.location.href = "/#/file-upload";
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

      if (!code) {
        window.location.href = `${process.env.REACT_APP_AWS_DOMAIN}/login?response_type=code&client_id=${process.env.REACT_APP_AWS_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AWS_REDIRECT_URL}`;
      } else {
        fetchData(code);
      }
    }
  }, []);

  const fetchData = async (code) => {
    if (!currentToken) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_AWS_DOMAIN}/oauth2/token`,
          {
            grant_type: "authorization_code",
            client_id: `${process.env.REACT_APP_AWS_CLIENT_ID}`,
            client_secret: `${process.env.REACT_APP_AWS_CLIENT_SECRET}`,
            code: code,
            redirect_uri: `${process.env.REACT_APP_AWS_REDIRECT_URL}`,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(data);
        const token = data.id_token;

        if (token) {
          const tokenData = jwtDecode(token);
        //   console.log(tokenData)
          localStorage.setItem("token", token);

          // const response = await axios.get(
          //   `${process.env.REACT_APP_AUTH_URL}/v1/companies/users/${guid}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );

        //   const user = {...data, ...tokenData};
          const user = {email:tokenData.email, groups:tokenData["cognito:groups"]};
          dispatch(setCredentials({ token, user }));
        //   localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/#/file-upload";
        }
      } catch (error) {
        console.log(error);
      }
    } 
  };

  return <div>AWSCognito</div>;
};

export default AWSCognito;
