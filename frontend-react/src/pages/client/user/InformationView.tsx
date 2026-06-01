import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateProfile } from '../../../store/slices/authSlice';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Row,
  Col,
  DatePicker
} from 'antd';
import { UploadOutlined, UserOutlined as UserIcon } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const InformationView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(currentUser?.avatar);

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        ...currentUser,
        birthdate: currentUser.birthdate ? dayjs(currentUser.birthdate) : null,
      });
      setAvatarUrl(currentUser.avatar);
    }
  }, [currentUser, form]);

  const onFinish = async (values: any) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const updatedUser = {
        ...currentUser,
        ...values,
        birthdate: values.birthdate ? values.birthdate.format('YYYY-MM-DD') : null,
        avatar: avatarUrl,
      };

      // Since it's a demo, we update local state. In a real app, this would be an API call.
      // We already have a mock updateProfile in authSlice
      await dispatch(updateProfile(updatedUser)).unwrap();
      message.success('Cập nhật thông tin thành công!');
    } catch (error) {
      message.error('Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      // Simulate upload
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
      message.success('Tải ảnh lên thành công!');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 m-0 leading-tight">Cập nhật thông tin cá nhân</h2>
        <p className="text-gray-500 mt-1 text-sm">Quản lý thông tin hồ sơ để đảm bảo tài khoản</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="text-4xl text-gray-300" />
            )}
          </div>
          <Upload
            name="avatar"
            showUploadList={false}
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"), 1000)}
            onChange={handleAvatarChange}
          >
            <Button icon={<UploadOutlined />}>Thay đổi ảnh</Button>
          </Upload>
        </div>

        {/* Info Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="flex-grow"
          requiredMark={false}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input size="large" placeholder="Nguyễn Văn A" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="userName"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
              >
                <Input size="large" placeholder="username" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="birthdate">
                <DatePicker size="large" className="w-full" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input size="large" placeholder="0123 456 789" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính" name="gender">
                <Select size="large" placeholder="Chọn giới tính">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {currentUser?.role === 'candidate' && (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Vị trí / Kỹ năng" name="position">
                    <Input size="large" placeholder="Ví dụ: Java Developer" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số năm kinh nghiệm" name="yearsOfExperience">
                    <Input size="large" type="number" placeholder="Số năm" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Cấp bậc" name="level">
                    <Select size="large" placeholder="Chọn cấp bậc">
                      <Option value="fresher">Fresher</Option>
                      <Option value="mid-level">Mid-level</Option>
                      <Option value="senior">Senior</Option>
                      <Option value="lead">Lead</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="px-10 h-12 bg-[#bc2228] hover:bg-red-700 border-none"
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InformationView;
