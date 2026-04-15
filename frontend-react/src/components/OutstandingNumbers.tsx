import React from 'react';

const stats = [
  { label: "Số năm kinh nghiệm", value: "10+" },
  { label: "Khách hàng quốc tế", value: "500+" },
  { label: "Dự án thành công", value: "1000+" },
  { label: "Văn phòng và chi nhánh", value: "10" },
  { label: "Top công ty Công nghệ tại Việt Nam", value: "Top 3" },
  { label: "Tỷ lệ khách hàng hài lòng", value: "97%" },
];

const partners = [
  { name: "U.S.M.Holdings", logo: "https://res.cloudinary.com/djppquc7s/image/upload/v1775788295/c92c18b7-4b09-46a3-8963-173fd8e0a4d1.png" },
  { name: "Studio NE63", logo: "https://res.cloudinary.com/djppquc7s/image/upload/v1775788332/4990ea56-793d-4f88-8d5e-5c3d2a646a8a.png" },
  { name: "Sunloft", logo: "https://res.cloudinary.com/djppquc7s/image/upload/v1775788355/f2a65825-796e-4703-b57a-3f30377e0f73.png" },
  { name: "Systena", logo: "https://res.cloudinary.com/djppquc7s/image/upload/v1775788440/7cf2f34e-d79e-4874-8b74-060d4ce77612.png" },
  { name: "Fujikin", logo: "https://res.cloudinary.com/djppquc7s/image/upload/v1775788448/ef2f6070-6040-4f91-8e38-5b103d3bbdec.png" },
  { name: "Cloud", logo: "https://res.cloudinary.com/djppquc7s/image/upload/v1775788452/86d1cf22-6a88-4338-b415-f1d573f00509.png" },
];

const OutstandingNumbers: React.FC = () => {
  return (
    <div className="bg-gray-50 pt-16">
      {/* Stats Section */}
      <section 
        className="py-20 relative overflow-hidden" 
        style={{ backgroundColor: '#bc2228' }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="black" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 text-center">
            Tại sao chọn chúng tôi?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 transform hover:-translate-y-2 transition-all duration-300"
              >
                <p className="text-white/70 text-sm mb-2 font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-white text-5xl font-extrabold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Đối tác tuyển dụng</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 transform hover:scale-110"
              >
                <img
                  loading="lazy"
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutstandingNumbers;
