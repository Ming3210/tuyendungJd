import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { subscribePlan, confirmPayment } from '../../../store/slices/vipSlice';
import { Modal, Button, message, Tag, Card } from 'antd';
import { Check, Crown, Zap, Shield, Sparkles, QrCode, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

const PLANS = [
  {
    type: 'free',
    name: 'Miễn phí',
    price: '0đ',
    amount: 0,
    description: 'Dành cho người mới bắt đầu khám phá cơ hội',
    features: [
      'Xem danh sách việc làm',
      'Ứng tuyển việc làm',
      'Tạo tối đa 3 CV',
      'Nhận thông báo việc làm mới'
    ],
    buttonText: 'Đang sử dụng',
    premium: false
  },
  {
    type: 'pro',
    name: 'Pro',
    price: '99.000đ',
    amount: 99000,
    period: '/tháng',
    description: 'Phù hợp cho ứng viên tích cực tìm kiếm',
    features: [
      'Tất cả tính năng bản Miễn phí',
      'Xem hồ sơ ứng viên (dành cho NTD)',
      'Tạo không giới hạn CV',
      'Ưu tiên hiển thị hồ sơ',
      'Hỗ trợ qua Email'
    ],
    buttonText: 'Nâng cấp ngay',
    premium: true,
    popular: true
  },
  {
    type: 'business',
    name: 'Business',
    price: '199.000đ',
    amount: 199000,
    period: '/tháng',
    description: 'Giải pháp toàn diện cho nhà tuyển dụng chuyên nghiệp',
    features: [
      'Tất cả tính năng bản Pro',
      'Xem CV ứng viên trực tiếp',
      'Tải xuống danh sách ứng viên',
      'Gửi tin nhắn mời phỏng vấn trực tiếp',
      'Hỗ trợ 24/7 chuyên nghiệp'
    ],
    buttonText: 'Liên hệ Business',
    premium: true
  }
];

const PricingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { currentSubscription, loading } = useAppSelector((state) => state.vip);

  const [searchParams] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  useEffect(() => {
    const planType = searchParams.get('plan');
    if (planType && !hasAutoTriggered && !loading) {
      const plan = PLANS.find(p => p.type === planType);
      if (plan) {
        setHasAutoTriggered(true);
        handleSubscribe(plan);
        searchParams.delete('plan');
        navigate({ search: searchParams.toString() }, { replace: true });
      }
    }
  }, [searchParams, hasAutoTriggered, loading, navigate]);


  const handleSubscribe = async (plan: any) => {
    if (!currentUser) {
      message.warning('Vui lòng đăng nhập để nâng cấp VIP');
      const redirectPath = encodeURIComponent(window.location.pathname + window.location.search);
      navigate(`/login?redirect=${redirectPath}`);
      return;
    }

    if (plan.type === 'free') return;

    setSelectedPlan(plan);
    try {
      await dispatch(subscribePlan({
        userId: currentUser.id,
        planType: plan.type,
        months: 1
      })).unwrap();
      setIsModalVisible(true);
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleConfirm = async () => {
    if (currentSubscription?.transactionCode) {
      try {
        await dispatch(confirmPayment(currentSubscription.transactionCode)).unwrap();
        message.success({
          content: 'Thanh toán thành công! Chào mừng bạn gia nhập cộng đồng VIP.',
          duration: 5
        });
        setIsModalVisible(false);
        navigate('/all-candidates');
      } catch (error) {
        message.error('Xác nhận thanh toán thất bại. Vui lòng kiểm tra lại.');
      }
    }
  };

  const qrUrl = currentSubscription
    ? `https://img.vietqr.io/image/TPB-0355129455-compact.png?amount=${selectedPlan?.amount}&addInfo=${currentSubscription.transactionCode}&accountName=ANTIGRAVITY ADMIN`
    : '';

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#bc2228] font-bold text-sm mb-6 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>Ưu đãi giới hạn - Giảm 20% cho gói 1 năm</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-sf-pro-display tracking-tight">
            Nâng tầm sự nghiệp với các gói <span className="text-[#bc2228]">Premium</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium font-sf-pro-display">
            Chọn gói dịch vụ phù hợp để mở khóa những tính năng độc quyền và tiếp cận những ứng viên, công việc mơ ước nhanh hơn.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid grid-cols-1 ${currentUser?.role === 'partner' ? 'md:grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-3'} gap-8 relative`}>
          {PLANS.filter(plan => currentUser?.role === 'partner' ? plan.type === 'business' : true).map((plan) => (
            <div
              key={plan.type}
              className={`relative bg-white rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col ${plan.popular
                ? 'border-2 border-[#bc2228] shadow-2xl scale-105 z-10'
                : 'border border-gray-100 shadow-xl'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#bc2228] to-[#ff4d4f] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  PHỔ BIẾN NHẤT
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sf-pro-display">{plan.name}</h3>
                <p className="text-gray-500 text-sm h-10 line-clamp-2">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-gray-900 font-sf-pro-display">{plan.price}</span>
                <span className="text-gray-400 font-medium">{plan.period}</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    </div>
                    <span className="text-gray-600 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group ${plan.popular
                  ? 'bg-[#bc2228] hover:bg-red-700 text-white shadow-lg shadow-red-200'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'
                  }`}
              >
                {loading && selectedPlan?.type === plan.type ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        <Modal
          title={null}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={500}
          className="premium-modal"
          centered
        >
          <div className="p-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 mx-auto mb-6">
              <QrCode className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-sf-pro-display">Quét mã thanh toán</h2>
            <p className="text-gray-500 text-sm mb-8 px-8">
              Sử dụng ứng dụng ngân hàng của bạn để quét mã VietQR và thực hiện thanh toán cho gói <span className="font-bold text-gray-900">{selectedPlan?.name}</span>.
            </p>

            <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-gray-200 flex justify-center mb-8 relative group">
              <img
                src={qrUrl}
                alt="VietQR Payment"
                className="w-64 h-64 object-contain"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors cursor-zoom-in" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Số tiền</p>
                <p className="text-lg font-bold text-[#bc2228]">{selectedPlan?.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Nội dung</p>
                <p className="text-xs font-bold text-gray-700 break-all">{currentSubscription?.transactionCode}</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 mb-8 text-left">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed font-medium">
                Giao dịch của bạn được bảo mật tuyệt đối. Sau khi thanh toán, hệ thống sẽ tự động kích hoạt gói VIP cho bạn trong giây lát.
              </p>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group mb-4"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Tôi đã thanh toán xong</span>
            </button>
            <button
              onClick={() => setIsModalVisible(false)}
              className="w-full py-2 text-gray-400 text-sm font-medium hover:text-gray-600"
            >
              Hủy bỏ thanh toán
            </button>
          </div>
        </Modal>

        {/* Trust features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Shield className="text-blue-500" />, title: 'Bảo mật 100%', desc: 'Mọi thông tin thanh toán đều được mã hóa.' },
            { icon: <Zap className="text-amber-500" />, title: 'Xử lý tức thì', desc: 'VIP được kích hoạt ngay sau khi thanh toán.' },
            { icon: <Sparkles className="text-purple-500" />, title: 'Hỗ trợ tận tâm', desc: 'Đội ngũ hỗ trợ 24/7 luôn sẵn sàng.' },
            { icon: <Crown className="text-red-500" />, title: 'Quyền lợi độc quyền', desc: 'Tiếp cận sớm nhất các tính năng mới.' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
