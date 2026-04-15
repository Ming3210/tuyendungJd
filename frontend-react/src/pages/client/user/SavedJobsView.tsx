import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchSavedJobs, fetchSavedJobsDetail, toggleSaveJob, clearSavedJobsDetail } from '../../../store/slices/userSlice';
import { Empty, Button, message, Skeleton, Card, Tag, Input } from 'antd';
import { MapPin, Clock, CircleDollarSign, Briefcase, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const SavedJobsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { savedJobs, savedJobsDetail, loading } = useAppSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchSavedJobs(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    if (savedJobs.length > 0) {
      const jobIds = savedJobs.map(sj => sj.jobId);
      dispatch(fetchSavedJobsDetail(jobIds));
    } else {
      // Clear details if no jobs are saved to prevent stale data
      dispatch(clearSavedJobsDetail());
    }
  }, [dispatch, savedJobs]);

  const handleUnsave = async (e: React.MouseEvent, jobId: string | number) => {
    e.stopPropagation();
    if (!currentUser?.id) return;
    try {
      await dispatch(toggleSaveJob({ userId: currentUser.id, jobId })).unwrap();
      message.success('Đã bỏ lưu việc làm');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const calculateDaysLeft = (deadline?: string) => {
    if (!deadline) return 0;
    const deadlineDate = dayjs(deadline.split('/').reverse().join('-'));
    const days = deadlineDate.diff(dayjs(), 'day');
    return days > 0 ? days : 0;
  };

  const filteredJobs = savedJobsDetail.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.enterpriseName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sf-pro-display">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0">Việc làm đã lưu</h1>
          <p className="text-gray-500 mt-2">Xem lại những việc làm bạn đã quan tâm.</p>
        </div>
        {savedJobs.length > 0 && (
          <Input
            placeholder="Tìm trong tin đã lưu..."
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            className="max-w-[300px] h-[44px] rounded-xl"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        )}
      </div>

      {loading && savedJobsDetail.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="rounded-2xl border-gray-100 p-0 overflow-hidden shadow-sm">
              <Skeleton loading={true} active avatar paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Empty 
            description={
              <span className="text-gray-500">
                Bạn chưa lưu việc làm nào. 
                <span 
                  className="text-[#bc2228] font-bold cursor-pointer hover:underline ml-1"
                  onClick={() => navigate('/all-jobs')}
                >
                  Tìm việc ngay
                </span>
              </span>
            } 
          />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="py-10 text-center">
           <Empty description="Không tìm thấy việc làm phù hợp với từ khóa." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/job-detail/${job.id}`)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col group relative"
            >
              <div className="p-5">
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-xl border border-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                    <Briefcase className="w-8 h-8 text-gray-300 group-hover:text-red-400 transition-colors" />
                  </div>
                  <button 
                    onClick={(e) => handleUnsave(e, job.id)} 
                    className="p-2.5 rounded-full bg-red-50 text-[#bc2228] hover:bg-[#bc2228] hover:text-white transition-all border border-red-100 shadow-sm active:scale-90"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                   <Tag color="red" className="m-0 rounded-full border-none bg-red-50 text-[#bc2228] text-[10px] font-bold uppercase">{job.industry || 'IT'}</Tag>
                </div>

                <h3 className="font-bold text-gray-900 group-hover:text-[#bc2228] transition-colors line-clamp-2 text-lg mb-1 leading-snug">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 font-medium">{job.enterpriseName || 'Doanh nghiệp Rikkei'}</p>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 font-semibold">
                  <div className="flex items-center gap-1.5 text-[#bc2228] font-bold bg-red-50 px-2 py-1 rounded-md">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{job.province?.replace(/^Thành phố\s*|^Tỉnh\s*/, "")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Còn {calculateDaysLeft(job.deadline)} ngày</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-gray-50/50 mt-auto flex justify-between items-center border-t border-gray-100 group-hover:bg-red-50/30 transition-colors">
                <span className="text-[10px] text-gray-400">Cập nhật: {dayjs(job.updatedAt).format('DD/MM/YYYY')}</span>
                <span className="text-[#bc2228] font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                   Xem chi tiết →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsView;
