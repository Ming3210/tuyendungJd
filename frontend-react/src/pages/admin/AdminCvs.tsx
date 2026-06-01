import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Tag, Button, Popconfirm, message, Divider, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCvs, updateCvStatus, deleteCv, CV } from '../../store/slices/userSlice';
import { getAllUsers } from '../../store/slices/authSlice';
import { viewDocument } from '../../utils/fileUtils';
import { useSearchParams } from 'react-router-dom';

const AdminCvs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cvs, loading: cvsLoading, totalCvs, cvCurrentPage, cvLimit } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('limit') || '8', 10);

  useEffect(() => {
    dispatch(fetchAllCvs({ page, limit: pageSize }));
    dispatch(getAllUsers({}));
  }, [dispatch, page, pageSize]);

  const mergedCvs = useMemo(() => {
    return cvs.map(cv => {
      const owner = users.find(u => String(u.id) === String(cv.userId));
      return {
        ...cv,
        userName: owner ? owner.userName : `User #${cv.userId}`
      };
    });
  }, [cvs, users]);

  const filteredCvs = useMemo(() => {
    if (!searchInput) return mergedCvs;
    
    return mergedCvs.filter((item) => 
      item.userName?.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [mergedCvs, searchInput]);

  const handleActivate = (record: any) => {
    dispatch(updateCvStatus({ id: record.id, status: true }));
    message.success('Cập nhật trạng thái (ACTIVATE) thành công!');
  };

  const handleDeactivate = (record: any) => {
    dispatch(updateCvStatus({ id: record.id, status: false }));
    message.success('Cập nhật trạng thái (DEACTIVATE) thành công!');
  };

  const handleDelete = (cvId: string | number) => {
    dispatch(deleteCv(cvId));
    message.success('Đã xóa CV thành công');
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Chủ CV',
      dataIndex: 'userName',
      key: 'userName',
      width: '20%',
      sorter: (a: any, b: any) => a.userName?.localeCompare(b.userName),
      render: (text: string) => <span className="font-semibold">{text}</span>
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      key: 'language',
      width: '15%',
    },
    {
      title: 'URL PDF',
      dataIndex: 'pdfDataUrl',
      key: 'pdfDataUrl',
      width: '15%',
      render: (url: string) => url ? (
        <a 
          className="text-blue-500 hover:text-blue-700 underline cursor-pointer" 
          onClick={(e) => {
            e.preventDefault();
            viewDocument(url);
          }}
        >
          Xem CV
        </a>
      ) : '---',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      width: '15%',
      filters: [
        { text: 'ACTIVE', value: true },
        { text: 'INACTIVE', value: false },
      ],
      onFilter: (value: any, record: CV) => record.status === value,
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'} className="rounded-full px-3 m-0 border-none">
          {status ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center' as const,
      width: '25%',
      render: (_: any, record: any) => (
        <Space size="middle" className="flex justify-center">
          {!record.status ? (
            <Button type="primary" size="small" className="bg-green-600 hover:bg-green-500 border-none" onClick={() => handleActivate(record)}>
              ACTIVATE
            </Button>
          ) : (
             <Button type="primary" danger size="small" onClick={() => handleDeactivate(record)}>
              DEACTIVATE
            </Button>
          )}
          
          <Popconfirm
            title="Xóa CV này?"
            description="Bạn có chắc chắn muốn xóa CV này?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" danger size="small" className="bg-red-700 hover:bg-red-600 border-none">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 font-sf-pro-display">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-0 text-gray-800">Quản lý CV người dùng</h1>
      </div>

      <Divider className="my-2 bg-red-600 h-[2px]" />

      <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
        <Input.Search
          placeholder="Tìm kiếm theo tên người dùng..."
          onChange={(e) => setSearchInput(e.target.value)}
          enterButton
          size="large"
          className="shadow-sm"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredCvs}
        rowKey="id"
        loading={cvsLoading}
        pagination={{
          current: cvCurrentPage,
          pageSize: cvLimit,
          total: totalCvs,
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
    </div>
  );
};

export default AdminCvs;
