import React from "react";
import { Route, Routes } from "react-router-dom";
import RequestApprovalPage from "./components/pages/RequestApprovalPage";
import UploadStatusPage from "./components/pages/UploadStatusPage";
import FileUploader from "./components/common/FileUploader/FileUploader";
import CustomNavBar from "./components/common/NavBar/CustomNavBar";
import AWSCognito from "./components/pages/AWSCognito";
import RequireAuth from "./contexts/auth/RequireAuth";
import { selectCurrentUser } from "./contexts/auth/authSlice";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(selectCurrentUser);
  const isAdmin = user && user.groups.includes("Admin");
  // console.log(userGroup, isAdmin)

  return (
    <div>
      <CustomNavBar />
      <Routes>
        <Route path="/" element={<AWSCognito />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route element={<RequireAuth />}>
          <Route path="/file-upload" element={<FileUploader />} />
          <Route path="/upload-status" element={<UploadStatusPage />} />
          {isAdmin && (
            <Route path="/request-approval" element={<RequestApprovalPage />} />
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
