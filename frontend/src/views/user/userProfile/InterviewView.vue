<template>
  <div class="relative w-full h-full">
    <div class="bg-custom p-6 z-0">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex justify-between">
          <div>
            <h2 class="text-[18px] font-[600]">Lịch phỏng vấn</h2>
            <p class="font-[400] text-[16px] text-gray-700">
              Theo dõi lịch phỏng vấn mới nhất của bạn
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-5 mb-[5px]">
          <div
            v-for="inter in interview"
            :key="inter.id"
            class="bg-white rounded-lg p-[20px] inline-block w-[300px]"
          >
            <p>{{ inter.status }}</p>
            <div class="flex gap-[13px] p-0">
              <img
                :src="getAvatar(inter.enterpriseId)"
                alt="Profile Picture"
                class="w-12 h-12 rounded-lg object-cover"
              />
              <div class="leading-none inline-block h-[60px]">
                <h2 class="font-extrabold line-clamp-2">
                  {{ getJobByName(inter.jobId) }}
                </h2>
                <p class="text-gray-500 text-[13px] font-[400] line-clamp-2">
                  {{ getEnterpriseName(inter.enterpriseId) }}
                </p>
              </div>
            </div>
            <a-divider class="my-2"></a-divider>
            <div class="overflow-hidden flex">
              <div class="flex flex-col">
                <label><CalendarFilled class="icon" /> Ngày:</label>
                <label> <ClockCircleFilled class="icon" />Thời gian:</label>
                <label><EnvironmentFilled class="icon" />Địa điểm:</label>
              </div>

              <div class="flex flex-col">
                <span>{{ inter.date ? inter.date : "chờ xác nhận" }} </span>
                <span>{{ inter.time ? inter.time : "chờ xác nhận" }}</span>
                <a href="/" target="_blank">{{
                  inter.meetingLink ? inter.meetingLink : "chờ xác nhận"
                }}</a>
              </div>
            </div>
            <!--  -->
          </div>
        </div>

        <!-- <a-pagination
          v-if="cv.length > 0"
          :current="current"
          :total="totalCvs"
          :page-size="pageSize"
          @change="handlePageChange"
          show-less-items
          class="text-end mr-[100px]"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CalendarFilled,
  ClockCircleFilled,
  EnvironmentFilled,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const interview = computed(() => store.getters.Interview);
const jobs = computed(() => store.getters.Job);
const enterprises = computed(() => store.getters.Enterprises);
console.log("test", store);
const getJobByName = (jobId) => {
  const job = jobs.value.find((job) => job.id === jobId);
  // console.log(jobId);
  // console.log(job);
  return job.title || "unknow";
};
const getEnterpriseName = (enterpriseId) => {
  const enterprise = enterprises.value.find((item) => item.id === enterpriseId);
  // console.log(jobId);
  // console.log(job);
  return enterprise?.title || "unknow";
};
const getAvatar = (enterpriseId) => {
  const enterprise = enterprises.value.find((item) => item.id === enterpriseId);
  // console.log(jobId);
  // console.log(job);
  return enterprise?.avatar;
};

onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem("token"));
  await store.dispatch("getAllJobs");
  await store.dispatch("getAllEnterprise");
  if (userId) {
    await store.dispatch("getUser", userId);
    await store.dispatch("getInterview");
  }
});
</script>
<style scoped>
label {
  display: inline-block;
  width: 100px;

  margin-bottom: 4px;
  /* padding-bottom: 4px; */
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  /* border: 1px solid; */
}
span {
  /* margin-bottom: 6px; */
  padding: 2.5px 0;
  font-size: 14px;
  color: rgba(61, 61, 61, 1);
  /* border: 1px solid; */
}
a {
  /* margin-bottom: ; */
  font-size: 14px;
  color: rgba(61, 61, 61, 1);
  text-decoration: underline;
  cursor: pointer;
}
.icon {
  color: rgba(188, 34, 40, 1);
}
</style>
