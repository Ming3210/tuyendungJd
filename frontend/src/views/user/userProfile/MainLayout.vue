<template>
  <div>
    <Header></Header>
    <div class="flex">
      <Sidebar />

      <router-view
        class="bg-[#fafafa] sm:min-h-[720px] w-full px-[10px] py-[10px]"
      ></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Footer from "@/layout/Footer.vue";

import Header from "@/layout/Header.vue";
</script>

<style scoped></style>
