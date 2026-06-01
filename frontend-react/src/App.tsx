import { App as AntdAppConfig } from 'antd';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DisclaimerModal from './components/common/DisclaimerModal';
import PageLoader from './components/common/PageLoader';
import ScrollToTop from './components/common/ScrollToTop';
import MainLayout from './layouts/MainLayout';

// Lazy load pages
const Login = lazy(() => import('./pages/client/auth/Login'));
const Register = lazy(() => import('./pages/client/auth/Register'));
const AllJobs = lazy(() => import('./pages/client/jobs/AllJobs'));
const JobDetail = lazy(() => import('./pages/client/jobs/JobDetail'));
const HomePage = lazy(() => import('./pages/client/home/HomePage'));
const CompanyDetail = lazy(() => import('./pages/client/enterprise/CompanyDetail'));
const AllEnterprises = lazy(() => import('./pages/client/enterprise/AllEnterprises'));
const AllCandidates = lazy(() => import('./pages/client/candidates/AllCandidates'));
const CandidateDetail = lazy(() => import('./pages/client/candidates/CandidateDetail'));
const AboutUs = lazy(() => import('./pages/client/misc/AboutUs'));
const ContactPage = lazy(() => import('./pages/client/home/ContactPage'));
const PricingPage = lazy(() => import('./pages/client/misc/PricingPage'));
const Error403 = lazy(() => import('./components/errors/Error403'));
const Error404 = lazy(() => import('./components/errors/Error404'));
const ProfileLayout = lazy(() => import('./pages/client/user/ProfileLayout'));
const InformationView = lazy(() => import('./pages/client/user/InformationView'));
const CvView = lazy(() => import('./pages/client/user/CvView'));
const CertificateView = lazy(() => import('./pages/client/user/CertificateView'));
const InterviewView = lazy(() => import('./pages/client/user/InterviewView'));
const SavedJobsView = lazy(() => import('./pages/client/user/SavedJobsView'));
const FollowedCompaniesView = lazy(() => import('./pages/client/user/FollowedCompaniesView'));
const MyEnterpriseView = lazy(() => import('./pages/client/user/MyEnterpriseView'));
const PartnerApplicantsView = lazy(() => import('./pages/client/user/PartnerApplicantsView'));

const EnterpriseLayout = lazy(() => import('./pages/enterprise/EnterpriseLayout'));
const EnterpriseDetail = lazy(() => import('./pages/enterprise/EnterpriseDetail'));
const EnterpriseJobManager = lazy(() => import('./pages/enterprise/EnterpriseJobManager'));
const EnterpriseInterviewManager = lazy(() => import('./pages/enterprise/EnterpriseInterviewManager'));
const App: React.FC = () => {
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
    <AntdAppConfig>
      <Router>
        {/* Global disclaimer shown once */}
        <DisclaimerModal isOpen={showDisclaimer} onClose={handleCloseDisclaimer} />
        <ScrollToTop />
        <Routes>
          {/* Auth Routes (No layout) */}
          <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />

          {/* Client Routes with Persistent Layout */}
          <Route element={<MainLayout />}>
            <Route path="/all-jobs" element={<AllJobs />} />
            <Route path="/job-detail/:id" element={<JobDetail />} />
            <Route path="/all-companies" element={<AllEnterprises />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/all-candidates" element={<AllCandidates />} />
            <Route path="/candidate-detail/:id" element={<CandidateDetail />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* User Profile Routes - Nested in ProfileLayout */}
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<Navigate to="/profile/information" replace />} />
              <Route path="information" element={<InformationView />} />
              <Route path="cv" element={<CvView />} />
              <Route path="certificate" element={<CertificateView />} />
              <Route path="interviews" element={<InterviewView />} />
              <Route path="saved-jobs" element={<SavedJobsView />} />
              <Route path="followed-companies" element={<FollowedCompaniesView />} />
              <Route path="enterprise" element={<MyEnterpriseView />} />
            </Route>

            <Route path="/partner-applicants" element={<PartnerApplicantsView />} />

            {/* Enterprise Dashboard Routes - Nested in EnterpriseLayout and now MainLayout */}
            <Route path="/company/:id/dashboard" element={<EnterpriseLayout />}>
              <Route index element={<Navigate to="detail" replace />} />
              <Route path="detail" element={<EnterpriseDetail />} />
              <Route path="job" element={<EnterpriseJobManager />} />
              <Route path="interview-booking" element={<EnterpriseInterviewManager />} />
            </Route>
          </Route>

          {/* Error pages & Redirects */}
          <Route path="/403" element={<Suspense fallback={<PageLoader />}><Error403 /></Suspense>} />
          <Route path="/404" element={<Suspense fallback={<PageLoader />}><Error404 /></Suspense>} />
          <Route path="/" element={<Navigate to="/home-page" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </AntdAppConfig>
  );
};

export default App;
