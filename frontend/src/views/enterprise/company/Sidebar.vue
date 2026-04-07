<template>
  <div>
    <Header class="z-50"></Header>
    <div class="flex">
      <div
        class="min-h-screen sm:min-h-[720px] w-full sm:w-[402px] bg-white shadow-sm"
      >
        <div class="p-4 sm:pt-[24px] sm:px-[32px]">
          <!-- Profile Header -->
          <div class="flex gap-[20px] pb-[24px] border-gray-200 border-b-[1px]">
            <img
              :src="enterprise?.avatar"
              alt="Profile Picture"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            />
            <div>
              <h2 class="text-base sm:text-lg font-[600] sm:text-[18px]">
                {{ enterprise?.title }}
              </h2>
              <p class="text-gray-500 text-[12px] sm:text-[14px] font-[400]">
                {{ enterprise?.email }}
              </p>
            </div>
          </div>

          <!-- Menu Items -->
          <div
            class="flex flex-col gap-[4px] w-full sm:w-[338px] mt-[16px] sm:mt-[24px]"
          >
            <!-- Link to Company Detail (Thông tin cá nhân) -->
            <router-link
              :to="{ name: 'company-detail' }"
              class="block rounded-lg hover:bg-red-50 transition-colors"
            >
              <div
                class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4"
                role="menuitem"
              >
                <span class="text-lg sm:text-xl"></span>
                <span class="flex-1 text-sm sm:text-base"
                  >Thông tin cá nhân</span
                >
              </div>
            </router-link>

            <!-- Link to Enterprise Management (Quản lí CV) -->
            <router-link
              :to="{ name: 'company-job' }"
              class="block rounded-lg hover:bg-red-50 transition-colors"
            >
              <div
                class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4"
                role="menuitem"
              >
                <span class="text-lg sm:text-xl"></span>
                <span class="flex-1 text-sm sm:text-base"
                  >Quản lí tuyển dụng</span
                >
              </div>
            </router-link>

            <!-- Link to Enterprise Certification (Quản lí chứng chỉ) -->
            <router-link
              :to="{ name: 'company-interview-booking' }"
              class="block rounded-lg hover:bg-red-50 transition-colors"
            >
              <div
                class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4"
                role="menuitem"
              >
                <span class="text-lg sm:text-xl"></span>
                <span class="flex-1 text-sm sm:text-base">Lịch phỏng vấn</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from "@/layout/Footer.vue";
import Header from "@/layout/Header.vue";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

const route = useRoute();

const enterprises = computed(() => store.state.enterprise.enterprises);
const enterprise = computed(() =>
  enterprises.value.find((item) => item.id == route.params.id)
);

onMounted(() => {
  store.dispatch("getAllEnterprise");
  router.push(`/company/${route.params.id}/dashboard/detail`);
});
// No additional script needed in this setup
</script>

<style scoped>
.router-link-active {
  background-color: #fff6f7;
  color: #ab1f24;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  transition: background-color 0.3s ease-in-out;
}

@media (min-width: 640px) {
  .router-link-active {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
