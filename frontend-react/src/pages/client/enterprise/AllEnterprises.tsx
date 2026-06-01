import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchAllEnterprises } from '../../../store/slices/enterpriseSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Users, 
  Building2, 
  ArrowRight, 
  Star, 
  Briefcase,
  TrendingUp,
  LayoutGrid,
  Heart
} from 'lucide-react';
import { Pagination, Tag, Empty, Button, Skeleton, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleFollow, fetchUserFollows } from '../../../store/slices/followSlice';

const AllEnterprises: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enterprises, totalEnterprises, currentPage, loading } = useAppSelector((state) => state.enterprise);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { followingIds } = useAppSelector((state) => state.follow);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'top'>('all');

  useEffect(() => {
    dispatch(fetchAllEnterprises({ page: 1, limit: 9 }));
    if (currentUser?.id) {
      dispatch(fetchUserFollows(Number(currentUser.id)));
    }
  }, [dispatch, currentUser?.id]);

  const handlePageChange = (page: number) => {
    dispatch(fetchAllEnterprises({ page, limit: 9 }));
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  const handleToggleFollow = async (e: React.MouseEvent, enterpriseId: string | number) => {
    e.stopPropagation();
    if (!currentUser?.id) {
      message.warning('Vui lòng đăng nhập để theo dõi công ty');
      navigate('/login');
      return;
    }
    try {
      await dispatch(toggleFollow({ userId: Number(currentUser.id), enterpriseId: Number(enterpriseId) })).unwrap();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const isFollowing = (id: string | number) => !!followingIds[id];

  // Filtering for local search
  const filteredEnterprises = useMemo(() => {
    if (!searchTerm) return enterprises;
    return enterprises.filter(ent => 
      ent.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ent.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enterprises, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f0f9f4] to-white pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold tracking-wide uppercase">
                  Khám phá tương lai
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] leading-tight mb-6">
                Khám phá <span className="text-emerald-600">100.000+</span> <br /> 
                công ty nổi bật
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn với những cơ hội thăng tiến không giới hạn.
              </p>

              {/* Advanced Search Bar */}
              <div className="relative max-w-2xl group">
                <div className="absolute inset-0 bg-emerald-200 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 border border-gray-100">
                  <div className="flex-grow flex items-center gap-4 px-4">
                    <Search className="text-gray-400 w-6 h-6" />
                    <input 
                      type="text" 
                      placeholder="Nhập tên công ty..." 
                      className="w-full h-12 bg-transparent outline-none text-lg text-gray-800 placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="bg-[#1e4d3b] hover:bg-emerald-900 text-white font-bold h-14 px-10 rounded-xl transition-all shadow-lg active:scale-95">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-2/5 relative"
            >
              <div className="relative z-10 w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/src/assets/enterprise_discovery_hero.png" 
                  alt="Discovery Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-80"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 lg:p-12 mb-20">
          
          {/* Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-10">
              <button 
                onClick={() => setActiveTab('all')}
                className={`text-xl font-bold pb-4 relative transition-colors ${activeTab === 'all' ? 'text-[#1e4d3b]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Danh sách công ty
                {activeTab === 'all' && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('top')}
                className={`text-xl font-bold pb-4 relative transition-colors ${activeTab === 'top' ? 'text-[#1e4d3b]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Top công ty
                {activeTab === 'top' && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
                )}
              </button>
            </div>

            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-widest hidden lg:block">
              DANH SÁCH CÁC CÔNG TY NỔI BẬT
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden p-6 space-y-4 shadow-sm">
                    <Skeleton.Avatar active shape="square" className="w-full h-40 rounded-2xl" />
                    <Skeleton active paragraph={{ rows: 2 }} title={false} />
                  </div>
                ))}
              </motion.div>
            ) : filteredEnterprises.length > 0 ? (
              <motion.div 
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              >
                {filteredEnterprises.map((ent) => (
                  <motion.div
                    key={ent.id}
                    variants={itemVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    onClick={() => navigate(`/company/${ent.id}`)}
                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden flex flex-col h-full"
                  >
                    {/* Cover Photo */}
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img 
                        src={`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400`} 
                        alt="Company Cover" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Logo Profile */}
                      <div className="absolute -bottom-6 left-6 z-20 w-16 h-16 bg-white rounded-2xl p-2 shadow-xl border-4 border-white flex items-center justify-center">
                        {ent.avatar ? (
                          <img src={ent.avatar} alt={ent.title} className="w-full h-full object-contain rounded-lg" />
                        ) : (
                          <Building2 className="w-8 h-8 text-gray-300" />
                        )}
                      </div>

                      {/* Follow Button */}
                      <button
                        onClick={(e) => handleToggleFollow(e, ent.id)}
                        className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all group/heart ${
                          isFollowing(ent.id)
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-amber-500 shadow-lg'
                        }`}
                      >
                        <Heart className={`w-4 h-4 transition-transform ${isFollowing(ent.id) ? 'fill-current scale-110' : 'group-hover/heart:scale-110'}`} />
                      </button>
                    </div>

                    <div className="p-8 pt-10 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#1a1a1a] mb-2 group-hover:text-emerald-700 transition-colors uppercase leading-tight line-clamp-1">
                          {ent.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {ent.description || "Tận tâm kiến tạo giá trị, đồng hành cùng sự phát triển bền vững của khách hàng và cộng đồng."}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-50 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{ent.province}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-600 font-bold uppercase tracking-tight">{ent.industry}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                             <Users className="w-3.5 h-3.5" />
                             <span>{ent.companySize || '100-200'} nhân viên</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 flex justify-center">
                <Empty description="Không tìm thấy công ty phù hợp" />
              </div>
            )}
          </AnimatePresence>

          <div className="flex justify-center mt-12 border-t border-gray-50 pt-10">
            <Pagination 
              current={currentPage}
              total={totalEnterprises}
              pageSize={9}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="premium-pagination"
            />
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-emerald-50/20 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -z-10 pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
    </div>
  );
};

export default AllEnterprises;
