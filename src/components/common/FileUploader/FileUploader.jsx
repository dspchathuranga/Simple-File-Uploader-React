import React from "react";
import logo from "../../../assets/cbrain-logo.png";
// import { accountIDs, bucketNames } from "./data";
import { useState } from "react";
import axios from "axios";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../../contexts/auth/authSlice";
import { useSelector } from "react-redux";
import "./../../common/Spinner.css";
import { PulseLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const FileUploader = () => {
  const [loading, setLoading] = useState(false);
  // const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);
  // const email = user && user.email;
  const [accountID, setAccountID] = useState("");
  const [userID, setUserID] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [file, setFile] = useState(null);

  const handleAccountIDChange = (e) => {
    if (e.target.value) {
      setAccountID(e.target.value);
    }
  };

  const handleUserIDChange = (e) => {
    if (e.target.value) {
      setUserID(e.target.value);
    }
  };

  const handleBucketNameChange = (e) => {
    if (e.target.value) {
      setBucketName(e.target.value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadFileToS3 = async (signedUrl) => {
    try {
      const response = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.error("Error while uploading file:", error);
    }
  };

  const requestSignedUrl = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Dev/presignedurl?fileName=${file.name}&fileType=${file.type}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.error("Error requesting signed URL:", error);
    }
  };

  const submitFormData = async (requestBody) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Dev/database`,
        requestBody
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.error("Error requesting signed URL:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const canSave = [userID, userID, accountID, bucketName, file].every((val) =>
      Boolean(val)
    );

    // console.log(canSave);

    if (canSave) {
      const requestBody = {
        email: userID,
        accountId: accountID,
        bucketName: bucketName,
        fileName: file.name,
        userId: userID,
      };

      // console.log(requestBody);

      try {
        const response1 = await requestSignedUrl();

        if (response1.status === 200) {
          const response2 = await uploadFileToS3(response1.data.signedRequest);
          if (response2.status === 200) {
            const response = await submitFormData(requestBody);
            console.log("POST request successful", response.data);
            // Handle successful submission
          } else {
            console.error("Error:", response2.status);
          }
        } else {
          console.error("Error:", response1.status);
        }

        setAccountID("");
        setBucketName("");
        setUserID("");
        setFile("");

        e.target.reset();

        toast.success("File Upload Successfull");

        // console.log("POST request successful", response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("File Upload Error:", error);
      }
    }

    setLoading(false);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setAccountID("");
    setBucketName("");
    setUserID("");
    setFile("");
  };

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
            <h2>File Uploader</h2>
            <p className="lead mb-1">
              Feel free to use this application to upload file to S3 Bucket.
              Have great day.
            </p>
          </div>

          <div className="row g-1">
            <div className="col-2"></div>
            <div className="col-8">
              <form className="needs-validation" onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  {/* Code for Account ID input text option */}
                  <div className="col-12">
                    <label htmlFor="accountID" className="form-label">
                      User Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userID"
                      placeholder="Enter User ID"
                      value={userID}
                      onChange={handleUserIDChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="accountID" className="form-label">
                      Account ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accountID"
                      placeholder="Enter Account ID"
                      value={accountID}
                      onChange={handleAccountIDChange}
                      required
                    />
                  </div>
                  {/* End code for Account ID input text option */}
                  {/* Code for Account ID select option */}
                  {/* <div className="col-12">
                      <label htmlFor="domain" className="form-label">
                        Account ID
                      </label>
                      <select
                        className="form-select"
                        id="domain"
                        onChange={handleAccountIDChange}
                        defaultValue={""}
                        required
                      >
                        <option value={""}>Choose...</option>
                        {accountIDs &&
                          accountIDs.map((account) => (
                            <option key={account.id} value={account.id}>
                              {account.name}
                            </option>
                          ))}
                      </select>
                    </div> */}
                  {/* End code for Account ID select opyion */}

                  {/* Code for Bucket Name input text option */}
                  <div className="col-12">
                    <label htmlFor="bucketName" className="form-label">
                      Bucket Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bucketName"
                      placeholder="Enter Bucket Name"
                      value={bucketName}
                      onChange={handleBucketNameChange}
                      required
                    />
                  </div>
                  {/* End code for Bucket Name input text option */}
                  {/* Code for Bucket Name select option */}
                  {/* <div className="col-12">
                      <label htmlFor="issueType" className="form-label">
                        Bucket Name
                      </label>
                      <select
                        className="form-select"
                        id="issueType"
                        onChange={handleBucketNameChange}
                        defaultValue={""}
                        required
                      >
                        <option value={""}>Choose...</option>
                        {bucketNames &&
                          bucketNames.map((bucket) => (
                            <option key={bucket.id} value={bucket.id}>
                              {bucket.name}
                            </option>
                          ))}
                      </select>
                    </div> */}
                  {/* End code for Bucket Name select option */}
                  <div className="col-12">
                    <label htmlFor="file" className="form-label">
                      Select File
                    </label>
                    <input
                      className="form-control"
                      id="file"
                      type="file"
                      placeholder="File Input"
                      // multiple
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-md-6">
                    <button
                      className="w-100 btn btn-danger btn-lg"
                      type="reset"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="col-12 col-md-6">
                    <button
                      className="w-100 btn btn-primary btn-lg"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FileUploader;
