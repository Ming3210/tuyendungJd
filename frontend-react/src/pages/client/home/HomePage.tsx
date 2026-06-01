import React from 'react';
import MainLayout from '../../../layouts/MainLayout';
import Banner from '../../../components/Banner';
import HotJob from '../../../components/HotJob';
import HotCandidate from '../../../components/HotCandidate';
import HotEnterprise from '../../../components/HotEnterprise';
import OutstandingNumbers from '../../../components/OutstandingNumbers';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col page-entrance">
      <Banner />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <HotJob />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <HotEnterprise />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <HotCandidate />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <OutstandingNumbers />
      </div>
    </div>
  );
};

export default HomePage;
