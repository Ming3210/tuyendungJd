import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, History, TrendingUp, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchJobsByPage, Job } from '../store/slices/jobSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface JobSearchBarProps {
  onSearch: (params: any) => void;
  initialValues?: any;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ onSearch, initialValues }) => {
  const [query, setQuery] = useState(initialValues?.title || '');
  const [location, setLocation] = useState(initialValues?.province || '');
  const [searchMode, setSearchMode] = useState<'title' | 'company' | 'both'>(initialValues?.searchMode || 'both');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { provinces } = useAppSelector((state) => state.provinces);
  const { jobs: allJobs } = useAppSelector((state) => state.jobs);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (initialValues) {
      setQuery(initialValues.title || '');
      setLocation(initialValues.province || '');
      setSearchMode(initialValues.searchMode || 'both');
    }
  }, [initialValues]);

  const handleSearchTrigger = () => {
    if (query.trim()) {
      const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
      setRecentSearches(newRecent);
      localStorage.setItem('recent_searches', JSON.stringify(newRecent));
    }
    onSearch({ title: query, province: location, searchMode });
    setIsFocused(false);
  };

  const removeRecentSearch = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const newRecent = recentSearches.filter(s => s !== item);
    setRecentSearches(newRecent);
    localStorage.setItem('recent_searches', JSON.stringify(newRecent));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  const suggestedJobs = allJobs.slice(0, 5);

  return (
    <div className="relative w-full z-40" ref={searchRef}>
      {/* Search Input Area */}
      <div className={`flex flex-col md:flex-row items-stretch bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 p-2 gap-2 ${isFocused ? 'border-red-500 ring-4 ring-red-50' : 'border-gray-100'}`}>
        <div className="flex-grow flex items-center px-4 gap-3 bg-gray-50 rounded-xl focus-within:bg-white transition-colors">
          <Search className="text-red-600 w-5 h-5 shrink-0" />
          <input
            type="text"
            className="w-full h-12 bg-transparent outline-none text-gray-800 font-medium placeholder-gray-400"
            placeholder="Vị trí tuyển dụng, tên công ty..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-200 rounded-full">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        <div className="md:w-64 flex items-center px-4 gap-3 bg-gray-50 rounded-xl relative group">
          <MapPin className="text-red-500 w-5 h-5 shrink-0" />
          <select 
            className="w-full h-12 bg-transparent outline-none text-gray-700 font-medium appearance-none cursor-pointer"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Tất cả địa điểm</option>
            {provinces.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 text-gray-400 w-4 h-4 pointer-events-none group-hover:text-red-500" />
        </div>

        <button 
          onClick={handleSearchTrigger}
          className="bg-[#bc2228] hover:bg-red-700 text-white font-bold h-12 px-8 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Tìm kiếm</span>
        </button>
      </div>

      {/* Mode Selection Chips */}
      <div className="flex items-center gap-6 mt-4 px-2">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Tìm kiếm theo:</span>
        <div className="flex items-center gap-4">
          {(['both', 'title', 'company'] as const).map(mode => (
            <label key={mode} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${searchMode === mode ? 'border-red-600 bg-red-600' : 'border-gray-300 group-hover:border-red-300'}`}>
                {searchMode === mode && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <input 
                type="radio" 
                className="hidden" 
                name="search_mode" 
                checked={searchMode === mode}
                onChange={() => setSearchMode(mode)}
              />
              <span className={`text-sm font-bold ${searchMode === mode ? 'text-gray-900' : 'text-gray-500'}`}>
                {mode === 'both' ? 'Cả hai' : mode === 'title' ? 'Tên việc làm' : 'Tên công ty'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Advanced Dropdown (Search Recommendations) */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute top-[calc(100%+20px)] left-0 right-0 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 grid grid-cols-1 lg:grid-cols-5 gap-10 overflow-hidden"
          >
            {/* Left Column: Recent Searches */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-extrabold text-[#bc2228] flex items-center gap-2">
                   Từ khóa tìm kiếm gần đây
                </h3>
                {recentSearches.length > 0 && (
                  <button onClick={clearAllRecent} className="text-xs text-red-500 font-bold hover:underline">Xóa tất cả</button>
                )}
              </div>
              
              <div className="space-y-1">
                {recentSearches.length > 0 ? recentSearches.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => { setQuery(item); handleSearchTrigger(); }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer group/item transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <History className="w-4 h-4 text-gray-300 group-hover/item:text-red-400" />
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-gray-700">{item}</span>
                         <span className="text-[10px] text-gray-400">Tìm kiếm gần đây</span>
                      </div>
                    </div>
                    <button onClick={(e) => removeRecentSearch(e, item)} className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-gray-200 rounded-lg transition-all">
                       <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                )) : (
                  <div className="py-6 text-center text-gray-400 italic text-sm">Chưa có tìm kiếm gần đây</div>
                )}
              </div>
            </div>

            {/* Right Column: Suggested Jobs */}
            <div className="lg:col-span-3 border-l border-gray-100 pl-8">
              <h3 className="text-base font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                 Việc làm có thể bạn quan tâm
              </h3>
              <div className="space-y-4">
                {suggestedJobs.map((job) => (
                  <Link 
                    to={`/job-detail/${job.id}`} 
                    key={job.id}
                    className="flex items-center gap-4 group/job hover:bg-red-50/50 p-2 rounded-2xl transition-all"
                  >
                    <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-2 group-hover/job:bg-white shrink-0">
                      {job.enterpriseLogo ? (
                        <img src={job.enterpriseLogo} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <TrendingUp className="w-6 h-6 text-gray-200" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover/job:text-red-600 transition-colors line-clamp-1 truncate">
                        {job.title}
                      </h4>
                      <p className="text-xs text-gray-500 truncate mb-1">{job.enterpriseName}</p>
                      <span className="text-xs font-bold text-emerald-600">{job.salary}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobSearchBar;
