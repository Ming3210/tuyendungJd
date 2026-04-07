<template>
  <div>
    <Header></Header>
    <div class="flex">
      <Sidebar />
      <div class="content-area flex-1"></div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from "@/layout/Footer.vue";
import Sidebar from "./Sidebar.vue";
import Header from "@/layout/Header.vue";
</script>

<style scoped>
.content-area {
  padding: 16px;
}
</style>
