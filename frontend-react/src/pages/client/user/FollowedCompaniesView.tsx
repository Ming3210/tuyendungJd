import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserFollows, toggleFollow } from '../../../store/slices/followSlice';
import { fetchEnterprisesByIds } from '../../../store/slices/enterpriseSlice';
import { Building2, MapPin, Globe, Star, Users, ArrowRight, Heart } from 'lucide-react';
import { Empty, Button, message, Skeleton } from 'antd';

const FollowedCompaniesView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { followingIds, loading: followLoading } = useAppSelector((state) => state.follow);
  const { enterprises, loading: enterpriseLoading } = useAppSelector((state) => state.enterprise);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUserFollows(Number(currentUser.id)))
        .unwrap()
        .then((follows: any[]) => {
          if (follows.length > 0) {
            const ids = follows.map(f => f.enterpriseId);
            dispatch(fetchEnterprisesByIds(ids));
          }
        });
    }
  }, [dispatch, currentUser?.id]);

  const handleUnfollow = async (enterpriseId: number | string) => {
    if (currentUser?.id) {
      try {
        await dispatch(toggleFollow({ userId: Number(currentUser.id), enterpriseId: Number(enterpriseId) })).unwrap();
        message.success('Đã bỏ theo dõi công ty');
      } catch (error) {
        message.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  if (followLoading || enterpriseLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Công ty đang theo dõi</h2>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-6">
            <Skeleton.Avatar active size={80} shape="square" />
            <div className="flex-1">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const followedCompanies = enterprises.filter(ent => followingIds[ent.id]);

  return (
    <div className="page-entrance">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Công ty đang theo dõi</h2>
          <p className="text-gray-500 mt-1">Nhận thông báo ngay khi các công ty này có việc làm mới</p>
        </div>
      </div>

      {followedCompanies.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {followedCompanies.map((ent) => (
            <div
              key={ent.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-amber-200 hover:shadow-xl transition-all group flex flex-col md:flex-row gap-6 relative"
            >
              <div 
                className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-50 cursor-pointer"
                onClick={() => navigate(`/company/${ent.id}`)}
              >
                {ent.avatar ? (
                  <img src={ent.avatar} alt={ent.title} className="w-full h-full object-contain rounded-xl" />
                ) : (
                  <Building2 className="w-10 h-10 text-gray-300" />
                )}
              </div>

              <div className="flex-grow flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 
                    className="text-xl font-bold text-gray-900 hover:text-amber-600 cursor-pointer transition-colors"
                    onClick={() => navigate(`/company/${ent.id}`)}
                  >
                    {ent.title}
                  </h3>
                  <div className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md border border-amber-100 uppercase tracking-wider">
                    {ent.industry}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{ent.province}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{ent.companySize || '50-100'} nhân viên</span>
                  </div>
                  {ent.website && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="truncate max-w-[200px]">{ent.website.replace(/^https?:\/\//, '')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3 min-w-[160px]">
                <Button
                  type="primary"
                  className="bg-gray-900 border-none hover:bg-black font-bold h-11 rounded-xl"
                  onClick={() => navigate(`/company/${ent.id}`)}
                >
                  Xem việc làm
                </Button>
                <Button
                  icon={<Heart className="w-4 h-4 fill-current" />}
                  className="border-gray-200 text-gray-500 hover:text-[#bc2228] hover:border-red-100 hover:bg-red-50 font-bold h-11 rounded-xl flex items-center justify-center gap-2"
                  onClick={() => handleUnfollow(ent.id)}
                >
                  Bỏ theo dõi
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-20 border border-dashed border-gray-200 text-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="space-y-2">
                <p className="text-gray-500 font-medium text-lg">Bạn chưa theo dõi công ty nào</p>
                <p className="text-gray-400 text-sm">Hãy theo dõi các công ty hàng đầu để nhận cập nhật việc làm sớm nhất.</p>
              </div>
            }
          >
            <Button
              type="primary"
              className="mt-4 bg-[#bc2228] border-none hover:bg-red-700 h-12 px-8 rounded-2xl font-bold shadow-lg shadow-red-100"
              onClick={() => navigate('/home-page')}
            >
              Khám phá công ty ngay
            </Button>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default FollowedCompaniesView;
