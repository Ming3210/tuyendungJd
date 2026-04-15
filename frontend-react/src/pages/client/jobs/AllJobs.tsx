import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchJobsByPage, setCurrentPage } from '../../../store/slices/jobSlice';
import { fetchAllProvinces } from '../../../store/slices/provinceSlice';
import { fetchSavedJobs, toggleSaveJob } from '../../../store/slices/userSlice';
import { message, Pagination } from 'antd';
import {
  Search,
  Briefcase,
  MapPin,
  ChevronDown,
  TableProperties,
  LayoutList,
  RotateCcw,
  Heart,
  Clock,
  CircleDollarSign
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';

const AllJobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { jobs, totalJobs, currentPage, industries, loading } = useAppSelector((state) => state.jobs);
  const { provinces } = useAppSelector((state) => state.provinces);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedJobs } = useAppSelector((state) => state.user);

  const [positionQuery, setPositionQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isSorted, setIsSorted] = useState(false); // List view toggle
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchJobsByPage({ page: 1 }));
    dispatch(fetchAllProvinces());
    if (currentUser?.id) {
      dispatch(fetchSavedJobs(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const totalPages = Math.ceil(totalJobs / 6);

  const handleSearch = () => {
    dispatch(fetchJobsByPage({
      page: 1,
      industry: selectedIndustry,
      province: selectedProvince,
      sort: 'random'
    }));
  };

  const handleRefresh = () => {
    setPositionQuery('');
    setSelectedIndustry('');
    setSelectedProvince('');
    dispatch(fetchJobsByPage({ page: 1 }));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchJobsByPage({
      page,
      industry: selectedIndustry,
      province: selectedProvince,
      sort: 'random'
    }));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = dayjs(deadline.split('/').reverse().join('-'));
    const days = deadlineDate.diff(dayjs(), 'day');
    return days > 0 ? days : 0;
  };

  const handleToggleSave = async (e: React.MouseEvent, jobId: string | number) => {
    e.stopPropagation();
    if (!currentUser?.id) {
      message.warning('Vui lòng đăng nhập để lưu việc làm');
      navigate('/login');
      return;
    }
    try {
      await dispatch(toggleSaveJob({ userId: currentUser.id, jobId })).unwrap();
      const isSaved = savedJobs.some(sj => sj.jobId === jobId);
      message.success(isSaved ? 'Đã bỏ lưu việc làm' : 'Đã lưu việc làm thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const isJobSaved = (jobId: string | number) => {
    return savedJobs.some(sj => sj.jobId === jobId);
  };

  return (
    <div className="bg-gray-50 min-h-screen page-entrance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 bg-white p-4 rounded-xl shadow-md">
          {/* Position Search */}
          <div className="flex-grow flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 transition-all">
            <Search className="text-red-600 w-5 h-5" />
            <input
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
              placeholder="Vị trí ứng tuyển (ví dụ: Java Developer, Marketing...)"
              value={positionQuery}
              onChange={(e) => setPositionQuery(e.target.value)}
            />
          </div>

          {/* Industry Filter */}
          <div className="relative flex-shrink-0 lg:w-64">
            <div
              onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all font-medium"
            >
              <div className="flex items-center gap-2 text-gray-600 truncate">
                <Briefcase className="text-red-500 w-4 h-4" />
                <span className="truncate">{selectedIndustry || "Tất cả ngành nghề"}</span>
              </div>
              <ChevronDown className={`text-gray-400 w-4 h-4 transition-transform ${showIndustryDropdown ? 'rotate-180' : ''}`} />
            </div>
            {showIndustryDropdown && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-y-auto max-h-60">
                <li
                  onClick={() => { setSelectedIndustry(''); setShowIndustryDropdown(false); }}
                  className="px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors text-gray-700"
                >
                  Tất cả ngành nghề
                </li>
                {industries.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => { setSelectedIndustry(item); setShowIndustryDropdown(false); }}
                    className={`px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors text-gray-700 border-b border-gray-50 last:border-0 ${item === selectedIndustry ? 'bg-red-50 text-red-700 font-medium' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location Filter */}
          <div className="relative flex-shrink-0 lg:w-56">
            <div
              onClick={() => setShowProvinceDropdown(!showProvinceDropdown)}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all font-medium"
            >
              <div className="flex items-center gap-2 text-gray-600 truncate">
                <MapPin className="text-red-500 w-4 h-4" />
                <span className="truncate">{selectedProvince || "Tất cả địa điểm"}</span>
              </div>
              <ChevronDown className={`text-gray-400 w-4 h-4 transition-transform ${showProvinceDropdown ? 'rotate-180' : ''}`} />
            </div>
            {showProvinceDropdown && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-y-auto max-h-60">
                <li
                  onClick={() => { setSelectedProvince(''); setShowProvinceDropdown(false); }}
                  className="px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors text-gray-700"
                >
                  Tất cả địa điểm
                </li>
                {provinces.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => { setSelectedProvince(item.name); setShowProvinceDropdown(false); }}
                    className={`px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors text-gray-700 border-b border-gray-50 last:border-0 ${item.name === selectedProvince ? 'bg-red-50 text-red-700 font-medium' : ''}`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="lg:w-32 px-6 py-3 bg-[#bc2228] hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Header & View Toggles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Tất cả việc làm
          </h1>

          <div className="flex items-center gap-6 text-sm">
            <div className="hidden sm:flex items-center gap-2 text-gray-500">
              <span>Sắp xếp theo:</span>
              <span className="font-bold text-gray-900 border-b-2 border-red-200">Mới nhất</span>
            </div>

            <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <button
                onClick={() => setIsSorted(false)}
                className={`p-2 rounded-md transition-all ${!isSorted ? 'bg-red-50 text-red-600 shadow-inner' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <TableProperties className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSorted(true)}
                className={`p-2 rounded-md transition-all ${isSorted ? 'bg-red-50 text-red-600 shadow-inner' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
              title="Làm mới"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Job Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl  border-gray-100 shadow-sm">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
              <Briefcase className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
            </div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Đang tìm kiếm những việc làm tốt nhất...</p>
          </div>
        ) : (
          <div className={`grid gap-6 transition-all duration-500 ${isSorted ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/job-detail/${job.id}`)}
                className={`group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer ${isSorted ? 'flex flex-col sm:flex-row h-auto sm:h-44' : 'flex flex-col h-full'}`}
              >
                {/* Job Image Placeholder (Using a gradient if no image) */}
                <div className={`flex-shrink-0 relative bg-gray-100 ${isSorted ? 'w-full sm:w-44 h-44 sm:h-auto' : 'w-full h-48'}`}>
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <Briefcase className="w-12 h-12" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>

                {/* Job Content */}
                <div className="flex-grow p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 ${isSorted ? 'text-lg sm:text-xl' : 'text-base'}`}>
                        {job.title}
                      </h3>
                      <button
                        onClick={(e) => handleToggleSave(e, job.id)}
                        className={`p-2 rounded-full transition-all border shadow-sm ${isJobSaved(job.id)
                          ? 'bg-red-50 text-red-500 border-red-100'
                          : 'hover:bg-red-50 text-gray-300 hover:text-red-500 border-transparent hover:border-red-100'
                          }`}
                      >
                        <Heart className={`w-4 h-4 ${isJobSaved(job.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <Link 
                      to={`/company/${job.enterpriseId}`} 
                      className="text-gray-500 text-sm mb-3 hover:text-red-600 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {job.enterpriseName}
                    </Link>

                    {/* Rank Badges Placeholder */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {job.level || 'Member'}
                      </span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5 text-red-600 font-bold">
                      <CircleDollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                      <MapPin className="w-4 h-4" />
                      <span>{job.province.replace(/^Thành phố\s*|^Tỉnh\s*/, "")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{dayjs(job.createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                  </div>
                </div>

                {/* List View CTA (Desktop Only) */}
                {isSorted && (
                  <div className="hidden sm:flex flex-col justify-center items-center w-44 p-4 border-l border-gray-50 bg-gray-50/30">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/job-detail/${job.id}`); }}
                      className="w-full py-2.5 bg-[#bc2228] hover:bg-red-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      Ứng tuyển
                    </button>
                    <p className="mt-3 text-[10px] text-gray-400 flex items-center gap-1 text-center">
                      Còn <strong>{calculateDaysLeft(job.deadline)}</strong> ngày để nộp
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 pb-12">
          <Pagination
            current={currentPage}
            total={totalJobs}
            pageSize={6}
            onChange={handlePageChange}
            showSizeChanger={false}
            showLessItems={true}
            responsive={true}
            showTitle={false}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
