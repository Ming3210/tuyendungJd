<template>
  <div>
    <Header />
    <div class="relative h-[435px] flex items-center justify-center text-white">
      <div
        class="absolute inset-0 bg-cover bg-center image-banner"
        style="
          background-image: url('https://res-console.cloudinary.com/djppquc7s/thumbnails/v1/image/upload/v1766996354/QmFubmVySmJMaXN0X2t3N2Y4MQ==/drilldown');
          background-position: cover;
          background-size: 100% 260%;
          /* height: 100%; */
        "
      ></div>

      <div
        style="
          background: linear-gradient(
            rgba(19, 12, 45, 1),
            rgba(35, 22, 81, 1),
            rgba(35, 22, 81, 1),
            rgba(19, 12, 45, 1)
          );
        "
        class="absolute inset-0 opacity-50"
      ></div>

      <!-- Nội dung phía trước -->
      <div
        class="relative flex flex-col w-[341px] h-[76px] gap-[4px] mt-[10px]"
      >
        <div>
          <p
            class="text-[rgba(255,255,255,1)] text-[40px] h-[48px] font-bold flex justify-center mb-3"
          >
            Về chúng tôi
          </p>
          <p class="h-[24px] text-[16px] text-[rgba(255,255,255,1)] mb-0">
            Rikkeisoft - Top 3 Doanh nghiệp CNTT tại Việt Nam
          </p>
        </div>
      </div>
    </div>
    <div class="w-[1440px] h-[474px] pt-60 pr-120 pb-80 pl-120">
      <div class="flex gap-[126px]">
        <div class="w-[486px] h-[288px] gap-[24px] flex flex-col">
          <div class="w-[473px] h-[72px] gap-[4px]">
            <p
              class="w-[473px] h-[40px] font-bold text-[32px] mb-1 text-[rgba(17,17,17,1)]"
            >
              CÔNG TY CỔ PHẦN RIKKEISOFT
            </p>
            <p class="w-[296px] h-[28px] text-[rgba(80,80,0,1)]">
              Top 3 Doanh nghiệp CNTT tại Việt Nam
            </p>
          </div>
          <div class="w-[481] h-[192px]">
            <p class="text-[rgba(80,80,0,1)] mb-0">
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
        <div class="w-[584px] h-[388px]">
          <img
            class="rounded-md h-[338px]"
            src="https://s3-alpha-sig.figma.com/img/d9bd/6398/25319407681a7e926336fefb98d451aa?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KmSF6hLrKh1LbMXrj5uW9hG5FRi8jHRodXbxa~K5IXWfhWaHrAvwyuQKBhH4xkTi3qhOEFvWaamRXwGx9mtTUB-puKZN8EaF9pO4aDYW~Rz67pyWUUlYk98HCscuwBcoO7Z5lwquIzbbEjWNL76jrNppXpT-lvUOxJfv2ryGgjcoyhkLY2Dosm2ilw5nqFw46Q3~UtBXtRXQt6O924f1BNVVZa-vt3QcXDpmbopjZYss~3IC2EMZZXf5prXPIre7mPztVLoEMf29IYYDfsuLIc~~J2LtnEFjZld5VoiWSbB5sqGT3mtDP~wf7t2I4m9h~6F~buGPs0ffXG-wrtUEqw__"
            alt=""
          />
        </div>
      </div>
      <img
        class="absolute top-[650px] left-0 z-[-1]"
        src="../assets/banner/decor4.svg"
        alt=""
      />
    </div>
    <div
      class="w-full h-[408px]"
      style="
        background-image: url('https://s3-alpha-sig.figma.com/img/2250/f891/827ff07cd21ae1be104e11e1b601b7c4?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HzjzOBjApatjZmobKjNxInRcD22XEeg4phb6mI78-p2ZqOv7J4tOkfMo8qF3mhnnTpUXMtFGj8-TE3R7w8akpjAlkHPCuVX6BOf5uffSE2JGv7nzXEsmW8~kDFg9Nut4khWPrGjMHF45nt-OUP6BY2j4PTeb7vrCde71BVATDBXbIttDAH5o~lJNOXkRDd-higN8Dk50SpsK9nxqHciZXI2iMJgxMjateokTX73EwXb7cL4bqdx6qrix4f6V9DLduWz0yB3iDtpoqEmGKa7NWned0DL3F83b9jjRiTefNEAw1cHiIYgnzk0PKOKZpzSRZFdxbP63uKF-ZU4H~yXoiw__');
      "
    >
      <div
        class="relative w-[1200px] h-[108px] flex top-[80px] left-[120px] gap-[34px]"
      >
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold mt-0">
            Số lượng nhân viên
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">
            2000
          </p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Dự án đã thực hiện
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">
            1000
          </p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Khách hàng
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">
            500+
          </p>
        </div>
      </div>
      <div
        class="relative w-[1200px] h-[108px] flex top-[120px] left-[120px] gap-[34px]"
      >
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Số năm kinh nghiệm
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">12</p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Văn phòng đại diện tại các thành phố
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">10</p>
        </div>
        <div
          class="w-[379px] h-[108px] bg-[rgba(250,250,250,1)] px-[24px] py-[12px] rounded-md"
        >
          <b class="text-[16px] text-[rgba(80,80,80,1)] font-semibold">
            Tỷ lệ giữ chân khách hàng
          </b>
          <p class="text-[48px] text-[rgba(188,34,40,1)] font-bold mb-0">97%</p>
        </div>
      </div>
    </div>
    <div class="w-full h-[892px] px-[200px] py-[80px] gap-[48px] flex flex-col">
      <div class="flex justify-center">
        <b
          class="w-[322px] h-[40xp] text-[32px] text-[rgba(17,17,17,1)] font-bold"
          >Văn phòng đại diện</b
        >
      </div>
      <div>
        <img
          class="w-[1024px] h-[644px]"
          src="https://s3-alpha-sig.figma.com/img/ff9e/c123/c0debbfa7fba284175b53bd9990a8f9c?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WxdfV4s7al82K-H6NZZB~HJBstRgtf4aczyYbOChlx2AzwMnOre4NGI086ZTLXwRZRt5iim3HquWb76cxa~oB61rQFEHCKlShi4ZQPS3m1BJ0Qn-SbGT~xXZsHE2qCx-zOrXvB-Ch2LVSb47Pr0ZSDObF~w0n8tij0x4~Oe-QsSnRzV6jIvTmUtDxjE83nr9R~m43pVrP9Pbw-ky-Jch8Yt0PtiAc1Vh6tYxLZj7AaaUta3eHwUIA370g-rfJ~WmRboIBMBxroDZqAkZkxXO-RPrTom7XC1qrKQALJgTrYaJQr2-pTLLb07oBq8ku3I550jPU9fGEn2W2VD4MiIJbw__"
          alt=""
        />
      </div>
    </div>
    <div class="w-full h-[921px] relative">
      <div class="w-[1300px] h-[40px] mt-[84px] ml-[120px] flex justify-center">
        <b class="text-[rgba(17,17,17,1)] text-[32px] mb-0 font-bold"
          >HỆ SINH THÁI RIKKEISOFT</b
        >
      </div>
      <div>
        <div class="main-logo">
          <img src="../assets/rk/rk.svg" alt="Rikkei Main Logo" />
        </div>
      </div>
      <div class="absolute top-0 right-0 z-[-1]">
        <img src="../assets/rk/dc.svg" alt="" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<style scoped>
/* .image-banner {
  background-image: linear-gradient(
      to bottom,
      rgba(25, 16, 58, 0.6) rgba(25, 16, 58, 0.5)
    ),
    url("https://s3-alpha-sig.figma.com/img/b0b8/1555/5aa35e46a32f52c6f849aeb687067af2?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R9gdzCvLDumgeInrUkhxqa41LU8y3fFk-S8lKtfXePV2nNpAxnfX3Jr48p91WJKkrF9tXQJ7maIprX19UCTWFu7a~uFaJkgqiMjqSmJUviF3GzSPJIHOiJf9aLHDPZryrTg59KDVwiUurQL2s8GuJ2VucQJxHYOkbvD96wwa2gpyWupxYalX9YKsNpT5TgRukl4Be~-fDOlkarCdLy2qCAZL6NaIeymPWv29vQe8Cz2H45mK7deTK5qpWweLImdAF2hoAc6hwXgB4Bdty4fU1dFvhFK-iGBpn5ZdzjzxTfXi~bpOYsftgPv47DF50TZpvLn3YZEL2R44oEjKKcKK6g__");
} */

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.main-logo {
  position: absolute;
  transform: translate(15%, 20%);
  width: 1200px;
  height: 649px;
}
</style>
