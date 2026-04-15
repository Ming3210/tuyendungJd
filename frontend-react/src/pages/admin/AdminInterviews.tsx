import React, { useEffect, useState, useMemo } from 'react';
import { Table, Tag, Button, Input, Select, App, Divider, Avatar } from 'antd';
import { SearchOutlined, UserOutlined, BankOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useSearchParams } from 'react-router-dom';
import { fetchAllBookings, updateBooking, InterviewBooking } from '../../store/slices/interviewBookingSlice';
import { fetchAllJobs } from '../../store/slices/jobSlice';
import { fetchAllCandidates } from '../../store/slices/candidateSlice';
import { fetchAllEnterprises } from '../../store/slices/enterpriseSlice';
import dayjs from 'dayjs';

const { Option } = Select;

const AdminInterviews: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const { bookings, loading, totalBookings, currentPage, limit } = useAppSelector((state) => state.interviewBooking);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { candidates } = useAppSelector((state) => state.candidate);
  const { enterprises } = useAppSelector((state) => state.enterprise);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('limit') || '10', 10);

  useEffect(() => {
    dispatch(fetchAllBookings({ page, limit: pageSize }));
    dispatch(fetchAllJobs());
    dispatch(fetchAllCandidates());
    dispatch(fetchAllEnterprises({ page: 1, limit: 1000 }));
  }, [dispatch, page, pageSize]);

  const getJobTitle = (jobId: number | string) => {
    return jobs.find(j => String(j.id) === String(jobId))?.title || 'Công việc đã xóa';
  };

  const getEnterpriseName = (entId: number | string) => {
    return enterprises.find(e => String(e.id) === String(entId))?.title || 'Doanh nghiệp ẩn';
  };

  const getCandidateInfo = (userId: number | string) => {
    return candidates.find(c => String(c.id) === String(userId));
  };

  const handleUpdateStatus = async (id: string | number, status: string) => {
    try {
      await dispatch(updateBooking({ id, status: status as any })).unwrap();
      message.success('Cập nhật trạng thái thành công');
    } catch {
      message.error('Cập nhật trạng thái thất bại');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'interviewing': return 'processing';
      case 'completed': return 'blue';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  const filteredData = useMemo(() => {
    return bookings.filter(b => {
      const candidate = getCandidateInfo(b.userId);
      const jobTitle = getJobTitle(b.jobId);
      const matchesSearch = 
        jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        (candidate?.fullName || '').toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchText, statusFilter, jobs, candidates]);

  const columns = [
    {
      title: 'Ứng viên',
      key: 'candidate',
      render: (_: any, record: InterviewBooking) => {
        const candidate = getCandidateInfo(record.userId);
        return (
          <div className="flex items-center gap-3">
            <Avatar src={candidate?.avatar} icon={<UserOutlined />} />
            <div>
              <div className="font-bold text-gray-900">{candidate?.fullName || 'Ẩn danh'}</div>
              <div className="text-xs text-gray-500">ID: {record.userId}</div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Thông tin tuyển dụng',
      key: 'job',
      render: (_: any, record: InterviewBooking) => (
        <div>
          <div className="font-semibold text-gray-900">{getJobTitle(record.jobId)}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <BankOutlined className="text-[10px]" /> {getEnterpriseName(record.enterpriseId)}
          </div>
        </div>
      )
    },
    {
      title: 'Ngày ứng tuyển',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
      sorter: (a: any, b: any) => dayjs(a.createAt).unix() - dayjs(b.createAt).unix(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="capitalize px-3 rounded-full border-none font-medium">
          {status}
        </Tag>
      )
    },
    {
      title: 'Thao tác Admin',
      key: 'actions',
      render: (_: any, record: InterviewBooking) => (
        <div className="flex gap-2">
          {record.status === 'pending' && (
            <>
              <Button 
                type="text" 
                icon={<CheckCircleOutlined className="text-green-500" />} 
                onClick={() => handleUpdateStatus(record.id, 'accepted')}
                className="hover:bg-green-50"
              />
              <Button 
                type="text" 
                icon={<CloseCircleOutlined className="text-red-500" />} 
                onClick={() => handleUpdateStatus(record.id, 'rejected')}
                className="hover:bg-red-50"
              />
            </>
          )}
          <Select 
            size="small" 
            defaultValue={record.status} 
            onChange={(val) => handleUpdateStatus(record.id, val)}
            className="w-32"
          >
            <Option value="pending">Chờ xử lý</Option>
            <Option value="accepted">Chấp nhận</Option>
            <Option value="interviewing">Phỏng vấn</Option>
            <Option value="completed">Hoàn thành</Option>
            <Option value="rejected">Từ chối</Option>
            <Option value="cancelled">Hủy bỏ</Option>
          </Select>
        </div>
      )
    }
  ];

  return (
    <div className="p-4 font-sf-pro-display">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold m-0">Quản lý Ứng tuyển & Phỏng vấn</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Tìm kiếm ứng viên hoặc công việc..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-64 rounded-lg"
          />
          <Select 
            defaultValue="all" 
            className="w-40 rounded-lg" 
            onChange={setStatusFilter}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="pending">Đang chờ</Option>
            <Option value="accepted">Đã chấp nhận</Option>
            <Option value="interviewing">Phỏng vấn</Option>
            <Option value="rejected">Bị từ chối</Option>
          </Select>
        </div>
      </div>
      
      <Divider className="my-4 bg-red-600 h-[2px]" />

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ 
          current: currentPage,
          pageSize: limit,
          total: totalBookings,
          showSizeChanger: true,
          onChange: (newPage, newPageSize) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', newPage.toString());
            params.set('limit', newPageSize.toString());
            setSearchParams(params);
          }
        }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      />
    </div>
  );
};

export default AdminInterviews;
