import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchAllCandidates } from '../../../store/slices/candidateSlice';
import { checkVipStatus } from '../../../store/slices/vipSlice';
import { fetchUserCvs } from '../../../store/slices/userSlice';
import { viewDocument } from '../../../utils/fileUtils';
import { ArrowLeftOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { GraduationCap, Languages, Eye, UserSearch } from 'lucide-react';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { candidates } = useAppSelector((state) => state.candidate);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isVip } = useAppSelector((state) => state.vip);
  // Assuming cvs are stored in userSlice and populated by fetchUserCvs 
  const { cvs } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllCandidates());
    if (id) {
       dispatch(fetchUserCvs(id));
    }
    if (currentUser?.id) {
      dispatch(checkVipStatus(currentUser.id));
    }
  }, [dispatch, id, currentUser?.id]);

  const candidate = candidates.find(c => String(c.id) === String(id));

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return 0;
    return dayjs().diff(dayjs(birthdate), 'year');
  };

  const isPremiumUser = 
    currentUser?.role === 'admin' || 
    currentUser?.role === 'enterprise' || 
    currentUser?.role === 'partner' ||
    isVip ||
    String(currentUser?.id) === String(id);

  const isAllowedToViewCV = isPremiumUser;
  const isEnterprise = currentUser?.role === 'enterprise' || currentUser?.role === 'partner';

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#bc2228] animate-spin"></div>
          <UserSearch className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-100" />
        </div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse tracking-wide font-sf-pro-display">
          Đang tải hồ sơ ứng viên...
        </p>
      </div>
    );
  }

  // Filter CVs: if viewing own profile show all, else show only active/approved CVs
  const displayCvs = cvs?.filter(cv => {
    if (String(currentUser?.id) === String(id)) return true;
    return cv.status === true || cv.status === 'approved'; 
  }) || [];

  return (
    <div className="max-w-7xl mx-auto p-4 py-10 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-[#bc2228] mb-6 transition-colors font-sf-pro-display"
      >
        <ArrowLeftOutlined className="mr-2" /> Trở lại
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex gap-6">
          <div className="w-[180px] h-[200px] shrink-0">
            <img
              className="w-full h-full rounded-xl object-cover shadow-sm border border-gray-100"
              src={candidate.avatar || 'https://via.placeholder.com/180'}
              alt={candidate.fullName}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold font-sf-pro-display text-gray-900 mb-2">
                {candidate.fullName}
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-gray-500 font-sf-pro-display">
                  {calculateAge(candidate.birthdate)} tuổi
                </p>
                {candidate.position && (
                  <p className="bg-red-50 text-[#bc2228] px-3 py-1 rounded-full text-sm font-medium">
                    {candidate.position}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[#bc2228]" />
                <p className="font-bold text-gray-900 font-sf-pro-display min-w-[90px]">Trình độ:</p>
                <p className="text-gray-600 font-sf-pro-display">{candidate.level || 'Chưa cập nhật'}</p>
              </div>
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-[#bc2228]" />
                <p className="font-bold text-gray-900 font-sf-pro-display min-w-[90px]">Ngoại ngữ:</p>
                <div className="text-gray-600 font-sf-pro-display">
                  {candidate.foreignLanguage?.length 
                    ? candidate.foreignLanguage.join(', ') 
                    : 'Chưa cập nhật'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEnterprise && (
          <div>
            {/* The booking modal state logic would go here. Simplified to button for porting. */}
            <Button 
              type="primary" 
              size="large"
              className="bg-[#bc2228] hover:bg-red-700 border-none font-sf-pro-display shadow-md px-6"
              onClick={() => alert("Mở form đặt lịch phỏng vấn (Chưa tích hợp Modal)")}
            >
              Hẹn lịch phỏng vấn
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-center my-10">
        <hr className="w-full border-gray-200" />
      </div>

      {isAllowedToViewCV ? (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BookOutlined className="text-[#bc2228] text-xl" />
            <h2 className="text-xl font-bold text-gray-900 font-sf-pro-display">Danh sách CV</h2>
          </div>
          {displayCvs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayCvs.map((cv) => (
                <Card
                  key={cv.id}
                  hoverable
                  className="overflow-hidden rounded-xl border border-gray-100 shadow-sm"
                  bodyStyle={{ padding: 0 }}
                >
                  <div className="relative h-[200px] w-full">
                    {/* Placeholder image acting as PDF cover */}
                    <img 
                      src="https://i.pinimg.com/236x/02/51/a3/0251a343c25f47b11800d8014364332b.jpg" 
                      alt="CV Cover" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-base truncate">[CV] {cv.fileName || `CV_${candidate.fullName}.pdf`}</h3>
                      <p className="text-xs text-gray-300 mt-1">Cập nhật: {cv.date || 'Gần đây'}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white flex justify-between items-center">
                    <Button 
                      type="default" 
                      icon={<Eye className="w-4 h-4" />}
                      className="flex items-center gap-2 border-gray-200 text-gray-700 hover:text-[#bc2228] hover:border-[#bc2228]"
                      onClick={() => viewDocument(cv.pdfDataUrl)}
                    >
                      Xem CV
                    </Button>
                    {(!cv.status || cv.status === 'pending') && (
                      <span className="text-xs text-orange-500 font-medium">Chờ duyệt</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Ứng viên chưa tải lên CV nào.</p>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <Lock className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-sf-pro-display">Nội dung bị khóa</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">Bạn cần nâng cấp tài khoản Premium để xem chi tiết hồ sơ và CV của ứng viên này.</p>
          <Button 
            type="primary" 
            className="bg-[#bc2228] hover:bg-red-700 border-none px-8 py-2 h-auto font-bold rounded-xl"
            onClick={() => navigate('/pricing?plan=pro')}
          >
            Nâng cấp ngay
          </Button>
        </div>
      )}
    </div>
  );
};

export default CandidateDetail;
