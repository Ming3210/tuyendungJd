import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchJobsByPage } from '../store/slices/jobSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CircleDollarSign, MapPin, Briefcase, Heart, Clock, Building2, Layers } from 'lucide-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Pagination, message } from 'antd';
import { toggleSaveJob, fetchSavedJobs } from '../store/slices/userSlice';
import { toggleFollow, fetchUserFollows } from '../store/slices/followSlice';

dayjs.extend(customParseFormat);

const HotJob: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { jobs, featuredJobs, loading, totalJobs, currentPage } = useAppSelector((state) => state.jobs);
  const [activeLocation, setActiveLocation] = useState<'random' | 'Hà Nội' | 'Hồ Chí Minh'>('random');

  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedJobs } = useAppSelector((state) => state.user);
  const { followingIds } = useAppSelector((state) => state.follow);

  useEffect(() => {
    // Fetch random jobs directly from server for the featured section
    dispatch(fetchJobsByPage({ page: 1, limit: 8, sort: 'random' }));
    if (currentUser?.id) {
      dispatch(fetchUserFollows(Number(currentUser.id)));
      dispatch(fetchSavedJobs(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const handleToggleSaveJob = async (e: React.MouseEvent, jobId: string | number) => {
    e.stopPropagation();
    if (!currentUser?.id) {
      message.warning('Vui lòng đăng nhập để lưu việc làm');
      navigate('/login');
      return;
    }
    try {
      await dispatch(toggleSaveJob({ userId: currentUser.id, jobId })).unwrap();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleToggleFollow = async (e: React.MouseEvent, enterpriseId: string | number) => {
    e.stopPropagation();
    if (!currentUser?.id) {
      message.warning('Vui lòng đăng nhập để theo dõi công ty');
      navigate('/login');
      return;
    }
    try {
      await dispatch(toggleFollow({ userId: Number(currentUser.id), enterpriseId: Number(enterpriseId) })).unwrap();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const isJobSaved = (jobId: string | number) => savedJobs.some(sj => sj.jobId === jobId);
  const isFollowing = (enterpriseId: string | number) => !!followingIds[enterpriseId];

  const handleLocationFilter = (loc: 'random' | 'Hà Nội' | 'Hồ Chí Minh') => {
    setActiveLocation(loc);
    const province = loc === 'random' ? '' : loc === 'Hà Nội' ? 'Thành phố Hà Nội' : 'Thành phố Hồ Chí Minh';
    // Reset to page 1 on filter change
    dispatch(fetchJobsByPage({ page: 1, limit: 8, province, sort: loc === 'random' ? 'random' : '' }));
  };

  const handlePageChange = (page: number) => {
    const province = activeLocation === 'random' ? '' : activeLocation === 'Hà Nội' ? 'Thành phố Hà Nội' : 'Thành phố Hồ Chí Minh';
    dispatch(fetchJobsByPage({
      page,
      limit: 8,
      province,
      sort: activeLocation === 'random' ? 'random' : ''
    }));
    // Smooth scroll to the top of the section
    const element = document.getElementById('featured-jobs-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculateDaysLeft = (deadline: string) => {
    if (!deadline) return 0;
    const deadlineDate = dayjs(deadline.split('/').reverse().join('-'));
    const days = deadlineDate.diff(dayjs(), 'day');
    return days > 0 ? days : 0;
  };

  const hotJobs = activeLocation === 'random' ? featuredJobs : jobs;

  useEffect(() => {
    console.log('[DEBUG] HotJob State Update:', { 
      jobsCount: jobs.length, 
      featuredJobsCount: featuredJobs.length, 
      loading, 
      activeLocation 
    });
  }, [jobs, featuredJobs, loading, activeLocation]);

  const JobSkeleton = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between h-[210px] animate-pulse mb-6">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg grow-0 shrink-0"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-50 rounded w-1/3"></div>
        <div className="flex justify-between pt-1">
          <div className="h-2 bg-gray-50 rounded w-1/4"></div>
          <div className="h-2 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="featured-jobs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm ${activeLocation === 'random'
            ? 'bg-[#bc2228] text-white shadow-red-200'
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => handleLocationFilter('Hà Nội')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm ${activeLocation === 'Hà Nội'
            ? 'bg-[#bc2228] text-white shadow-red-200'
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
        >
          Hà Nội
        </button>
        <button
          onClick={() => handleLocationFilter('Hồ Chí Minh')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm ${activeLocation === 'Hồ Chí Minh'
            ? 'bg-[#bc2228] text-white shadow-red-200'
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
        >
          TP Hồ Chí Minh
        </button>
      </div>

      {/* Grid */}
      <div className="relative min-h-[440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 8 }).map((_, i) => <JobSkeleton key={i} />)
          ) : hotJobs.length > 0 ? (
            // Show actual jobs
            hotJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/job-detail/${job.id}`)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer flex flex-col justify-between h-[210px]"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center grow-0 shrink-0 border border-gray-50 overflow-hidden">
                    {job.enterprise?.avatar ? (
                      <img src={job.enterprise.avatar} alt={job.enterprise.title} className="w-full h-full object-contain" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#bc2228] transition-colors line-clamp-1 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        to={`/company/${job.enterpriseId}`}
                        className="text-[11px] text-gray-500 hover:text-[#bc2228] transition-colors cursor-pointer truncate font-medium max-w-[120px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {job.enterprise?.title || 'Công ty ẩn danh'}
                      </Link>
                      <button
                        onClick={(e) => handleToggleFollow(e, job.enterpriseId)}
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all border shrink-0 ${isFollowing(job.enterpriseId)
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-gray-50 text-gray-400 border-gray-100 hover:text-amber-500 hover:border-amber-200'
                          }`}
                      >
                        {isFollowing(job.enterpriseId) ? 'Đang theo dõi' : '+ Theo dõi'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(job?.rank) ? (
                        job.rank.map((r, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase border border-emerald-100">
                            {r}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase border border-emerald-100">
                          {job?.rank || 'Nhân viên'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CircleDollarSign className="w-4 h-4" />
                      <span className="text-sm font-bold truncate">
                        {job.negotiable ? 'Thỏa thuận' : job.salary}
                      </span>
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

                  {/* Render Job Level & Education badges */}
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-50 mt-1">
                    {job.jobLevel && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100/50">
                        <Layers className="w-3 h-3 text-blue-500" />
                        <span>{job.jobLevel}</span>
                      </div>
                    )}
                    {job.education && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        <Briefcase className="w-3 h-3 opacity-40" />
                        <span>{job.education}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Giới tính:</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 italic">
                      {job.gender || 'Không yêu cầu'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Cập nhật {dayjs(job.createdAt).format('DD/MM/YYYY')}
                    </p>
                    <p className="text-[10px] font-bold text-gray-900">
                      Còn {job.deadline ? calculateDaysLeft(job.deadline) : 0} ngày
                    </p>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleToggleSaveJob(e, job.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all border shadow-sm ${isJobSaved(job.id)
                    ? 'bg-red-50 text-red-500 border-red-100 opacity-100'
                    : 'bg-white text-gray-200 hover:text-red-500 hover:border-red-100 border-gray-50 opacity-0 group-hover:opacity-100'
                    }`}
                  title={isJobSaved(job.id) ? "Bỏ lưu" : "Lưu việc làm"}
                >
                  <Heart className={`w-4 h-4 ${isJobSaved(job.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-20 text-gray-400 italic">
              Hiện chưa có việc làm nổi bật tại khu vực này.
            </div>
          )}
        </div>
      </div>

      {/* Pagination Container */}
      {!loading && hotJobs.length > 0 && (
        <div className="flex justify-center mt-10">
          <Pagination
            current={currentPage}
            total={totalJobs}
            pageSize={8}
            onChange={handlePageChange}
            showSizeChanger={false}
            className="custom-pagination featured-pagination"
          />
        </div>
      )}
    </div>
  );
};

export default HotJob;
