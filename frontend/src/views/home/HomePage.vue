<template>
  <div>
    <router-view />
    <Header />
    <Banner />
    <hot-job class="mt-10" />
    <hot-candidate class="mt-10" />
    <outstandingnumbers />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layout/Header.vue";
import Banner from "@/layout/Banner.vue";
import HotJob from "./HotJob.vue";
import HotCandidate from "./HotCandidate.vue";
import outstandingnumbers from "./Outstandingnumbers.vue";
import Footer from "@/layout/Footer.vue";
</script>

<style></style>
