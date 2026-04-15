import React, { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const PageLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start progress bar immediately on mount
    NProgress.start();

    // Only show full-page loader if it takes more than 300ms
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, []);

  // If loading is extremely fast, don't show the backdrop UI to prevent flickering
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Rings */}
        <div className="relative h-20 w-20 scale-110">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-[#bc2228] border-r-transparent border-b-transparent border-l-transparent"></div>
          <div className="absolute inset-2 animate-[spin_1.5s_linear_infinite] rounded-full border-4 border-t-red-400/30 border-r-transparent border-b-transparent border-l-transparent"></div>
        </div>

        {/* Brand/Loading Text */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-sf-pro-display text-lg font-bold tracking-tight text-gray-900 animate-pulse">
            Đang tải dữ liệu...
          </span>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-100 shadow-inner">
            <div className="h-full w-full origin-left animate-[loading-bar_1.5s_infinite_ease-in-out] bg-gradient-to-r from-[#bc2228] to-red-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
