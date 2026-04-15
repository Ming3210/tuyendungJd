import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Upload } from 'antd';
import { Building2, Mail, Phone, Globe, UploadCloud, FileText } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createEnterprise } from '../../store/slices/enterpriseSlice';
import { fetchOwnedEnterprises } from '../../store/slices/userSlice';

interface RegisterEnterpriseModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

const RegisterEnterpriseModal: React.FC<RegisterEnterpriseModalProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        ...values,
        userId: currentUser?.id,
        status: 'pending', // Default status for new registrations
        avatar: '', // Initial empty avatar, can be updated later
      };

      await dispatch(createEnterprise(payload)).unwrap();
      message.success('Đăng ký doanh nghiệp thành công! Vui lòng chờ quản trị viên phê duyệt.');
      form.resetFields();
      if (onSuccess) onSuccess();
      // Refresh the owned enterprises list
      if (currentUser?.id) {
        dispatch(fetchOwnedEnterprises(currentUser.id));
      }
      onCancel();
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('Có lỗi xảy ra khi đăng ký doanh nghiệp. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-red-50 rounded-lg">
            <Building2 className="w-5 h-5 text-[#bc2228]" />
          </div>
          <span className="text-xl font-bold font-sf-pro-display">Đăng ký doanh nghiệp mới</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Gửi yêu cầu đăng ký"
      cancelText="Hủy"
      width={700}
      centered
      className="font-sf-pro-display"
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-6"
        initialValues={{
          companySize: '10-50 nhân viên',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item
            name="title"
            label={<span className="font-bold text-gray-700">Tên doanh nghiệp</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên doanh nghiệp' }]}
          >
            <Input prefix={<Building2 className="w-4 h-4 text-gray-400 mr-2" />} placeholder="Ví dụ: Công ty TNHH MTV" className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="font-bold text-gray-700">Email doanh nghiệp</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input prefix={<Mail className="w-4 h-4 text-gray-400 mr-2" />} placeholder="email@company.com" className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={<span className="font-bold text-gray-700">Số điện thoại liên hệ</span>}
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input prefix={<Phone className="w-4 h-4 text-gray-400 mr-2" />} placeholder="0123 456 789" className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item
            name="industry"
            label={<span className="font-bold text-gray-700">Lĩnh vực hoạt động</span>}
            rules={[{ required: true, message: 'Vui lòng nhập lĩnh vực' }]}
          >
            <Input placeholder="Ví dụ: Công nghệ phần mềm, Bán lẻ..." className="h-10 rounded-lg" />
          </Form.Item>

          <Form.Item
            name="companySize"
            label={<span className="font-bold text-gray-700">Quy mô nhân sự</span>}
            rules={[{ required: true, message: 'Vui lòng chọn quy mô' }]}
          >
            <Select className="h-10 rounded-lg">
              <Select.Option value="1-10 nhân viên">1-10 nhân viên</Select.Option>
              <Select.Option value="10-50 nhân viên">10-50 nhân viên</Select.Option>
              <Select.Option value="50-200 nhân viên">50-200 nhân viên</Select.Option>
              <Select.Option value="200-500 nhân viên">200-500 nhân viên</Select.Option>
              <Select.Option value="500-1000 nhân viên">500-1000 nhân viên</Select.Option>
              <Select.Option value="1000+ nhân viên">Trên 1000 nhân viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="websiteUrl"
            label={<span className="font-bold text-gray-700">Website (nếu có)</span>}
          >
            <Input prefix={<Globe className="w-4 h-4 text-gray-400 mr-2" />} placeholder="https://company.com" className="h-10 rounded-lg" />
          </Form.Item>
        </div>

        <Form.Item
            name="businessLicense"
            label={<span className="font-bold text-gray-700">Mã số thuế / Giấy phép kinh doanh</span>}
            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
          >
            <Input prefix={<FileText className="w-4 h-4 text-gray-400 mr-2" />} placeholder="Mã số doanh nghiệp" className="h-10 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="introduction"
          label={<span className="font-bold text-gray-700">Giới thiệu ngắn gọn về công ty</span>}
          rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}
        >
          <Input.TextArea 
            placeholder="Hãy viết vài câu giới thiệu về tầm nhìn, sứ mệnh hoặc môi trường làm việc của công ty bạn..." 
            rows={4} 
            className="rounded-lg" 
          />
        </Form.Item>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
          <div className="p-1">
            <UploadCloud className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-blue-700 m-0">
            <strong>Ghi chú:</strong> Sau khi gửi yêu cầu, Ban quản trị sẽ kiểm tra và phê duyệt thông tin doanh nghiệp trong vòng 24h làm việc. 
            Bạn có thể cập nhật logo và ảnh bìa sau khi doanh nghiệp được tạo.
          </p>
        </div>
      </Form>
    </Modal>
  );
};

export default RegisterEnterpriseModal;
