import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { 
  User, 
  FileText, 
  Award, 
  Calendar,
  Building2,
  Heart,
  Crown 
} from 'lucide-react';
import { Tag } from 'antd';

const ProfileLayout: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isVip, planType } = useAppSelector((state) => state.vip);

  if (!currentUser) return null;

  const sidebarLinks = [
    {
      to: '/profile/information',
      icon: <User className="w-5 h-5" />,
      text: 'Thông tin cá nhân',
      show: true
    },
    {
      to: '/profile/cv',
      icon: <FileText className="w-5 h-5" />,
      text: 'Quản lý CV',
      show: currentUser.role !== 'partner'
    },
    {
      to: '/profile/certificate',
      icon: <Award className="w-5 h-5" />,
      text: 'Quản lý chứng chỉ',
      show: currentUser.role !== 'partner'
    },
    {
      to: '/profile/interviews',
      icon: <Calendar className="w-5 h-5" />,
      text: 'Lịch phỏng vấn',
      show: currentUser.role !== 'partner'
    },
    {
      to: '/profile/saved-jobs',
      icon: <Heart className="w-5 h-5" />,
      text: 'Việc làm đã lưu',
      show: currentUser.role !== 'partner'
    },
    {
      to: '/profile/enterprise',
      icon: <Building2 className="w-5 h-5" />,
      text: 'Quản lý doanh nghiệp',
      show: currentUser.role === 'partner'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen page-entrance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={currentUser.avatar || 'https://via.placeholder.com/48'}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900 truncate">{currentUser.fullName}</h2>
                  {isVip && (
                    <Tag color="gold" icon={<Crown className="w-3 h-3" />} className="m-0 text-[10px] font-bold uppercase flex items-center gap-1">
                      {planType}
                    </Tag>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">{currentUser.email}</p>
              </div>
            </div>
            
            <hr className="mb-6 border-gray-100" />

            <nav className="space-y-2">
              {sidebarLinks.filter(link => link.show).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${
                      isActive 
                      ? 'bg-[#fff6f7] text-[#ab1f24] shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.text}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
