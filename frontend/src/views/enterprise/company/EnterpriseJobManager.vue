<template>
  <div class="bg-gray-100 rounded-md w-full">
    <div v-if="isVisible">
      <AddJob
        :isEditting="isEditting"
        :edittedJob="edittedJob"
        @visible="visible"
      />
    </div>
    <div v-else class="rounded-md mx-auto p-4 md:p-5">
      <h2 class="text-xl font-semibold mb-4">Quản lý tin tuyển dụng</h2>

      <div class="bg-white min-h-[800px] rounded-md m-5 p-5">
        <!-- Tabs -->
        <div class="flex flex-wrap space-x-4 border-b">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[
              'p-[12px] font-medium',
              selectedTab === index ? 'border-b-[2px] border-gray-800' : '',
            ]"
            class="relative flex gap-[8px] items-center cursor-pointer"
            @click="selectTab(index)"
          >
            <span>{{ tab.label }}</span>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5"
        >
          <!-- Add Button -->
          <a-button
            @click="openAddJobModal"
            danger
            class="mb-4 sm:mb-0 flex items-center justify-center text-white bg-orange-400"
          >
            <PlusCircleFilled /> Thêm tin tuyển dụng
          </a-button>

          <!-- Search Bar -->
          <div class="mb-4 sm:mb-0 w-full sm:w-auto">
            <div class="relative">
              <span
                class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
              >
                <SearchOutlined />
              </span>
              <input
                type="text"
                v-model="search"
                @input="searching"
                placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề"
                class="w-full sm:w-[454px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        <!-- Job Listings Table -->
        <div class="flex flex-wrap mt-4">
          <div
            class="grid w-full grid-cols-1 sm:grid-cols-[40px_1fr_1fr_1fr] gap-4 items-center py-4 border-btext-center text-sm font-medium"
          >
            <span>
              <svg
                width="40"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7513 7.68333C15.243 7.68333 14.6263  6.61666 15.3763 5.30833C15.8096 4.55 15.5513 3.58333 14.793 3.15L13.3513 2.325C12.693 1.93333 11.843 2.16666 11.4513 2.825L11.3596 2.98333C10.6096 4.29166 9.3763 4.29166 8.61797 2.98333L8.5263 2.825C8.1513 2.16666 7.3013 1.93333 6.64297 2.325L5.2013 3.15C4.44297 3.58333 4.18464 4.55833 4.61797 5.31666C5.3763 6.61666 4.75964 7.68333 3.2513 7.68333C2.38464 7.68333 1.66797 8.39166 1.66797 9.26666V10.7333C1.66797 11.6 2.3763 12.3167 3.2513 12.3167C4.75964 12.3167 5.3763 13.3833 4.61797 14.6917C4.18464 15.45 4.44297 16.4167 5.2013 16.85L6.64297 17.675C7.3013 18.0667 8.1513 17.8333 8.54297 17.175L8.63464 17.0167C9.38464 15.7083 10.618 15.7083 11.3763 17.0167L11.468 17.175C11.8596 17.8333 12.7096 18.0667 13.368 17.675L14.8096 16.85C15.568 16.4167 15.8263 15.4417 15.393 14.6917C14.6346 13.3833 15.2513 12.3167 16.7596 12.3167C17.6263 12.3167 18.343 11.6083 18.343 10.7333V9.26666C18.3346 8.4 17.6263 7.68333 16.7513 7.68333ZM10.0013 12.7083C8.50964 12.7083 7.29297 11.4917 7.29297 10C7.29297 8.50833 8.50964 7.29167 10.0013 7.29167C11.493 7.29167 12.7096 8.50833 12.7096 10C12.7096 11.4917 11.493 12.7083 10.0013 12.7083Z"
                  fill="#676767"
                />
              </svg>
            </span>
            <div>TIN TUYỂN DỤNG</div>
            <div class="">THỜI GIAN HIỂN THỊ</div>
            <div class="">TOÀN BỘ THỜI GIAN HIỂN THỊ</div>
          </div>
        </div>
        <hr class="my-2 w-full" />

        <!-- Job Cards -->
        <div
          v-for="(job, index) in paginatedFilteredJobs"
          :key="index"
          class="grid grid-cols-1 sm:grid-cols-[40px_1fr_1fr_1fr] w-full gap-4 items-center py-4 border-b border-gray-200"
        >
          <!-- Icons Column -->
          <div class="flex flex-col items-center gap-4 h-full">
            <!-- Edit Icon -->
            <svg
              @click="editJob(job)"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 14.6667H2C1.72667 14.6667 1.5 14.44 1.5 14.1667C1.5 13.8933 1.72667 13.6667 2 13.6667H14C14.2733 13.6667 14.5 13.8933 14.5 14.1667C14.5 14.44 14.2733 14.6667 14 14.6667Z"
                fill="#BC2228"
              />
              <path
                d="M12.6804 2.32C11.387 1.02667 10.1204 0.993336 8.79371 2.32L7.98704 3.12667C7.92037 3.19334 7.89371 3.3 7.92038 3.39334C8.42704 5.16 9.84038 6.57334 11.607 7.08C11.6337 7.08667 11.6604 7.09334 11.687 7.09334C11.7604 7.09334 11.827 7.06667 11.8804 7.01334L12.6804 6.20667C13.3404 5.55334 13.6604 4.92 13.6604 4.28C13.667 3.62 13.347 2.98 12.6804 2.32Z"
                fill="#BC2228"
              />
              <path
                d="M10.4056 7.68666C10.2122 7.59332 10.0256 7.49999 9.84558 7.39333C9.69891 7.30666 9.55891 7.21333 9.41891 7.11333C9.30558 7.03999 9.17224 6.93333 9.04558 6.82666C9.03224 6.81999 8.98558 6.77999 8.93224 6.72666C8.71224 6.53999 8.46558 6.29999 8.24558 6.03333C8.22558 6.01999 8.19224 5.97333 8.14558 5.91333C8.07891 5.83333 7.96558 5.69999 7.86558 5.54666C7.78558 5.44666 7.69224 5.29999 7.60558 5.15333C7.49891 4.97333 7.40558 4.79333 7.31224 4.60666C7.18987 4.34443 6.8457 4.26653 6.64108 4.47115L2.89224 8.21999C2.80558 8.30666 2.72558 8.47333 2.70558 8.58666L2.34558 11.14C2.27891 11.5933 2.40558 12.02 2.68558 12.3067C2.92558 12.54 3.25891 12.6667 3.61891 12.6667C3.69891 12.6667 3.77891 12.66 3.85891 12.6467L6.41891 12.2867C6.53891 12.2667 6.70558 12.1867 6.78558 12.1L10.5406 8.34497C10.7411 8.14444 10.6658 7.79942 10.4056 7.68666Z"
                fill="#BC2228"
              />
            </svg>

            <!-- Delete Icon -->
            <svg
              @click="deleteJob(job.id)"
              class="hover:cursor-pointer"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0451 3.48668C12.9718 3.38001 11.8985 3.30001 10.8185 3.24001V3.23334L10.6718 2.36668C10.5718 1.75334 10.4251 0.833344 8.86514 0.833344H7.11848C5.56514 0.833344 5.41848 1.71334 5.31181 2.36001L5.17181 3.21334C4.55181 3.25334 3.93181 3.29334 3.31181 3.35334L1.95181 3.48668C1.67181 3.51334 1.47181 3.76001 1.49848 4.03334C1.52514 4.30668 1.76514 4.50668 2.04514 4.48001L3.40514 4.34668C6.89848 4.00001 10.4185 4.13334 13.9518 4.48668C13.9718 4.48668 13.9851 4.48668 14.0051 4.48668C14.2585 4.48668 14.4785 4.29334 14.5051 4.03334C14.5251 3.76001 14.3251 3.51334 14.0451 3.48668Z"
                fill="#BC2228"
              />
              <path
                d="M12.8211 5.42666C12.6611 5.25999 12.4411 5.16666 12.2145 5.16666H3.7878C3.56114 5.16666 3.33447 5.25999 3.18114 5.42666C3.0278 5.59332 2.94114 5.81999 2.95447 6.05332L3.3678 12.8933C3.44114 13.9067 3.53447 15.1733 5.86114 15.1733H10.1411C12.4678 15.1733 12.5611 13.9133 12.6345 12.8933L13.0478 6.05999C13.0611 5.81999 12.9745 5.59332 12.8211 5.42666ZM9.1078 11.8333H6.8878C6.61447 11.8333 6.3878 11.6067 6.3878 11.3333C6.3878 11.06 6.61447 10.8333 6.8878 10.8333H9.1078C9.38113 10.8333 9.6078 11.06 9.6078 11.3333C9.6078 11.6067 9.38113 11.8333 9.1078 11.8333ZM9.6678 9.16666H6.33447C6.06114 9.16666 5.83447 8.93999 5.83447 8.66666C5.83447 8.39332 6.06114 8.16666 6.33447 8.16666H9.6678C9.94113 8.16666 10.1678 8.39332 10.1678 8.66666C10.1678 8.93999 9.94113 9.16666 9.6678 9.16666Z"
                fill="#BC2228"
              />
            </svg>
          </div>

          <!-- Job Details Column -->
          <div class="text-left">
            <div class="flex items-center space-x-2">
              <!-- Job ID and Status -->
              <span class="text-gray-500">#{{ job.id }}</span>
              <span
                :class="[
                  'ml-2 px-2 py-1 rounded-full text-xs font-semibold',
                  job.flight === 'verified'
                    ? 'bg-green-200 text-green-800'
                    : job.flight === 'pending'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800',
                ]"
              >
                {{
                  job.flight === "verified"
                    ? "Đang hiển thị"
                    : job.flight === "pending"
                    ? "Đang xét duyệt"
                    : "Bị từ chối"
                }}
              </span>
            </div>
            <p class="font-semibold">{{ job.title }}</p>
            <p class="text-gray-500">
              {{ job.quantity }} CV ứng tuyển chưa xem
            </p>
            <button class="text-red-500 font-semibold mt-1">
              Xem CV ({{ job.quantity }})
            </button>
          </div>

          <!-- Display Time Column -->
          <div class="flex text-left flex-col">
            <p class="text-gray-700">Lượt ứng tuyển: {{ job.quantity }}</p>
            <p class="text-gray-500">hiện tại - {{ job.deadline }}</p>
          </div>

          <!-- Full Display Time Column -->
          <div class="flex flex-col text-left">
            <p class="text-gray-700">Lượt ứng tuyển: {{ job.quantity }}</p>
            <p class="text-gray-500">{{ job.deadline }}-hiện tại</p>
          </div>
        </div>

        <!-- Pagination -->
      </div>
      <div class="flex justify-center mt-4">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="px-4 py-2 bg-gray-300 rounded-md mr-4"
        >
          Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center space-x-4">
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="goToPage(page)"
            :class="{
              'px-4 py-2 bg-blue-500 text-white rounded-md':
                currentPage === page,
              'px-4 py-2 bg-gray-300 rounded-md': currentPage !== page,
            }"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="ml-4 px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddJob from "@/components/AddJob.vue";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const isEditting = ref(false);
const edittedJob = ref(null);
const search = ref("");
const searching = () => {
  store.dispatch("searchJob", search.value);
};
const tabs = [
  { label: "Tất cả", flight: null },
  { label: "Đang hiển thị", flight: "verified" },
  { label: "Đang xét duyệt", flight: "pending" },
  { label: "Bị từ chối", flight: "rejected" },
];

const store = useStore();
const jobs = computed(() => store.state.enterprise.jobs);
const selectedTab = ref(0);
const isVisible = ref(false);
const openAddJobModal = () => {
  isVisible.value = true;
};
const route = useRoute();
const { id } = route.params;
const filteredJobsById = computed(() => {
  return jobs.value.filter((j) => {
    return j.enterpriseId == id;
  });
});
const selectTab = (index) => {
  selectedTab.value = index;
};
console.log(filteredJobsById, 999999);

const editJob = (job) => {
  console.log("Edit job", job);
  isEditting.value = true;
  edittedJob.value = job;
  openAddJobModal();
};
const deleteJob = (jobId) => {
  const confirm = window.confirm("Are you sure you want to delete?");
  if (!confirm) {
    return;
  }
  store.dispatch("deleteJob", jobId);
  store.dispatch("getAllJob");
};
const visible = () => {
  isVisible.value = false;
  isEditting.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const filteredJobs = computed(() => {
  const selectedStatus = tabs[selectedTab.value].flight;
  return selectedStatus
    ? filteredJobsById?.value.filter((job) => job.flight === selectedStatus)
    : filteredJobsById?.value;
});
// Phân trang time
const currentPage = ref(1);
const itemsPerPage = 4;
const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage);
});
const fecthJob = () => {
  const start = (currentPage.value - 1) * itemsPerPage;
  store.dispatch("getPaginatedJobs", { start, limit: itemsPerPage });
};
const paginatedFilteredJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const filtered = filteredJobs.value;
  return filtered.slice(start, start + itemsPerPage);
});
const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fecthJob();
};
onMounted(async () => {
  fecthJob;
  await store.dispatch("getAllJob");
});
</script>

<style scoped>
/* Đảm bảo phần tử này tự động điều chỉnh độ cao */
</style>
