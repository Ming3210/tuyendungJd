import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchCandidatesPaginated } from '../../../store/slices/candidateSlice';
import { checkVipStatus } from '../../../store/slices/vipSlice';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import dayjs from 'dayjs';
import {
  Users,
  Crown,
  Lock,
  Search,
  SlidersHorizontal,
  ChevronDown,
  GraduationCap,
  Languages,
  Sparkles,
  Eye,
} from 'lucide-react';

const AllCandidates: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { candidates, loading, totalCandidates } = useAppSelector((state) => state.candidate);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isVip } = useAppSelector((state) => state.vip);

  const [sortOption, setSortOption] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const itemsPerPage = 8;

  // Premium access: partner, admin, enterprise, or users with active VIP
  const isPremiumUser = 
    currentUser?.role === 'partner' || 
    currentUser?.role === 'admin' || 
    currentUser?.role === 'enterprise' ||
    isVip;

  useEffect(() => {
    // Block candidate role completely
    if (currentUser?.role === 'candidate') {
      navigate('/403');
      return;
    }

    dispatch(fetchCandidatesPaginated({ 
      page: currentPage, 
      limit: itemsPerPage, 
      sort: sortOption, 
      q: searchText 
    }));
    
    if (currentUser?.id) {
      dispatch(checkVipStatus(currentUser.id));
    }
  }, [dispatch, currentUser, navigate, currentPage, sortOption, searchText]);

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return 0;
    return dayjs().diff(dayjs(birthdate), 'year');
  };

  const getLevelGradient = (level: string) => {
    const gradients: Record<string, string> = {
      Fresher: 'from-emerald-400 to-teal-500',
      Junior: 'from-blue-400 to-indigo-500',
      Middle: 'from-amber-400 to-orange-500',
      Senior: 'from-purple-400 to-violet-600',
      Lead: 'from-rose-400 to-pink-600',
    };
    return gradients[level] || 'from-gray-400 to-gray-500';
  };

  const handleClick = (id: string | number) => {
    if (!isPremiumUser) return;
    navigate(`/homepage/candidate/candidateDetail/${id}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen page-entrance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#bc2228] to-[#8b1a1e] flex items-center justify-center shadow-lg shadow-red-200">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-sf-pro-display">
              Tất cả ứng viên
            </h1>
          </div>
          <p className="text-gray-500 text-sm ml-[52px]">
            Khám phá {candidates.length.toLocaleString()} ứng viên tiềm năng đang tìm kiếm cơ hội mới
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-grow flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-gray-200 focus-within:border-[#bc2228] focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
              placeholder="Tìm kiếm theo tên hoặc vị trí ứng tuyển..."
              value={searchText}
              onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-medium text-gray-700"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#bc2228]" />
              <span>{sortOption === 'asc' ? 'Tên A → Z' : 'Tên Z → A'}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden">
                <button
                  onClick={() => { setSortOption('asc'); setShowSortDropdown(false); setCurrentPage(1); }}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${sortOption === 'asc' ? 'bg-red-50 text-[#bc2228]' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Tên A → Z
                </button>
                <button
                  onClick={() => { setSortOption('desc'); setShowSortDropdown(false); setCurrentPage(1); }}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors border-t border-gray-50 ${sortOption === 'desc' ? 'bg-red-50 text-[#bc2228]' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Tên Z → A
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Premium Gate Banner */}
        {!isPremiumUser && (
          <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#bc2228]/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1 font-sf-pro-display">
                  Nâng cấp Premium để xem hồ sơ ứng viên
                </h3>
                <p className="text-gray-300 text-sm">
                  Truy cập không giới hạn vào hồ sơ chi tiết, CV, và thông tin liên hệ của hàng nghìn ứng viên chất lượng.
                </p>
              </div>
              <button
                onClick={() => navigate('/pricing?plan=pro')}
                className="shrink-0 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Nâng cấp ngay</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Candidates Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
              <Users className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
            </div>
            <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide font-sf-pro-display">
              Đang tìm kiếm ứng viên tài năng...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {candidates.map((candidate, index) => (
                <div
                  key={candidate.id}
                  onClick={() => handleClick(candidate.id)}
                  className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col ${
                    isPremiumUser
                      ? 'shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer'
                      : 'shadow-sm cursor-default'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Candidate Image */}
                  <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      src={candidate.avatar || 'https://via.placeholder.com/300x200'}
                      alt={candidate.fullName}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isPremiumUser ? 'group-hover:scale-110' : 'blur-[6px]'
                      }`}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Level badge */}
                    {candidate.level && (
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${getLevelGradient(candidate.level)} shadow-lg`}>
                        {candidate.level}
                      </span>
                    )}

                    {/* Premium Lock Overlay */}
                    {!isPremiumUser && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className={`p-5 flex-grow flex flex-col ${!isPremiumUser ? 'select-none' : ''}`}>
                    <h3 className={`text-lg font-bold text-gray-900 mb-1 line-clamp-1 transition-colors ${
                      isPremiumUser ? 'group-hover:text-[#bc2228]' : ''
                    }`}>
                      {isPremiumUser ? candidate.fullName : '••••• ••••••'}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {isPremiumUser ? (
                        <>
                          <span className="text-sm text-gray-500">{calculateAge(candidate.birthdate)} tuổi</span>
                          {candidate.position && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500 truncate">{candidate.position}</span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Thông tin ẩn</span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="mt-auto space-y-2.5">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-4 h-4 text-[#bc2228]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-gray-400 text-xs block">Trình độ</span>
                          <span className={`font-medium truncate block ${isPremiumUser ? 'text-gray-800' : 'text-gray-300'}`}>
                            {isPremiumUser ? (candidate.level || 'Chưa cập nhật') : '••••••'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <Languages className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-gray-400 text-xs block">Ngoại ngữ</span>
                          <span className={`font-medium truncate block ${isPremiumUser ? 'text-gray-800' : 'text-gray-300'}`}>
                            {isPremiumUser
                              ? (candidate.foreignLanguage?.length ? candidate.foreignLanguage.join(', ') : 'Chưa cập nhật')
                              : '••••••'
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button for premium users */}
                    {isPremiumUser && (
                      <button className="mt-4 w-full py-2.5 rounded-xl bg-gray-50 text-gray-600 text-sm font-bold border border-gray-100 group-hover:bg-[#bc2228] group-hover:text-white group-hover:border-[#bc2228] transition-all flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Xem hồ sơ
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {candidates.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Không tìm thấy ứng viên nào.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 pb-8">
              <Pagination
                current={currentPage}
                total={totalCandidates}
                pageSize={itemsPerPage}
                onChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                showSizeChanger={false}
                className="custom-pagination"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCandidates;
