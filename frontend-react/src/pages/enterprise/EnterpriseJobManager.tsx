import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchJobsByEnterprise, deleteJob, createJob, updateJob, Job } from '../../store/slices/jobSlice';
import { fetchAllBookings } from '../../store/slices/interviewBookingSlice';
import ApplicantsModal from './ApplicantsModal';
import { Button, Input, Pagination, Tag, Modal, Form, Select, DatePicker, App } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Edit2, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const tabs = [
  { label: "Tất cả", flight: null },
  { label: "Đang hiển thị", flight: "verified" },
  { label: "Đang xét duyệt", flight: "pending" },
  { label: "Bị từ chối", flight: "rejected" },
];

const PROVINCES = [
  "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
  "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
  "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông",
  "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình",
  "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
  "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên",
  "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
  "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const INDUSTRIES = [
  "IT - Phần mềm", "IT - Phần cứng", "Marketing", "Kinh doanh - Bán hàng",
  "Kế toán - Kiểm toán", "Tài chính - Ngân hàng", "Nhân sự", "Hành chính",
  "Thiết kế - Đồ họa", "Giáo dục - Đào tạo", "Y tế - Dược phẩm",
  "Xây dựng - Bất động sản", "Logistics - Vận chuyển", "Sản xuất - Cơ khí",
  "Du lịch - Nhà hàng - Khách sạn", "Truyền thông - Báo chí", "Pháp lý",
  "Nông nghiệp", "Năng lượng", "Khác"
];

const LEVELS = ["Intern", "Fresher", "Junior", "Middle", "Senior", "Lead", "Manager", "Director"];

const EnterpriseJobManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { message , modal } = App.useApp();
  const { jobs, loading, totalJobs, currentPage } = useAppSelector((state) => state.jobs);
  const { bookings } = useAppSelector((state) => state.interviewBooking);
  const { currentEnterprise } = useAppSelector((state) => state.enterprise);
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [form] = Form.useForm();
  
  const [isApplicantsModalVisible, setIsApplicantsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ id: string | number; title: string } | null>(null);

  useEffect(() => {
    dispatch(fetchAllBookings({ page: 1, limit: 1000 }));
    if (id) {
      dispatch(fetchJobsByEnterprise({ enterpriseId: id, page: 1, limit: itemsPerPage }));
    }
  }, [dispatch, id]);

  const handlePageChange = (page: number) => {
    if (id) {
       dispatch(fetchJobsByEnterprise({ enterpriseId: id, page, limit: itemsPerPage }));
    }
  };

  const filteredJobs = useMemo(() => {
    let filtered = jobs; // Backend already filtered by enterpriseId
    const targetFlight = tabs[activeTab].flight;
    if (targetFlight) {
       filtered = filtered.filter(j => j.flight === targetFlight);
    }
    if (searchTerm) {
       filtered = filtered.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  }, [jobs, activeTab, searchTerm]);

  const currentItems = filteredJobs;

  const handleDelete = (jobId: string) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa tin tuyển dụng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await dispatch(deleteJob(jobId)).unwrap();
          message.success("Xóa thành công");
        } catch {
          message.error("Xóa thất bại, vui lòng thử lại.");
        }
      }
    });
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    // Convert List<String> arrays to newline-joined strings for TextAreas
    const toText = (val: any) => Array.isArray(val) ? val.join('\n') : (val || '');
    form.setFieldsValue({
      ...job,
      rank: Array.isArray(job.rank) ? job.rank : (typeof job.rank === 'string' ? (job.rank as string).split(',') : []),
      description: toText(job.description),
      required: toText(job.required),
      benefitsDescription: toText(job.benefitsDescription),
      deadline: job.deadline ? dayjs(job.deadline, ['DD/MM/YYYY', 'YYYY-MM-DD']) : null,
    });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingJob(null);
    form.resetFields();
    form.setFieldsValue({
      enterpriseId: id,
      enterpriseName: currentEnterprise?.title || '',
      flight: 'pending',
      status: true,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setFormLoading(true);

      // Convert string fields to List<String> arrays (backend expects this)
      const toList = (val: string) => val ? val.split('\n').filter(l => l.trim()) : [];

      // Convert string level/rank to array if it's not already
      const payload = {
        ...values,
        enterpriseId: id,
        rank: Array.isArray(values.rank) ? values.rank : (values.rank ? [values.rank] : []),
        description: toList(values.description),
        required: toList(values.required),
        benefitsDescription: toList(values.benefitsDescription),
        deadline: values.deadline ? values.deadline.format('DD/MM/YYYY') : null,
        flight: 'pending', // Always start as pending for admin review
      };

      if (editingJob) {
        await dispatch(updateJob({ id: editingJob.id, data: payload })).unwrap();
        message.success('Cập nhật tin tuyển dụng thành công!');
      } else {
        await dispatch(createJob(payload)).unwrap();
        message.success('Đăng tin tuyển dụng thành công! Tin sẽ được hiển thị sau khi Admin phê duyệt.');
      }

      closeAndResetModal();
      if (id) dispatch(fetchJobsByEnterprise(id));
    } catch (err: any) {
      if (err?.errorFields) return; // Validation error, don't show message
      message.error(editingJob ? 'Cập nhật thất bại. Vui lòng thử lại.' : 'Đăng tin thất bại. Vui lòng thử lại.');
    } finally {
      setFormLoading(false);
    }
  };

  const closeAndResetModal = () => {
    setIsModalVisible(false);
    setEditingJob(null);
    form.resetFields();
  };

  const getApplicantsCount = (jobId: string | number) => {
    return bookings.filter(b => String(b.jobId) === String(jobId)).length;
  };

  const handleViewApplicants = (job: Job) => {
    setSelectedJob({ id: job.id, title: job.title });
    setIsApplicantsModalVisible(true);
  };

  const renderStatusTag = (flight: string) => {
    switch (flight) {
      case 'verified':
        return <Tag color="success" className="font-sf-pro-display font-medium rounded-full px-3 text-sm border-none bg-green-50 text-green-700">Đang hiển thị</Tag>;
      case 'pending':
        return <Tag color="warning" className="font-sf-pro-display font-medium rounded-full px-3 text-sm border-none bg-yellow-50 text-yellow-700">Đang xét duyệt</Tag>;
      case 'rejected':
      case 'unverified':
        return <Tag color="error" className="font-sf-pro-display font-medium rounded-full px-3 text-sm border-none bg-red-50 text-red-700">Bị từ chối</Tag>;
      default:
        return <Tag>{flight}</Tag>;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 font-sf-pro-display">Quản lý tin tuyển dụng</h2>

      <div className="bg-white rounded-xl min-h-[600px]">
        {/* Tabs */}
        <div className="flex flex-wrap space-x-6 border-b border-gray-100 mb-6">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className={`pb-3 font-semibold font-sf-pro-display cursor-pointer transition-colors relative ${
                activeTab === idx ? 'text-[#bc2228]' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => {
                setActiveTab(idx);
                setCurrentPage(1);
              }}
            >
              {tab.label}
              {activeTab === idx && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#bc2228] rounded-t-md" />
              )}
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size="large"
            className="bg-[#bc2228] hover:bg-red-700 border-none font-sf-pro-display shadow-sm rounded-lg"
            onClick={handleAdd}
          >
            Thêm tin tuyển dụng
          </Button>

          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[400px] h-[44px] rounded-lg font-sf-pro-display"
          />
        </div>

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[80px_2fr_1fr] gap-4 py-3 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider font-sf-pro-display">
          <div className="text-center">Công cụ</div>
          <div>Thông tin bắt buộc</div>
          <div>Trạng thái thời gian</div>
        </div>

        {/* Table Body */}
        {loading ? (
           <div className="py-20 text-center text-gray-500">Đang tải danh sách công việc...</div>
        ) : currentItems.length === 0 ? (
           <div className="py-20 text-center text-gray-500 italic">Không có tin tuyển dụng nào phù hợp.</div>
        ) : (
          <div className="flex flex-col">
            {currentItems.map((job) => (
              <div key={job.id} className="grid grid-cols-1 sm:grid-cols-[80px_2fr_1fr] gap-4 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center px-2 rounded-lg">
                {/* Actions */}
                <div className="flex sm:flex-col items-center justify-center gap-3">
                  <button onClick={() => handleEdit(job)} className="p-2 text-[#bc2228] hover:bg-red-50 rounded-full transition" title="Chỉnh sửa">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(job.id)} className="p-2 text-[#bc2228] hover:bg-red-50 rounded-full transition" title="Xóa">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Job Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-400 text-sm font-sf-pro-display bg-gray-100 px-2 py-0.5 rounded-full">#{job.id}</span>
                    {renderStatusTag(job.flight)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-sf-pro-display leading-tight">{job.title}</h3>
                  <div className="mt-2 text-sm">
                    <button 
                      onClick={() => handleViewApplicants(job)}
                      className="text-[#bc2228] font-bold hover:underline font-sf-pro-display border-none bg-transparent p-0 cursor-pointer"
                    >
                      Xem CV ({getApplicantsCount(job.id)})
                    </button>
                    <span className="text-gray-400 ml-2">ứng tuyển mới</span>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex flex-col gap-1 text-sm text-gray-600 font-sf-pro-display">
                  <p><span className="font-medium text-gray-900">Lượt ứng tuyển:</span> {getApplicantsCount(job.id)}</p>
                  <p><span className="font-medium text-gray-900">Hạn nộp:</span> {job.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalJobs > 0 && (
          <div className="mt-8 flex justify-end">
            <Pagination 
              current={currentPage} 
              total={totalJobs} 
              pageSize={itemsPerPage} 
              onChange={handlePageChange} 
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      {/* Add/Edit Job Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <span className="font-sf-pro-display text-xl font-bold">
              {editingJob ? '✏️ Chỉnh sửa tin tuyển dụng' : '➕ Thêm mới tin tuyển dụng'}
            </span>
          </div>
        }
        open={isModalVisible}
        onCancel={closeAndResetModal}
        onOk={handleSubmit}
        confirmLoading={formLoading}
        okText={editingJob ? 'Lưu thay đổi' : 'Đăng tin'}
        cancelText="Hủy"
        width={900}
        centered
        className="font-sf-pro-display"
      >
        <Form form={form} layout="vertical" className="mt-6 font-sf-pro-display">
          {/* Row 1: Title */}
          <Form.Item
            name="title"
            label={<span className="font-bold text-gray-700">Tiêu đề công việc</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề công việc' }]}
          >
            <Input placeholder="Ví dụ: Senior Frontend Developer (ReactJS)" className="h-10 rounded-lg" />
          </Form.Item>

          {/* Row 2: Industry + Level + Province */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="industry"
              label={<span className="font-bold text-gray-700">Lĩnh vực</span>}
              rules={[{ required: true, message: 'Vui lòng chọn lĩnh vực' }]}
            >
              <Select placeholder="Chọn lĩnh vực" showSearch className="h-10">
                {INDUSTRIES.map(i => <Option key={i} value={i}>{i}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              name="rank"
              label={<span className="font-bold text-gray-700">Cấp bậc</span>}
              rules={[{ required: true, message: 'Vui lòng chọn cấp bậc' }]}
            >
              <Select mode="multiple" placeholder="Chọn cấp bậc" className="min-h-10">
                {LEVELS.map(l => <Option key={l} value={l}>{l}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              name="province"
              label={<span className="font-bold text-gray-700">Địa điểm làm việc</span>}
              rules={[{ required: true, message: 'Vui lòng chọn địa điểm' }]}
            >
              <Select placeholder="Chọn tỉnh/thành" showSearch className="h-10">
                {PROVINCES.map(p => <Option key={p} value={p}>{p}</Option>)}
              </Select>
            </Form.Item>
          </div>

          {/* Row 3: Salary + Deadline + WorkingTime */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="salary"
              label={<span className="font-bold text-gray-700">Mức lương</span>}
              rules={[{ required: true, message: 'Vui lòng nhập mức lương' }]}
            >
              <Input placeholder="Ví dụ: 15-20 Triệu, Thỏa thuận" className="h-10 rounded-lg" />
            </Form.Item>

            <Form.Item
              name="deadline"
              label={<span className="font-bold text-gray-700">Hạn nộp hồ sơ</span>}
              rules={[{ required: true, message: 'Vui lòng chọn hạn nộp' }]}
            >
              <DatePicker 
                format="DD/MM/YYYY" 
                className="h-10 rounded-lg w-full"
                placeholder="Chọn ngày hết hạn"
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>

            <Form.Item
              name="workingTime"
              label={<span className="font-bold text-gray-700">Hình thức làm việc</span>}
            >
              <Select placeholder="Chọn hình thức" className="h-10">
                <Option value="Toàn thời gian">Toàn thời gian</Option>
                <Option value="Bán thời gian">Bán thời gian</Option>
                <Option value="Remote">Remote</Option>
                <Option value="Hybrid">Hybrid</Option>
                <Option value="Thực tập">Thực tập</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Description */}
          <Form.Item
            name="description"
            label={<span className="font-bold text-gray-700">Mô tả công việc</span>}
            rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc' }]}
          >
            <TextArea 
              placeholder="Mô tả chi tiết về công việc, trách nhiệm, nhiệm vụ cần thực hiện..."
              autoSize={{ minRows: 4, maxRows: 10 }}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Requirements */}
          <Form.Item
            name="required"
            label={<span className="font-bold text-gray-700">Yêu cầu ứng viên</span>}
            rules={[{ required: true, message: 'Vui lòng nhập yêu cầu ứng viên' }]}
          >
            <TextArea 
              placeholder="Các kỹ năng, kinh nghiệm, bằng cấp cần thiết..."
              autoSize={{ minRows: 4, maxRows: 10 }}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Benefits */}
          <Form.Item
            name="benefitsDescription"
            label={<span className="font-bold text-gray-700">Quyền lợi</span>}
          >
            <TextArea 
              placeholder="Các phúc lợi, chế độ đãi ngộ dành cho nhân viên..."
              autoSize={{ minRows: 3, maxRows: 8 }}
              className="rounded-lg"
            />
          </Form.Item>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 flex gap-2">
            <span>⚠️</span>
            <span>Tin tuyển dụng sẽ chuyển về trạng thái <strong>"Đang xét duyệt"</strong> để Admin phê duyệt trước khi hiển thị công khai.</span>
          </div>
        </Form>
      </Modal>

      <ApplicantsModal
        visible={isApplicantsModalVisible}
        onClose={() => setIsApplicantsModalVisible(false)}
        jobId={selectedJob?.id || null}
        jobTitle={selectedJob?.title || ''}
      />
    </div>
  );
};

export default EnterpriseJobManager;
