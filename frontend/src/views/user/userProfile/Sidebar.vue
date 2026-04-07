<template>
  <div class="bg-white border-solid">
    <div class="p-4 sm:pt-[24px] sm:px-[32px]">
      <div class="flex gap-[10px] border-gray-100 mb-[-10px]">
        <img
          :src="user.avatar"
          alt="Profile Picture"
          class="w-12 h-12 rounded-full object-cover"
        />

        <div class="leading-[0.5]">
          <h2 class="text-lg font-[600] text-[18px]">
            {{ user.fullName }}
          </h2>
          <p class="text-gray-500 text-[14px] font-[400]">
            {{ user.email }}
          </p>
        </div>
      </div>
      <a-divider></a-divider>

      <div
        class="flex flex-col gap-[10px] w-full sm:w-[338px] mt-[16px] sm:mt-[24px]"
      >
        <router-link
          to="/profile/information"
          class="block rounded-lg hover:bg-red-50 transition-colors no-underline font-semibold"
          active-class="router-link-active"
        >
          <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
            <IdcardOutlined />
            <span class="flex-1">Thông tin cá nhân</span>
          </div>
        </router-link>
        <router-link
          v-if="user?.role !== `partner`"
          to="/profile/cv"
          class="block rounded-lg hover:bg-red-50 transition-colors no-underline font-semibold"
          active-class="router-link-active"
        >
          <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
            <FileTextOutlined />
            <span class="flex-1 text-sm sm:text-base">Quản lý CV</span>
          </div>
        </router-link>
        <router-link
          v-if="user?.role !== `partner`"
          to="/profile/certificate"
          class="block rounded-lg hover:bg-red-50 transition-colors no-underline font-semibold"
          active-class="router-link-active"
        >
          <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
            <SafetyCertificateOutlined />
            <span class="flex-1 text-sm sm:text-base">Quản lý chứng chỉ</span>
          </div>
        </router-link>
        <router-link
          v-if="user?.role == `partner`"
          to="/profile/enterprise-management"
          class="block rounded-lg hover:bg-red-50 transition-colors no-underline font-semibold"
          active-class="router-link-active"
        >
          <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
            <ContainerOutlined />
            <span class="flex-1 text-sm sm:text-base"
              >Quản lí doanh nghiệp</span
            >
          </div>
        </router-link>

        <router-link
          v-if="user?.role !== `partner`"
          to="/profile/interview"
          class="block rounded-lg hover:bg-red-50 transition-colors no-underline font-bold"
          active-class="router-link-active"
        >
          <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
            <CalendarOutlined />
            <span class="flex-1 text-sm sm:text-base">Lịch phỏng vấn</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

import { computed, onMounted, ref, reactive, onBeforeMount } from "vue";
import {
  CalendarOutlined,
  ContainerOutlined,
  FileTextOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const store = useStore();
const loggedUser = computed(() => {
  const users = store.state.login.users;
  const loggedUserId = JSON.parse(localStorage.getItem("token"));
  return users.find((u) => u.id == loggedUserId);
});
// console.log(loggedUser);
const router = useRouter();
const userLoginId = ref(JSON.parse(localStorage.getItem("token")));
const getterUser = computed(() => store.getters.User || []);
const user = computed(() => store.getters.User || []);
// console.log("test2", user.value);
onMounted(() => {
  store.dispatch("getUser", userLoginId.value);
  router.push(`/profile/information`);
});
</script>

<style scoped>
.router-link-active {
  background-color: #fff6f7;
  color: #ab1f24;
  font-weight: 600;

  transition: background-color 0.3s ease-in-out;
}

@media (min-width: 640px) {
  .router-link-active {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
