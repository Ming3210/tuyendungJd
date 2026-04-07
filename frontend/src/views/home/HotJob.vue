<template>
  <div>
    <!--  -->
    <div class="flex justify-between md:flex-row md:px-[136px] items-center">
      <div>
        <p class="md:text-2xl font-semibold">Việc làm nổi bật</p>
      </div>
      <div class="flex items-center text-red-700 cursor-pointer mt-4 md:mt-0">
        <router-link to="/homepage/listJob" class="mr-2"
          >Xem tất cả</router-link
        >
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </div>
    </div>
    <!--  -->
    <div class="md:px-[133px] md:mb-4 flex justify-between">
      <div class="flex md:gap-4">
        <!-- Các nút khu vực -->
        <button
          :class="{
            'bg-[rgba(188,34,40,1)] text-white': activeLocation === 'random',
            'bg-[rgba(244,244,244,1)] text-gray-600':
              activeLocation !== 'random',
          }"
          class="w-[103px] h-[40px] rounded-lg ac"
          @click="handleRandomFilter"
        >
          Tất cả
        </button>
        <button
          :class="{
            'bg-[rgba(188,34,40,1)] text-white':
              activeLocation === 'Thành phố Hà Nội',
            'bg-[rgba(244,244,244,1)] text-gray-600':
              activeLocation !== 'Thành phố Hà Nội',
          }"
          class="w-[103px] h-[40px] rounded-lg"
          :a="activePagination"
          @click="handleLocationFilter('Thành phố Hà Nội')"
        >
          Hà Nội
        </button>
        <button
          :class="{
            'bg-[rgba(188,34,40,1)] text-white':
              activeLocation === 'Thành phố Hồ Chí Minh',
            'bg-[rgba(244,244,244,1)] text-gray-600':
              activeLocation !== 'Thành phố Hồ Chí Minh',
          }"
          class="w-[127px] h-[40px] rounded-lg"
          @click="handleLocationFilter('Thành phố Hồ Chí Minh')"
        >
          TP Hồ Chí Minh
        </button>
      </div>

      <div class="flex md:w-[276px] h-[48px] justify-between">
        <div class="flex">
          <p class="text-[rgba(145,145,145,1)] font-semibold text-ic">
            Lọc theo:
          </p>
          <p class="text-[rgba(61,61,61,1)] font-semibold text-ic">Địa điểm</p>
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="flex justify-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
        <div
          class="w-full h-auto p-4"
          v-for="(job, index) in jobsWithDaysLeft"
          :key="index"
        >
          <!-- Job Card 1 -->
          <div
            class="bg-white w-[395px] h-[186px] rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow relative"
          >
            <div class="flex gap-5">
              <img
                :src="job.image"
                alt="Job Image for Software Engineer"
                class="rounded-md object-cover mb-4 w-[80px] h-[80px]"
              />
              <div class="justify-between items-start gap-4 mb-3">
                <p
                  @click="handleClick(job.id)"
                  class="!text-[16px] font-semibold text-red-700 leading-tight hover:cursor-pointer"
                >
                  {{ job.title }}
                </p>
                <div class="flex">
                  <!-- Hiển thị tối đa 3 hoặc toàn bộ dựa trên trạng thái isExpanded -->
                  <p
                    v-for="(rank, eduIndex) in isExpanded
                      ? job?.rank
                      : job?.rank?.slice(0, 3)"
                    :key="eduIndex"
                    :class="[
                      'w-[62px] h-[26px] rounded-xl flex justify-center items-center text-[14px] font-semibold',
                      {
                        'bg-[rgba(236,253,243,1)] text-[rgba(2,122,72,1)]':
                          rank === 'Fresher',
                        'bg-[rgba(238,244,255,1)] text-[rgba(53,56,205,1)]':
                          rank === 'Junior',
                        'bg-[rgba(255,246,237,1)] text-[rgba(196,50,10,1)]':
                          rank === 'Middle',
                        'bg-[rgba(245,246,255,1)] text-[#8c70a7]':
                          rank === 'Senior',
                        'bg-[#f1f2f5] text-[#573775]': rank === 'Lead',
                      },
                    ]"
                  >
                    {{ rank }}
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
            </div>
            <div
              class="flex items-center w-[322px] h-[18px] gap-[12px] space-x-2 m-0 p-0 text-[12px] mb-4"
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
              <div class="flex items-center truncate gap-1">
                <span
                  class="w-[16px] h-[16px] bg-[rgba(240,240,240,1)] flex items-center justify-center rounded-full"
                >
                  <div
                    class="w-[16px] h-[16px] bg-[rgba(216,0,39,1)] rounded-full flex items-center justify-center"
                  >
                    <img
                      class="w-[7.31px] h-[6.96px]"
                      src="../../assets/img/vn.svg"
                      alt="Vietnam"
                    />
                  </div>
                </span>

                <div class="truncate">
                  {{ job.province }}
                </div>
              </div>

              <div class="flex items-center">
                <i class="fas fa-briefcase text-[rgba(188,34,40,1)] mr-1"
                  ><font-awesome-icon :icon="['fas', 'briefcase']"
                /></i>
                <div class="truncate">
                  {{ job.workingTime }}
                </div>
              </div>
            </div>
            <p
              v-if="jobsWithDaysLeft"
              class="text-gray-500 w-[265px] text-[12px] h-[18px]"
            >
              Cập nhật {{ job.timeAgo }} - Còn
              <span class="font-semibold text-black">{{ job.daysLeft }}</span>
              ngày để ứng tuyển
            </p>

            <div
              class="absolute w-[32px] top-[140px] h-[32px] flex justify-center items-center right-4 text-gray-400 hover:text-gray-600 heart"
            >
              <div class="bg-[rgba(255,255,255,1)]">
                <font-awesome-icon
                  :icon="['fas', 'heart']"
                  class="text-[rgba(221,221,221,1)] heart-item"
                />
              </div>
            </div>
          </div>
        </div>
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
        v-if="currentPage < activePagination"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const jobs = computed(() => store.state.jobs.jobs);
const currentPage = computed(() => store.state.jobs.currentPage);
const totalPages = computed(() => store.getters.totalPagesJob);
const activeLocation = ref("random");
console.log(store, 999);

const isExpanded = ref(false);
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
const handleLocationFilter = (location) => {
  activeLocation.value = location;
  const currentPage = store.state.jobs.currentPage || 1; // Lấy trang hiện tại từ state hoặc mặc định là trang 1
  store.dispatch("getJobsByLocation", { location, page: currentPage });
};

const calculateTimeAgo = (updateDate) => {
  const updateDateObj = new Date(updateDate); // Chuyển đổi thành đối tượng Date
  // console.log(updateDateObj, "12345");

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
  const result = {}; // Khởi tạo đối tượng rỗng
  jobs.value.forEach((job) => {
    const daysLeft = calculateDaysLeft(job.deadline, job.updateDate); // Tính số ngày còn lại
    const timeAgo = calculateTimeAgo(job.updateDate);

    // Gán đối tượng job với key là job.id
    result[job.id] = { ...job, daysLeft, timeAgo };
  });

  // Chuyển đối tượng result thành mảng và đảo ngược mảng
  const resultArray = Object.values(result).reverse();

  // console.log(resultArray); // In ra mảng đã đảo ngược

  return resultArray;
});
console.log(jobsWithDaysLeft); // In ra jobsWithDaysLeft

// console.log(jobsWithDaysLeft, "33333");

// Tính toán các trang cần hiển thị (bao gồm dấu "...")
const visiblePages = computed(() => {
  const pages = [];
  const range = 1; // Số lượng trang liền kề trước và sau trang hiện tại

  // Nếu trang hiện tại lớn hơn range + 1 thì thêm trang đầu tiên
  if (currentPage.value > range + 1) pages.push(1);

  // Nếu trang hiện tại lớn hơn range + 2 thì thêm dấu "..."
  if (currentPage.value > range + 2) pages.push("...");

  // Thêm các trang liền kề trước và sau trang hiện tại
  for (
    let i = Math.max(1, currentPage.value - range);
    i <= Math.min(totalPages.value, currentPage.value + range);
    i++
  ) {
    pages.push(i);
  }

  // Nếu trang hiện tại gần cuối, thêm dấu "..."

  if (currentPage.value < totalPages.value - range - 1) pages.push("...");
  if (currentPage.value < totalPages.value - range)
    pages.push(totalPages.value);

  return pages;
});

const changePage = (page) => {
  if (page === "...") return; // Không thay đổi trang nếu là "..."
  store.dispatch("getJobsByPage", page);
};
const handleClick = (id) => {
  router.push(`/homepage/listJob/jobDetail/${id}`);
};
const handleRandomFilter = () => {
  activeLocation.value = "random"; // Đặt lại giá trị location về "all" khi lọc theo random
  const currentPage = store.state.jobs.currentPage || 1; // Lấy trang hiện tại từ state hoặc mặc định là trang 1
  store.dispatch("getRandomJobs", { page: currentPage });
  store.dispatch("getJobsByPage", 1);
};

onMounted(() => {
  store.dispatch("getAllUsers");
  store.dispatch("getAllJobs");
});

onMounted(() => {
  // Lấy dữ liệu trang đầu tiên khi component được mount
  store.dispatch("getJobsByPage", 1);
});
</script>

<style scoped>
.header-item {
  color: rgba(188, 34, 40, 1);
  size: 16px;
  font-family: "SF Pro Display", sans-serif;
}
.header-item1 {
  color: rgba(188, 34, 40, 1);
}
.text-ic {
  font-family: "SF Pro Display", sans-serif;
}
.heart {
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
}
.bg-red-700 {
  background-color: #c03428;
}
.text-gray-600 {
  color: rgba(103, 103, 103, 1);
}
</style>
