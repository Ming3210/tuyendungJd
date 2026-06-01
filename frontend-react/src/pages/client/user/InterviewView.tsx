import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchAllBookings } from '../../../store/slices/interviewBookingSlice';
import { fetchJobsByPage } from '../../../store/slices/jobSlice';
import { fetchAllEnterprises } from '../../../store/slices/enterpriseSlice';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Info,
  Building2,
  ExternalLink
} from 'lucide-react';
import { Badge, Card, Divider, Tag } from 'antd';
import dayjs from 'dayjs';

const InterviewView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { bookings, loading } = useAppSelector((state) => state.interviewBooking);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { enterprises } = useAppSelector((state) => state.enterprise);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllBookings({ page: 1, limit: 1000 }));
      dispatch(fetchJobsByPage({ page: 1 }));
      dispatch(fetchAllEnterprises({ page: 1, limit: 1000 }));
    }
  }, [currentUser, dispatch]);

  const userBookings = useMemo(() => {
    return bookings.filter(b => b.userId === currentUser?.id);
  }, [bookings, currentUser]);

  const getJobTitle = (jobId: number | string) => {
    return jobs.find(j => Number(j.id) === Number(jobId))?.title || 'Công việc không xác định';
  };

  const getEnterprise = (entId: number | string) => {
    return enterprises.find(e => Number(e.id) === Number(entId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'accepted': return 'blue';
      case 'interviewing': return 'purple';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      case 'rejected': return 'volcano';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'accepted': return 'Đã chấp nhận';
      case 'interviewing': return 'Đang phỏng vấn';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      case 'rejected': return 'Từ chối';
      default: return status;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 m-0 leading-tight">Lịch phỏng vấn</h2>
        <p className="text-gray-500 mt-1 text-sm">Theo dõi lịch phỏng vấn và trạng thái ứng tuyển của bạn</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
            <Calendar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
          </div>
          <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide font-sf-pro-display">
            Đang tải lịch phỏng vấn...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBookings.map((booking) => {
            const ent = getEnterprise(booking.enterpriseId);
            return (
              <Card 
                key={booking.id}
                className="shadow-sm border-gray-100 hover:shadow-md transition-shadow"
                title={
                  <div className="flex justify-between items-center py-1">
                    <Tag color={getStatusColor(booking.status)} className="font-bold uppercase text-[10px]">
                      {getStatusText(booking.status)}
                    </Tag>
                    <span className="text-xs text-gray-400 font-normal">ID: #{booking.id}</span>
                  </div>
                }
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-50">
                    {ent?.avatar ? (
                      <img src={ent.avatar} alt="logo" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{getJobTitle(booking.jobId)}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{ent?.title || 'Doanh nghiệp'}</p>
                  </div>
                </div>

                <Divider className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Ngày phỏng vấn</p>
                      <p className="text-sm text-gray-700">{booking.date || 'Chờ xác nhận'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Thời gian</p>
                      <p className="text-sm text-gray-700">{booking.time || 'Chờ xác nhận'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Hình thức / Địa điểm</p>
                      {booking.meetingLink ? (
                        <a 
                          href={booking.meetingLink.startsWith('http') ? booking.meetingLink : `https://${booking.meetingLink}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
                        >
                          Tham gia họp <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-sm text-gray-700">Chờ xác nhận</p>
                      )}
                    </div>
                  </div>
                </div>

                {booking.cancelReason && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 flex gap-2">
                    <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700"><strong>Lý do hủy:</strong> {booking.cancelReason}</p>
                  </div>
                )}
              </Card>
            );
          })}
          {userBookings.length === 0 && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Bạn chưa có lịch phỏng vấn nào.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewView;
