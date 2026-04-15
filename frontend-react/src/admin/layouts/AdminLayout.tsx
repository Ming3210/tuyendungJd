import React, { useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  GlobalOutlined, 
  DatabaseOutlined, 
  BankOutlined, 
  BookOutlined, 
  CalendarOutlined, 
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsModalVisible(false);
    // Standard window location redirect if pointing to the main entry
    window.location.href = '/index.html'; 
  };

  const menuItems = [
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Người dùng',
      onClick: () => navigate('/users')
    },
    {
      key: '/cvs',
      icon: <FileTextOutlined />,
      label: 'CV',
      onClick: () => navigate('/cvs')
    },
    {
      key: '/languages',
      icon: <GlobalOutlined />,
      label: 'Ngôn ngữ CV',
      onClick: () => navigate('/languages')
    },
    {
      key: '/jobs',
      icon: <DatabaseOutlined />,
      label: 'Job',
      onClick: () => navigate('/jobs')
    },
    {
      key: '/enterprises',
      icon: <BankOutlined />,
      label: 'Doanh nghiệp',
      onClick: () => navigate('/enterprises')
    },
    {
      key: '/certificates',
      icon: <BookOutlined />,
      label: 'Chứng chỉ',
      onClick: () => navigate('/certificates')
    },
    {
      key: '/interviews',
      icon: <CalendarOutlined />,
      label: 'Phỏng vấn',
      onClick: () => navigate('/interviews')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: () => setIsModalVisible(true)
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div className="h-8 m-4 bg-white/30 rounded" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white p-0 flex items-center">
          <div 
            className="text-lg w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        
        <Content className="m-6 p-6 bg-white min-h-[280px] rounded-lg shadow-sm">
          <Outlet />
        </Content>
      </Layout>

      <Modal
        title="Xác nhận đăng xuất"
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Đăng xuất"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
    </Layout>
  );
};

export default AdminLayout;
