// import "./App.css";
import logo from "./assets/cbrain-logo.png";

import { accountIDs, bucketNames } from "./data";
import { useState } from "react";
import axios from "axios";

function App() {
  const [accountID, setAccountID] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [file, setFile] = useState("");

  const handleAccountIDChange = (e) => {
    if (e.target.value) {
      setAccountID(e.target.value);
    }
  };

  const handleBucketNameChange = (e) => {
    if (e.target.value) {
      setBucketName(e.target.value);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.value) {
      setFile(e.target.value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const canSave = [accountID, bucketName, file].every((val) => Boolean(val));

    // console.log(canSave);

    if (canSave) {
      const requestBody = {
        accountID: accountID,
        bucketName: bucketName,
        file: file,
      };

      console.log(requestBody);


      try {
        const response = await axios.post(
          "http://localhost:7071/api/file",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setAccountID("");
        setBucketName("");
        setFile("");

        e.target.reset();

        console.log("POST request successful", response.data);

      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setAccountID("");
    setBucketName("");
    setFile("");
  };

  return (
    <div className="app">
      <div className="container">
        <main className="m-3">
          <div className="py-2 text-center">
            <img
              className="d-block mx-auto"
              src={logo}
              alt="Intellimorph Logo"
              width={150}
            />
            <h2>File Uploader</h2>
            <p className="lead mb-1">
              Feel free to use this application to upload file to S3 Bucket.
              Have great day.
            </p>
          </div>

          <div className="row g-1">
            <div className="col-12">
              <form className="needs-validation" onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  {/* Code for Account ID input text option */}
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
}

export default App;
