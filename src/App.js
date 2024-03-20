import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestApprovalPage from './components/pages/RequestApprovalPage';
import UploadStatusPage from './components/pages/UploadStatusPage';
import HomePage from './components/pages/HomePage';
import FileUploader from './components/common/FileUploader/FileUploader';
import CustomNavBar from './components/common/NavBar/CustomNavBar';

const App = () => {
  return (
    <Router>
      <div>
        <CustomNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/file-upload" element={<FileUploader />} />
          <Route path="/upload-status" element={<UploadStatusPage />} />
          <Route path="/request-approval" element={<RequestApprovalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
