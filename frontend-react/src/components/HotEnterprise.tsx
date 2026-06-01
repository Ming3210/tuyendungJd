import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllEnterprises } from '../store/slices/enterpriseSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Briefcase, Globe, Star, Users, ArrowRight, Heart } from 'lucide-react';
import { Pagination, message } from 'antd';
import { toggleFollow, fetchUserFollows } from '../store/slices/followSlice';

const HotEnterprise: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enterprises, loading, totalEnterprises, currentPage } = useAppSelector((state) => state.enterprise);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { followingIds } = useAppSelector((state) => state.follow);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Tất cả');

  const industries = ['Tất cả', 'Công nghệ thông tin', 'Xây dựng', 'Kinh doanh', 'Marketing', 'Y tế'];

  useEffect(() => {
    dispatch(fetchAllEnterprises({ page: 1, limit: 8, sort: 'random' }));
    if (currentUser?.id) {
      dispatch(fetchUserFollows(Number(currentUser.id)));
    }
  }, [dispatch, currentUser?.id]);

  const handleFollowToggle = (e: React.MouseEvent, enterpriseId: number | string) => {
    e.stopPropagation();
    if (!currentUser) {
      message.warning('Vui lòng đăng nhập để theo dõi công ty');
      return;
    }
    dispatch(toggleFollow({ userId: Number(currentUser.id), enterpriseId: Number(enterpriseId) }));
  };

  const handleIndustryFilter = (industry: string) => {
    setSelectedIndustry(industry);
    dispatch(fetchAllEnterprises({
      page: 1,
      limit: 8,
      industry: industry === 'Tất cả' ? '' : industry,
      sort: 'random'
    }));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchAllEnterprises({
      page,
      limit: 8,
      industry: selectedIndustry === 'Tất cả' ? '' : selectedIndustry,
      sort: 'random'
    }));
    const element = document.getElementById('featured-enterprises-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const EnterpriseSkeleton = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-[220px] animate-pulse flex flex-col justify-between">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-xl grow-0 shrink-0"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-3 bg-gray-50 rounded w-1/2"></div>
          <div className="h-3 bg-amber-50 rounded w-1/4 mt-2"></div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
        <div className="h-2 bg-gray-50 rounded w-full"></div>
        <div className="flex justify-between pt-1">
          <div className="h-2 bg-amber-50 rounded w-1/4"></div>
          <div className="h-2 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="featured-enterprises-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-amber-50/30 to-white rounded-3xl mb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold mb-2">
            <Star className="w-5 h-5 fill-amber-500" />
            <span className="uppercase tracking-[0.2em] text-xs">Top Employers</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Công ty nổi bật</h2>
          <p className="text-gray-500 mt-1">Làm việc tại những doanh nghiệp hàng đầu trong ngành</p>
        </div>
        <Link
          to="/all-companies"
          className="group flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all bg-amber-50 px-6 py-2.5 rounded-full border border-amber-100 shadow-sm shadow-amber-100/50"
        >
          Xem tất cả <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => handleIndustryFilter(ind)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${selectedIndustry === ind
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200 ring-2 ring-amber-500 ring-offset-2'
                : 'bg-white border border-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <div className="min-h-[460px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <EnterpriseSkeleton key={i} />)
          ) : enterprises.length > 0 ? (
            enterprises.map((ent) => (
              <div
                key={ent.id}
                onClick={() => navigate(`/company/${ent.id}`)}
                className="group bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer shadow-sm hover:shadow-2xl hover:border-amber-200 transition-all duration-300 flex flex-col justify-between h-[220px] relative overflow-hidden"
              >
                {/* Accent Background */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-amber-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-50 shadow-sm bg-gray-50 flex items-center justify-center shrink-0">
                      {ent.avatar ? (
                        <img src={ent.avatar} alt={ent.title} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <div className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md border border-amber-100">
                      {ent.industry}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
                    {ent.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{ent.address || 'Đang cập nhật'}</span>
                  </div>
                </div>

                {/* Follow Button */}
                <button
                  onClick={(e) => handleFollowToggle(e, ent.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all group/heart ${followingIds[ent.id]
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-white text-gray-200 hover:text-amber-500 hover:bg-amber-50 shadow-sm'
                    }`}
                >
                  <Heart className={`w-4 h-4 transition-transform ${followingIds[ent.id] ? 'fill-current scale-110' : 'group-hover/heart:scale-110'}`} />
                </button>

                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">{ent.companySize || '50-100 nhân viên'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                    <span>Chi tiết</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 italic">
              Hiện chưa có công ty nổi bật trong lĩnh vực này.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && enterprises.length > 0 && (
        <div className="flex justify-center mt-12">
          <Pagination
            current={currentPage}
            total={totalEnterprises}
            pageSize={8}
            onChange={handlePageChange}
            showSizeChanger={false}
            className="custom-pagination amber-pagination"
          />
        </div>
      )}
    </div>
  );
};

export default HotEnterprise;
