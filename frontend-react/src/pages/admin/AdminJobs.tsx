import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Tag, Dropdown, MenuProps, Modal, Button, message, Divider } from 'antd';
import { DownOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllJobs, updateJobStatus, Job } from '../../store/slices/jobSlice';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const AdminJobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs, loading, totalJobs, currentPage, limit } = useAppSelector((state) => state.jobs);
  
  const initialPage = parseInt(searchParams.get('_page') || '1', 10);
  const initialTitle = searchParams.get('title') || '';
  
  const [searchInput, setSearchInput] = useState(initialTitle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Sync state to URL and Fetch data
  useEffect(() => {
    const page = parseInt(searchParams.get('_page') || '1', 10);
    const limitParam = parseInt(searchParams.get('_limit') || String(limit), 10);
    const title = searchParams.get('title') || '';
    dispatch(fetchAllJobs({ page, limit: limitParam, title }));
  }, [dispatch, searchParams, limit]);

  const handlePageChange = (page: number, pageSize: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('_page', page.toString());
    newParams.set('_limit', pageSize.toString());
    setSearchParams(newParams);
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('title', value);
    newParams.set('_page', '1'); // Reset to page 1 on search
    setSearchParams(newParams);
  };

  const handleUpdateStatus = (job: Job, newStatus: string) => {
    dispatch(updateJobStatus({ id: job.id, flight: newStatus as any }));
    message.success(`Trạng thái đã được cập nhật thành: ${newStatus}`);
  };

  const showModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Fresher": return "blue";
      case "Intern": return "purple";
      case "Junior": return "green";
      case "Senior": return "gold";
      case "Lead": return "red";
      default: return "default";
    }
  };

  const getFlightColor = (flight: string) => {
    switch (flight) {
      case "verified": return "green";
      case "pending": return "orange";
      case "blocked": 
      case "rejected":
      case "unverified": return "red";
      default: return "default";
    }
  };

  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      render: (text: string) => <a className="font-semibold">{text}</a>,
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      key: 'salary',
      width: '10%',
      render: (text: string) => <span className="text-blue-700 font-semibold">{text || 'Thoả thuận'}</span>,
    },
    {
      title: 'Level',
      dataIndex: 'rank',
      key: 'rank',
      width: '15%',
      render: (rank: string) => {
        // Fallback for mock data where rank might not be an array or perfectly formatted
        const ranks = typeof rank === 'string' ? rank.split(',').map(r => r.trim()) : (rank ? [String(rank)] : ['...']);
        return (
          <div className="flex flex-wrap gap-1">
            {ranks.map((r, i) => <Tag key={i} color={getRankColor(r)}>{r}</Tag>)}
          </div>
        );
      }
    },
    {
      title: 'Doanh nghiệp',
      dataIndex: 'enterpriseName',
      key: 'enterpriseName',
    },
    {
      title: 'Hạn nộp (Deadline)',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '---',
    },
    {
      title: 'Trạng thái',
      key: 'flight',
      dataIndex: 'flight',
      width: '12%',
      filters: [
        { text: 'Đã xác minh', value: 'verified' },
        { text: 'Đang chờ', value: 'pending' },
        { text: 'Đã chặn', value: 'blocked' },
      ],
      onFilter: (value: any, record: Job) => record.flight === value,
      render: (flight: string, record: Job) => {
        const menuItems: MenuProps['items'] = [
          { key: 'verified', label: 'Duyệt (Verified)', onClick: () => handleUpdateStatus(record, 'verified') },
          { key: 'blocked', label: 'Chặn (Blocked)', onClick: () => handleUpdateStatus(record, 'blocked') },
        ];

        return (
          <div className="flex items-center gap-2">
            <Tag color={getFlightColor(flight)} className="m-0 border-none px-2 capitalize">{flight}</Tag>
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
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Job) => (
        <Button type="primary" size="small" onClick={() => showModal(record)} className="bg-red-600 hover:bg-red-700 border-none font-sf-pro-display">
          Xem
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 font-sf-pro-display">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold m-0 text-gray-800">Quản lý tin tuyển dụng (Jobs)</h1>
      </div>

      <Divider className="my-2 bg-red-600 h-[2px]" />

      <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
        <Input.Search
          placeholder="Tìm kiếm công việc theo tên..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
          enterButton
          size="large"
          className="shadow-sm"
        />
      </div>

      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="id"
        loading={loading}
        pagination={{ 
          current: currentPage, 
          pageSize: limit, 
          total: totalJobs,
          onChange: handlePageChange,
          showSizeChanger: true
        }}
        className="w-full bg-white rounded-lg shadow-sm font-sf-pro-display"
      />

      <Modal
        title={<span className="text-xl font-bold text-gray-800">Chi tiết công việc</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
           <Button key="close" onClick={() => setIsModalOpen(false)}>Đóng</Button>
        ]}
        width={900}
        centered
      >
        {selectedJob && (
           <div className="flex flex-col gap-6 font-sf-pro-display">
             <div className="flex justify-between items-start mt-4">
               <div>
                 <h2 className="text-2xl font-bold text-gray-900 m-0 leading-tight">{selectedJob.title}</h2>
                 <div className="flex gap-2 mt-2">
                   <Tag color="geekblue" className="text-sm py-1 px-3 border-none">{selectedJob.type || 'Full time'}</Tag>
                   <Tag color={getFlightColor(selectedJob.flight)} className="text-sm py-1 px-3 border-none capitalize">{selectedJob.flight}</Tag>
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-2xl font-bold text-blue-600 border border-blue-100 bg-blue-50 px-4 py-1 rounded-lg">
                   {selectedJob.salary || 'Thỏa thuận'}
                 </div>
               </div>
             </div>

             <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl">
               <div className="bg-white text-blue-500 w-12 h-12 flex items-center justify-center rounded-lg shadow-sm border border-gray-100">
                 <HomeOutlined className="text-2xl" />
               </div>
               <div>
                 <p className="font-bold text-lg text-gray-800 m-0">{selectedJob.enterpriseName || 'Chưa cập nhật tên công ty'}</p>
                 <p className="text-gray-500 m-0 flex items-center gap-2 text-sm mt-1">
                   <MailOutlined /> admin@company.com
                 </p>
               </div>
             </div>

             <div className="border border-gray-200 rounded-xl overflow-hidden mt-2">
               <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 font-bold text-gray-700">
                 Nội dung công việc
               </div>
               <div className="p-5 bg-white">
                 <h4 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Tên công việc</h4>
                 <p className="text-lg font-bold text-gray-900 mb-6">{selectedJob.title}</p>
                 
                 <h4 className="text-gray-500 text-sm mb-2 uppercase tracking-wider font-semibold">Mô tả chi tiết</h4>
                 <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                   {selectedJob.description || 'Chưa có thông tin mô tả chi tiết cho công việc này.'}
                 </div>
                 
                 {selectedJob.requirements && (
                   <>
                     <h4 className="text-gray-500 text-sm mb-2 mt-6 uppercase tracking-wider font-semibold">Yêu cầu ứng viên</h4>
                     <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                       {selectedJob.requirements}
                     </div>
                   </>
                 )}
                 
                 {selectedJob.benefits && (
                   <>
                     <h4 className="text-gray-500 text-sm mb-2 mt-6 uppercase tracking-wider font-semibold">Quyền lợi</h4>
                     <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                       {selectedJob.benefits}
                     </div>
                   </>
                 )}
               </div>
             </div>
           </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminJobs;
