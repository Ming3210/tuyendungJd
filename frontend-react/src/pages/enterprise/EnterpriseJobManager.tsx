import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchJobsByEnterprise, deleteJob, createJob, updateJob, Job, setCurrentPage } from '../../store/slices/jobSlice';
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

const LEVELS = ["Intern", "Fresher", "Junior", "Middle", "Senior", "Lead", "Manager", "Director", "Expert", "Advanced", "Professional", "Master"];
const JOB_LEVELS = ["Nhân viên", "Trưởng nhóm", "Trưởng/Phó phòng", "Quản lý / Giám sát", "Trưởng chi nhánh", "Phó giám đốc", "Giám đốc", "Thực tập sinh"];
const EDUCATION_LEVELS = ["Không yêu cầu", "Lao động phổ thông", "Chứng chỉ", "Trung cấp", "Cao đẳng trở lên", "Đại học năm 4", "Đại học trở lên", "Sau đại học"];

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
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      negotiable: job.negotiable || false,
      jobLevel: job.jobLevel,
      education: job.education,
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
      if (id) dispatch(fetchJobsByEnterprise({ enterpriseId: id, page: currentPage, limit: itemsPerPage }));
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 page-slide-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 m-0 leading-tight">Quản lý tin tuyển dụng</h2>
            <p className="text-gray-500 mt-1 text-sm">Theo dõi và cập nhật tiến độ đăng tin của bạn</p>
          </div>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size="large"
            className="bg-[#bc2228] hover:bg-red-700 border-none font-bold shadow-md shadow-red-100 rounded-xl h-11 px-6 flex items-center justify-center gap-2"
            onClick={handleAdd}
          >
            Thêm tin tuyển dụng
          </Button>
        </div>
        {/* Tabs & Search */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
          <div className="flex flex-wrap items-center gap-6">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`pb-2 font-bold cursor-pointer transition-all relative text-[15px] ${
                  activeTab === idx ? 'text-[#bc2228]' : 'text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => {
                  setActiveTab(idx);
                  dispatch(setCurrentPage(1));
                }}
              >
                {tab.label}
                {activeTab === idx && (
                  <div className="absolute -bottom-[1px] left-0 w-full h-[2.5px] bg-[#bc2228] rounded-full" />
                )}
              </div>
            ))}
          </div>

          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Tìm theo tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full xl:w-80 h-10 rounded-xl shadow-sm border-gray-100"
            allowClear
          />
        </div>

        {/* Table Body */}
        {loading ? (
           <div className="py-20 text-center flex flex-col items-center">
             <div className="w-10 h-10 border-4 border-gray-100 border-t-[#bc2228] animate-spin rounded-full mb-3" />
             <p className="text-gray-500">Đang tải danh sách công việc...</p>
           </div>
        ) : currentItems.length === 0 ? (
           <div className="p-20 text-center bg-gray-50/30 rounded-2xl border border-dashed border-gray-100">
             <p className="text-gray-400 italic">Không có tin tuyển dụng nào phù hợp.</p>
           </div>
        ) : (
          <div className="space-y-4">
            {currentItems.map((job) => (
              <div key={job.id} className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-100 hover:shadow-md hover:shadow-red-50/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Action Icons */}
                  <div className="flex lg:flex-col items-center justify-center gap-2 order-2 lg:order-1 px-4 border-r border-gray-50">
                    <button 
                      onClick={() => handleEdit(job)} 
                      className="p-2.5 text-blue-600 bg-blue-50/50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(job.id)} 
                      className="p-2.5 text-red-600 bg-red-50/50 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200"
                      title="Xóa"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                  
                  {/* Job Content */}
                  <div className="flex-1 min-w-0 order-1 lg:order-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-gray-400 text-xs font-bold font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100">#{job.id}</span>
                      {renderStatusTag(job.flight)}
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-auto lg:ml-0">
                        Hạn nộp: {job.deadline ? dayjs(job.deadline, ['DD/MM/YYYY', 'YYYY-MM-DD']).format('DD/MM/YYYY') : 'N/A'}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#bc2228] transition-colors leading-tight mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <button 
                        onClick={() => handleViewApplicants(job)}
                        className="text-[#bc2228] font-bold hover:underline underline-offset-4 decoration-2"
                      >
                        Ứng viên: {getApplicantsCount(job.id)}
                      </button>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                        <span>{job.province}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                        <span className="font-semibold text-emerald-600">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                        <span>SL: <span className="font-semibold text-gray-700">{job.quantity || 'Không giới hạn'}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Right side stats/tags */}
                  <div className="flex items-center gap-4 lg:ml-auto order-3">
                     <div className="bg-gray-50 px-4 py-2 rounded-xl text-center min-w-[100px]">
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Ứng tuyển</div>
                        <div className="text-lg font-bold text-gray-900 tracking-tight">{getApplicantsCount(job.id)}</div>
                     </div>
                  </div>
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
          {/* Row 1: Title & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Form.Item
              name="title"
              label={<span className="font-bold text-gray-700">Tiêu đề công việc</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề công việc' }]}
              className="md:col-span-3"
            >
              <Input placeholder="Ví dụ: Senior Frontend Developer (ReactJS)" className="h-10 rounded-lg" />
            </Form.Item>

            <Form.Item
              name="quantity"
              label={<span className="font-bold text-gray-700">Số lượng</span>}
              rules={[{ required: true, message: 'Nhập số lượng' }]}
            >
              <Input type="number" min={1} placeholder="VD: 5" className="h-10 rounded-lg" />
            </Form.Item>
          </div>

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
              label={<span className="font-bold text-gray-700">Kỹ năng / Tags</span>}
            >
              <Select mode="multiple" placeholder="Chọn hoặc nhập tag" className="min-h-10">
                {LEVELS.map(l => <Option key={l} value={l}>{l}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              name="jobLevel"
              label={<span className="font-bold text-gray-700">Cấp bậc công việc</span>}
              rules={[{ required: true, message: 'Vui lòng chọn cấp bậc' }]}
            >
              <Select placeholder="Chọn cấp bậc" className="h-10">
                {JOB_LEVELS.map(l => <Option key={l} value={l}>{l}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              name="education"
              label={<span className="font-bold text-gray-700">Yêu cầu học vấn</span>}
              rules={[{ required: true, message: 'Vui lòng chọn học vấn' }]}
            >
              <Select placeholder="Chọn yêu cầu học vấn" showSearch className="h-10">
                {EDUCATION_LEVELS.map(e => <Option key={e} value={e}>{e}</Option>)}
              </Select>
            </Form.Item>
          </div>

          {/* Row 3: Salary + Deadline + WorkingTime */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="salary"
              label={<span className="font-bold text-gray-700">Mức lương hiển thị</span>}
              rules={[{ required: true, message: 'Vui lòng nhập mức lương' }]}
            >
              <Input placeholder="Ví dụ: 15-20 Triệu, Thỏa thuận" className="h-10 rounded-lg" />
            </Form.Item>

            <Form.Item
              name="negotiable"
              valuePropName="checked"
              className="mb-0 pt-8"
            >
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                <input 
                  type="checkbox" 
                  id="negotiable" 
                  className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" 
                  checked={form.getFieldValue('negotiable')}
                  onChange={(e) => form.setFieldsValue({ negotiable: e.target.checked })}
                />
                <label htmlFor="negotiable" className="text-sm font-bold text-gray-700 cursor-pointer">Lương thỏa thuận</label>
              </div>
            </Form.Item>

            <Form.Item
              name="minSalary"
              label={<span className="font-bold text-gray-700">Min (triệu)</span>}
            >
              <Input type="number" placeholder="15" className="h-10 rounded-lg" disabled={form.getFieldValue('negotiable')} />
            </Form.Item>

            <Form.Item
              name="maxSalary"
              label={<span className="font-bold text-gray-700">Max (triệu)</span>}
            >
              <Input type="number" placeholder="20" className="h-10 rounded-lg" disabled={form.getFieldValue('negotiable')} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="province"
              label={<span className="font-bold text-gray-700">Địa điểm làm việc</span>}
              rules={[{ required: true, message: 'Vui lòng chọn địa điểm' }]}
            >
              <Select placeholder="Chọn tỉnh/thành" showSearch className="h-10">
                {PROVINCES.map(p => <Option key={p} value={p}>{p}</Option>)}
              </Select>
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
