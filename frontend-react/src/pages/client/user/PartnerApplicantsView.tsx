import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchAllBookings, deleteBooking, InterviewBooking } from '../../../store/slices/interviewBookingSlice';
import { fetchAllCandidates } from '../../../store/slices/candidateSlice';
import { fetchAllJobs, fetchJobsByEnterprise } from '../../../store/slices/jobSlice';
import { fetchAllCvs, fetchOwnedEnterprises } from '../../../store/slices/userSlice';
import { viewDocument } from '../../../utils/fileUtils';
import { Pagination, Card, Button, Modal as AntdModal, App, Empty, Tag } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined,
  FileTextOutlined,
  BankOutlined,
  BuildingOutlined,
  HistoryOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import RecruitmentPipelineModal from '../../../components/enterprise/RecruitmentPipelineModal';
import { Input, Select } from 'antd';

const { Option } = Select;

const PartnerApplicantsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, modal } = App.useApp();
  
  const { bookings, loading } = useAppSelector((state) => state.interviewBooking);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { ownedEnterprises } = useAppSelector((state) => state.user);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { candidates } = useAppSelector((state) => state.candidate);
  const { cvs } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState<InterviewBooking | null>(null);
  
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (currentUser?.id) {
        dispatch(fetchOwnedEnterprises(currentUser.id));
    }
    dispatch(fetchAllBookings({ page: 1, limit: 1000 }));
    dispatch(fetchAllCandidates());
    dispatch(fetchAllCvs({ page: 1, limit: 1000 }));
    dispatch(fetchAllJobs({ page: 1, limit: 1000 }));
  }, [dispatch, currentUser?.id]);

  const partnerBookings = useMemo(() => {
    if (!ownedEnterprises || ownedEnterprises.length === 0) return [];
    
    const enterpriseIds = ownedEnterprises.map(e => String(e.id));
    // Filter bookings that belong to any of the partner's enterprises
    let filtered = bookings.filter(b => enterpriseIds.includes(String(b.enterpriseId)));
    
    // Search by candidate name or job title
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(b => {
        const candidateName = findUserById(b.userId).toLowerCase();
        const jobTitle = findJobById(b.jobId).toLowerCase();
        return candidateName.includes(lowerSearch) || jobTitle.includes(lowerSearch);
      });
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    
    return filtered;
  }, [bookings, ownedEnterprises, searchText, statusFilter, candidates, jobs]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return partnerBookings.slice(start, start + itemsPerPage);
  }, [partnerBookings, currentPage]);

  const findUserById = (userId: string | number) => {
    const candidate = candidates.find(c => String(c.id) === String(userId));
    return candidate ? candidate.fullName : "Chưa cập nhật tên";
  };

  const findJobById = (jobId: string | number) => {
    const job = jobs.find(j => String(j.id) === String(jobId));
    return job ? job.title : "Chưa xác định tin tuyển dụng";
  };

  const findEnterpriseById = (entId: string | number) => {
    const ent = ownedEnterprises.find(e => String(e.id) === String(entId));
    return ent ? ent.title : "Công ty...";
  };

  const findEnterpriseAvatar = (entId: string | number) => {
    const ent = ownedEnterprises.find(e => String(e.id) === String(entId));
    return ent?.avatar || 'https://via.placeholder.com/60';
  };

  const findCvById = (cvId: string | number) => {
    return cvs.find(cv => String(cv.id) === String(cvId));
  };

  const handleDelete = (bookingId: string | number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa lịch phỏng vấn này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(deleteBooking(bookingId));
        message.success("Xóa lịch thành công");
      }
    });
  };

  const handleEdit = (booking: InterviewBooking) => {
    setEditingBooking(booking);
    setIsModalVisible(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sf-pro-display">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 m-0 tracking-tight">Dashboard Đối tác</h1>
            <p className="text-gray-500 mt-2 text-lg">Quản lý và thống kê toàn bộ ứng viên nộp hồ sơ vào mạng lưới doanh nghiệp của bạn.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              placeholder="Tìm ứng viên hoặc công việc..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-64 h-11 rounded-xl shadow-sm border-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select 
              defaultValue="all" 
              className="w-44 h-11"
              onChange={setStatusFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả</Option>
              <Option value="pending">Chờ duyệt</Option>
              <Option value="interviewing">Phỏng vấn</Option>
              <Option value="accepted">Trúng tuyển</Option>
              <Option value="rejected">Từ chối</Option>
            </Select>
            <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-xl shadow-sm border border-gray-100">
               <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <BankOutlined className="text-lg text-[#bc2228]" />
               </div>
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-0">Quản lý</p>
                  <p className="text-sm font-bold text-gray-900 m-0">{ownedEnterprises?.length || 0} công ty</p>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
             <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin mb-4"></div>
             <p className="text-gray-500">Đang tải danh sách ứng tuyển...</p>
          </div>
        ) : partnerBookings.length === 0 ? (
          <div className="py-20">
            <Empty description={<span className="text-gray-500">Chưa có ứng viên nào ứng tuyển.</span>} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentItems.map((booking) => (
                <Card 
                  key={booking.id} 
                  className="rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="absolute top-4 right-4">
                    <Tag color={booking.status === 'pending' ? 'orange' : booking.status === 'accepted' ? 'green' : 'red'} className="rounded-full font-bold">
                        {booking.status === 'pending' ? 'Đang chờ' : booking.status === 'accepted' ? 'Đã duyệt' : 'Từ chối'}
                    </Tag>
                  </div>

                  <div className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-100">
                    <img
                      src={findEnterpriseAvatar(booking.enterpriseId)}
                      alt="Company logo"
                      className="w-14 h-14 rounded-lg object-contain bg-gray-50 flex-shrink-0 border border-gray-100 p-1"
                    />
                    <div className="min-w-0 pr-8">
                      <p className="text-[17px] font-bold text-gray-900 font-sf-pro-display leading-snug line-clamp-2" title={findJobById(booking.jobId)}>
                        {findJobById(booking.jobId)}
                      </p>
                      <p className="text-sm text-[#bc2228] font-semibold mt-1 flex items-center gap-1.5 truncate">
                        <BankOutlined />
                        {findEnterpriseById(booking.enterpriseId)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 font-sf-pro-display text-[14px]">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <UserOutlined className="text-gray-400 text-lg" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Tên ứng viên</p>
                        <p className="font-bold text-gray-900">{findUserById(booking.userId)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileTextOutlined className="text-gray-400 text-lg" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Hồ sơ đính kèm (CV)</p>
                        {(() => {
                          const cv = booking.cvId ? findCvById(booking.cvId) : null;
                          if (!cv) return <span className="font-medium text-gray-400 italic">Hồ sơ không tồn tại</span>;
                          return (
                            <button 
                              onClick={() => viewDocument(cv.pdfDataUrl)} 
                              className="font-bold text-blue-600 hover:text-blue-800 hover:underline truncate inline-block max-w-[200px] align-bottom p-0 border-none bg-transparent cursor-pointer text-left"
                            >
                              {cv.title || 'cv_ung_vien.pdf'}
                            </button>
                          );
                        })()}
                      </div>
                    </div>

                    {booking.description && booking.description.length > 0 && booking.description[0] && (
                        <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/30">
                            <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Lời giới thiệu từ ứng viên</p>
                            <p className="text-sm text-gray-700 italic m-0">"{booking.description[0]}"</p>
                        </div>
                    )}

                    <div className="flex gap-4 p-3 bg-[#fff6f7] rounded-lg border border-red-50">
                        <div className="flex-1">
                            <p className="text-xs text-red-400 mb-0.5 flex items-center gap-1"><CalendarOutlined /> Lịch phỏng vấn</p>
                            <p className="font-semibold text-gray-900">{booking.date ? dayjs(booking.date).format('DD/MM/YYYY') : 'Chưa xếp'}</p>
                        </div>
                        <div className="w-px bg-red-100"></div>
                        <div className="flex-1">
                            <p className="text-xs text-red-400 mb-0.5 flex items-center gap-1"><ClockCircleOutlined /> Thời gian</p>
                            <p className="font-semibold text-gray-900">{booking.time || 'Chưa xét'}</p>
                        </div>
                    </div>

                    {booking.meetingLink && (
                        <div className="flex items-start gap-3 p-3">
                            <EnvironmentOutlined className="text-gray-400 text-lg mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Địa điểm / Link Online</p>
                                <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline break-all line-clamp-2">
                                {booking.meetingLink}
                                </a>
                            </div>
                        </div>
                    )}
                  </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Button 
                        type="primary" 
                        className="w-full bg-[#bc2228] hover:bg-red-700 border-none h-11 font-bold shadow-md shadow-red-50 rounded-xl flex items-center justify-center gap-2"
                        onClick={() => handleEdit(booking)}
                      >
                        Tiến trình hồ sơ
                      </Button>
                      <Button 
                        className="w-full h-11 border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-500 font-bold rounded-xl"
                        onClick={() => handleDelete(booking.id)}
                      >
                        Hủy
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {partnerBookings.length > itemsPerPage && (
                <div className="mt-10 flex justify-center pb-4">
                   <Pagination 
                      current={currentPage} 
                      total={partnerBookings.length} 
                      pageSize={itemsPerPage} 
                      onChange={setCurrentPage} 
                      showSizeChanger={false}
                      className="custom-pagination"
                    />
                </div>
              )}
            </>
          )}
        </div>

        <RecruitmentPipelineModal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          booking={editingBooking}
          candidateName={editingBooking ? findUserById(editingBooking.userId) : ''}
          cvUrl={editingBooking?.cvId ? findCvById(editingBooking.cvId)?.pdfDataUrl : ''}
          jobTitle={editingBooking ? findJobById(editingBooking.jobId) : ''}
        />

          </div>

    </div>
  );
};

export default PartnerApplicantsView;
