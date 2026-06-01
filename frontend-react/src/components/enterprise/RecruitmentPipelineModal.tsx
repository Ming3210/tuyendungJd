import React, { useState, useEffect } from 'react';
import { Modal, Steps, Button, Form, DatePicker, TimePicker, Input, App, Divider, Tag, Space } from 'antd';
import { 
  FileSearchOutlined, 
  CalendarOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  SendOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { InterviewBooking, updateBooking } from '../../store/slices/interviewBookingSlice';
import { useAppDispatch } from '../../store/hooks';
import dayjs from 'dayjs';
import { viewDocument } from '../../utils/fileUtils';

interface Props {
  open: boolean;
  onCancel: () => void;
  booking: InterviewBooking | null;
  candidateName: string;
  cvUrl?: string;
  jobTitle: string;
}

const RecruitmentPipelineModal: React.FC<Props> = ({ open, onCancel, booking, candidateName, cvUrl, jobTitle }) => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Mapping status to steps
  useEffect(() => {
    if (booking && open) {
      if (booking.status === 'pending') setCurrentStep(0);
      else if (booking.status === 'interviewing') setCurrentStep(1);
      else if (['completed', 'accepted', 'rejected'].includes(booking.status)) setCurrentStep(2);
      
      // Only set values if in the scheduling step to avoid "disconnected form" warning
      if (booking.status === 'interviewing' || currentStep === 1) {
        form.setFieldsValue({
          date: booking.date ? dayjs(booking.date) : null,
          time: booking.time ? dayjs(booking.time, 'HH:mm') : null,
          meetingLink: booking.meetingLink || '',
        });
      }
    }
  }, [booking, open, form, currentStep]);

  if (!booking) return null;

  const handleUpdateStatus = async (newStatus: InterviewBooking['status'], additionalData = {}) => {
    setSubmitting(true);
    try {
      await dispatch(updateBooking({ 
        id: booking.id, 
        status: newStatus,
        updateStatusTime: [...(booking.updateStatusTime || []), new Date().toLocaleString()],
        ...additionalData 
      })).unwrap();
      message.success(`Đã cập nhật trạng thái hồ sơ.`);
      
      // Auto-advance step UI if not closing
      if (newStatus === 'interviewing') setCurrentStep(1);
      else if (newStatus === 'accepted' || newStatus === 'rejected') setCurrentStep(3); // Result phase
      else if (newStatus === 'completed') setCurrentStep(2); // Review interview
      else if (newStatus === 'cancelled') {
        onCancel(); // Close on final steps
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái.');
    } finally {
      setSubmitting(false);
    }
  };

  const onScheduleInterview = async (values: any) => {
    const data = {
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      meetingLink: values.meetingLink,
    };
    handleUpdateStatus('interviewing', data);
  };

  const steps = [
    {
      title: 'Đang duyệt',
      icon: <FileSearchOutlined />,
    },
    {
      title: 'Phỏng vấn',
      icon: <CalendarOutlined />,
    },
    {
      title: 'Đánh giá',
      icon: <ClockCircleOutlined />,
    },
    {
      title: 'Kết quả',
      icon: <CheckCircleOutlined />,
    },
  ];

  const renderCurrentStep = () => {
    // Animation wrapper logic can be added here with CSS
    switch (currentStep) {
      case 0: // Reviewing CV
        return (
          <div className="py-6 animate-slide-in font-sf-pro-display">
            <div className="bg-gray-50 p-6 rounded-2xl mb-6">
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Thông tin ứng viên</h4>
              <div className="flex items-center justify-between">
                <div>
                   <p className="text-xl font-bold text-gray-900 mb-1">{candidateName}</p>
                   <p className="text-gray-500">Ứng tuyển vị trí: <span className="font-semibold text-[#bc2228]">{jobTitle}</span></p>
                </div>
                {cvUrl && (
                  <Button 
                    type="primary" 
                    icon={<EyeOutlined />} 
                    onClick={() => viewDocument(cvUrl)}
                    className="bg-gray-900 border-none rounded-xl"
                  >
                    Xem CV
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
               <p className="text-gray-500 text-center mb-4">Bạn có muốn mời ứng viên này tham gia phỏng vấn không?</p>
               <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<SendOutlined />}
                    className="bg-emerald-600 hover:bg-emerald-700 border-none h-14 rounded-2xl font-bold shadow-lg shadow-emerald-100"
                    onClick={() => handleUpdateStatus('interviewing')}
                    loading={submitting}
                  >
                    Mời phỏng vấn
                  </Button>
                  <Button 
                    danger
                    size="large"
                    icon={<CloseCircleOutlined />}
                    className="h-14 rounded-2xl font-bold border-red-100 hover:bg-red-50"
                    onClick={() => handleUpdateStatus('rejected')}
                    loading={submitting}
                  >
                    Loại hồ sơ
                  </Button>
               </div>
            </div>
          </div>
        );

      case 1: // Scheduling
        return (
          <div className="py-6 animate-slide-in font-sf-pro-display">
             <Form 
              form={form} 
              layout="vertical" 
              onFinish={onScheduleInterview}
              className="space-y-4"
             >
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item 
                    name="date" 
                    label={<span className="font-bold text-gray-700">Ngày phỏng vấn</span>}
                    rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                  >
                    <DatePicker className="w-full h-12 rounded-xl" placeholder="Chọn ngày" />
                  </Form.Item>
                  <Form.Item 
                    name="time" 
                    label={<span className="font-bold text-gray-700">Thời gian</span>}
                    rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
                  >
                    <TimePicker className="w-full h-12 rounded-xl" format="HH:mm" placeholder="Chọn giờ" />
                  </Form.Item>
                </div>

                <Form.Item 
                  name="meetingLink" 
                  label={<span className="font-bold text-gray-700">Link họp / Địa điểm</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập thông tin liên hệ' }]}
                >
                  <Input 
                    prefix={<LinkOutlined className="text-gray-400" />} 
                    className="h-12 rounded-xl" 
                    placeholder="Link Zoom, Google Meet hoặc địa chỉ văn phòng..." 
                  />
                </Form.Item>

                <Divider className="my-8" />

                <div className="flex flex-col gap-3">
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    size="large"
                    icon={<CheckCircleOutlined />}
                    className="bg-[#bc2228] hover:bg-red-700 border-none h-14 rounded-2xl font-bold shadow-lg shadow-red-100"
                    loading={submitting}
                  >
                    Xác nhận & Gửi lịch hẹn
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="h-12 rounded-xl font-bold text-[#bc2228] bg-red-50 border-red-100 hover:bg-[#bc2228] hover:text-white transition-colors"
                      onClick={() => handleUpdateStatus('completed')}
                      loading={submitting}
                    >
                      Hoàn tất phỏng vấn
                    </Button>
                    <Button 
                      danger
                      className="h-12 rounded-xl font-bold border-red-100"
                      onClick={() => handleUpdateStatus('cancelled')}
                      loading={submitting}
                    >
                      Hủy phỏng vấn
                    </Button>
                  </div>
                </div>
             </Form>
          </div>
        );

      case 2: // Reviewing Interview (Completed)
        return (
          <div className="py-6 animate-slide-in font-sf-pro-display text-center">
             <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleOutlined style={{ fontSize: '40px' }} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Đánh giá Phỏng vấn</h3>
             <p className="text-gray-500 mb-10 px-10">Cuộc phỏng vấn đã được hoàn tất. Bạn có muốn chuyển sang bước Đánh giá Kết quả luôn hay không?</p>
             
             <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 border-none h-14 rounded-2xl font-bold shadow-lg shadow-blue-100"
                  onClick={() => setCurrentStep(3)} // Move to results
                >
                  Chuyển sang Kết quả
                </Button>
                <Button 
                  danger
                  size="large"
                  className="h-14 rounded-2xl font-bold border-red-100"
                  onClick={() => handleUpdateStatus('rejected')}
                  loading={submitting}
                >
                  Đánh trượt ứng viên
                </Button>
             </div>
          </div>
        );

      case 3: // Result
        return (
          <div className="py-6 animate-slide-in font-sf-pro-display text-center">
             <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleOutlined style={{ fontSize: '40px' }} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Quyết định tuyển dụng</h3>
             <p className="text-gray-500 mb-10 px-10">Chúc mừng bạn đã hoàn thành quy trình phỏng vấn cho ứng viên <span className="font-bold text-gray-800">{candidateName}</span>. Hãy đưa ra quyết định cuối cùng.</p>
             
             <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-emerald-600 hover:bg-emerald-700 border-none h-14 rounded-2xl font-bold shadow-lg shadow-emerald-100"
                  onClick={() => handleUpdateStatus('accepted')}
                  loading={submitting}
                >
                  Chấp nhận Tuyển dụng
                </Button>
                <Button 
                  danger
                  size="large"
                  className="h-14 rounded-2xl font-bold border-red-100"
                  onClick={() => handleUpdateStatus('rejected')}
                  loading={submitting}
                >
                  Từ chối ứng viên
                </Button>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={680}
      centered
      className="recruitment-pipeline-modal shadow-2xl"
      title={
        <div className="flex items-center gap-3 py-2 border-b border-gray-100">
           <div className="w-10 h-10 bg-red-50 text-[#bc2228] rounded-xl flex items-center justify-center">
              <CalendarOutlined style={{ fontSize: '20px' }} />
           </div>
           <div>
              <div className="text-lg font-extrabold text-gray-900 leading-tight">Xử lý hồ sơ tuyển dụng</div>
              <div className="text-xs text-gray-400 font-medium">Cập nhật trạng thái thời gian thực</div>
           </div>
        </div>
      }
    >
      <div className="py-8 px-2">
        <Steps 
          current={currentStep} 
          items={steps} 
          className="mb-10 px-4"
          size="small"
        />
        
        <div className="mt-4 transition-all duration-300">
          {renderCurrentStep()}
        </div>
      </div>

      <style>{`
        .recruitment-pipeline-modal .ant-modal-content {
          border-radius: 24px;
          padding: 24px !important;
          overflow: hidden;
        }
        .ant-steps-item-title {
          font-weight: 700 !important;
        }
        .animate-slide-in {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </Modal>
  );
};

export default RecruitmentPipelineModal;
