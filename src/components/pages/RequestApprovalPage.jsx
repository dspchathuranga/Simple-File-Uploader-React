import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable/DataTable";
import logo from "./../../assets/cbrain-logo.png";
import axios from "axios";
import { selectCurrentToken } from "./../../contexts/auth/authSlice";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import "./../common/Spinner.css";

const RequestApprovalPage = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const [data, setData] = useState([]);
  // const [approveStatus, setApproveStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/Dev/database`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // setData(JSON.parse(response.data.body));
    {
      response.status == 200 &&
        setData(
          JSON.parse(response.data.body).filter(
            (item) => item.Status === "Pending"
          )
        );
    }
    setLoading(false);
  };

  const approveFile = (data) => {
    // setApproveStatus("approve");
    approveAPI(data, "approve");
  };

  const rejectFile = (data) => {
    // setApproveStatus("reject");
    approveAPI(data, "reject");
  };

  const approveAPI = async (data, approveStatus) => {
    try {
      // console.log(data);
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Dev/upload`,
        {
          userId: data.userId,
          accountId: data.accountId,
          fileName: data.fileName,
          bucketName: data.bucketName,
          action: approveStatus,
        }
      );
      // console.log(response);
      fetchData();
      return response;
    } catch (error) {
      console.error("Error requesting signed URL:", error);
      setLoading(true);
    }
  };

  const tableHeadings = [
    {
      name: "User ID",
      selector: (row) => row?.userId,
      width: "150px",
    },
    {
      name: "Account ID",
      selector: (row) => row?.accountId,
      width: "200px",
    },
    {
      name: "Bucket Name",
      selector: (row) => row?.bucketName,
      width: "300px",
    },
    {
      name: "File Name",
      selector: (row) => row?.fileName,
      width: "300px",
    },
    {
      name: "Action",
      width: "200px",
      cell: (row) => (
        <>
          &nbsp;
          <button
            className="btn btn-primary link-color px-2 mx-1"
            onClick={() => approveFile(row)}
          >
            Approve
          </button>{" "}
          &nbsp;
          <button
            className="btn btn-danger link-color px-2"
            onClick={() => rejectFile(row)}
          >
            Reject
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="app">
      {loading && (
        <div className="loading-overlay">
          <PulseLoader color="#92B8F8" size={15} loading={loading} />
        </div>
      )}
      <div className={loading ? 'blur-background' : 'container'}>
        <main className="m-3">
          <div className="py-2 text-center">
            <img
              className="d-block mx-auto"
              src={logo}
              alt="Logo"
              width={150}
            />
            <h2>Request Approval</h2>
            <p className="lead mb-1">Pending approvel files. Have great day.</p>
          </div>

          <div
            className="row g-1"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // display: loading ? "none" : "none",
            }}
          >
            {/* <div className="col-0.5"></div> */}
            <div
              className="col-11"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PulseLoader
                color="#92B8F8"
                size={15}
                loading={loading}
                cssOverride={{
                  display: 'block'
                }}
              />
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

export default RequestApprovalPage;
