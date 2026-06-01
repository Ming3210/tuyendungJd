import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEnterpriseBookingsPaginated, deleteBooking, InterviewBooking } from '../../store/slices/interviewBookingSlice';
import { fetchAllCandidates } from '../../store/slices/candidateSlice';
import { fetchJobsByEnterprise } from '../../store/slices/jobSlice';
import { fetchAllCvs } from '../../store/slices/userSlice';
import { viewDocument } from '../../utils/fileUtils';
import { Table, Button, Modal as AntdModal, App, Tag, Tooltip, Avatar, Space } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EnvironmentOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  SettingOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import RecruitmentPipelineModal from '../../components/enterprise/RecruitmentPipelineModal';
import { Input, Select, Empty } from 'antd';

const { Option } = Select;

const EnterpriseInterviewManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { message, modal } = App.useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { bookings, loading, totalBookings, currentPage, limit } = useAppSelector((state) => state.interviewBooking);
  const { currentEnterprise } = useAppSelector((state) => state.enterprise);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { candidates } = useAppSelector((state) => state.candidate);
  const { cvs } = useAppSelector((state) => state.user);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState<InterviewBooking | null>(null);
  
  const [searchText, setSearchText] = useState('');
  
  const statusFilter = searchParams.get('status') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('limit') || '10', 10);

  useEffect(() => {
    if (id) {
      dispatch(fetchEnterpriseBookingsPaginated({ enterpriseId: id, status: statusFilter, page: page, limit: pageSize }));
    }
  }, [dispatch, id, statusFilter, page, pageSize, isModalVisible]); // Re-fetch when modal closes just in case

  useEffect(() => {
    dispatch(fetchAllCandidates());
    dispatch(fetchAllCvs({ page: 1, limit: 1000 }));
    if (id) {
      dispatch(fetchJobsByEnterprise({ enterpriseId: id, limit: 1000 }));
    }
  }, [dispatch, id]);

  const findUserById = (userId: string | number) => {
    const candidate = candidates.find(c => String(c.id) === String(userId));
    return candidate ? candidate.fullName : "Chưa cập nhật tên";
  };

  const getCandidateAvatar = (userId: string | number) => {
     const candidate = candidates.find(c => String(c.id) === String(userId));
     return candidate?.avatar;
  }

  const findJobById = (jobId: string | number) => {
    const job = jobs.find(j => String(j.id) === String(jobId));
    return job ? job.title : "Chưa xác định tin tuyển dụng";
  };

  const findCvById = (cvId: string | number) => {
    return cvs.find(cv => String(cv.id) === String(cvId));
  };

  // Local search filter
  const filteredBookings = useMemo(() => {
     if (!searchText) return bookings;
     const lowerSearch = searchText.toLowerCase();
     return bookings.filter(b => {
        const candidateName = findUserById(b.userId).toLowerCase();
        const jobTitle = findJobById(b.jobId).toLowerCase();
        return candidateName.includes(lowerSearch) || jobTitle.includes(lowerSearch);
     });
  }, [bookings, searchText, candidates, jobs]);

  const handleDelete = (bookingId: string | number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa hồ sơ ứng tuyển này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(deleteBooking(bookingId)).unwrap().then(() => {
           message.success("Xóa hồ sơ thành công");
           // Trigger refetch
           dispatch(fetchEnterpriseBookingsPaginated({ enterpriseId: id!, status: statusFilter, page: page, limit: pageSize }));
        });
      }
    });
  };

  const handleEdit = (booking: InterviewBooking) => {
    setEditingBooking(booking);
    setIsModalVisible(true);
  };

  const handleFilterChange = (value: string) => {
     const params = new URLSearchParams(searchParams);
     params.set('status', value);
     params.set('page', '1'); // Reset to page 1 on filter
     setSearchParams(params);
  };

  const tableColumns = [
     {
        title: 'Ứng viên',
        key: 'candidate',
        render: (_: any, record: InterviewBooking) => (
           <div className="flex items-center gap-3">
              <Avatar src={getCandidateAvatar(record.userId)} icon={<UserOutlined />} className="border border-gray-100" size="large" />
              <div>
                 <div className="font-bold text-gray-900">{findUserById(record.userId)}</div>
                 <div className="text-xs text-gray-500 mt-1">
                    {(() => {
                        const cv = record.cvId ? findCvById(record.cvId) : null;
                        if (!cv) return <span className="text-gray-400 italic">Không có CV đính kèm</span>;
                        return (
                          <button 
                            onClick={() => viewDocument(cv.pdfDataUrl)} 
                            className="text-[#bc2228] font-semibold hover:underline border-none bg-transparent p-0 cursor-pointer text-left flex items-center gap-1"
                          >
                            <FileTextOutlined /> Xem hồ sơ
                          </button>
                        );
                    })()}
                 </div>
              </div>
           </div>
        )
     },
     {
        title: 'Vị trí ứng tuyển',
        key: 'job',
        render: (_: any, record: InterviewBooking) => (
           <div>
              <div className="font-semibold text-gray-800">{findJobById(record.jobId)}</div>
              <div className="text-xs text-gray-500 mt-1">Ngày nộp: {dayjs(record.createAt).format('DD/MM/YYYY')}</div>
           </div>
        )
     },
     {
        title: 'Trạng thái',
        key: 'status',
        render: (_: any, record: InterviewBooking) => {
           let color = 'gold';
           let text = 'Đang duyệt';
           if (record.status === 'interviewing') { color = 'blue'; text = 'Phỏng vấn'; }
           if (record.status === 'accepted') { color = 'green'; text = 'Trúng tuyển'; }
           if (record.status === 'rejected') { color = 'red'; text = 'Từ chối'; }
           if (record.status === 'cancelled') { color = 'default'; text = 'Đã hủy'; }
           if (record.status === 'completed') { color = 'cyan'; text = 'Hoàn thành'; }
           return <Tag color={color} className="uppercase font-bold border-none px-3 py-1 rounded-full">{text}</Tag>;
        }
     },
     {
        title: 'Lịch hẹn',
        key: 'schedule',
        render: (_: any, record: InterviewBooking) => {
           if (!record.date) return <span className="text-gray-400 italic text-sm">Chưa có lịch</span>;
           return (
              <div className="text-sm font-medium text-gray-700">
                 <div className="flex items-center gap-1"><CalendarOutlined className="text-gray-400"/> {dayjs(record.date).format('DD/MM/YYYY')}</div>
                 <div className="flex items-center gap-1 mt-1"><ClockCircleOutlined className="text-gray-400"/> {record.time || 'N/A'}</div>
              </div>
           );
        }
     },
     {
        title: 'Thao tác',
        key: 'actions',
        align: 'right' as const,
        render: (_: any, record: InterviewBooking) => (
           <Space>
              <Tooltip title="Xử lý hồ sơ">
                 <Button 
                    type="primary" 
                    icon={<SettingOutlined />} 
                    className="bg-[#bc2228] hover:bg-red-700 border-none shadow-sm rounded-lg"
                    onClick={() => handleEdit(record)}
                 >
                    Xử lý
                 </Button>
              </Tooltip>
              <Tooltip title={record.status === 'rejected' ? "Xóa hồ sơ" : "Chỉ được xóa khi đánh trượt"}>
                 <Button 
                    danger
                    icon={<DeleteOutlined />} 
                    className={`border-red-100 rounded-lg ${record.status === 'rejected' ? 'hover:bg-red-50' : 'opacity-50'}`}
                    onClick={() => handleDelete(record.id)}
                    disabled={record.status !== 'rejected'}
                 />
              </Tooltip>
           </Space>
        )
     }
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
             <h2 className="text-2xl font-extrabold text-gray-900 m-0">Quản lý Hồ sơ & Phỏng vấn</h2>
             <p className="text-gray-500 mt-1 text-sm">Theo dõi và xử lý trạng thái ứng viên</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              placeholder="Tìm theo tên hoặc công việc..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-full md:w-64 h-10 rounded-xl"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select 
              value={statusFilter} 
              className="w-full md:w-44 h-10"
              onChange={handleFilterChange}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="pending">Chờ xử lý</Option>
              <Option value="interviewing">Đang phỏng vấn</Option>
              <Option value="accepted">Trúng tuyển</Option>
              <Option value="rejected">Từ chối</Option>
              <Option value="completed">Hoàn thành</Option>
              <Option value="cancelled">Đã hủy</Option>
            </Select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100">
          <Table
             columns={tableColumns}
             dataSource={filteredBookings}
             rowKey="id"
             loading={loading}
             pagination={{
                current: page,
                pageSize: pageSize,
                total: totalBookings,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50'],
                onChange: (newPage, newPageSize) => {
                   const params = new URLSearchParams(searchParams);
                   params.set('page', newPage.toString());
                   params.set('limit', newPageSize.toString());
                   setSearchParams(params);
                }
             }}
             className="custom-entreprise-table shadow-none"
             locale={{ emptyText: <Empty description="Không có dữ liệu hồ sơ phù hợp" /> }}
          />
        </div>
      </div>

      <RecruitmentPipelineModal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        booking={editingBooking ? bookings.find(b => b.id === editingBooking.id) || editingBooking : null}
        candidateName={editingBooking ? findUserById(editingBooking.userId) : ''}
        cvUrl={editingBooking?.cvId ? findCvById(editingBooking.cvId)?.pdfDataUrl : ''}
        jobTitle={editingBooking ? findJobById(editingBooking.jobId) : ''}
      />

    </div>
  );
};

export default EnterpriseInterviewManager;
