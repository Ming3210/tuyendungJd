import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllBookings, deleteBooking, InterviewBooking } from '../../store/slices/interviewBookingSlice';
import { fetchAllCandidates } from '../../store/slices/candidateSlice';
import { fetchJobsByEnterprise } from '../../store/slices/jobSlice';
import { fetchAllCvs } from '../../store/slices/userSlice';
import { viewDocument } from '../../utils/fileUtils';
import { Pagination, Card, Button, Modal, message } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const EnterpriseInterviewManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  
  const { bookings, loading } = useAppSelector((state) => state.interviewBooking);
  const { currentEnterprise } = useAppSelector((state) => state.enterprise);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { candidates } = useAppSelector((state) => state.candidate);
  const { cvs } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState<InterviewBooking | null>(null);

  useEffect(() => {
    dispatch(fetchAllBookings({ page: 1, limit: 1000 }));
    dispatch(fetchAllCandidates());
    dispatch(fetchAllCvs({ page: 1, limit: 1000 }));
    if (id) {
      dispatch(fetchJobsByEnterprise(id));
    }
  }, [dispatch, id]);

  const enterpriseBookings = useMemo(() => {
    return bookings.filter(b => String(b.enterpriseId) === String(id));
  }, [bookings, id]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return enterpriseBookings.slice(start, start + itemsPerPage);
  }, [enterpriseBookings, currentPage]);

  const findUserById = (userId: string | number) => {
    const candidate = candidates.find(c => String(c.id) === String(userId));
    return candidate ? candidate.fullName : "Chưa cập nhật tên";
  };

  const findJobById = (jobId: string | number) => {
    const job = jobs.find(j => String(j.id) === String(jobId));
    return job ? job.title : "Chưa xác định tin tuyển dụng";
  };

  const findCvForUser = (userId: string | number) => {
    // Return active CV or first CV found for this user
    const userCvs = cvs.filter(cv => String(cv.userId) === String(userId));
    if (userCvs.length === 0) return null;
    return userCvs.find(cv => cv.status === true) || userCvs[0];
  };

  const handleDelete = (bookingId: string | number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa lịch phỏng vấn này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(deleteBooking(bookingId));
        message.success("Xóa lịch phỏng vấn thành công");
      }
    });
  };

  const handleEdit = (booking: InterviewBooking) => {
    setEditingBooking(booking);
    setIsModalVisible(true);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 font-sf-pro-display">Quản lý lịch phỏng vấn</h2>

      <div className="bg-white rounded-xl min-h-[600px]">
        {loading ? (
          <div className="py-20 text-center text-gray-500">Đang tải lịch phỏng vấn...</div>
        ) : enterpriseBookings.length === 0 ? (
          <div className="py-20 text-center text-gray-500 italic">Không có lịch phỏng vấn nào.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentItems.map((booking) => (
              <Card 
                key={booking.id} 
                className="rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                bodyStyle={{ padding: '20px' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={currentEnterprise?.avatar || 'https://via.placeholder.com/60'}
                    alt="Company logo"
                    className="w-[60px] h-[60px] rounded object-cover flex-shrink-0 border border-gray-100"
                  />
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-gray-900 font-sf-pro-display leading-tight truncate" title={findJobById(booking.jobId)}>
                      {findJobById(booking.jobId)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {currentEnterprise?.title || "Công ty..."}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-sf-pro-display text-[15px] text-gray-700">
                  <div className="flex items-center gap-3">
                    <UserOutlined className="text-[#bc2228]" />
                    <p><span className="font-semibold text-gray-900">Tên ứng viên:</span> {findUserById(booking.userId)}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileTextOutlined className="text-[#bc2228] mt-1" />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-gray-900">CV: </span>
                      {(() => {
                        const cv = findCvForUser(booking.userId);
                        if (!cv) return <span className="text-gray-400 italic">Chưa có CV</span>;
                        return (
                          <button 
                            onClick={() => viewDocument(cv.pdfDataUrl)} 
                            className="text-blue-600 hover:underline truncate inline-block max-w-full align-bottom border-none bg-transparent p-0 cursor-pointer text-left"
                          >
                            {cv.title || 'cv_ung_vien.pdf'}
                          </button>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarOutlined className="text-[#bc2228]" />
                    <p><span className="font-semibold text-gray-900">Ngày:</span> {booking.date ? dayjs(booking.date).format('DD/MM/YYYY') : 'Chưa xếp lịch'}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <ClockCircleOutlined className="text-[#bc2228]" />
                    <p><span className="font-semibold text-gray-900">Thời gian:</span> {booking.time || 'Chưa xét thời gian'}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <EnvironmentOutlined className="text-[#bc2228] mt-1" />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-gray-900 block sm:inline">Địa điểm: </span>
                      {booking.meetingLink ? (
                        <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate inline-block max-w-[200px] align-bottom">
                          {booking.meetingLink}
                        </a>
                      ) : (
                         <span className="text-gray-500 italic">Chưa có thông tin địa điểm</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
                  <Button 
                    type="primary" 
                    className="w-full bg-[#bc2228] hover:bg-red-700 border-none font-medium font-sf-pro-display shadow-sm"
                    onClick={() => handleEdit(booking)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button 
                    variant="outlined" 
                    className="w-full border-gray-200 text-gray-700 hover:text-[#bc2228] hover:border-[#bc2228] font-medium font-sf-pro-display"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Xóa
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {enterpriseBookings.length > itemsPerPage && (
          <div className="mt-8 flex justify-end">
             <Pagination 
                current={currentPage} 
                total={enterpriseBookings.length} 
                pageSize={itemsPerPage} 
                onChange={setCurrentPage} 
                showSizeChanger={false}
              />
          </div>
        )}
      </div>

      <Modal
        title={<span className="font-sf-pro-display text-xl font-bold">Chỉnh sửa lịch phỏng vấn</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <div className="py-10 text-center text-gray-500 font-sf-pro-display">
           (Form chỉnh sửa lịch phỏng vấn sẽ được tích hợp ở đây)
        </div>
      </Modal>

    </div>
  );
};

export default EnterpriseInterviewManager;
