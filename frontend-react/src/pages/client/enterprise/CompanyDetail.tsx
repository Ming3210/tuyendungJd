import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchJobsByEnterprise, clearCurrentJob } from '../../../store/slices/jobSlice';
import { fetchEnterpriseById } from '../../../store/slices/enterpriseSlice';
import {
  MapPin,
  Briefcase,
  Globe,
  Phone,
  Mail,
  Users,
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  Award,
  CircleDollarSign
} from 'lucide-react';
import { Tag, Divider, Empty } from 'antd';
import dayjs from 'dayjs';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentEnterprise, loading: enterpriseLoading } = useAppSelector((state) => state.enterprise);
  const { jobs, loading: jobsLoading } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchEnterpriseById(id));
      dispatch(fetchJobsByEnterprise(id));
    }
  }, [id, dispatch]);

  const calculateDaysLeft = (deadline: string) => {
    if (!deadline) return 0;
    const deadlineDate = dayjs(deadline.split('/').reverse().join('-'));
    const days = deadlineDate.diff(dayjs(), 'day');
    return days > 0 ? days : 0;
  };

  if (enterpriseLoading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
      <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide font-sf-pro-display">Đang tải hồ sơ doanh nghiệp...</p>
    </div>
  );

  if (!currentEnterprise) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <Empty description="Không tìm thấy thông tin doanh nghiệp" />
      <button onClick={() => navigate('/all-jobs')} className="mt-4 text-[#bc2228] font-bold hover:underline">Quay lại danh sách việc làm</button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20 page-entrance">
      {/* Hero Banner Section */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

        {/* Company Identity Overlay */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 translate-x-0 left-0 right-0 mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-3xl shadow-2xl p-3 border-4 border-white flex items-center justify-center relative translate-y-6 sm:translate-y-4">
            {currentEnterprise.avatar ? (
              <img src={currentEnterprise.avatar} alt={currentEnterprise.title} className="w-full h-full object-contain rounded-2xl" />
            ) : (
              <Briefcase className="w-16 h-16 text-gray-200" />
            )}
            {currentEnterprise.status === 'verified' && (
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white shadow-lg" title="Doanh nghiệp đã xác thực">
                <CheckCircle className="w-5 h-5 fill-current" />
              </div>
            )}
          </div>

          <div className="flex-grow text-center sm:text-left pb-4 sm:pb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow-md">{currentEnterprise.title}</h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {currentEnterprise.website || 'Chưa cập nhật website'}</div>
              <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {currentEnterprise.companySize || 'Đang cập nhật'} nhân viên</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {currentEnterprise.province}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Description & Jobs */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#bc2228] rounded-full"></div>
                Giới thiệu công ty
              </h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap font-sf-pro-display">
                {currentEnterprise.description || "Công ty chưa cập nhật thông tin giới thiệu chi tiết. Vui lòng liên hệ trực tiếp để biết thêm thông tin."}
              </div>
            </div>

            {/* Active Jobs Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-[#bc2228] rounded-full"></div>
                  Vị trí đang tuyển dụng
                </h2>
                <Tag color="red" className="rounded-full px-4 text-sm font-bold">{jobs.length} Vị trí</Tag>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => navigate(`/job-detail/${job.id}`)}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#bc2228] transition-colors mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5 font-bold text-[#bc2228]"><CircleDollarSign className="w-4 h-4" /> {job.salary}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.province}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Còn {calculateDaysLeft(job.deadline)} ngày</span>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-gray-50 group-hover:bg-[#bc2228] group-hover:text-white text-gray-700 rounded-xl font-bold transition-all text-sm whitespace-nowrap">
                      Chi tiết
                    </button>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                    <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">Hiện tại công ty chưa có vị trí ứng tuyển mới.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Info Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-8 border-b pb-4">Thông tin liên hệ</h3>

              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-[#bc2228] shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Địa điểm</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{currentEnterprise.address || currentEnterprise.province}</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Website</h4>
                    {currentEnterprise.website ? (
                      <a href={currentEnterprise.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
                        {currentEnterprise.website.replace(/^https?:\/\//, '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm italic">Chưa cập nhật</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Email</h4>
                    <p className="text-gray-600 text-sm font-medium">{currentEnterprise.email || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Số điện thoại</h4>
                    <p className="text-gray-600 text-sm font-medium">{currentEnterprise.phone || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-wider">Lĩnh vực</h4>
                    <Tag color="purple" className="mt-1 font-bold">{currentEnterprise.industry}</Tag>
                  </div>
                </div>
              </div>

              <Divider className="my-8" />

              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <p className="text-sm font-bold text-gray-900 mb-2">Bạn muốn gia nhập {currentEnterprise.title}?</p>
                <p className="text-xs text-gray-500 mb-4">Khám phá và ứng tuyển ngay vào các vị trí phù hợp với năng lực của bạn.</p>
                <div className="flex items-center justify-center gap-1.5 text-[#bc2228] font-bold text-sm cursor-default">
                  <CheckCircle className="w-4 h-4" /> Top Employer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
