import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchJobById, fetchJobsByPage, clearCurrentJob, fetchJobsByEnterprise } from '../../../store/slices/jobSlice';
import { fetchAllBookings, addBooking } from '../../../store/slices/interviewBookingSlice';
import { fetchSavedJobs, toggleSaveJob } from '../../../store/slices/userSlice';
import { fetchEnterpriseById } from '../../../store/slices/enterpriseSlice';
import {
  ChevronRight,
  Clock,
  MapPin,
  Briefcase,
  CircleDollarSign,
  Heart,
  Send,
  CheckCircle,
  Gem,
  Users,
  Award,
  Globe,
  Building2,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { message, Modal, Tag, Divider } from 'antd';
import dayjs from 'dayjs';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentJob, jobs } = useAppSelector((state) => state.jobs);
  const { currentEnterprise } = useAppSelector((state) => state.enterprise);
  const { bookings } = useAppSelector((state) => state.interviewBooking);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedJobs } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
      dispatch(fetchAllBookings({ page: 1, limit: 1000 }));
      if (currentUser?.id) {
        dispatch(fetchSavedJobs(currentUser.id));
      }
    }
    return () => {
      dispatch(clearCurrentJob());
    };
  }, [id, dispatch, currentUser?.id]);

  // Fetch detailed enterprise info and all company jobs once currentJob is loaded
  useEffect(() => {
    if (currentJob?.enterpriseId) {
      dispatch(fetchEnterpriseById(currentJob.enterpriseId));
      dispatch(fetchJobsByEnterprise(currentJob.enterpriseId));
    }
  }, [currentJob?.enterpriseId, dispatch]);

  const hasApplied = useMemo(() => {
    if (!currentUser || !id) return false;
    return bookings.some(b => b.userId === currentUser.id && b.jobId === Number(id));
  }, [bookings, currentUser, id]);

  const relatedJobs = useMemo(() => {
    if (!currentJob) return [];
    return jobs.filter(j => j.industry === currentJob.industry && j.id !== currentJob.id).slice(0, 3);
  }, [jobs, currentJob]);

  // All jobs from this company (excluding current)
  const companyJobs = useMemo(() => {
    if (!currentJob) return [];
    return jobs.filter(j => String(j.enterpriseId) === String(currentJob.enterpriseId) && String(j.id) !== String(currentJob.id));
  }, [jobs, currentJob]);

  const handleApply = async () => {
    if (!currentUser) {
      message.error('Vui lòng đăng nhập để ứng tuyển!');
      navigate('/login');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận ứng tuyển',
      content: `Bạn chắc chắn muốn ứng tuyển cho vị trí ${currentJob?.title}?`,
      onOk: async () => {
        const payload = {
          jobId: Number(id),
          userId: currentUser.id,
          enterpriseId: Number(currentJob?.enterpriseId),
          status: 'pending' as const,
          createAt: new Date().toISOString(),
          updateStatusTime: [new Date().toLocaleString()],
          workingTime: currentJob?.workingTime,
        };
        try {
          await dispatch(addBooking(payload)).unwrap();
          message.success('Ứng tuyển thành công!');
        } catch (error) {
          message.error('Có lỗi xảy ra khi ứng tuyển.');
        }
      }
    });
  };

  const handleToggleSave = async () => {
    if (!currentUser?.id) {
      message.warning('Vui lòng đăng nhập để lưu việc làm');
      navigate('/login');
      return;
    }
    try {
      await dispatch(toggleSaveJob({ userId: currentUser.id, jobId: Number(id) })).unwrap();
      const isCurrentlySaved = savedJobs.some(sj => sj.jobId === Number(id));
      message.success(isCurrentlySaved ? 'Đã bỏ lưu việc làm' : 'Đã lưu việc làm thành công');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const isJobSaved = useMemo(() => {
    return savedJobs.some(sj => sj.jobId === Number(id));
  }, [savedJobs, id]);

  const calculateDaysLeft = (deadline: string) => {
    if (!deadline) return 0;
    const deadlineDate = dayjs(deadline.split('/').reverse().join('-'));
    const days = deadlineDate.diff(dayjs(), 'day');
    return days > 0 ? days : 0;
  };

  if (!currentJob) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
        <Gem className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
      </div>
      <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide">Đang tải thông tin chi tiết...</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20 page-entrance">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden whitespace-nowrap">
          <Link to="/home-page" className="hover:text-red-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/all-jobs" className="hover:text-red-600 transition-colors">Việc làm</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold truncate">{currentJob.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2">
              {currentEnterprise?.avatar ? (
                <img src={currentEnterprise.avatar} alt="Logo" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <Briefcase className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{currentJob.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag color="green" className="rounded-full px-3">{currentJob.level || 'Member'}</Tag>
                <Tag color="red" className="rounded-full px-3">{currentJob.industry}</Tag>
                {currentEnterprise?.status === 'verified' && (
                  <Tag color="blue" className="rounded-full px-3 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Đã xác thực
                  </Tag>
                )}
              </div>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Hạn nộp: {currentJob.deadline}</span>
                </div>
                <Link to={`/company/${currentJob.enterpriseId}`} className="flex items-center gap-1.5 font-medium hover:text-red-600 transition-colors">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span>{currentJob.enterpriseName}</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[180px]">
              {hasApplied ? (
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold cursor-default shadow-lg shadow-emerald-100">
                  <CheckCircle className="w-5 h-5" /> Đã ứng tuyển
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#bc2228] hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-100 transition-all active:scale-95"
                >
                  <Send className="w-5 h-5" /> Ứng tuyển ngay
                </button>
              )}
              <button
                onClick={handleToggleSave}
                className={`w-full flex items-center justify-center gap-2 py-3 border rounded-xl font-bold transition-all ${isJobSaved
                    ? 'bg-red-50 border-red-200 text-[#bc2228]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isJobSaved ? 'fill-current' : ''}`} />
                {isJobSaved ? 'Đã lưu tin' : 'Lưu tin'}
              </button>
            </div>
          </div>

          {/* General Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              Thông tin chung
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                  <CircleDollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mức lương</p>
                  <p className="font-bold text-gray-900 text-lg">{currentJob.salary}</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số lượng tuyển</p>
                  <p className="font-bold text-gray-900 text-lg">10 người</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hình thức làm việc</p>
                  <p className="font-bold text-gray-900 text-lg">Toàn thời gian</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cấp bậc</p>
                  <p className="font-bold text-gray-900 text-lg">{currentJob.level || 'Member'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description Sections */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-10">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-red-600"></div>
                Mô tả công việc
              </h3>
              <div className="text-gray-700 leading-relaxed space-y-4 px-4">
                {Array.isArray(currentJob.description)
                  ? currentJob.description.map((line: any, i: number) => <p key={i} className="mb-2">{line}</p>)
                  : String(currentJob.description || '').split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)
                }
              </div>
            </section>

            <Divider className="my-0" />

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-red-600"></div>
                Yêu cầu ứng viên
              </h3>
              <div className="text-gray-700 leading-relaxed space-y-4 px-4">
                {Array.isArray(currentJob.required)
                  ? currentJob.required.map((line: any, i: number) => <p key={i}>{line}</p>)
                  : String(currentJob.required || '').split('\n').map((line, i) => <p key={i}>{line}</p>)
                }
              </div>
            </section>

            <Divider className="my-0" />

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-red-600"></div>
                Quyền lợi
              </h3>
              <div className="text-gray-700 leading-relaxed space-y-4 px-4">
                {Array.isArray(currentJob.benefitsDescription)
                  ? currentJob.benefitsDescription.map((line: any, i: number) => <p key={i}>{line}</p>)
                  : String(currentJob.benefitsDescription || '').split('\n').map((line, i) => <p key={i}>{line}</p>)
                }
              </div>
            </section>
          </div>

          {/* Other jobs from this company - MAIN AREA (Requested) */}
          {companyJobs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#bc2228] rounded-full"></span>
                  Việc làm khác của {currentJob.enterpriseName}
                </h2>
                <Link to="/all-jobs" className="text-[#bc2228] font-bold text-sm hover:underline">Xem thêm</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyJobs.map((cj) => (
                  <div
                    key={cj.id}
                    onClick={() => {
                      navigate(`/job-detail/${cj.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all cursor-pointer group bg-gray-50/50"
                  >
                    <h4 className="font-bold text-gray-900 group-hover:text-[#bc2228] transition-colors mb-2 line-clamp-1">{cj.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="font-bold text-[#bc2228]">{cj.salary}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cj.province}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">Còn {calculateDaysLeft(cj.deadline)} ngày</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Detailed Enterprise Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-lg border-b pb-4">Thông tin doanh nghiệp</h3>
            <Link to={`/company/${currentJob.enterpriseId}`} className="flex items-center gap-5 mb-8 hover:bg-gray-50 p-2 rounded-xl transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100 group-hover:border-red-200">
                {currentEnterprise?.avatar ? (
                  <img src={currentEnterprise.avatar} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <Gem className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-gray-900 text-lg truncate mb-1 group-hover:text-red-600" title={currentJob.enterpriseName}>
                  {currentJob.enterpriseName}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold uppercase tracking-wider">
                  <Users className="w-3 h-3" />
                  <span>{currentEnterprise?.companySize || 'Đang cập nhật'} nhân viên</span>
                </div>
              </div>
            </Link>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3 text-sm">
                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                <div className="text-gray-600">
                  <p className="font-bold text-gray-800 mb-0.5">Địa điểm</p>
                  <p className="leading-relaxed">{currentEnterprise?.address || currentJob.province}</p>
                </div>
              </div>

              {currentEnterprise?.website && (
                <div className="flex gap-3 text-sm">
                  <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-800 mb-0.5">Website</p>
                    <a href={currentEnterprise.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      {currentEnterprise.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="flex gap-3 text-sm">
                <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-800 mb-0.5">Email liên hệ</p>
                  <p className="text-gray-600">{currentEnterprise?.email || 'Đang cập nhật'}</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-800 mb-0.5">Số điện thoại</p>
                  <p className="text-gray-600">{currentEnterprise?.phone || 'Đang cập nhật'}</p>
                </div>
              </div>
            </div>

            {currentEnterprise?.description && (
              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                  <Briefcase className="w-3 h-3" /> Giới thiệu doanh nghiệp
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 italic">
                  "{currentEnterprise.description}"
                </p>
              </div>
            )}

            <button
              onClick={() => navigate(`/company/${currentJob.enterpriseId}`)}
              className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-md active:scale-95"
            >
              Xem tất cả việc làm của công ty
            </button>
          </div>

          {/* Related Jobs (Different Companies) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-2">
              <Award className="w-6 h-6 text-red-600" />
              Công việc gợi ý
            </h3>
            <div className="space-y-4">
              {relatedJobs.map((rj) => (
                <div
                  key={rj.id}
                  onClick={() => {
                    navigate(`/job-detail/${rj.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all cursor-pointer group border border-gray-100/50"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 grow-0 shrink-0 border border-gray-100">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div className="overflow-hidden flex-grow">
                      <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1 mb-1">{rj.title}</h4>
                      <p className="text-xs text-gray-500 mb-2 truncate">{rj.enterpriseName}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-bold text-sm tracking-tight">{rj.salary}</span>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{calculateDaysLeft(rj.deadline)} ngày</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {relatedJobs.length === 0 && <div className="text-gray-400 italic text-sm">Không có việc làm liên quan</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
