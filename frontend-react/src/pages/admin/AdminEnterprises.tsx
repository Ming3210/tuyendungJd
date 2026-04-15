import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Tag, Dropdown, MenuProps, Modal, Button, App, Divider } from 'antd';
import { DownOutlined, GlobalOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, ExportOutlined, BankOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllEnterprises, updateEnterpriseStatus, Enterprise } from '../../store/slices/enterpriseSlice';

const AdminEnterprises: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const { enterprises, loading, totalEnterprises, currentPage, limit } = useAppSelector((state) => state.enterprise);
  const { users } = useAppSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Enterprise | null>(null);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('limit') || '8', 10);

  useEffect(() => {
    dispatch(fetchAllEnterprises({ page, limit: pageSize }));
  }, [dispatch, page, pageSize]);

  const filteredEnterprises = useMemo(() => {
    if (!searchInput) return enterprises;
    return enterprises.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [enterprises, searchInput]);

  const handleUpdateStatus = async (enterprise: Enterprise, newStatus: string) => {
    try {
      await dispatch(updateEnterpriseStatus({ id: enterprise.id, status: newStatus as any })).unwrap();
      message.success(`Trạng thái của "${enterprise.title}" đã được cập nhật thành: ${newStatus}`);
    } catch {
      message.error('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
    }
  };

  const showModal = (record: Enterprise) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const getOwnerName = (enterpriseEmail: string) => {
    const user = users?.find(u => u.email === enterpriseEmail);
    return user ? user.userName : 'Vô danh';
  };

  const columns = [
    {
      title: 'Tên doanh nghiệp',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
      render: (text: string, record: Enterprise) => (
        <div className="flex items-center gap-3">
          <img src={record.avatar || 'https://via.placeholder.com/40'} alt="avatar" className="w-10 h-10 rounded-md object-cover border border-gray-100" />
          <a className="font-semibold text-gray-800">{text}</a>
        </div>
      ),
    },
    {
      title: 'Quy mô',
      dataIndex: 'companySize',
      key: 'companySize',
      width: '12%',
      render: (text: string) => text || '---',
    },
    {
      title: 'Ngành nghề',
      dataIndex: 'industry',
      key: 'industry',
      render: (text: string) => text || '---',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '15%',
      filters: [
        { text: 'Đã xác minh', value: 'verified' },
        { text: 'Đang chờ', value: 'pending' },
        { text: 'Đã chặn', value: 'blocked' },
      ],
      onFilter: (value: any, record: Enterprise) => record.status === value,
      render: (status: string, record: Enterprise) => {
        let color = 'default';
        if (status === 'verified') color = 'green';
        if (status === 'pending') color = 'orange';
        if (status === 'blocked' || status === 'rejected') color = 'red';

        const menuItems: MenuProps['items'] = [
          { key: 'verified', label: 'Đã xác minh', onClick: () => handleUpdateStatus(record, 'verified') },
          { key: 'blocked', label: 'Đã chặn', onClick: () => handleUpdateStatus(record, 'blocked') },
        ];

        return (
          <div className="flex items-center gap-2">
            <Tag color={color} className="m-0 border-none capitalize px-2">{status || 'pending'}</Tag>
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
              <a onClick={(e) => e.preventDefault()} className="text-gray-500 hover:text-gray-800">
                <DownOutlined className="text-[10px]" />
              </a>
            </Dropdown>
          </div>
        );
      }
    },
    {
      title: 'Chủ sở hữu',
      key: 'owner',
      render: (record: Enterprise) => getOwnerName(record.email),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone', // mapped from vue phoneNumber
      key: 'phone',
      render: (text: string) => text || '---',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Enterprise) => (
        <Button type="primary" size="small" onClick={() => showModal(record)} className="bg-red-600 hover:bg-red-700 border-none">
          Xem
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 font-sf-pro-display">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-0 text-gray-800">Quản lý Doanh nghiệp</h1>
      </div>

      <Divider className="my-2 bg-red-600 h-[2px]" />

      <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
        <Input.Search
          placeholder="Tìm kiếm doanh nghiệp theo tên..."
          onChange={(e) => setSearchInput(e.target.value)}
          enterButton
          size="large"
          className="shadow-sm"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredEnterprises}
        rowKey="id"
        loading={loading}
        pagination={{ 
          current: currentPage,
          pageSize: limit,
          total: totalEnterprises,
          showSizeChanger: true,
          onChange: (newPage, newPageSize) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', newPage.toString());
            params.set('limit', newPageSize.toString());
            setSearchParams(params);
          }
        }}
        className="w-full bg-white rounded-lg shadow-sm font-sf-pro-display"
      />

      <Modal
        title={<span className="text-xl font-bold text-gray-800">Thông tin doanh nghiệp</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>Đóng</Button>
        ]}
        width={800}
        centered
      >
        {selectedRecord && (
          <div className="font-sf-pro-display mt-6">
            <div className="flex gap-6 items-start">
              <img
                className="object-cover w-32 h-32 rounded-xl shadow-md border border-gray-100"
                src={selectedRecord.avatar || 'https://via.placeholder.com/128'}
                alt="Avatar Doanh nghiệp"
              />
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-900 m-0">{selectedRecord.title}</p>
                <p className="text-gray-500 text-lg flex items-center gap-2 mt-2">
                  <BankOutlined /> {selectedRecord.industry || 'Chưa cập nhật ngành nghề'}
                </p>
                <p className="text-gray-500 mt-1">Mã số thuế: {selectedRecord.businessLicense || '---'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-10">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Liên kết & Mạng xã hội</h3>

              {selectedRecord.website && (
                <div className="border border-gray-200 p-4 rounded-xl bg-[#F9FAFB] hover:border-gray-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                        <GlobalOutlined className="text-2xl text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 m-0 leading-tight">Website</h4>
                        <a href={selectedRecord.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedRecord.website}
                        </a>
                      </div>
                    </div>
                    <a href={selectedRecord.website} target="_blank" rel="noopener noreferrer">
                      <ExportOutlined className="text-gray-400 hover:text-gray-700 text-lg" />
                    </a>
                  </div>
                </div>
              )}

              {selectedRecord.linkedinUrl && (
                <div className="border border-gray-200 p-4 rounded-xl bg-[#F9FAFB] hover:border-gray-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                        <LinkedinOutlined className="text-2xl text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 m-0 leading-tight">LinkedIn</h4>
                        <a href={selectedRecord.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedRecord.linkedinUrl}
                        </a>
                      </div>
                    </div>
                    <a href={selectedRecord.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <ExportOutlined className="text-gray-400 hover:text-gray-700 text-lg" />
                    </a>
                  </div>
                </div>
              )}

              {selectedRecord.facebookUrl && (
                <div className="border border-gray-200 p-4 rounded-xl bg-[#F9FAFB] hover:border-gray-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                        <FacebookOutlined className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 m-0 leading-tight">Facebook</h4>
                        <a href={selectedRecord.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedRecord.facebookUrl}
                        </a>
                      </div>
                    </div>
                    <a href={selectedRecord.facebookUrl} target="_blank" rel="noopener noreferrer">
                      <ExportOutlined className="text-gray-400 hover:text-gray-700 text-lg" />
                    </a>
                  </div>
                </div>
              )}

              {!selectedRecord.website && !selectedRecord.linkedinUrl && !selectedRecord.facebookUrl && (
                <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">Doanh nghiệp chưa liên kết mạng xã hội nào.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminEnterprises;
