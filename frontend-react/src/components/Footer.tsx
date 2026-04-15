import React from 'react';

const Footer: React.FC = () => {
  const backgroundImageUrl = 
    "https://s3-alpha-sig.figma.com/img/4ff7/a8d7/4e33919d5c6225d63f4757d978faa98f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j--rboeNyEBTmibTbPiuIejKlJs0v4pEWJzUh5xCZx8S9QyhNfPT4PAJML6YLLrO9d2np5IHV1zOIcR~sdairw53h~jBgxhsBxm4OXX5CpmOTcfCGQFt4VKiVYF-x6BQUACzSD8ozgebSlYlyqestiXsEpUgYyQEWegGGSB2DSvAwl4dCR56yjz-LRiCHnZyZHKS4NtwMDzPQTBhnA8WUOaFyWkuONYi2b7nMGCvuCcPxeGUi1Ol~p9pjP239MjcjD9t2MnirtXvMa4I6QNUrb8K5u01eqmZjMOvRXNg5YRvaW~pFbhpAgHjPwL17JVRlQZhyyY7cQ7zpAxTxvkBMg__";

  return (
    <footer 
      className="flex flex-col gap-10 text-white p-16 relative overflow-hidden"
      style={{
        backgroundColor: 'rgba(171, 31, 36, 1)',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="flex flex-col items-start gap-4 border-b border-white/30 pb-6 w-full max-w-7xl mx-auto">
        <img width="202.69" height="47" src="/src/assets/img/Logo2.png" alt="Rikkei Academy" />
        <p className="font-normal text-xl">
          KHƠI DẬY TIỀM LỰC - MỞ LỐI THÀNH CÔNG
        </p>
      </div>

      <div className="flex flex-wrap gap-12 md:gap-20 border-b border-white/30 pb-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 flex-1 min-w-[300px]">
          <p className="font-bold text-lg uppercase tracking-wider">Thông tin liên hệ</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <img src="/src/assets/icons/Featured icon1.png" alt="" className="mt-1" />
              <div>
                <span className="font-semibold block text-base">Trụ sở Hà Nội:</span>
                <span className="text-sm font-normal opacity-90 leading-relaxed">
                  Tầng 7, Tháp A, Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ Liêm, Hà Nội
                </span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <img src="/src/assets/icons/Featured icon2.png" alt="" />
              <div>
                <span className="font-semibold text-base">Hotline:</span>
                <span className="text-sm font-normal ml-2">0862 069 233</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <img src="/src/assets/icons/Featured icon3.png" alt="" />
              <div>
                <span className="font-semibold text-base">Email:</span>
                <span className="text-sm font-normal ml-2">academy@rikkeisoft.com</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
          <p className="font-bold text-lg uppercase tracking-wider text-white">Khóa học</p>
          <ul className="space-y-3">
            {['Cho người mới bắt đầu', 'Lập trình viên Nhật Bản', 'Kỹ sư CNTT - PTIT', 'Data Analysis - HUST', 'IT Fresher - Rikkei Certificate'].map((course) => (
              <li key={course} className="text-base font-light opacity-90 hover:opacity-100 cursor-pointer hover:font-normal transition-all">
                {course}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg uppercase tracking-wider">Theo dõi chúng tôi tại</p>
          <div className="flex gap-5">
            <img src="/src/assets/icons/facebook.png" alt="Facebook" className="cursor-pointer" />
            <img src="/src/assets/icons/youtube.png" alt="Youtube" className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-10 pt-6 w-full max-w-7xl mx-auto justify-between items-start">
        {[
          { title: 'Cơ sở 1', address: 'Tầng 7, Tháp A, Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ Liêm, Hà Nội', phone: '0862 069 233' },
          { title: 'Cơ sở 2', address: 'Tầng 22, Tháp A, Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Quận Nam Từ Liêm, Hà Nội', phone: '0862 069 233' },
          { title: 'Cơ sở 3', address: 'Tầng 3, tòa TSA Building, số 77 Lê Trung Nghĩa, Phường 12, Tân Bình, TP Hồ Chí Minh', phone: '0962 703 893' }
        ].map((office, idx) => (
          <div key={idx} className="flex flex-col gap-2 max-w-[300px]">
            <p className="font-bold text-base uppercase">{office.title}</p>
            <div className="flex items-start gap-2">
              <img src="/src/assets/icons/Featured icon1.png" alt="" className="mt-1 w-4 h-4" />
              <p className="text-xs opacity-90 leading-relaxed font-light">
                <span className="font-semibold mr-1">Địa chỉ:</span> {office.address}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/src/assets/icons/Featured icon2.png" alt="" className="w-4 h-4" />
              <p className="text-xs opacity-90 font-light">
                <span className="font-semibold mr-1">Hotline:</span> {office.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto mt-12 pt-8 border-t border-white/20">
        <p className="text-xs font-light opacity-60">
          ©2024 By Rikkei Academy - Rikkei Education - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
