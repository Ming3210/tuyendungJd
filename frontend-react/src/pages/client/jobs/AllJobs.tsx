import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchJobsByPage } from '../../../store/slices/jobSlice';
import { fetchAllProvinces } from '../../../store/slices/provinceSlice';
import { fetchSavedJobs, toggleSaveJob } from '../../../store/slices/userSlice';
import { toggleFollow, fetchUserFollows } from '../../../store/slices/followSlice';
import { message, Pagination } from 'antd';
import { 
  Briefcase, 
  MapPin, 
  TableProperties, 
  LayoutList, 
  RotateCcw, 
  Heart, 
  Clock, 
  CircleDollarSign,
  Filter,
  X,
  Layers
} from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import JobSearchBar from '../../../components/JobSearchBar';
import JobFilterSidebar from '../../../components/JobFilterSidebar';

const AllJobs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { jobs, totalJobs, currentPage, loading } = useAppSelector((state) => state.jobs);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedJobs } = useAppSelector((state) => state.user);
  const { followingIds } = useAppSelector((state) => state.follow);

  const [isSorted, setIsSorted] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    title: searchParams.get('title') || '',
    province: searchParams.get('province') || '',
    industry: searchParams.get('industry') || '',
    experience: searchParams.get('experience') || '',
    saturdayOff: searchParams.get('saturdayOff') || '',
    rank: searchParams.get('rank') || '',
    salaryMin: searchParams.get('salaryMin') ? Number(searchParams.get('salaryMin')) : null as number | null,
    salaryMax: searchParams.get('salaryMax') ? Number(searchParams.get('salaryMax')) : null as number | null,
    negotiable: searchParams.get('negotiable') === 'true' ? true : (searchParams.get('negotiable') === 'false' ? false : null),
    jobLevel: searchParams.get('jobLevel') || '',
    education: searchParams.get('education') || '',
    searchMode: (searchParams.get('searchMode') as any) || 'both'
  });

  useEffect(() => {
    dispatch(fetchAllProvinces());
    if (currentUser?.id) {
      dispatch(fetchSavedJobs(currentUser.id));
      dispatch(fetchUserFollows(Number(currentUser.id)));
    }
    
    // Initial search based on URL params
    const initialFilters = {
      title: searchParams.get('title') || '',
      province: searchParams.get('province') || '',
      industry: searchParams.get('industry') || '',
      experience: searchParams.get('experience') || '',
      saturdayOff: searchParams.get('saturdayOff') || '',
      rank: searchParams.get('rank') || '',
      salaryMin: searchParams.get('salaryMin') ? Number(searchParams.get('salaryMin')) : null,
      salaryMax: searchParams.get('salaryMax') ? Number(searchParams.get('salaryMax')) : null,
      negotiable: searchParams.get('negotiable') === 'true' ? true : (searchParams.get('negotiable') === 'false' ? false : null),
      jobLevel: searchParams.get('jobLevel') || '',
      education: searchParams.get('education') || '',
      searchMode: (searchParams.get('searchMode') as any) || 'both'
    };
    handleSearch(initialFilters);
  }, [dispatch, currentUser?.id, searchParams]);

  const handleSearch = (newFilters?: any) => {
    const currentFilters = newFilters || filters;
    
    // Update URL Params
    const urlParams = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        urlParams.set(key, String(value));
      }
    });
    navigate(`/all-jobs?${urlParams.toString()}`, { replace: true });

    dispatch(fetchJobsByPage({
      page: 1,
      ...currentFilters,
      sort: 'random'
    }));
    if (newFilters) setFilters(newFilters);
  };

  const handleRefresh = () => {
    const saturdayOffOptions = [
      { label: 'Tất cả', value: '' },
      { label: 'Nghỉ thứ 7', value: 'true' },
      { label: 'Làm thứ 7', value: 'false' },
    ];
    const resetFilters = {
      title: '',
      province: '',
      industry: '',
      experience: '',
      saturdayOff: '',
      rank: '',
      salaryMin: null,
      salaryMax: null,
      negotiable: null,
      jobLevel: '',
      education: '',
      searchMode: 'both' as const
    };
    setFilters(resetFilters);
    dispatch(fetchJobsByPage({ page: 1, ...resetFilters }));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchJobsByPage({
      page,
      ...filters,
      sort: 'random'
    }));
    window.scrollTo({ top: 300, behavior: 'smooth' });
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
      message.error('Có lỗi xảy ra khi lưu việc làm');
    }
  };

  const isJobSaved = (jobId: string | number) => savedJobs.some(sj => sj.jobId === jobId);

  // Verification log
  useEffect(() => {
    if (jobs.length > 0) {
      console.log('Jobs loaded with SaturdayOff status:', jobs.map(j => ({ id: j.id, sat: j.saturdayOff })));
    }
  }, [jobs]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-b from-red-50 to-gray-50 pt-16 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
          >
            Tìm kiếm công việc <span className="text-[#bc2228]">mơ ước</span> của bạn
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto font-medium"
          >
            Hơn 10,000+ vị trí tuyển dụng mới mỗi ngày từ các công ty hàng đầu Việt Nam
          </motion.p>
        </div>
        <div className="max-w-5xl mx-auto">
          <JobSearchBar 
            initialValues={filters}
            onSearch={(searchParams) => handleSearch({ ...filters, ...searchParams })} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Advanced Filters */}
          <aside className="hidden lg:block w-80 shrink-0">
            <JobFilterSidebar 
              filters={filters}
              onFilterChange={setFilters}
              onApply={() => handleSearch()}
            />
          </aside>

          {/* Mobile Filter Trigger */}
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 font-bold text-gray-700 active:scale-95 transition-transform"
          >
            <Filter className="w-5 h-5 text-red-600" />
            Lọc nâng cao
          </button>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">Kết quả tìm kiếm</h2>
                  <p className="text-xs text-gray-400 font-black tracking-widest uppercase">Tìm thấy {totalJobs} công việc phù hợp</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                  <button
                    onClick={() => setIsSorted(false)}
                    className={`p-2.5 rounded-xl transition-all ${!isSorted ? 'bg-white text-red-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    <TableProperties className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsSorted(true)}
                    className={`p-2.5 rounded-xl transition-all ${isSorted ? 'bg-white text-red-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    <LayoutList className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleRefresh}
                  className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                  title="Làm mới"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Job Results Grid */}
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="h-48 w-full bg-white rounded-3xl animate-pulse border border-gray-100 shadow-sm"></div>
                 ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className={`grid gap-6 transition-all duration-500 ${isSorted ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {jobs.map((job) => (
                  <motion.div
                    layout
                    key={job.id}
                    onClick={() => navigate(`/job-detail/${job.id}`)}
                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full relative"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-4 mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                          {job.enterprise?.avatar ? (
                            <img src={job.enterprise.avatar} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <Briefcase className="w-8 h-8 text-gray-200" />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                           <h3 className="font-black text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 text-base leading-tight">
                            {job.title}
                          </h3>
                          <Link 
                            to={`/company/${job.enterpriseId}`} 
                            className="text-gray-400 text-[13px] hover:text-[#bc2228] transition-colors truncate font-bold flex items-center gap-1 mt-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {job.enterprise?.title || 'Công ty chưa cập nhật'}
                          </Link>
                        </div>
                        <button
                          onClick={(e) => handleToggleSave(e, job.id)}
                          className={`p-3 rounded-2xl transition-all border shadow-sm ${isJobSaved(job.id)
                            ? 'bg-red-50 text-red-500 border-red-100'
                            : 'bg-gray-50 text-gray-300 hover:text-red-500 border-transparent hover:border-red-100'
                            }`}
                        >
                          <Heart className={`w-5 h-5 ${isJobSaved(job.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        {Array.isArray(job.rank) ? (
                            job.rank.map((r, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                                    {r}
                                </span>
                            ))
                        ) : (
                            <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                                {job.rank || job.level || 'Nhân viên'}
                            </span>
                        )}
                        <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100/50">
                          {job.experience || 'Không yêu cầu'}
                        </span>
                        <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                          {job.saturdayOff ? 'Nghỉ thứ 7' : 'Làm thứ 7'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-3 gap-x-5 text-xs font-black text-gray-600">
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2.5 rounded-2xl border border-emerald-100 min-w-0">
                          <CircleDollarSign className="w-4 h-4 shrink-0" />
                          <span className="text-[13px] font-black truncate">
                            {job.negotiable ? 'Thỏa thuận' : job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 rounded-2xl border border-gray-100 min-w-0">
                          <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-[13px] font-black truncate">{job.province.replace(/^Thành phố\s*|^Tỉnh\s*/, "")}</span>
                        </div>
                      </div>

                      {/* Professional Badges for New Fields */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                        {job.jobLevel && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-[10px] font-black uppercase border border-blue-100/50">
                            <Layers className="w-3.5 h-3.5" />
                            {job.jobLevel}
                          </div>
                        )}
                        {job.education && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 text-gray-500 text-[10px] font-black uppercase border border-gray-100">
                            <Briefcase className="w-3.5 h-3.5 opacity-40" />
                            {job.education}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto px-6 py-5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                       <span className="text-[11px] text-gray-400 flex items-center gap-2 font-black">
                          <Clock className="w-4 h-4" />
                          HẠN NỘP: {job.deadline}
                       </span>
                       <div className="text-xs font-black text-red-600 hover:text-red-700 flex items-center gap-1.5 group/btn">
                         Xem chi tiết <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-24 text-center border-4 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                   <Filter className="w-12 h-12 text-red-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Không tìm thấy việc làm phù hợp</h3>
                <p className="text-gray-400 max-w-sm mx-auto font-medium">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để thấy nhiều kết quả hơn nhé!</p>
                <button 
                  onClick={handleRefresh} 
                  className="mt-10 px-10 py-4 bg-[#bc2228] hover:bg-red-700 text-white rounded-2xl font-bold shadow-2xl shadow-red-200 transition-all active:scale-95"
                >
                  Đặt lại tất cả bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center mt-16 pb-20">
              <Pagination
                current={currentPage}
                total={totalJobs}
                pageSize={6}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="custom-pagination scale-110"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-[60] lg:hidden">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowMobileFilters(false)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] bg-white h-full relative pt-16 p-6 overflow-y-auto shadow-2xl"
             >
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="absolute top-6 left-6 p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
                >
                   <X className="w-6 h-6" />
                </button>
                <div className="mt-4">
                  <JobFilterSidebar 
                    filters={filters}
                    onFilterChange={setFilters}
                    onApply={() => { handleSearch(); setShowMobileFilters(false); }}
                  />
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllJobs;
