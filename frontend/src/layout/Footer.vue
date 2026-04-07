<template>
  <div>
    <footer>
      <div
        class="footer-background flex flex-col gap-5 bg-red-800 text-white p-16"
      >
        <div class="flex flex-col items-start gap-3 border-b border-white pb-4">
          <img width="202.69" height="47" src="@/assets/img/Logo2.png" alt="" />
          <p class="font-normal text-xl">
            KHƠI DẬY TIỀM LỰC - MỞ LỐI THÀNH CÔNG
          </p>
        </div>

        <div class="flex flex-wrap gap-20 border-b border-white pb-4">
          <div class="flex flex-col gap-1">
            <p class="font-medium text-lg">THÔNG TIN LIÊN HỆ</p>
            <ul class="space-y-3">
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon1.png" alt="" />
                <span class="font-semibold text-base">Trụ sở Hà Nội:</span>
                <span class="w-80 text-sm font-normal"
                  >Tầng 7, Tháp A, Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ
                  Liêm, Hà Nội</span
                >
              </li>
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon2.png" alt="" />
                <span class="font-semibold text-base">Hotline:</span>
                <span class="text-sm font-normal">0862 069 233</span>
              </li>
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon3.png" alt="" />
                <span class="font-semibold text-base">Email:</span>
                <span class="text-sm font-normal">academy@rikkeisoft.com</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-1">
            <p class="text-[16px] h-[rgba(255,255,255,1)] font-bold">
              Khóa học
            </p>
            <ul class="space-y-3 font-semibold text-base">
              <li
                class="text-[16px] font-extralight text-[rgba(255,255,255,1)]"
              >
                Cho người mới bắt đầu
              </li>
              <li
                class="text-[16px] font-extralight text-[rgba(255,255,255,1)]"
              >
                Lập trình viên Nhật Bản
              </li>
              <li
                class="text-[16px] font-extralight text-[rgba(255,255,255,1)]"
              >
                Kỹ sư CNTT - PTIT
              </li>
              <li
                class="text-[16px] font-extralight text-[rgba(255,255,255,1)]"
              >
                Data Analysis - HUST
              </li>
              <li
                class="text-[16px] font-extralight text-[rgba(255,255,255,1)]"
              >
                IT Fresher - Rikkei Certificate
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-1">
            <p class="font-medium text-lg">Theo dõi chúng tôi tại</p>
            <div class="flex gap-5">
              <img src="@/assets/icons/facebook.png" alt="" />
              <img src="@/assets/icons/youtube.png" alt="" />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-10 pt-4">
          <div class="flex flex-col gap-1">
            <p class="font-semibold text-base">Cơ sở 1</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon1.png" alt="" />
                <span class="font-semibold text-sm">Địa chỉ:</span>
                <span class="w-72 text-xs font-normal"
                  >Tầng 7, Tháp A, Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ
                  Liêm, Hà Nội</span
                >
              </li>
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon2.png" alt="" />
                <span class="font-semibold text-sm">Hotline:</span>
                <span class="text-xs font-normal">0862 069 233</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-1">
            <p class="font-semibold text-base">Cơ sở 2</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon1.png" alt="" />
                <span class="font-semibold text-sm">Địa chỉ:</span>
                <span class="w-72 text-xs font-normal"
                  >Tầng 22, Tháp A, Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Quận
                  Nam Từ Liêm, Hà Nội</span
                >
              </li>
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon2.png" alt="" />
                <span class="font-semibold text-sm">Hotline:</span>
                <span class="text-xs font-normal">0862 069 233</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-1">
            <p class="font-semibold text-base">Cơ sở 3</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <img src="@/assets/icons/Featured icon1.png" alt="" />
                <span class="font-semibold text-sm">Địa chỉ:</span>
                <span class="w-72 text-xs font-normal">
                  Tầng 3, tòa TSA Building, số 77 Lê Trung Nghĩa, Phường 12, Tân
                  Bình, TP Hồ Chí Minh
                </span>
              </li>
              <li class="flex items-center gap-2">
                <img src="@/assets/icons/Featured icon2.png" alt="" />
                <span class="font-semibold text-sm">Hotline:</span>
                <span class="text-xs font-normal">0962 703 893</span>
              </li>
            </ul>
          </div>
        </div>

        <p class="text-xs font-normal absolute mt-[600px]">
          @2024 By Rikkei Academy - Rikkei Education - All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const backgroundImageUrl =
  "https://s3-alpha-sig.figma.com/img/4ff7/a8d7/4e33919d5c6225d63f4757d978faa98f?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bbv1qFIAOElLgVpePpKwnbumcvf-Lv4tiIuFGz2vpi-kSdQp5v~e3Q4U8HbBtD99u15Lhu6h2p4iH-EySnM1SuiYd~Yom4ocMkcivXTA8mZXVcX5aNKEeHqZnNF9cC9IDf8-YIQvlVUQZwenlWZQYGgSv5tiRkR4rv04kDgnifblYXLrdIiVzxJdq6XAAfKHvR5GSuektYpEGLvDLom7smkIlVPVFxKKiHowrCppuMs9KIf4bz3pQvZ3pkn9IBcdhJomf4XMeuO~d1gKGA4e5p1CSzqidwdEYsfdSf-8YlqFQ~Q1fAC386YCIa5RvTIugg5VINLJUodUy927VvkSPQ__";
</script>

<style scoped>
.footer-background {
  background-color: rgba(171, 31, 36, 1);
  background-image: url("https://s3-alpha-sig.figma.com/img/4ff7/a8d7/4e33919d5c6225d63f4757d978faa98f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j--rboeNyEBTmibTbPiuIejKlJs0v4pEWJzUh5xCZx8S9QyhNfPT4PAJML6YLLrO9d2np5IHV1zOIcR~sdairw53h~jBgxhsBxm4OXX5CpmOTcfCGQFt4VKiVYF-x6BQUACzSD8ozgebSlYlyqestiXsEpUgYyQEWegGGSB2DSvAwl4dCR56yjz-LRiCHnZyZHKS4NtwMDzPQTBhnA8WUOaFyWkuONYi2b7nMGCvuCcPxeGUi1Ol~p9pjP239MjcjD9t2MnirtXvMa4I6QNUrb8K5u01eqmZjMOvRXNg5YRvaW~pFbhpAgHjPwL17JVRlQZhyyY7cQ7zpAxTxvkBMg__");
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
}
</style>
