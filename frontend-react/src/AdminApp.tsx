import React, { useEffect, useState } from 'react';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminCvs from './pages/admin/AdminCvs';
import AdminEnterprises from './pages/admin/AdminEnterprises';
import AdminInterviews from './pages/admin/AdminInterviews';
import AdminJobs from './pages/admin/AdminJobs';
import AdminLanguages from './pages/admin/AdminLanguages';
import AdminUsers from './pages/admin/AdminUsers';

import DisclaimerModal from './components/common/DisclaimerModal';

// Mock components until we port them
const Dashboard = () => <div><h2>Trang chủ Admin ^o^ </h2><p>Chào mừng đến với trang quản trị.</p></div>;

const AdminApp: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('nhom5_disclaimer_seen');
      if (!seen) setShowDisclaimer(true);
    } catch (e) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleCloseDisclaimer = () => {
    try {
      localStorage.setItem('nhom5_disclaimer_seen', '1');
    } catch (e) {
      // ignore
    }
    setShowDisclaimer(false);
  };
  return (
    <Router>
      <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="cvs" element={<AdminCvs />} />
          <Route path="languages" element={<AdminLanguages />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="enterprises" element={<AdminEnterprises />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="interviews" element={<AdminInterviews />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AdminApp;
