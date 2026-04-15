import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Button, Popconfirm, message, Divider, Space, Modal, Form, Select, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  fetchCertificateTypes, 
  addCertificateType, 
  updateCertificateType, 
  deleteCertificateType,
  CertificateType 
} from '../../store/slices/certificateTypeSlice';
import { useSearchParams } from 'react-router-dom';

const AdminCertificates: React.FC = () => {
  const dispatch = useAppDispatch();
  const { certificateTypes, loading, totalCertificateTypes, currentPage, limit } = useAppSelector((state) => state.certificateType);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateType | null>(null);
  const [form] = Form.useForm();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('limit') || '7', 10);

  useEffect(() => {
    dispatch(fetchCertificateTypes({ page, limit: pageSize }));
  }, [dispatch, page, pageSize]);

  const filteredData = useMemo(() => {
    if (!searchInput) return certificateTypes;
    return certificateTypes.filter((item) =>
      item.type.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [certificateTypes, searchInput]);

  const showModal = (record?: CertificateType) => {
    if (record) {
      setEditingCert(record);
      form.setFieldsValue({
        type: record.type,
        value: record.value,
      });
    } else {
      setEditingCert(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleHandleCancel = () => {
    setIsModalOpen(false);
    setEditingCert(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    try {
      if (editingCert) {
        await dispatch(updateCertificateType({ 
          id: editingCert.id, 
          data: { ...values, status: editingCert.status ?? true } 
        })).unwrap();
        message.success('Cập nhật chứng chỉ thành công');
      } else {
        await dispatch(addCertificateType({ 
          ...values, 
          status: true,
          code: values.type.substring(0, 3).toUpperCase()
        })).unwrap();
        message.success('Thêm chứng chỉ mới thành công');
      }
      handleHandleCancel();
    } catch (error) {
      message.error('Thực hiện thất bại, vui lòng thử lại');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteCertificateType(id)).unwrap();
      message.success('Đã xóa chứng chỉ');
    } catch (error) {
      message.error('Xóa chứng chỉ thất bại');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: '8%',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên chứng chỉ',
      dataIndex: 'type',
      key: 'type',
      width: '25%',
      sorter: (a: CertificateType, b: CertificateType) => a.type.localeCompare(b.type),
      render: (text: string) => <span className="font-bold text-[#bc2228]">{text}</span>
    },
    {
      title: 'Các cấp độ / Giá trị',
      dataIndex: 'value',
      key: 'value',
      width: '40%',
      render: (values: string[]) => (
        <div className="flex flex-wrap gap-1">
          {values?.map((val, idx) => (
            <Tag key={idx} color="blue" className="rounded-md">{val}</Tag>
          ))}
          {(!values || values.length === 0) && <span className="text-gray-400 italic text-xs">Chưa có cấp độ</span>}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: CertificateType) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined className="text-blue-600" />} 
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa chứng chỉ này?"
            description="Tất cả cấp độ thuộc chứng chỉ này sẽ bị xóa."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 font-sf-pro-display">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-extrabold m-0 text-gray-800">Quản lý Chứng chỉ</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="bg-[#bc2228] hover:bg-red-700 border-none h-10 px-6 rounded-lg font-bold"
          onClick={() => showModal()}
        >
          Thêm chứng chỉ
        </Button>
      </div>

      <Divider className="my-1 bg-[#bc2228] h-[2px] opacity-80" />

      <div className="mb-4 w-full md:w-1/3">
        <Input.Search
          placeholder="Tìm tên chứng chỉ (VD: TOEIC, JLPT...)"
          onChange={(e) => setSearchInput(e.target.value)}
          enterButton
          size="large"
          className="shadow-sm"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: totalCertificateTypes,
          showSizeChanger: true,
          onChange: (newPage, newPageSize) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', newPage.toString());
            params.set('limit', newPageSize.toString());
            setSearchParams(params);
          }
        }}
        className="w-full bg-white rounded-xl shadow-sm overflow-hidden"
      />

      <Modal
        title={
          <div className="text-xl font-bold border-b pb-3 mb-4">
            {editingCert ? 'Cập nhật chứng chỉ' : 'Thêm chứng chỉ mới'}
          </div>
        }
        open={isModalOpen}
        onCancel={handleHandleCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ value: [] }}
        >
          <Form.Item
            name="type"
            label={<span className="font-bold">Tên chứng chỉ</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên chứng chỉ!' }]}
          >
            <Input placeholder="Ví dụ: TOEIC, IELTS, N1, MOS..." size="large" />
          </Form.Item>

          <Form.Item
            name="value"
            label={
              <div className="flex flex-col">
                <span className="font-bold">Các cấp độ / Giá trị</span>
                <span className="text-xs text-gray-400 font-normal italic">Nhấn Enter sau mỗi giá trị để thêm</span>
              </div>
            }
            rules={[{ required: true, message: 'Vui lòng thêm ít nhất một cấp độ!' }]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Nhập giá trị (VD: 500, 600, N2...)"
              size="large"
              tokenSeparators={[',']}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 pt-6 border-t mt-8">
            <Button size="large" onClick={handleHandleCancel} className="px-8 rounded-lg">
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              className="bg-[#bc2228] hover:bg-red-700 border-none px-10 rounded-lg font-bold"
            >
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCertificates;
