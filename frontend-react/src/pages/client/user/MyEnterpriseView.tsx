import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchOwnedEnterprises } from '../../../store/slices/userSlice';
import { Button, Tag, Empty } from 'antd';
import { Building2, Globe, Mail, Phone, ExternalLink, Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RegisterEnterpriseModal from '../../../components/enterprise/RegisterEnterpriseModal';

const MyEnterpriseView: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { ownedEnterprises, loading } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchOwnedEnterprises(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  if (loading && ownedEnterprises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
          <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
        </div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide font-sf-pro-display">
          Đang tải dữ liệu doanh nghiệp...
        </p>
      </div>
    );
  }

  return (
    <div className="font-sf-pro-display">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0">Quản lý Doanh nghiệp</h1>
          <p className="text-gray-500 mt-2">Danh sách các doanh nghiệp bạn đang sở hữu và quản lý.</p>
        </div>
        <Button 
          type="primary" 
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 border-none h-11 px-6 font-bold flex items-center justify-center rounded-xl shadow-md shadow-emerald-100"
        >
          Đăng ký doanh nghiệp mới
        </Button>
      </div>

      {ownedEnterprises.length === 0 ? (
        <div className="py-20 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center">
          <Empty 
            description={
              <span className="text-gray-500">
                Bạn chưa sở hữu doanh nghiệp nào. Hãy đăng ký ngay!
              </span>
            } 
          />
          <Button 
            type="primary" 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-[#bc2228] hover:bg-red-700 h-10 px-8 rounded-lg font-bold"
          >
            Đăng ký ngay
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {ownedEnterprises.map((enterprise) => (
            <div 
              key={enterprise.id} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Avatar / Logo */}
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center p-2">
                  {enterprise.avatar ? (
                    <img 
                      src={enterprise.avatar} 
                      alt={enterprise.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Building2 className="w-10 h-10 text-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 m-0 group-hover:text-[#bc2228] transition-colors">
                      {enterprise.title}
                    </h2>
                    <Tag 
                      color={
                        enterprise.status === 'verified' ? 'green' : 
                        enterprise.status === 'pending' ? 'orange' : 'red'
                      } 
                      className="rounded-full border-none px-3 font-semibold capitalize m-0"
                    >
                      {enterprise.status === 'verified' ? 'Đã xác thực' : 
                       enterprise.status === 'pending' ? 'Đang chờ duyệt' : 'Đã chặn'}
                    </Tag>
                  </div>

                  <p className="text-gray-500 line-clamp-1 mb-4 text-sm italic">
                    {enterprise.introduction || 'Không có mô tả giới thiệu.'}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="truncate" title={enterprise.email}>{enterprise.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{enterprise.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Quy mô: {enterprise.companySize || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-3 justify-center">
                  <Button 
                    type="primary" 
                    icon={<Settings className="w-4 h-4" />}
                    disabled={enterprise.status !== 'verified'}
                    className={`h-10 px-6 font-bold flex items-center justify-center rounded-xl transition-all ${
                        enterprise.status === 'verified' ? 'bg-[#bc2228] hover:bg-red-700 shadow-md shadow-red-50' : 'bg-gray-100 text-gray-400'
                    }`}
                    onClick={() => navigate(`/company/${enterprise.id}/dashboard`)}
                  >
                    Quản lý
                  </Button>
                  <Button 
                    icon={<ExternalLink className="w-4 h-4" />}
                    className="h-10 px-6 font-bold flex items-center justify-center border-gray-200 rounded-xl hover:text-[#bc2228] hover:border-[#bc2228] transition-all"
                    onClick={() => navigate(`/company/${enterprise.id}`)}
                  >
                    Xem hồ sơ
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registration Modal */}
      <RegisterEnterpriseModal 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        onSuccess={() => {
            if (currentUser?.id) {
                dispatch(fetchOwnedEnterprises(currentUser.id));
            }
        }}
      />
    </div>
  );
};

export default MyEnterpriseView;
