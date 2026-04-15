import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllProvinces } from '../store/slices/provinceSlice';
import { useNavigate } from 'react-router-dom';

const Banner: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { provinces } = useAppSelector((state) => state.provinces);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [positionQuery, setPositionQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllProvinces());
  }, [dispatch]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const selectProvince = (name: string) => {
    setSelectedProvince(name);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const filteredProvinces = provinces.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (positionQuery) params.append('position', positionQuery);
    if (selectedProvince) params.append('province', selectedProvince);
    navigate(`/all-jobs?${params.toString()}`);
  };

  return (
    <div className="relative h-[435px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25, 16, 58, 0.7), rgba(25, 16, 58, 0.4)), url('https://s3-alpha-sig.figma.com/img/acee/2e78/87d12368bef93dfc7b5f89b9927a3239?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n2WBOO-jge3EiwZdCvHqp2c5yI9tWsKIo8gmt9KOreY-yAp9R5Wr8WKsNmUlOJ9ACao6fVkJkpqwrqMUdGOkacM49eBwUzyAEVQs~BGZeNUcY~9VpBw0np2B8jfW-G~dD7VQ0LSKolllLeqeNGUa0ClRXIo9jN8F0rBcLv0bYhop53HqhOPtnM-b0CNH6poj4JEXxAUiiIcGIWzpk-m1loUqin8VHG~PD4cP2lgO09ffCbDvG5M8kJiZVbS6ahDUzEe9zAmDwRcrH-C-nU0XVVtGz2HTrVPmSzGtNBqLVAPD6l-TBhqIqLZJqPX-OljsnT2SV1nsJF9zEvLjlrLRnA__')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight drop-shadow-lg drop-shadow-black">
          Tìm kiếm việc làm <span className="text-[#bc2228]">cùng Rikkei Jobs!</span>
        </h1>

        {/* Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl w-full border border-white/20 shadow-2xl">
          
          {/* Position Input */}
          <div className="flex-grow flex items-center bg-white p-4 rounded-xl shadow-inner w-full">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Vị trí ứng tuyển (ví dụ: Java Developer...)"
              className="bg-transparent text-gray-800 outline-none ml-3 w-full font-medium"
              value={positionQuery}
              onChange={(e) => setPositionQuery(e.target.value)}
            />
          </div>

          {/* Province Dropdown */}
          <div className="relative w-full md:w-64">
            <div 
              onClick={toggleDropdown}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-inner cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-gray-700 font-medium truncate">
                <MapPin className="text-red-600 w-5 h-5 flex-shrink-0" />
                <span className="truncate">{selectedProvince || "Tất cả địa điểm"}</span>
              </div>
              <ChevronDown className={`text-gray-400 w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-black shadow-2xl rounded-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <input
                    type="text"
                    placeholder="Tìm kiếm địa điểm..."
                    className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-200 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <ul className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-200">
                  <li 
                    className="px-4 py-2.5 hover:bg-red-50 hover:text-[#bc2228] cursor-pointer transition-colors text-sm font-medium"
                    onClick={() => selectProvince('')}
                  >
                    Tất cả địa điểm
                  </li>
                  {filteredProvinces.map((p) => (
                    <li
                      key={p.id}
                      className={`px-4 py-2.5 hover:bg-red-50 hover:text-[#bc2228] cursor-pointer transition-colors text-sm font-medium ${selectedProvince === p.name ? 'bg-red-50 text-[#bc2228]' : ''}`}
                      onClick={() => selectProvince(p.name)}
                    >
                      {p.name}
                    </li>
                  ))}
                  {filteredProvinces.length === 0 && (
                    <li className="px-4 py-8 text-center text-gray-400 text-sm italic">
                      Không tìm thấy địa điểm
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-10 py-4 bg-[#bc2228] hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95 whitespace-nowrap"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Quick Stats or Tags Container (Optional Premium Touch) */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">#Java</span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">#ReactJS</span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">#Frontend</span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">#Hà Nội</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
