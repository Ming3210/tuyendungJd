import React, { useState } from 'react';
import {
  CalendarClock,
  Briefcase,
  Layers,
  Building2,
  CircleDollarSign,
  Filter,
  Users,
  Award,
  ChevronDown
} from 'lucide-react';
import { useAppSelector } from '../store/hooks';

interface JobFilterSidebarProps {
  onFilterChange: (filters: any) => void;
  onApply: () => void;
  filters: any;
}

const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({ onFilterChange, onApply, filters }) => {
  const { industries } = useAppSelector((state) => state.jobs);
  const [showFullIndustries, setShowFullIndustries] = useState(false);

  const experienceOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Không yêu cầu', value: 'Không yêu cầu' },
    { label: 'Dưới 1 năm', value: 'Dưới 1 năm' },
    { label: '1 năm', value: '1 năm' },
    { label: '2 năm', value: '2 năm' },
    { label: '3 năm', value: '3 năm' },
    { label: '4 năm', value: '4 năm' },
    { label: '5 năm', value: '5 năm' },
    { label: 'Trên 5 năm', value: 'Trên 5 năm' },
  ];

  const saturdayOffOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Nghỉ thứ 7', value: 'true' },
    { label: 'Làm thứ 7', value: 'false' },
  ];

  const rankOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Nhân viên', value: 'Nhân viên' },
    { label: 'Trưởng nhóm', value: 'Trưởng nhóm' },
    { label: 'Trưởng/Phó phòng', value: 'Trưởng/Phó phòng' },
    { label: 'Quản lý / Giám sát', value: 'Quản lý / Giám sát' },
    { label: 'Trưởng chi nhánh', value: 'Trưởng chi nhánh' },
    { label: 'Phó giám đốc', value: 'Phó giám đốc' },
    { label: 'Giám đốc', value: 'Giám đốc' },
    { label: 'Thực tập sinh', value: 'Thực tập sinh' },
  ];

  const educationOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Đại học trở lên', value: 'Đại học trở lên' },
    { label: 'Cao đẳng trở lên', value: 'Cao đẳng trở lên' },
    { label: 'Đại học năm 4', value: 'Đại học năm 4' },
    { label: 'Sau đại học', value: 'Sau đại học' },
  ];

  const salaryRanges = [
    { label: 'Tất cả', min: null, max: null },
    { label: 'Thỏa thuận', min: null, max: null, isNegotiable: true },
    { label: 'Dưới 10 triệu', min: 0, max: 10 },
    { label: '10 - 15 triệu', min: 10, max: 15 },
    { label: '15 - 20 triệu', min: 15, max: 20 },
    { label: '20 - 25 triệu', min: 20, max: 25 },
    { label: '25 - 30 triệu', min: 25, max: 30 },
    { label: '30 - 50 triệu', min: 30, max: 50 },
    { label: 'Trên 50 triệu', min: 50, max: 999 },
  ];

  const updateFilter = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleSalaryRangeSelect = (min: number | null, max: number | null, isNegotiable?: boolean) => {
    onFilterChange({ ...filters, salaryMin: min, salaryMax: max, negotiable: isNegotiable || null });
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-emerald-600" />
      <h3 className="font-extrabold text-[#1a1a1a] text-sm uppercase tracking-tight">{title}</h3>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 lg:p-8 space-y-8 sticky top-24 h-fit overflow-y-auto max-h-[85vh] scrollbar-hide">
      <div className="flex items-center justify-between pb-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-black text-gray-900">Lọc nâng cao</h2>
        </div>
        <button
          onClick={onApply}
          className="lg:hidden px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold"
        >
          Áp dụng
        </button>
      </div>

      {/* Saturday Off */}
      <section>
        <SectionHeader icon={CalendarClock} title="Nghỉ thứ 7" />
        <div className="grid grid-cols-2 gap-3">
          {saturdayOffOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${filters.saturdayOff === opt.value ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 group-hover:border-emerald-300'}`}>
                {filters.saturdayOff === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input
                type="radio"
                className="hidden"
                checked={filters.saturdayOff === opt.value}
                onChange={() => updateFilter('saturdayOff', opt.value)}
              />
              <span className={`text-[13px] font-medium ${filters.saturdayOff === opt.value ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <SectionHeader icon={Award} title="Kinh nghiệm" />
        <div className="grid grid-cols-2 gap-3">
          {experienceOptions.map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${filters.experience === opt.value ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 group-hover:border-emerald-300'}`}>
                {filters.experience === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input
                type="radio"
                className="hidden"
                checked={filters.experience === opt.value}
                onChange={() => updateFilter('experience', opt.value)}
              />
              <span className={`text-[13px] font-medium ${filters.experience === opt.value ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </section>



      {/* Job Category Filter */}
      <section>
        <SectionHeader icon={Briefcase} title="Danh mục công việc" />
        <div className="relative">
          <select
            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all appearance-none cursor-pointer"
            value={filters.jobCategory}
            onChange={(e) => updateFilter('jobCategory', e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            <option value="IT / Phần mềm">IT / Phần mềm</option>
            <option value="Marketing / PR">Marketing / PR</option>
            <option value="Kinh doanh / Bán hàng">Kinh doanh / Bán hàng</option>
            <option value="Kế toán / Kiểm toán">Kế toán / Kiểm toán</option>
            <option value="Nhân sự">Nhân sự</option>
            <option value="Sản xuất / Vận hành">Sản xuất / Vận hành</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </section>

      {/* Mức lương */}
      <section>
        <SectionHeader icon={CircleDollarSign} title="Mức lương" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          {salaryRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${filters.salaryMin === range.min && filters.salaryMax === range.max ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 group-hover:border-emerald-300'}`}>
                {(filters.salaryMin === range.min && filters.salaryMax === range.max) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input
                type="radio"
                className="hidden"
                checked={filters.salaryMin === range.min && filters.salaryMax === range.max && (range.isNegotiable ? filters.negotiable === true : (filters.negotiable === null || filters.negotiable === false))}
                onChange={() => handleSalaryRangeSelect(range.min, range.max, range.isNegotiable)}
              />
              <span className={`text-[13px] font-medium ${filters.salaryMin === range.min && filters.salaryMax === range.max ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Từ"
            className="w-full h-10 bg-gray-50 rounded-xl px-3 text-xs outline-none border border-transparent focus:border-emerald-200"
            value={filters.salaryMin || ''}
            onChange={(e) => updateFilter('salaryMin', e.target.value ? Number(e.target.value) : null)}
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Đến"
            className="w-full h-10 bg-gray-50 rounded-xl px-3 text-xs outline-none border border-transparent focus:border-emerald-200"
            value={filters.salaryMax || ''}
            onChange={(e) => updateFilter('salaryMax', e.target.value ? Number(e.target.value) : null)}
          />
          <span className="text-gray-400 text-xs font-bold shrink-0">triệu</span>
        </div>
      </section>

      {/* Cấp bậc */}
      <section>
        <SectionHeader icon={Layers} title="Cấp bậc" />
        <div className="grid grid-cols-2 gap-3">
          {rankOptions.map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${filters.jobLevel === opt.value ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300 group-hover:border-emerald-300'}`}>
                {filters.jobLevel === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input
                type="radio"
                className="hidden"
                checked={filters.jobLevel === opt.value}
                onChange={() => updateFilter('jobLevel', opt.value)}
              />
              <span className={`text-[13px] font-medium ${filters.jobLevel === opt.value ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      

      <div className="pt-4">
        <button
          onClick={onApply}
          className="w-full py-4 bg-[#1e4d3b] hover:bg-emerald-900 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] mb-4"
        >
          Áp dụng bộ lọc
        </button>
        <button
          onClick={() => {
            onFilterChange({
              saturdayOff: '',
              experience: '',
              industry: '',
              salaryMin: null,
              salaryMax: null,
              negotiable: null,
              jobLevel: '',
              education: '',
              rank: '',
              title: '',
              province: '',
              searchMode: 'both'
            });
          }}
          className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl text-xs font-bold transition-all"
        >
          Đặt lại bộ lọc
        </button>
      </div>
    </div>
  );
};

export default JobFilterSidebar;
