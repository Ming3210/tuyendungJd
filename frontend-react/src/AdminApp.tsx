import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';
import AdminEnterprises from './pages/admin/AdminEnterprises';
import AdminCvs from './pages/admin/AdminCvs';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminLanguages from './pages/admin/AdminLanguages';
import AdminInterviews from './pages/admin/AdminInterviews';

// Mock components until we port them
const Dashboard = () => <div><h2>Trang chủ Admin</h2><p>Chào mừng đến với trang quản trị.</p></div>;

const AdminApp: React.FC = () => {
  return (
    <Router>
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
