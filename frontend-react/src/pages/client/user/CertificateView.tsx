import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserCertificates, addCertificate, deleteCertificate, type Certificate } from '../../../store/slices/userSlice';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Award,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  message, 
  Popconfirm,
  Tag 
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const CertificateView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { certificates, loading } = useAppSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserCertificates(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const handleAddCertificate = async (values: any) => {
    if (!currentUser) return;
    setSubmitLoading(true);
    try {
      const newCert: Partial<Certificate> = {
        userId: currentUser.id,
        name: values.name,
        organization: values.organization,
        issueDate: values.issueDate.format('DD/MM/YYYY'),
      };
      await dispatch(addCertificate(newCert)).unwrap();
      message.success('Thêm chứng chỉ thành công!');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await dispatch(deleteCertificate(id)).unwrap();
      message.success('Đã xóa chứng chỉ');
    } catch (error) {
      message.error('Xóa thất bại');
    }
  };

  const columns: ColumnsType<Certificate> = [
    {
      title: 'STT',
      key: 'stt',
      render: (_, __, index) => index + 1,
      width: 80,
    },
    {
      title: 'Tên chứng chỉ',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-bold text-gray-800">{text}</span>,
    },
    {
      title: 'Tổ chức cấp',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date) => (
        <Tag icon={<Calendar className="w-3 h-3 inline mr-1" />} color="blue">
          {date}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-3">
          <Button 
            type="text" 
            icon={<Edit className="w-4 h-4" />} 
            className="text-blue-500 hover:text-blue-700"
          />
          <Popconfirm
            title="Xóa chứng chỉ"
            description="Bạn có chắc chắn muốn xóa chứng chỉ này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button 
              type="text" 
              danger 
              icon={<Trash2 className="w-4 h-4" />} 
            />
          </Popconfirm>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Danh sách chứng chỉ</h2>
          <p className="text-gray-500">Hãy xem và cập nhật chứng chỉ của bạn</p>
        </div>
        <Button 
          type="primary" 
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#bc2228] hover:bg-red-700 border-none h-12 px-6 rounded-xl flex items-center gap-2 font-bold"
        >
          Thêm chứng chỉ
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={certificates} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="custom-table"
      />

      <Modal
        title={<span className="text-xl font-bold">Thêm chứng chỉ mới</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCertificate}
          className="mt-6"
        >
          <Form.Item
            label="Tên chứng chỉ"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên chứng chỉ' }]}
          >
            <Input size="large" placeholder="Ví dụ: AWS Certified Solutions Architect" />
          </Form.Item>

          <Form.Item
            label="Tổ chức cấp"
            name="organization"
            rules={[{ required: true, message: 'Vui lòng nhập tên tổ chức' }]}
          >
            <Input size="large" placeholder="Ví dụ: Amazon Web Services" />
          </Form.Item>

          <Form.Item
            label="Ngày cấp"
            name="issueDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
          >
            <DatePicker size="large" className="w-full" format="DD/MM/YYYY" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button size="large" onClick={() => setIsModalOpen(false)} className="px-6">Hủy</Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              loading={submitLoading}
              className="px-10 bg-[#bc2228] hover:bg-red-700 border-none font-bold"
            >
              Lưu chứng chỉ
            </Button>
          </div>
        </Form>
      </Modal>

      <style>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: #fff6f7 !important;
          color: #bc2228 !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
};

export default CertificateView;
