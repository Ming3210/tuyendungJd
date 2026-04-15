import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Tag, Button, Popconfirm, message, Divider, Space, Modal, Form, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, GlobalOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCvLanguages, addCvLanguage, updateCvLanguage, deleteCvLanguage, CvLanguage } from '../../store/slices/cvLanguageSlice';
import { useSearchParams } from 'react-router-dom';

const AdminLanguages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { languages, loading, totalLanguages, currentPage, limit } = useAppSelector((state) => state.cvLanguages);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLang, setEditingLang] = useState<CvLanguage | null>(null);
  const [form] = Form.useForm();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('limit') || '8', 10);

  useEffect(() => {
    dispatch(fetchCvLanguages({ page, limit: pageSize }));
  }, [dispatch, page, pageSize]);

  const filteredData = useMemo(() => {
    if (!searchInput) return languages;
    return languages.filter((item) =>
      item.language.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.code.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [languages, searchInput]);

  const showModal = (record?: CvLanguage) => {
    if (record) {
      setEditingLang(record);
      form.setFieldsValue(record);
    } else {
      setEditingLang(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingLang(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    try {
      if (editingLang) {
        await dispatch(updateCvLanguage({ id: editingLang.id, data: values })).unwrap();
        message.success('Cập nhật ngôn ngữ thành công');
      } else {
        await dispatch(addCvLanguage({ ...values, status: true })).unwrap();
        message.success('Thêm ngôn ngữ mới thành công');
      }
      handleCancel();
    } catch (error) {
      message.error('Thực hiện thất bại, vui lòng thử lại');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteCvLanguage(id)).unwrap();
      message.success('Đã xóa ngôn ngữ');
    } catch (error) {
      message.error('Xóa ngôn ngữ thất bại');
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
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      key: 'language',
      width: '30%',
      sorter: (a: CvLanguage, b: CvLanguage) => a.language.localeCompare(b.language),
      render: (text: string) => (
        <Space>
          <GlobalOutlined className="text-[#bc2228]" />
          <span className="font-bold text-gray-800">{text}</span>
        </Space>
      )
    },
    {
      title: 'Mã định danh',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      render: (code: string) => <Tag color="orange" className="font-mono px-3">{code.toUpperCase()}</Tag>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      width: '15%',
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'} className="rounded-full px-4 m-0 border-none font-bold">
          {status ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: CvLanguage) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined className="text-blue-600" />} 
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa ngôn ngữ này?"
            description="Lưu ý: Hành động này có thể ảnh hưởng đến các CV đang sử dụng ngôn ngữ này."
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
        <h1 className="text-2xl font-extrabold m-0 text-gray-800">Quản lý Ngôn ngữ CV</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="bg-[#bc2228] hover:bg-red-700 border-none h-10 px-6 rounded-lg font-bold"
          onClick={() => showModal()}
        >
          Thêm ngôn ngữ
        </Button>
      </div>

      <Divider className="my-1 bg-[#bc2228] h-[2px] opacity-80" />

      <div className="mb-4 w-full md:w-1/3">
        <Input.Search
          placeholder="Tìm tên ngôn ngữ hoặc mã..."
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
          total: totalLanguages,
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
            {editingLang ? 'Chỉnh sửa ngôn ngữ' : 'Thêm ngôn ngữ mới'}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: true }}
        >
          <Form.Item
            name="language"
            label={<span className="font-bold">Tên ngôn ngữ</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên ngôn ngữ!' }]}
          >
            <Input placeholder="Ví dụ: Tiếng Việt, English, Japanese..." size="large" />
          </Form.Item>

          <Form.Item
            name="code"
            label={<span className="font-bold">Mã (Code)</span>}
            rules={[{ required: true, message: 'Vui lòng nhập mã ngôn ngữ!' }]}
          >
            <Input placeholder="Ví dụ: vn, en, jp..." size="large" />
          </Form.Item>

          <Form.Item
            name="status"
            label={<span className="font-bold">Trạng thái</span>}
          >
            <Select size="large">
              <Select.Option value={true}>ACTIVE</Select.Option>
              <Select.Option value={false}>INACTIVE</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-3 pt-6 border-t mt-8">
            <Button size="large" onClick={handleCancel} className="px-8 rounded-lg">
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

export default AdminLanguages;
