import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
} from "./../../contexts/auth/authSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const AWSCognito = () => {
  const navigate = useNavigate();
  const currentToken = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const location = useLocation();

  //   useEffect(() => {
  //     if (currentToken) {
  //       navigate("/home");
  //     }
  //   }, [currentToken]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      window.location.href = `https://react-auth-dev.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=p3id5ss2ojir8iata2bpjna4h&redirect_uri=http://localhost:3000`;
    } else {
      fetchData(code);
    }
  }, []);

  const fetchData = async (code) => {
    if (!currentToken) {
      try {
        const { data } = await axios.post(
          "https://react-auth-dev.auth.us-east-1.amazoncognito.com/oauth2/token",
          {
            grant_type: "authorization_code",
            client_id: "p3id5ss2ojir8iata2bpjna4h",
            client_secret:
              "1s2dnujdgki6ntta7jp3uko65unv0pmi18qdin6hih6156lh1bjd",
            code: code,
            redirect_uri: "http://localhost:3000",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(data);
        const token = data.access_token;

        if (token) {
          const tokenData = jwtDecode(token);
          const guid = tokenData?.sub;
          localStorage.setItem("token", token);

          // const response = await axios.get(
          //   `${process.env.REACT_APP_AUTH_URL}/v1/companies/users/${guid}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );

          const user = data;
          dispatch(setCredentials({ token, user }));
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/home";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <div>AWSCognito</div>;
};

export default AWSCognito;
