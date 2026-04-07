<template>
  <div class="relative h-[320px] flex items-center justify-center text-white">
    <div
      class="absolute inset-0 image-banner"
      style="
        background-image: url('https://res-console.cloudinary.com/djppquc7s/thumbnails/v1/image/upload/v1766996354/QmFubmVySmJMaXN0X2t3N2Y4MQ==/drilldown');
      "
    ></div>
  
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <!-- Banner content -->
    <div class="relative z-10 text-center w-full px-4 ">
      <h1 class="text-4xl md:text-5xl font-bold mb-2">
        Khơi dậy tiềm lực - Mở lối thành công!
      </h1>
      <p class="text-lg mb-4">
        Rikkei Jobs - đồng hành trên phát triển con đường sự nghiệp của bạn.
      </p>

      <!-- Tag list -->
      <div class="flex justify-center space-x-4">
        <span class="tag">Lương cao</span>
        <span class="tag">Phúc lợi hấp dẫn</span>
        <span class="tag">Môi trường chuyên nghiệp</span>
        <span class="tag">Cơ hội thăng tiến</span>
      </div>
    </div>
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
  background-size: cover;
  background-position: center;
  height: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(25, 65, 138, 0.5),
      rgba(25, 65, 138, 0.5)
    ),
    url("https://res-console.cloudinary.com/djppquc7s/thumbnails/v1/image/upload/v1766996354/QmFubmVySmJMaXN0X2t3N2Y4MQ==/drilldown");
}

.tag {
  display: inline-block;
  background-color: #fff;
  color: #b22222;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 9999px;
  text-align: center;
}
</style>
