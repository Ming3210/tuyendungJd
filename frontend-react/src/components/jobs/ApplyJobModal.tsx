import React from 'react';
import { Modal, Form, Select, Input, Button, Typography, Space, Tag } from 'antd';
import { FileTextOutlined, SendOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface ApplyJobModalProps {
  open: boolean;
  onCancel: () => void;
  onApply: (values: { cvId: number; message: string }) => void;
  jobTitle: string;
  companyName: string;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ open, onCancel, onApply, jobTitle, companyName }) => {
  const [form] = Form.useForm();
  const { cvs } = useAppSelector((state) => state.user);
  const { currentUser } = useAppSelector((state) => state.auth);

  const userCvs = cvs.filter(cv => String(cv.userId) === String(currentUser?.id));

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onApply(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      className="apply-job-modal"
      title={null}
    >
      <div className="pt-6 pb-2 px-2 font-sf-pro-display">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <SendOutlined className="text-2xl text-[#bc2228]" />
          </div>
          <Title level={3} className="m-0 text-gray-900">Ứng tuyển ngay</Title>
          <Paragraph className="text-gray-500 mt-2">
            Bạn đang ứng tuyển vị trí <Text strong className="text-[#bc2228]">{jobTitle}</Text> tại <Text strong>{companyName}</Text>
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{ 
            cvId: userCvs.find(cv => cv.status === true)?.id || (userCvs.length > 0 ? userCvs[0].id : undefined)
          }}
        >
          <Form.Item
            name="cvId"
            label={<Text strong className="text-gray-700">Chọn CV ứng tuyển <Text type="danger">*</Text></Text>}
            rules={[{ required: true, message: 'Vui lòng chọn CV của bạn!' }]}
          >
            <Select 
              placeholder="Chọn bản CV tốt nhất của bạn"
              size="large"
              className="rounded-xl h-12"
              suffixIcon={<FileTextOutlined className="text-gray-400" />}
            >
              {userCvs.map(cv => (
                <Option key={cv.id} value={cv.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{cv.title || 'CV không tên'}</span>
                    {cv.status && <Tag color="green" className="m-0 rounded-full text-[10px]">Mặc định</Tag>}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="message"
            label={
              <Space>
                <Text strong className="text-gray-700">Lời giới thiệu</Text>
                <Text type="secondary" className="text-xs font-normal">(Không bắt buộc)</Text>
              </Space>
            }
          >
            <TextArea
              rows={4}
              placeholder="Viết một đoạn ngắn giới thiệu bản thân và lý do bạn phù hợp với vị trí này để gây ấn tượng với nhà tuyển dụng..."
              className="rounded-xl border-gray-200"
            />
          </Form.Item>

          <div className="bg-blue-50 p-4 rounded-xl flex gap-3 mb-8">
            <InfoCircleOutlined className="text-blue-500 mt-1" />
            <Text className="text-xs text-blue-700 leading-relaxed">
              Một lời nhắn giới thiệu chuyên nghiệp sẽ tăng 40% cơ hội nhà tuyển dụng mở xem hồ sơ của bạn. Hãy chia sẻ ngắn gọn về kinh nghiệm nổi bật nhất nhé!
            </Text>
          </div>

          <div className="flex gap-4">
            <Button 
              size="large" 
              className="flex-1 h-12 rounded-xl font-bold border-gray-200 text-gray-600"
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button 
              type="primary" 
              size="large" 
              className="flex-1 h-12 rounded-xl font-bold bg-[#bc2228] hover:bg-red-700 border-none shadow-lg shadow-red-100"
              onClick={handleSubmit}
              icon={<SendOutlined />}
            >
              Nộp hồ sơ ngay
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ApplyJobModal;
