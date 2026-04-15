import React from 'react';

export default function AboutUs() {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-[435px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res-console.cloudinary.com/djppquc7s/thumbnails/v1/image/upload/v1766996354/QmFubmVySmJMaXN0X2t3N2Y4MQ==/drilldown')",
            backgroundPosition: "cover",
            backgroundSize: "100% 260%",
          }}
        ></div>

        <div
          style={{
            background: "linear-gradient(rgba(19, 12, 45, 1), rgba(35, 22, 81, 1), rgba(35, 22, 81, 1), rgba(19, 12, 45, 1))"
          }}
          className="absolute inset-0 opacity-50"
        ></div>

        {/* Banner Content */}
        <div className="relative flex flex-col items-center justify-center w-full z-10 mt-[10px]">
          <h1 className="text-white text-5xl font-bold mb-4 font-sf-pro-display">
            Về chúng tôi
          </h1>
          <p className="text-lg text-white font-sf-pro-display tracking-wide">
            Rikkeisoft - Top 3 Doanh nghiệp CNTT tại Việt Nam
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-[126px] items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="font-bold text-4xl mb-2 text-gray-900 font-sf-pro-display uppercase">
                Công ty cổ phần Rikkeisoft
              </h2>
              <p className="text-[#a5a500] text-lg font-medium font-sf-pro-display">
                Top 3 Doanh nghiệp CNTT tại Việt Nam
              </p>
            </div>
            <div className="text-gray-700 leading-relaxed font-sf-pro-display text-lg text-justify">
              <p>
                Thành lập năm 2012, Rikkeisoft đã trở thành một trong những doanh
                nghiệp công nghệ hàng đầu tại Việt Nam và Nhật Bản với gần 2.000
                thành viên. Bằng việc cung cấp các giải pháp công nghệ toàn diện
                như AI, Robotics, Blockchain và chuyển đổi số, Rikkeisoft đang góp
                phần nâng cao năng lực cạnh tranh của doanh nghiệp Việt trên
                trường quốc tế. Hiện tại Rikkeisoft đã hiện diện tại nhiều quốc
                gia trên thế giới như Mỹ, Nhật Bản, Singapore, Hàn Quốc và Thái
                Lan, ... góp phần đưa công nghệ Việt Nam vươn tầm quốc tế.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <img
              className="rounded-xl shadow-xl w-full object-cover"
              src="https://s3-alpha-sig.figma.com/img/d9bd/6398/25319407681a7e926336fefb98d451aa?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KmSF6hLrKh1LbMXrj5uW9hG5FRi8jHRodXbxa~K5IXWfhWaHrAvwyuQKBhH4xkTi3qhOEFvWaamRXwGx9mtTUB-puKZN8EaF9pO4aDYW~Rz67pyWUUlYk98HCscuwBcoO7Z5lwquIzbbEjWNL76jrNppXpT-lvUOxJfv2ryGgjcoyhkLY2Dosm2ilw5nqFw46Q3~UtBXtRXQt6O924f1BNVVZa-vt3QcXDpmbopjZYss~3IC2EMZZXf5prXPIre7mPztVLoEMf29IYYDfsuLIc~~J2LtnEFjZld5VoiWSbB5sqGT3mtDP~wf7t2I4m9h~6F~buGPs0ffXG-wrtUEqw__"
              alt="Rikkeisoft Office"
            />
          </div>
        </div>
        <img
          className="absolute top-[20%] left-[-10%] opacity-20 pointer-events-none z-[-1]"
          src="/src/assets/banner/decor4.svg"
          alt=""
        />
      </div>

      {/* Stats Section */}
      <div
        className="w-full py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://s3-alpha-sig.figma.com/img/2250/f891/827ff07cd21ae1be104e11e1b601b7c4?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HzjzOBjApatjZmobKjNxInRcD22XEeg4phb6mI78-p2ZqOv7J4tOkfMo8qF3mhnnTpUXMtFGj8-TE3R7w8akpjAlkHPCuVX6BOf5uffSE2JGv7nzXEsmW8~kDFg9Nut4khWPrGjMHF45nt-OUP6BY2j4PTeb7vrCde71BVATDBXbIttDAH5o~lJNOXkRDd-higN8Dk50SpsK9nxqHciZXI2iMJgxMjateokTX73EwXb7cL4bqdx6qrix4f6V9DLduWz0yB3iDtpoqEmGKa7NWned0DL3F83b9jjRiTefNEAw1cHiIYgnzk0PKOKZpzSRZFdxbP63uKF-ZU4H~yXoiw__')"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 bg-opacity-95 p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition duration-300">
            <p className="text-gray-600 font-semibold mb-2 font-sf-pro-display uppercase tracking-wider">
              Số lượng nhân viên
            </p>
            <p className="text-5xl text-[#bc2228] font-bold font-sf-pro-display">
              2000
            </p>
          </div>
          <div className="bg-gray-50 bg-opacity-95 p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition duration-300">
            <p className="text-gray-600 font-semibold mb-2 font-sf-pro-display uppercase tracking-wider">
              Dự án đã thực hiện
            </p>
            <p className="text-5xl text-[#bc2228] font-bold font-sf-pro-display">
              1000
            </p>
          </div>
          <div className="bg-gray-50 bg-opacity-95 p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition duration-300">
            <p className="text-gray-600 font-semibold mb-2 font-sf-pro-display uppercase tracking-wider">
              Khách hàng
            </p>
            <p className="text-5xl text-[#bc2228] font-bold font-sf-pro-display">
              500+
            </p>
          </div>

          <div className="bg-gray-50 bg-opacity-95 p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition duration-300">
            <p className="text-gray-600 font-semibold mb-2 font-sf-pro-display uppercase tracking-wider">
              Số năm kinh nghiệm
            </p>
            <p className="text-5xl text-[#bc2228] font-bold font-sf-pro-display">12</p>
          </div>
          <div className="bg-gray-50 bg-opacity-95 p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition duration-300">
            <p className="text-gray-600 font-semibold mb-2 font-sf-pro-display uppercase tracking-wider text-sm">
              VP đại diện tại các thành phố
            </p>
            <p className="text-5xl text-[#bc2228] font-bold font-sf-pro-display">10</p>
          </div>
          <div className="bg-gray-50 bg-opacity-95 p-8 rounded-xl shadow-md transform hover:-translate-y-1 transition duration-300">
            <p className="text-gray-600 font-semibold mb-2 font-sf-pro-display uppercase tracking-wider text-sm">
              Tỷ lệ giữ chân khách hàng
            </p>
            <p className="text-5xl text-[#bc2228] font-bold font-sf-pro-display">97%</p>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="max-w-7xl mx-auto py-20 px-6 flex flex-col items-center">
        <h2 className="text-4xl text-gray-900 font-bold mb-12 font-sf-pro-display text-center uppercase tracking-wide">
          Văn phòng đại diện
        </h2>
        <div className="w-full">
          <img
            className="w-full object-cover rounded-xl shadow-lg"
            src="https://s3-alpha-sig.figma.com/img/ff9e/c123/c0debbfa7fba284175b53bd9990a8f9c?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WxdfV4s7al82K-H6NZZB~HJBstRgtf4aczyYbOChlx2AzwMnOre4NGI086ZTLXwRZRt5iim3HquWb76cxa~oB61rQFEHCKlShi4ZQPS3m1BJ0Qn-SbGT~xXZsHE2qCx-zOrXvB-Ch2LVSb47Pr0ZSDObF~w0n8tij0x4~Oe-QsSnRzV6jIvTmUtDxjE83nr9R~m43pVrP9Pbw-ky-Jch8Yt0PtiAc1Vh6tYxLZj7AaaUta3eHwUIA370g-rfJ~WmRboIBMBxroDZqAkZkxXO-RPrTom7XC1qrKQALJgTrYaJQr2-pTLLb07oBq8ku3I550jPU9fGEn2W2VD4MiIJbw__"
            alt="Office Locations Map"
          />
        </div>
      </div>

      {/* Ecosystem Section */}
      <div className="w-full py-20 relative overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
          <h2 className="text-gray-900 text-4xl font-bold font-sf-pro-display uppercase tracking-[0.1em]">
            Hệ sinh thái Rikkeisoft
          </h2>
        </div>

        <div className="relative flex justify-center items-center w-full min-h-[500px]">
          <img
            src="/src/assets/rk/rk.svg"
            alt="Rikkei Main Ecosystem"
            className="relative z-10 max-w-full h-auto drop-shadow-xl"
            style={{ width: '80%', maxWidth: '1200px' }}
          />
        </div>

        <img
          src="/src/assets/rk/dc.svg"
          alt="Decor"
          className="absolute top-0 right-0 z-0 opacity-30 pointer-events-none"
        />
      </div>
    </div>
  );
}

