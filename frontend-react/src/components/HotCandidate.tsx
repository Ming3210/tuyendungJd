import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllCandidates } from '../store/slices/candidateSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Crown, GraduationCap, Languages, Lock, User } from 'lucide-react';
import dayjs from 'dayjs';
import { checkVipStatus } from '../store/slices/vipSlice';

const HotCandidate: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { candidates, loading } = useAppSelector((state) => state.candidate);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isVip } = useAppSelector((state) => state.vip);

  useEffect(() => {
    dispatch(fetchAllCandidates());
    if (currentUser?.id) {
      dispatch(checkVipStatus(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const isPremiumUser =
    currentUser?.role === 'partner' ||
    currentUser?.role === 'admin' ||
    currentUser?.role === 'enterprise' ||
    isVip;

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return 0;
    return dayjs().diff(dayjs(birthdate), 'year');
  };

  const getPositionColor = (pos: string) => {
    switch (pos) {
      case 'Project Manager': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Full-stack Developer': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Front-end Developer': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Tester': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Software Engineer': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Team Lead': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const featuredCandidates = useMemo(() => candidates.slice(0, 4), [candidates]);

  return (
    <div className="bg-[#fdfdfd] py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" fill="#bc2228" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ứng viên nổi bật</h2>
            <p className="text-gray-500 mt-1">Gặp gỡ những tài năng hàng đầu trong mạng lưới của chúng tôi</p>
          </div>
          <Link
            to="/all-candidates"
            className="flex items-center gap-1 text-[#bc2228] font-bold hover:gap-2 transition-all"
          >
            {isPremiumUser ? 'Xem tất cả' : 'Nâng cấp ngay'} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-2xl border border-gray-100 shadow-inner backdrop-blur-sm">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
              <User className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-red-100" />
            </div>
            <p className="mt-4 text-gray-500 font-medium animate-pulse text-sm">Đang tìm kiếm tài năng...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => {
                  if (isPremiumUser) {
                    navigate(`/candidate-detail/${candidate.id}`);
                  } else {
                    navigate('/pricing?plan=pro');
                  }
                }}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  isPremiumUser ? 'hover:shadow-2xl hover:-translate-y-2' : 'hover:shadow-xl'
                }`}
              >
                {!isPremiumUser && (
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-white via-white/95 to-transparent z-10 flex flex-col items-center justify-end p-6 pb-8">
                    <div className="w-10 h-10 rounded-full bg-[#bc2228] flex items-center justify-center shadow-lg shadow-red-100 mb-2">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[#bc2228] font-bold text-xs uppercase tracking-wider mb-1">Nội dung trả phí</p>
                    <p className="text-gray-400 text-[10px] font-medium">Click để nâng cấp ngay</p>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gray-50 shadow-sm grow-0 shrink-0">
                    <img
                      src={candidate.avatar || 'https://via.placeholder.com/56'}
                      alt={candidate.fullName}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isPremiumUser ? 'group-hover:scale-110' : 'blur-sm group-hover:blur-0'
                        }`}
                    />
                    {!isPremiumUser && (
                      <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                        <Lock className="w-4 h-4 text-white drop-shadow-md" />
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border ${getPositionColor(candidate.position)}`}>
                    {candidate.position}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#bc2228] transition-colors line-clamp-1">
                    {isPremiumUser ? candidate.fullName : '•••••• ••••••'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {isPremiumUser ? `${calculateAge(candidate.birthdate)} tuổi` : 'Thông tin ẩn'}
                  </p>
                </div>

                <hr className="border-gray-50 mb-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4 text-[#bc2228]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Trình độ</p>
                      <p className="text-sm text-gray-700 font-medium truncate">{candidate.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <Languages className="w-4 h-4 text-[#bc2228]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Ngoại ngữ</p>
                      <p className="text-sm text-gray-700 font-medium truncate">
                        {isPremiumUser ? (candidate.foreignLanguage?.[0] || 'N/A') : '••••••'}
                      </p>
                    </div>
                  </div>
                </div>

                {!isPremiumUser && (
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-[#bc2228] font-bold text-[11px]">
                      <Crown className="w-3.5 h-3.5" />
                      NÂNG CẤP NGAY
                    </div>
                  </div>
                )}
              </div>
            ))}
            {featuredCandidates.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400 italic">
                Hiện chưa có ứng viên nổi bật.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotCandidate;
