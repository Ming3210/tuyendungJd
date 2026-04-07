<template>
  <div>
    <div class="w-[1200px] flex gap-[24px] ml-[120px] h-[48px] mx-auto">
      <div
        class="flex gap-[8px] w-[549px] h-[48px] items-center border-2 rounded-md border-[rgba(221,221,221,1)] bg-[rgba(255,255,255,1)] px-[16px] py-[12px]"
      >
        <div>
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="text-[rgba(188,34,40,1)]"
          />
        </div>
        <input
          class="text-[rgba(103,103,103,1)] w-[480px] border-2 border-[rgba(103,103,103,1)] outline-none"
          placeholder="Vị trí ứng tuyển"
          v-model="pQ"
        />
      </div>
      <div
        class="flex w-[227px] gap-[24px] h-[48px] px-[16px] py-[12px] border-[rgba(221,221,221,1)] border-2 bg-[rgba(255,255,255,1)] rounded-md"
      >
        <div class="text-[rgba(103,103,103,1)] w-[155px] h-[24px] gap-[8px]">
          <font-awesome-icon
            :icon="['fas', 'briefcase']"
            class="text-[rgba(188,34,40,1)]"
          />

          <span v-if="selectedIndustries" class="ml-1">
            {{ selectedIndustries || "Tất cả ngành nghề" }}
          </span>
          <span v-else class="ml-1"> Tất cả ngành nghề </span>
        </div>
        <div>
          <font-awesome-icon
            :icon="['fas', 'chevron-down']"
            class="text-[rgba(61,61,61,1)] w-[16px] h-[16px]"
            @click="toggleDropdownId"
          />
        </div>
        <ul
          v-if="showDropdownId"
          class="absolute top-[520px] items-center bg-white text-black w-[13%] shadow-lg rounded-lg z-10 overflow-y-auto max-h-[120px]"
        >
          <li
            v-for="(item, index) in industries"
            :key="index"
            :class="[
              'p-2 hover:bg-gray-200 cursor-pointer',
              { 'bg-blue-100 font-bold': item === selectedIndustries },
            ]"
            @click="selectIndustries(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div
        class="flex w-[204px] gap-[24px] h-[48px] px-[16px] py-[12px] border-[rgba(221,221,221,1)] border-2 bg-[rgba(255,255,255,1)] rounded-md"
      >
        <div
          class="text-[rgba(103,103,103,1)] w-[132px] h-[24px] gap-[8px] truncate"
        >
          <font-awesome-icon
            :icon="['fas', 'location-dot']"
            class="text-[rgba(188,34,40,1)]"
          />
          <span v-if="selectedProvince" class="ml-1">
            {{ selectedProvince }}
          </span>
          <span v-else class="ml-1">
            {{ selectedProvince || "Tất cả địa điểm" }}
          </span>
        </div>
        <div>
          <font-awesome-icon
            :icon="['fas', 'chevron-down']"
            class="text-[rgba(61,61,61,1)] w-[16px] h-[16px]"
            @click="toggleDropdown"
          />
        </div>
        <ul
          v-if="showDropdown"
          class="absolute top-[520px] items-center bg-white text-black w-[13%] shadow-lg rounded-lg z-10 overflow-y-auto max-h-[120px]"
        >
          <li
            v-for="(item, index) in province"
            :key="index"
            :class="[
              'p-2 hover:bg-gray-200 cursor-pointer',
              { 'bg-blue-100 font-bold': item.name === selectedProvince },
            ]"
            @click="selectProvince(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div
        class="w-[140px] h-[48px] flex justify-center border-[rgba(221,221,221,1)] border-2 rounded-md bg-[rgba(171,31,36,1)] text-[rgba(255,255,255,1)]"
      >
        <button @click="searchJobs">Tìm kiếm</button>
      </div>
    </div>
    <!-- ------------------------------- -->
    <div class="flex w-[1200px] h-[56px] justify-between mx-auto mt-[38px]">
      <div class="text-[rgba(0,0,0,1)] text-[24px] font-bold">
        Tất cả việc làm
      </div>
      <div class="flex w-[271px] h-[24px] gap-[16px]">
        <div class="flex w-[179px] h-[20px] gap-[8px]">
          <p>Sắp xếp theo:</p>
          <p>Mới nhất</p>
        </div>
        <div class="w-[60px] h-[24px] gap-[8px]">
          <font-awesome-icon
            @click="disableDisplay()"
            :icon="['fas', 'table-cells-large']"
            :class="{
              'w-[24px] h-[20px]  rounded text-[rgba(188,34,40,1)] border-2 border-[rgba(188,34,40,1)]':
                isSorted == false,
              'w-[24px] h-[20px]  rounded text-[rgba(181,181,181,1)]  border-2 border-[rgba(181,181,181,1)]':
                isSorted == true,
            }"
          />
          <font-awesome-icon
            @click="changeDisplay"
            :icon="['fas', 'table-list']"
            :class="{
              'w-[24px] h-[20px]  rounded text-[rgba(188,34,40,1)] border-2 border-[rgba(188,34,40,1)]':
                isSorted == true,
              'w-[24px] h-[20px]  rounded text-[rgba(181,181,181,1)]  border-2 border-[rgba(181,181,181,1)]':
                isSorted == false,
            }"
          />
        </div>
        <font-awesome-icon
          :icon="['fas', 'rotate-right']"
          class="w-[16px] h-[16px] mt-1"
          @click="refesh"
        />
      </div>
    </div>

    <hr class="my-[10px] mx-[162px] mb-[28px]" />
    <!-- ---------------------------s------- -->
    <div
      :class="{
        'grid grid-cols-1': isSorted,
        'grid grid-cols-3 w-[1220px] mx-auto': !isSorted,
      }"
    >
      <div
        v-for="(job, index) in jobsWithDaysLeft"
        :key="index"
        :class="[
          'mx-auto mb-4 flex justify-between p-[20px] rounded-md border-2',
          { 'border-[rgba(221,221,221,1)]': index === 0 },
          isSorted
            ? 'w-[1200px] h-[160px]'
            : 'w-[384px] flex  h-[186px] relative top-0 right-0 ',
        ]"
      >
        <!-- left -->
        <!-- list -->
        <div
          :class="{
            'flex w-[690px] h-[120px] gap-[20px]': isSorted,
            'flex w-[385px] h-[186px] gap-[20px]': !isSorted,
          }"
        >
          <div
            :class="{
              'w-[120px] h-[80px]': isSorted,
              'w-[80px] h-[80px]': !isSorted,
            }"
          >
            <img
              :src="job.image"
              alt=""
              :class="{
                'w-[80px] h-[80px] rounded-md text-[rgba(221,221,221,1)]':
                  !isSorted,
                'w-[120px] h-[120px] rounded-md text-[rgba(221,221,221,1)]':
                  isSorted,
              }"
            />
          </div>
          <div class="h-[118px] w-[256px]">
            <div class="flex flex-col gap-[8px] w-[256px]">
              <p
                :class="{
                  'text-[18px] text-[rgba(17,17,17,1)] w-[450px] hover:cursor-pointer font-bold h-[28px] m-0':
                    isSorted,
                  'text-[16px] text-[rgba(17,17,17,1)] w-[256px] hover:cursor-pointer font-bold h-[48px] m-0 line-clamp-1':
                    !isSorted,
                }"
                @click="handleClickA(job.id)"
              >
                {{ job.title }}
              </p>
              <div class="flex">
                <!-- Hiển thị tối đa 3 hoặc toàn bộ dựa trên trạng thái isExpanded -->
                <p
                  v-for="(edu, eduIndex) in isExpanded
                    ? job.rank
                    : job.rank?.slice(0, 3)"
                  :key="eduIndex"
                  :class="[
                    'w-[62px] h-[26px] rounded-xl flex justify-center items-center text-[14px] font-semibold',
                    {
                      'bg-[rgba(236,253,243,1)] text-[rgba(2,122,72,1)]':
                        edu === 'Fresher',
                      'bg-[rgba(238,244,255,1)] text-[rgba(53,56,205,1)]':
                        edu === 'Junior',
                      'bg-[rgba(255,246,237,1)] text-[rgba(196,50,10,1)]':
                        edu === 'Middle',
                      'bg-[rgba(245,246,255,1)] text-[#8c70a7]':
                        edu === 'Senior',
                      'bg-[#f1f2f5] text-[#573775]': edu === 'Lead',
                    },
                  ]"
                >
                  {{ edu }}
                </p>
                <!-- Nút hiển thị/ẩn thêm -->
                <div
                  v-if="job.rank?.length > 3"
                  @click="toggleExpanded"
                  class="cursor-pointer w-[27px] h-[26px] rounded-full bg-[rgba(221,221,221,1)] flex justify-center items-center text-[rgba(103,103,103,1)]"
                >
                  {{ isExpanded ? "-" : "+" + (job.rank?.length - 3) }}
                </div>
              </div>
            </div>
            <div
              :class="{
                'flex  flex-col gap-[8px] relative right-[100px]': !isSorted,
                'flex flex-col gap-[8px]': isSorted,
              }"
            >
              <div>
                <div
                  v-if="isSorted"
                  class="flex items-center w-[315px] h-[18px] gap-[12px]"
                >
                  <div class="flex gap-[8px]">
                    <div class="flex items-center justify-center">
                      <font-awesome-icon
                        :icon="['fas', 'clock']"
                        class="text-[rgba(188,34,40,1)]"
                      />
                    </div>
                    <p
                      class="text-[12px] text-[rgba(61,61,61,1)] mt-3.5 w-[126px] h-[18px]"
                    >
                      Cập nhật {{ job.timeAgo }}
                    </p>
                  </div>
                  <div class="flex gap-[8px]">
                    <span
                      class="w-[16px] mt-3.5 h-[16px] bg-[rgba(240,240,240,1)] flex items-center justify-center rounded-full"
                    >
                      <template v-if="vietnamProvinces.includes(job.province)">
                        <div
                          class="w-[16px] h-[16px] bg-[rgba(216,0,39,1)] rounded-full flex items-center justify-center"
                        >
                          <img
                            class="w-[7.31px] h-[6.96px]"
                            src="../../assets/img/vn.svg"
                            alt=""
                          />
                        </div>
                      </template>
                    </span>

                    <p
                      class="text-[12px] text-[rgba(61,61,61,1)] mt-3.5 w-[121px] h-[18px]"
                    >
                      {{ job.province.replace(/^Thành phố\s*|^Tỉnh\s*/, "") }}
                    </p>
                  </div>
                  <div class="flex gap-[8px]">
                    <div class="flex items-center justify-center">
                      <font-awesome-icon
                        :icon="['fas', 'briefcase']"
                        class="text-[rgba(188,34,40,1)]"
                      />
                    </div>
                    <p
                      class="text-[12px] text-[rgba(61,61,61,1)] mt-3.5 w-[94px] h-[18px]"
                    >
                      {{ job.workingTime }}
                    </p>
                  </div>
                </div>
                <div v-else>
                  <div
                    :class="{
                      'flex items-center w-[315px]  h-[18px] gap-[12px] relative left-0':
                        isSorted,
                      'flex items-center w-[292px]  h-[18px] gap-[12px] relative right-0':
                        !isSorted,
                    }"
                  >
                    <div
                      class="flex gap-[8px] items-center w-auto h-[18px] font-semibold"
                    >
                      <i class="fas fa-money-bill">
                        <font-awesome-icon
                          :icon="['fas', 'money-bill']"
                          class="text-[rgba(188,34,40,1)]"
                        />
                      </i>
                      <span class="text-[12px] h-[18px] font-[400] truncate">
                        {{ job.salary }} {{ job.salaryCurrent }}
                      </span>
                    </div>
                    <div class="flex gap-[8px]">
                      <span
                        class="w-[16px] mt-3.5 h-[16px] bg-[rgba(240,240,240,1)] flex items-center justify-center rounded-full"
                      >
                        <template
                          v-if="vietnamProvinces.includes(job.province)"
                        >
                          <div
                            class="w-[16px] h-[16px] bg-[rgba(216,0,39,1)] rounded-full flex items-center justify-center"
                          >
                            <img
                              class="w-[7.31px] h-[6.96px]"
                              src="../../assets/img/vn.svg"
                              alt=""
                            />
                          </div>
                        </template>
                      </span>

                      <p
                        class="text-[12px] text-[rgba(61,61,61,1)] mt-3.5 w-[75px] h-[18px] truncate"
                      >
                        {{ job.province.replace(/^Thành phố\s*|^Tỉnh\s*/, "") }}
                      </p>
                    </div>
                    <div class="flex gap-[8px]">
                      <div class="flex items-center justify-center">
                        <font-awesome-icon
                          :icon="['fas', 'briefcase']"
                          class="text-[rgba(188,34,40,1)]"
                        />
                      </div>
                      <p
                        class="text-[12px] text-[rgba(61,61,61,1)] mt-3.5 w-[94px] h-[18px]"
                      >
                        {{ job.workingTime }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="text-[rgba(132,132,132,1)] flex text-[12px] w-[266px]"
              >
                <p v-if="!isSorted">Cập nhật {{ job.timeAgo }} -&nbsp;</p>
                Còn
                <p class="font-bold ml-1 mr-1">{{ job.daysLeft }}</p>
                ngày để ứng tuyển
              </div>
            </div>
            <div
              v-if="!isSorted"
              class="w-[40px] h-[40px] relative bottom-12 left-52 flex justify-center items-center rounded-md right-4 text-gray-400 hover:text-gray-600 heart border-2 border-[rgba(221,221,221,1)]"
            >
              <div class="bg-[rgba(255,255,255,1)]">
                <font-awesome-icon
                  :icon="['fas', 'heart']"
                  class="heart-item"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- right -->
        <div class="w-[172px] h-[20px] gap-[56px] flex flex-col">
          <div
            v-if="isSorted"
            class="justify-end flex text-[rgba(188,34,40,1)] text-[16px] font-bold"
          >
            {{ job.salary }} {{ job.salaryCurrent }}
          </div>
          <div class="flex gap-[12px]">
            <div
              v-if="isSorted"
              @click="handleClick(job.id)"
              class="w-[120px] h-[40px] hover:cursor-pointer bg-[rgba(171,31,36,1)] text-[rgba(255,255,255,1)] rounded-md flex items-center justify-center"
            >
              Ứng tuyển
            </div>
            <div
              v-if="isSorted"
              class="w-[40px] h-[40px] flex justify-center items-center rounded-md right-4 text-gray-400 hover:text-gray-600 heart border-2 border-[rgba(221,221,221,1)]"
            >
              <div class="bg-[rgba(255,255,255,1)]">
                <font-awesome-icon
                  :icon="['fas', 'heart']"
                  class="heart-item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- Grid H -->
      </div>
    </div>

    <div class="flex items-center md:justify-end space-x-2 md:mr-[130px] mt-5">
      <button
        @click="changePage(currentPage - 1)"
        v-if="currentPage > 1"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
      >
        &lt;
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        :class="{
          'bg-red-100 text-red-700': currentPage === page,
          'bg-gray-100 text-gray-600': currentPage !== page,
        }"
        @click="changePage(page)"
        class="w-8 h-8 flex items-center justify-center rounded-full"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(currentPage + 1)"
        v-if="currentPage < totalPages"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Các dữ liệu và trạng thái từ Vuex
const jobs = computed(() => store.state.jobs.jobs);
const currentPage = computed(() => store.state.jobs.currentPage);
const totalPages = computed(() => store.getters.totalPagesJob);
const industries = computed(() => store.state.jobs.industries);
const province = computed(() => store.state.provinces.provinces);

// Các giá trị lọc
const selectedProvince = ref(route.query.province || "");
const selectedIndustries = ref(route.query.industry || "");
const pQ = ref(route.query.position || "");

// Quản lí trạng thái
const showDropdown = ref(false);
const showDropdownId = ref(false);
const isSorted = ref(false);
const isExpanded = ref(false);

const jobItems = ref([]);
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
const changeDisplay = () => {
  isSorted.value = true;
};
const disableDisplay = () => {
  isSorted.value = false;
};

const calculateTimeAgo = (updateDate) => {
  const updateDateObj = new Date(updateDate); // Chuyển đổi thành đối tượng Date

  const now = new Date(); // Lấy thời gian hiện tại
  const diffTime = now - updateDateObj; // Tính chênh lệch thời gian
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // Số giờ đã trôi qua
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Số ngày đã trôi qua

  if (diffDays > 0) {
    return `${diffDays} ngày trước`;
  } else if (diffHours > 0) {
    return `${diffHours} giờ trước`;
  } else {
    const diffMinutes = Math.floor(diffTime / (1000 * 60)); // Số phút đã trôi qua
    return `${diffMinutes} phút trước`;
  }
};

const calculateDaysLeft = (deadline, updateDate) => {
  const deadlineDate = new Date(deadline.split("/").reverse().join("-")); // Chuyển đổi ngày sang định dạng YYYY-MM-DD
  const updateDateObj = new Date(updateDate); // Chuyển đổi thành đối tượng Date
  const diffTime = deadlineDate - updateDateObj; // Tính chênh lệch thời gian
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Chuyển đổi thành số ngày
  return diffDays >= 0 ? diffDays : 0; // Đảm bảo không có giá trị âm
};
const jobsWithDaysLeft = computed(() => {
  const result = []; // Thay vì đối tượng, sử dụng mảng
  jobs.value.forEach((job) => {
    const daysLeft = calculateDaysLeft(job.deadline, job.updateDate); // Tính số ngày còn lại
    const timeAgo = calculateTimeAgo(job.updateDate);

    // Gán đối tượng job vào mảng result
    result.push({ ...job, daysLeft, timeAgo });
  });

  // Đảo ngược mảng
  return result;
});

const visiblePages = computed(() => {
  const pages = [];
  const range = 1; // Số lượng trang liền kề trước và sau trang hiện tại

  if (currentPage.value > range + 1) pages.push(1);
  if (currentPage.value > range + 2) pages.push("...");

  for (
    let i = Math.max(1, currentPage.value - range);
    i <= Math.min(totalPages.value, currentPage.value + range);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage.value < totalPages.value - range - 1) pages.push("...");
  if (currentPage.value < totalPages.value - range)
    pages.push(totalPages.value);

  return pages;
});
const vietnamProvinces = computed(() => {
  return store.state.provinces.provinces.map((province) => province.name);
});

console.log(store);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const toggleDropdownId = () => {
  showDropdownId.value = !showDropdownId.value;
};

const selectProvince = (provinceName) => {
  selectedProvince.value = provinceName;
  showDropdown.value = false;
};
const selectIndustries = (industriesName) => {
  selectedIndustries.value = industriesName;
  // console.log(selectedIndustries.value);

  showDropdownId.value = false;
};

const handleClick = (id) => {
  router.push(`/homepage/listJob/jobDetail/${id}`);
};

const searchJobs = () => {
  const query = {
    position: pQ.value,
    industry: selectedIndustries.value,
    province: selectedProvince.value,
  };

  store.dispatch("searchJobs", query).then(() => {
    const totalCount = store.state.jobs.totalJobs;
    const perPage = store.state.jobs.limit;
    const totalPages = Math.ceil(totalCount / perPage);
    store.commit("SET_TOTAL_PAGES", totalPages);
  });
};

const handleClickA = async (jobId) => {
  router.push(`/homepage/listJob/jobDetail/${jobId}`);
};

const refesh = () => {
  pQ.value = "";
  selectedIndustries.value = "";
  selectedProvince.value = "";

  store.dispatch("getJobsByPage", 1).then(() => {
    jobItems.value = jobs.value;
  });
};

const changePage = (page) => {
  if (page === "...") return;

  store.dispatch("getJobsByPage", page).then(() => {
    jobItems.value = jobsWithDaysLeft.value;
    nextTick(() => {
      jobItems.value[0]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

onMounted(() => {
  store.dispatch("getJobsByPage", 1);
  store.dispatch("filteredIndustry");
  store.dispatch("getAllProvince").then(() => {
    province.value = store.state.provinces.provinces;
  });
  jobItems.value = jobsWithDaysLeft.value;
});

onMounted(() => {
  store.dispatch("getJobsByPage", 1);
  store.dispatch("filteredIndustry");
});
onMounted(() => {
  store.dispatch("getAllProvince").then(() => {
    province.value = store.state.provinces.provinces;
  });
});
</script>

<style scoped></style>
