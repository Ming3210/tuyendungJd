import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  DownOutlined, 
  HeartOutlined, 
  LogoutOutlined, 
  SearchOutlined 
} from '@ant-design/icons';
import { Dropdown, Menu, Modal, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { checkVipStatus } from '../store/slices/vipSlice';
import { CrownOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isVip, planType } = useAppSelector((state) => state.vip);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(checkVipStatus(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const [showJobMenu, setShowJobMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    text: 'VN',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg',
  });

  const handleLogout = () => {
    Modal.confirm({
      title: 'Xác nhận đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(logout());
        navigate('/login');
        message.success('Đã đăng xuất thành công');
      },
    });
  };

  const menuItems = [
    {
      key: 'header',
      label: (
        <div className="flex gap-[10px] py-1 px-4 items-center">
          <img
            src={currentUser?.avatar || 'https://via.placeholder.com/40'}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold m-0">{currentUser?.fullName || 'User'}</h2>
              {isVip && (
                <Tag color="gold" icon={<CrownOutlined />} className="m-0 text-[10px] font-bold uppercase">
                  {planType}
                </Tag>
              )}
            </div>
            <p className="text-gray-500 text-xs m-0">{currentUser?.email}</p>
          </div>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'profile',
      label: <Link to="/profile">Thông tin cá nhân</Link>,
    },
    {
      key: 'settings',
      label: <span>Cài đặt</span>,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: (
        <span className="text-red-500" onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <header className="p-5 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-12">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src="/src/assets/rikkei.svg" className="w-[70.6px] h-[32.09px] mr-1" alt="Rikkei" />
          <img src="/src/assets/jobs.svg" className="w-[63.12px] h-[21.4px]" alt="Jobs" />
        </div>

        <nav className="flex gap-6 items-center">
          <div 
            className="relative"
            onMouseEnter={() => setShowJobMenu(true)}
            onMouseLeave={() => setShowJobMenu(false)}
          >
            <Link 
              to="/all-jobs" 
              className={`font-sf-pro-display hover:text-[#bc2228] transition-colors ${location.pathname === '/all-jobs' ? 'text-[#bc2228] font-bold' : 'text-black'}`}
            >
              Việc làm
            </Link>
            {showJobMenu && (
              <div className="absolute top-full left-0 pt-3 z-50">
                <div className="bg-white shadow-xl rounded-xl w-60 py-2 border border-gray-100">
                  <Link to="/all-jobs" className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700 font-semibold rounded-t-xl">
                    <SearchOutlined /> Tìm kiếm việc làm
                  </Link>
                  <Link to="/profile/saved-jobs" className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700 font-semibold rounded-b-xl">
                    <HeartOutlined /> Việc làm đã lưu
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/profile/cv" className="font-sf-pro-display text-black hover:text-[#bc2228]">
            Hồ sơ & CV
          </Link>
          <Link to="/about-us" className="font-sf-pro-display text-black hover:text-[#bc2228]">
            Về chúng tôi
          </Link>
          <Link to="/contact" className="font-sf-pro-display text-black hover:text-[#bc2228]">
            Liên hệ
          </Link>
          <Link to="/pricing" className="font-sf-pro-display text-[#bc2228] font-bold flex items-center gap-1 hover:opacity-80">
            <CrownOutlined /> Nâng cấp VIP
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-300">
          <img src={currentLanguage.icon} alt="VN" className="w-6 h-6 rounded-full" />
          <span className="text-gray-700 font-sf-pro-display">{currentLanguage.text}</span>
          <DownOutlined className="text-gray-500 text-xs cursor-pointer" />
        </div>

        <div className="flex gap-2 items-center">
          {currentUser ? (
            <Dropdown menu={{ items: menuItems as any }} trigger={['click']}>
              <img
                src={currentUser?.avatar || 'https://via.placeholder.com/40'}
                alt="Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
              />
            </Dropdown>
          ) : (
            <>
              <Link to="/register" className="text-gray-500 text-sm font-semibold px-4 py-2 hover:text-[#bc2228]">
                Đăng ký
              </Link>
              <Link to="/login" className="bg-[#bc2228] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
