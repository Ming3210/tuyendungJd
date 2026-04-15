import React, { useEffect, useMemo } from 'react';
import { Modal, List, Avatar, Button, Tag, Empty } from 'antd';
import { UserOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllBookings, updateBooking } from '../../store/slices/interviewBookingSlice';
import { fetchAllCvs } from '../../store/slices/userSlice';
import { fetchAllCandidates } from '../../store/slices/candidateSlice';
import { viewDocument } from '../../utils/fileUtils';
import dayjs from 'dayjs';

interface ApplicantsModalProps {
  jobId: string | number | null;
  visible: boolean;
  onClose: () => void;
  jobTitle: string;
}

const ApplicantsModal: React.FC<ApplicantsModalProps> = ({ jobId, visible, onClose, jobTitle }) => {
  const dispatch = useAppDispatch();
  const { bookings, loading: loadingBookings } = useAppSelector((state) => state.interviewBooking);
  const { cvs } = useAppSelector((state) => state.user);
  const { candidates } = useAppSelector((state) => state.candidate);

  useEffect(() => {
    if (visible) {
      dispatch(fetchAllBookings({ page: 1, limit: 1000 }));
      dispatch(fetchAllCvs({ page: 1, limit: 1000 }));
      dispatch(fetchAllCandidates());
    }
  }, [visible, dispatch]);

  const applicants = useMemo(() => {
    if (!jobId) return [];
    return bookings.filter(b => String(b.jobId) === String(jobId));
  }, [bookings, jobId]);

  const getCandidateInfo = (userId: string | number) => {
    return candidates.find(c => String(c.id) === String(userId));
  };

  const getCvForUser = (userId: string | number) => {
    const userCvs = cvs.filter(cv => String(cv.userId) === String(userId));
    return userCvs.find(cv => cv.status === true) || userCvs[0];
  };

  const handleUpdateStatus = (id: string | number, status: string) => {
    dispatch(updateBooking({ id, status: status as any }))
      .unwrap()
      .then(() => {
        message.success(`Đã cập nhật trạng thái thành công`);
      })
      .catch(() => {
        message.error('Có lỗi xảy ra khi cập nhật trạng thái');
      });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'interviewing': return 'processing';
      case 'completed': return 'blue';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  return (
    <Modal
      title={
        <div className="font-sf-pro-display">
          <span className="text-xl font-bold block">Danh sách ứng viên</span>
          <span className="text-sm font-normal text-gray-500 italic mt-1">{jobTitle}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      className="applicants-modal"
    >
      <div className="py-4">
        {applicants.length === 0 ? (
          <Empty description="Chưa có ứng viên nào ứng tuyển" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={applicants}
            loading={loadingBookings}
            renderItem={(item) => {
              const candidate = getCandidateInfo(item.userId);
              const cv = getCvForUser(item.userId);
              
              return (
                <List.Item
                  actions={[
                    <Button 
                      key="view-cv"
                      type="link" 
                      icon={<FileTextOutlined />}
                      className="text-[#bc2228] font-bold"
                      onClick={() => cv && viewDocument(cv.pdfDataUrl)}
                      disabled={!cv}
                    >
                      {cv ? 'Xem CV' : 'Không có CV'}
                    </Button>,
                    item.status === 'pending' && (
                      <div key="actions" className="flex gap-2">
                        <Button 
                          size="small" 
                          type="primary" 
                          className="bg-green-600 hover:bg-green-700 border-none rounded-lg"
                          onClick={() => handleUpdateStatus(item.id, 'accepted')}
                        >
                          Duyệt
                        </Button>
                        <Button 
                          size="small" 
                          danger 
                          className="rounded-lg"
                          onClick={() => handleUpdateStatus(item.id, 'rejected')}
                        >
                          Từ chối
                        </Button>
                      </div>
                    )
                  ]}
                  className="hover:bg-gray-50 transition-colors p-4 rounded-xl mb-2 border border-gray-100"
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        src={candidate?.avatar} 
                        icon={<UserOutlined />} 
                        size={48} 
                        className="border border-gray-100"
                      />
                    }
                    title={
                      <div className="font-bold text-gray-900 font-sf-pro-display text-base">
                        {candidate?.fullName || 'Ứng viên ẩn danh'}
                        <Tag color={getStatusColor(item.status)} className="ml-3 rounded-full text-[10px] uppercase font-bold border-none px-3">
                          {item.status}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="flex flex-col gap-1 text-xs text-gray-500 font-sf-pro-display">
                        <div className="flex items-center gap-2">
                          <CalendarOutlined className="w-3" />
                          <span>Ứng tuyển ngày: {dayjs(item.createAt).format('DD/MM/YYYY')}</span>
                        </div>
                        <div className="text-gray-400">
                          {candidate?.position} • {candidate?.level}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default ApplicantsModal;
