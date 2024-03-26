import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable/DataTable";
import logo from "./../../assets/cbrain-logo.png";
import axios from "axios";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "./../../contexts/auth/authSlice";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import "./../common/Spinner.css";
import toast, { Toaster } from "react-hot-toast";

const UploadStatusPage = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const isAdmin =
    user && user.groups.includes(`${process.env.REACT_APP_AUTHORIZE_GROUP}`);
  const email = user && user.email;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Dev/database`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (isAdmin) {
        {
          response.status == "200" && setData(JSON.parse(response.data.body));
        }
      } else {
        {
          response.status == "200" &&
            setData(
              JSON.parse(response.data.body).filter(
                (item) => item.userId === email
              )
            );
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized...");
      } else {
        toast.error("Error fetching user data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const tableHeadings = [
    {
      name: "User Email",
      selector: (row) => row?.userId,
      // width: "150px",
    },
    {
      name: "Account ID",
      selector: (row) => row?.accountId,
      // width: "200px",
    },
    {
      name: "Bucket Name",
      selector: (row) => row?.bucketName,
      // width: "250px",
    },
    {
      name: "File Name",
      selector: (row) => row?.fileName,
      // width: "300px",
    },
    {
      name: "Status",
      selector: (row) => row?.Status,
      // width: "120px",
    },
  ];

  return (
    <div className="app">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#180080",
              secondary: "#f3f3f3",
            },
          },
        }}
      />

      {loading && (
        <div className="loading-overlay">
          <PulseLoader color="#92B8F8" size={15} loading={loading} />
        </div>
      )}
      <div>
        <main className="m-3">
          <div className="py-2 text-center">
            <img
              className="d-block mx-auto"
              src={logo}
              alt="Logo"
              width={150}
            />
            <h2>Upload Status</h2>
            <p className="lead mb-1">
              You can check file upload status here. Have great day.
            </p>
          </div>

          <div className="row g-1">
            <div className="col-12">
              <DataTable
                selectableRows={false}
                tableData={data}
                tableHeading={tableHeadings}
                pagination={true}
                transparent={true}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadStatusPage;
