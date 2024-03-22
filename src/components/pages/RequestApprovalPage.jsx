import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable/DataTable";
import logo from "./../../assets/cbrain-logo.png";
import axios from "axios";
import { selectCurrentToken } from "./../../contexts/auth/authSlice";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

const RequestApprovalPage = () => {

  const [loading, setLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const [data, setData] = useState([]);

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
    {response.status == '200' && setData(JSON.parse(response.data.body).filter(item => item.Status === "Pending"))};
    setLoading(false);
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
          <button className="btn btn-primary link-color px-2 mx-1">Approve</button>{" "}
          &nbsp;
          <button className="btn btn-danger link-color px-2">Reject</button>
        </>
      ),
    },
  ];


  const dummyData = [
    {
      userID: 1,
      accountID: 101,
      bucketName: "Bucket 1",
      fileName: "File 1",
      variationType: "Type A",
      processName: "Process 1",
      environment: "Env 1"
    },
    {
      userID: 2,
      accountID: 102,
      bucketName: "Bucket 2",
      fileName: "File 2",
      variationType: "Type B",
      processName: "Process 2",
      environment: "Env 2"
    },
    {
      userID: 3,
      accountID: 103,
      bucketName: "Bucket 3",
      fileName: "File 3",
      variationType: "Type C",
      processName: "Process 3",
      environment: "Env 3"
    },
  ];
  
  return (

    <div className="app">
      <div className="container">
        <main className="m-3">
          <div className="py-2 text-center">
            <img
              className="d-block mx-auto"
              src={logo}
              alt="Logo"
              width={150}
            />
            <h2>Request Approval</h2>
            <p className="lead mb-1">
              Pending approvel files.
              Have great day.
            </p>
          </div>

          <div className="row g-1" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
            {/* <div className="col-0.5"></div> */}
            <div
              className="col-11"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
            <PulseLoader color="#92B8F8" size={15} loading={loading} />
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


    // <div>
    //   <div className="row d-flex justify-content-center">
    //     <div className="col-auto">
    //       <div className="py-2 mt-5 px-5">
    //       <h1 className="py-3">Request Approval</h1>
    //         <DataTable
    //           selectableRows={false}
    //           tableData={dummyData}
    //           tableHeading={tableHeadings}
    //           pagination={true}
    //           transparent={true}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RequestApprovalPage;
