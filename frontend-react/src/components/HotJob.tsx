import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchJobsByPage } from '../store/slices/jobSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CircleDollarSign, MapPin, Briefcase, Heart, Clock } from 'lucide-react';
import dayjs from 'dayjs';

const HotJob: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { jobs, loading } = useAppSelector((state) => state.jobs);
  const [activeLocation, setActiveLocation] = useState<'random' | 'Hà Nội' | 'Hồ Chí Minh'>('random');

  useEffect(() => {
    // Initial fetch
    dispatch(fetchJobsByPage({ page: 1 }));
  }, [dispatch]);

  const handleLocationFilter = (loc: 'random' | 'Hà Nội' | 'Hồ Chí Minh') => {
    setActiveLocation(loc);
    const province = loc === 'random' ? '' : loc === 'Hà Nội' ? 'Thành phố Hà Nội' : 'Thành phố Hồ Chí Minh';
    dispatch(fetchJobsByPage({ page: 1, province }));
  };

  const calculateDaysLeft = (deadline: string) => {
    if (!deadline) return 0;
    const deadlineDate = dayjs(deadline.split('/').reverse().join('-'));
    const days = deadlineDate.diff(dayjs(), 'day');
    return days > 0 ? days : 0;
  };

  // Only show first 9 jobs for the "Hot" section
  const hotJobs = useMemo(() => jobs.slice(0, 9), [jobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Việc làm nổi bật</h2>
          <p className="text-gray-500 mt-1">Khám phá những cơ hội nghề nghiệp hấp dẫn nhất hiện nay</p>
        </div>
        <Link 
          to="/all-jobs" 
          className="flex items-center gap-2 text-[#bc2228] font-bold hover:gap-3 transition-all"
        >
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => handleLocationFilter('random')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
            activeLocation === 'random' 
            ? 'bg-[#bc2228] text-white shadow-red-200' 
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => handleLocationFilter('Hà Nội')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
            activeLocation === 'Hà Nội' 
            ? 'bg-[#bc2228] text-white shadow-red-200' 
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Hà Nội
        </button>
        <button
          onClick={() => handleLocationFilter('Hồ Chí Minh')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
            activeLocation === 'Hồ Chí Minh' 
            ? 'bg-[#bc2228] text-white shadow-red-200' 
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          TP Hồ Chí Minh
        </button>
      </div>

      {/* Grid */}
      <div className="relative min-h-[400px]">
        <div 
          className={`absolute inset-0 z-10 flex flex-col justify-center items-center transition-all duration-500 ease-in-out rounded-2xl ${
            loading ? 'opacity-100 backdrop-blur-[4px] bg-white/60' : 'opacity-0 pointer-events-none'
          }`}
        >
          {loading && (
            <>
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
                <Briefcase className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
              </div>
              <p className="mt-4 text-[#bc2228] font-bold animate-pulse">Đang tải việc làm...</p>
            </>
          )}
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-out transform ${loading ? 'opacity-30 scale-[0.98] blur-[1px]' : 'opacity-100 scale-100 blur-0'}`}>
          {hotJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/job-detail/${job.id}`)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer flex flex-col justify-between h-[200px]"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center grow-0 shrink-0 border border-gray-50">
                  <Briefcase className="w-8 h-8 text-gray-300" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#bc2228] transition-colors line-clamp-2 mb-1">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-100">
                      {job.level || 'Member'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium whitespace-nowrap overflow-hidden">
                  <div className="flex items-center gap-1.5 text-red-600 font-bold">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 opacity-50" />
                    <span className="truncate">{job.province.replace(/^Thành phố\s*|^Tỉnh\s*/, "")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 opacity-50" />
                    <span>{job.workingTime || 'Toàn thời gian'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Cập nhật {dayjs(job.createdAt).format('DD/MM/YYYY')}
                  </p>
                  <p className="text-[10px] font-bold text-gray-900">
                    Còn {calculateDaysLeft(job.deadline)} ngày
                  </p>
                </div>
              </div>

              {/* Like Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-50 text-gray-200 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          ))}
          {!loading && hotJobs.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 italic">
              Hiện chưa có việc làm nổi bật tại khu vực này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotJob;
