import React from "react";
import DataTable from "../common/DataTable/DataTable";

const UploadStatusPage = () => {

  const tableHeadings = [
    {
      name: "User ID",
      selector: (row) => row?.userID,
      width: "180px",
    },
    {
      name: "Account ID",
      selector: (row) => row?.accountID,
      width: "200px",
    },
    {
      name: "Bucket Name",
      selector: (row) => row?.bucketName,
      width: "180px",
    },
    {
      name: "File Name",
      selector: (row) => row?.fileName,
      width: "180px",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      width: "120px",
    },
  ];

  const dummyData = [
    {
      userID: 1,
      accountID: 101,
      bucketName: "Bucket 1",
      fileName: "File 1",
      status: "Active",
    },
    {
      userID: 2,
      accountID: 102,
      bucketName: "Bucket 2",
      fileName: "File 2",
      status: "Inactive",
    },
    {
      userID: 3,
      accountID: 103,
      bucketName: "Bucket 3",
      fileName: "File 3",
      status: "Pending",
    },
    // Add more dummy data as needed
  ];

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <div className="col-auto">
          <div className="py-2 mt-5 px-5">
          <h1 className="py-3">Upload Status</h1>
            <DataTable
              selectableRows={false}
              tableData={dummyData}
              tableHeading={tableHeadings}
              pagination={true}
              transparent={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStatusPage;
