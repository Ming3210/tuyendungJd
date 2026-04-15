import React, { useEffect } from 'react';
import { NavLink, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllEnterprises } from '../../store/slices/enterpriseSlice';
import { 
  Building2, 
  Briefcase, 
  Calendar 
} from 'lucide-react';

const EnterpriseLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { enterprises, loading } = useAppSelector((state) => state.enterprise);
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllEnterprises({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const enterprise = enterprises.find(item => String(item.id) === String(id));

  // Access control checking could go here, for now allowing based on role=partner or admin
  useEffect(() => {
    if (currentUser && currentUser.role !== 'partner' && currentUser.role !== 'admin') {
      navigate('/403');
    }
  }, [currentUser, navigate]);

  const sidebarLinks = [
    {
      to: `/company/${id}/dashboard/detail`,
      icon: <Building2 className="w-5 h-5" />,
      text: 'Thông tin hồ sơ'
    },
    {
      to: `/company/${id}/dashboard/job`,
      icon: <Briefcase className="w-5 h-5" />,
      text: 'Quản lý tuyển dụng'
    },
    {
      to: `/company/${id}/dashboard/interview-booking`,
      icon: <Calendar className="w-5 h-5" />,
      text: 'Lịch phỏng vấn'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
          <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
        </div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide font-sf-pro-display">
          Đang chuẩn bị dữ liệu quản lý...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={enterprise?.avatar || 'https://via.placeholder.com/48'}
                alt="Company Logo"
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
              />
              <div className="overflow-hidden">
                <h2 className="text-lg font-bold text-gray-900 truncate font-sf-pro-display">
                  {enterprise?.title || 'Doanh nghiệp'}
                </h2>
                <p className="text-gray-500 text-sm truncate font-sf-pro-display">{enterprise?.email}</p>
              </div>
            </div>
            
            <hr className="mb-6 border-gray-100" />

            <nav className="space-y-2">
              {sidebarLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 p-4 rounded-xl font-bold transition-all font-sf-pro-display ${
                      isActive 
                      ? 'bg-[#fff6f7] text-[#bc2228] shadow-sm' 
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 min-h-[500px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLayout;
