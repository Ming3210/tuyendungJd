<template>
  <div class="relative h-[435px] flex items-center justify-center text-white">
    <div
      class="absolute w inset-0 bg-center image-banner"
      style="
        background-image: url('https://s3-alpha-sig.figma.com/img/080b/2e43/c5f7cdd34911a17df7960bd172cd17f9?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=polJ-FC0u~q33DFTskUq33s53U6wX9IGe4iz-9g6DEttp3GdbIns0ZXmaqmBQPBHSQnZM13ZU5wGd4RdSq0Srph6VZy4XZxNieDOZQ1UcH60DhdSEfQfTDuNs1hhpt9TmE2NidpcwVkmR923QRfXvMVj4PT7cI~mNBl0FuNM0j~dli-QNR2NQYbrxdWkB8W-VJl2jsL0TM6vTuRaIG2a1PYiffuvkj754AM6NtEP2yuC7n77oGW5pjgfNe3~EuJaJA2b6ooygOWYQZtppemVSKUE3uM8AVejW1fBIuzfSMTtIhyK0iNJR8fwlpmuosCWIKFMS6jdY0~uVwLKrqE1Xg__');
        background-position: top center;
        background-size: 100% 105%;
        height: 100%;
      "
    ></div>

    <!-- Nội dung banner -->
    <div class="relative text-center w-[565px] h-[80px] z-10">
      <h1 class="text-4xl items-center justify-center flex h-[50px]">
        Ứng viên nổi bật
      </h1>
      <p class="text-lg mt-2 w-[565px] h-[24px]">
        Rikkei Jobs - đồng hành trên phát triển con đường sự nghiệp của bạn.
      </p>
    </div>
    <div class="absolute inset-0 bg-black opacity-50"></div>
  </div>
</template>

<script setup>
import {
  SearchOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped>
.image-banner {
  background-image: linear-gradient(
    to bottom,
    rgba(25, 16, 58, 0.6),
    rgba(25, 16, 58, 0.5)
  );
}
h1 {
  font-family: "SF Pro Display", sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 1%;
  text-align: center;
}
</style>
