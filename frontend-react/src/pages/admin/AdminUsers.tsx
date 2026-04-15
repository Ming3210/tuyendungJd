import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Tag, Dropdown, MenuProps, Modal, message, Space } from 'antd';
import { SearchOutlined, FilterOutlined, DownOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllUsers, setUserLock, setUserRole } from '../../store/slices/authSlice';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const AdminUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, loading, totalUsers, currentPage, limit } = useAppSelector((state) => state.auth);

  const initialQ = searchParams.get('q') || '';
  const initialRole = searchParams.get('role') || 'all';

  const [searchInput, setSearchInput] = useState(initialQ);

  useEffect(() => {
    const page = parseInt(searchParams.get('_page') || '1', 10);
    const limitParam = parseInt(searchParams.get('_limit') || String(limit), 10);
    const q = searchParams.get('q') || '';
    const role = searchParams.get('role');
    const roleFilter = (role === 'all' || !role) ? '' : role;

    dispatch(getAllUsers({ page, limit: limitParam, q, role: roleFilter }));
  }, [dispatch, searchParams, limit]);

  const handlePageChange = (page: number, pageSize: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('_page', page.toString());
    newParams.set('_limit', pageSize.toString());
    setSearchParams(newParams);
  };

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', value);
    newParams.set('_page', '1');
    setSearchParams(newParams);
  };

  const handleRoleFilter = (role: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('role', role);
    newParams.set('_page', '1');
    setSearchParams(newParams);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    dispatch(setUserRole({ userId, role: newRole }));
    message.success('Chuyển đổi vai trò thành công');
  };

  const handleLockToggle = (user: any) => {
    const isLocking = !user.lock;
    const actionText = isLocking ? 'khóa' : 'mở khóa';

    Modal.confirm({
      title: `Bạn có chắc chắn muốn ${actionText} người dùng này?`,
      okText: isLocking ? 'Khóa' : 'Mở khóa',
      okType: isLocking ? 'danger' : 'primary',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(setUserLock({ userId: user.id, lock: isLocking }));
        message.success(`Đã ${actionText} tài khoản.`);
      }
    });
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => (currentPage - 1) * limit + index + 1,
      width: 60,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      sorter: (a: any, b: any) => (a.userName || '').localeCompare(b.userName || ''),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: any) => {
        // Here we simulate active checking logic
        const isActive = !record.lock;
        return (
          <Tag color={isActive ? 'success' : 'error'} className="font-medium px-3 py-1 rounded-full">
            {isActive ? 'Hoạt động' : 'Đã khóa'}
          </Tag>
        );
      }
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (record: any) => {
        if (record.role === 'admin') {
          return <Tag color="gold" className="font-medium px-3 py-1 rounded-md border-2 border-yellow-200">ADMIN</Tag>;
        }

        const items: MenuProps['items'] = [
          { key: 'candidate', label: 'Candidate', disabled: record.role === 'candidate' },
          { key: 'enterprise', label: 'Enterprise', disabled: record.role === 'enterprise' },
        ];

        return (
          <Dropdown menu={{ items, onClick: ({ key }) => handleRoleChange(record.id, key) }} trigger={['click']}>
            <div className="flex items-center justify-between px-3 py-1 border-2 border-gray-200 rounded-md cursor-pointer hover:border-gray-400 w-[110px] bg-white">
              <span className="capitalize">{record.role || 'candidate'}</span>
              <DownOutlined className="text-xs text-gray-400" />
            </div>
          </Dropdown>
        );
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => message.info('Chi tiết tính năng đang phát triển')}>Xem</a>
          {record.role !== 'admin' && (
            <a 
              className={record.lock ? 'text-blue-500' : 'text-red-500'} 
              onClick={() => handleLockToggle(record)}
            >
              {record.lock ? 'Mở khóa' : 'Khóa'}
            </a>
          )}
        </Space>
      ),
    },
  ];

  const filterItems: MenuProps['items'] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'candidate', label: 'Candidate' },
    { key: 'enterprise', label: 'Enterprise' },
    { key: 'admin', label: 'Admin' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-0 font-sf-pro-display text-gray-800">Quản lý người dùng</h1>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <Dropdown 
            menu={{ 
              items: filterItems, 
              onClick: ({ key }) => handleRoleFilter(key) 
            }}
          >
            <Button icon={<FilterOutlined />} className="flex items-center">
              Lọc theo Vai trò: <span className="font-semibold capitalize ml-1">{searchParams.get('role') || 'Tất cả'}</span>
            </Button>
          </Dropdown>
        </div>

        <Input.Search
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Tìm kiếm theo tên hoặc email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
          className="w-[350px] shadow-sm rounded-md"
          allowClear
          enterButton
        />
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ 
          current: currentPage, 
          pageSize: limit, 
          total: totalUsers,
          onChange: handlePageChange,
          showSizeChanger: true 
        }}
        className="border border-gray-100 rounded-lg overflow-hidden shadow-sm font-sf-pro-display"
        rowClassName="hover:bg-gray-50 transition-colors"
      />
    </div>
  );
};

export default AdminUsers;
