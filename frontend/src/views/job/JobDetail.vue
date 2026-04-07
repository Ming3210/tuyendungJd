<template>
  <div>
    <Header class="mb-[40px]" />
    <div class="flex w-[550px] h-[28px] gap-[8px] ml-[160px] mb-[40px]">
      <router-link
        to="/homepage"
        class="text-[rgba(167,167,167,1)] flex justify-center w-[75px] h-[28px]"
      >
        Trang chủ
      </router-link>
      <div>
        <font-awesome-icon
          :icon="['fas', 'angle-right']"
          class="text-[rgba(167,167,167,1)] w-[16px] h-[16px] mt-1"
        />
      </div>
      <router-link
        to="/homepage/listJob"
        class="text-[rgba(167,167,167,1)] w-[62px] h-[28px]"
        >Việc làm</router-link
      >
      <div>
        <font-awesome-icon
          :icon="['fas', 'angle-right']"
          class="text-[rgba(167,167,167,1)] w-[16px] h-[16px] mt-1"
        />
      </div>
      <p
        class="text-[rgba(61,61,61,1)] text[18px] font-semibold min-w-[347px] h-[28px]"
      >
        {{ job?.title }}
      </p>
    </div>
    <div class="flex gap-[4px]">
      <div>
        <div
          class="w-[792px] h-[140px] flex justify-between border-2 border-[rgba(221,221,221,1)] ml-[160px] rounded-md p-[24px]"
        >
          <div class="w-[379px] h-[88px] flex gap-[16px]">
            <img class="w-[88px] h-[88px] rounded-sm" :src="job?.image" />
            <div class="w-[275px] h-[88px]">
              <div class="w-[275] h-[58px] flex flex-col gap-[8px]">
                <p
                  class="text-[18px] w-[400px] h-[28px] text-[rgba(17,17,17,1)] font-bold mb-0"
                >
                  {{ job?.title }}
                </p>
                <div class="flex w-[275px] gap-[12px]">
                  <div
                    v-for="(edu, index) in job?.rank"
                    :key="index"
                    class="flex mt-0 mb-0"
                  >
                    <div class="h-[26px] flex flex-row">
                      <p
                        :class="[
                          ' text-[12px] w-[64px] h-[26px] border-2 rounded-lg flex justify-center items-center',
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
                    </div>
                  </div>
                </div>
                <div class="w-161px h-[18px] flex gap-[8px]">
                  <p>
                    <font-awesome-icon
                      :icon="['fas', 'clock']"
                      class="text-[rgba(132,132,132,1)]"
                    />
                  </p>
                  <p class="text-[rgba(132,132,132,1)] text-[12px] mt-1">
                    Hạn nộp hồ sơ : {{ job?.deadline }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="loggedUser?.role === 'user'"
            class="w-[165px] h-[92px] hover:cursor-pointer"
          >
            <p
              v-if="hasApplied"
              class="w-[165px] h-[40px] bg-[#1e6d2a] gap-[8px] text-[rgba(255,255,255,1)] rounded-md justify-center items-center flex"
            >
              <font-awesome-icon :icon="['fas', 'check-circle']" />
              Đã ứng tuyển
            </p>
            <p
              v-else
              class="w-[165px] h-[40px] bg-[rgba(171,31,36,1)] gap-[8px] text-[rgba(255,255,255,1)] rounded-md justify-center items-center flex"
              @click="applyForJob"
            >
              <font-awesome-icon :icon="['fas', 'paper-plane']" />
              Ứng tuyển ngay
            </p>
            <p
              class="w-[165px] h-[40px] bg-[rgba(255,255,255,1)] border-2 border-[rgba(103,103,103,1)] gap-[8px] text-[rgba(103,103,103,1)] rounded-md justify-center items-center flex"
            >
              <font-awesome-icon :icon="['fas', 'heart']" />
              Lưu tin
            </p>
          </div>
        </div>
        <div
          class="w-[190px] h-[36px] text-[rgba(17,17,17,1)] text-[18px] ml-[160px] font-bold border-l-4 flex justify-center items-center border-[rgba(188,34,40,1)] mt-7"
        >
          Chi tiết tuyển dụng
        </div>
        <div
          class="w-[792px] h-[284px] mt-7 p-[24px] bg-[rgba(255,246,247,1)] ml-[160px] rounded-lg flex flex-col border-2 mb-[50px]"
        >
          <div
            class="w-[118px] h-[24px] text-[rgba(17,17,17,1)] text-[16px] font-bold"
          >
            Thông tin chung
          </div>
          <div class="w-[581px] h-[192px] mt-4 flex justify-between">
            <div class="w-[193px] h-[192px] gap-[24px] flex flex-col">
              <div class="w-[193px] h-[48px] flex gap-3">
                <div
                  class="w-[48px] h-[48px] bg-[rgba(248,233,234,1)] text-[rgba(188,34,40,1)] flex justify-center items-center rounded-xl"
                >
                  <font-awesome-icon :icon="['fas', 'money-bill']" />
                </div>
                <div
                  class="w-[128px] h-[48px] gap-[4px] flex flex-col items-center"
                >
                  <p
                    class="w-[125px] h-[20px] text-[rgba(61,61,61,1)] text-[14px] mb-0"
                  >
                    Mức lương
                  </p>
                  <p
                    class="w-[128px] h-[24px] ml-0 text-[rgba(17,17,17,1)] text-[16px] font-bold mb-0"
                  >
                    {{ job?.salary }} {{ job?.salaryCurrent }}
                  </p>
                </div>
              </div>
              <div class="w-[173px] h-[48px] gap-3 flex">
                <div
                  class="w-[48px] h-[48px] bg-[rgba(248,233,234,1)] text-[rgba(188,34,40,1)] flex justify-center items-center rounded-xl"
                >
                  <font-awesome-icon :icon="['fas', 'briefcase']" />
                </div>
                <div
                  class="w-[112px] h-[48px] gap-[4px] flex-col flex justify-center items-center"
                >
                  <p
                    class="w-[112px] h-[20px] text-[rgba(61,61,61,1)] text-[14px] mb-0"
                  >
                    Hình thức làm việc
                  </p>
                  <p
                    class="w-[112px] h-[24px] ml-0 text-[rgba(17,17,17,1)] text-[16px] font-bold mb-0"
                  >
                    {{ job?.workingTime }}
                  </p>
                </div>
              </div>
              <div class="w-[173px] h-[48px] flex gap-3">
                <div
                  class="w-[48px] h-[48px] bg-[rgba(248,233,234,1)] text-[rgba(188,34,40,1)] flex justify-center items-center rounded-xl"
                >
                  <font-awesome-icon :icon="['fas', 'venus-mars']" />
                </div>
                <div class="w-[112px] h-[48px] gap-[4px] flex-col flex">
                  <p
                    class="w-[112px] h-[20px] text-[rgba(61,61,61,1)] text-[14px] mb-0"
                  >
                    Giới tính
                  </p>
                  <p
                    class="w-112px h-[24px] ml-0 text-[rgba(17,17,17,1)] text-[16px] font-bold mb-0"
                  >
                    {{ job?.gender }}
                  </p>
                </div>
              </div>
            </div>
            <!-- --------------------- -->
            <div class="w-[173px] h-[192px] gap-[24px] flex flex-col">
              <div class="w-[173px] h-[48px] flex gap-3">
                <div
                  class="w-[48px] h-[48px] bg-[rgba(248,233,234,1)] text-[rgba(188,34,40,1)] flex justify-center items-center rounded-xl"
                >
                  <font-awesome-icon :icon="['fas', 'users']" />
                </div>
                <div
                  class="w-[112px] h-[48px] gap-[4px] flex justify-center flex-col items-center"
                >
                  <p
                    class="w-[112px] h-[20px] text-[rgba(61,61,61,1)] text-[14px] mb-0"
                  >
                    Số lượng tuyển
                  </p>
                  <p
                    class="w-[112px] h-[24px] ml-0 text-[rgba(17,17,17,1)] text-[16px] font-bold mb-0"
                  >
                    {{ job?.quantity }} người
                  </p>
                </div>
              </div>
              <div class="w-[173px] h-[48px] gap-3 flex">
                <div
                  class="w-[48px] h-[48px] bg-[rgba(248,233,234,1)] text-[rgba(188,34,40,1)] flex justify-center items-center rounded-xl"
                >
                  <font-awesome-icon :icon="['fas', 'medal']" />
                </div>
                <div
                  class="w-[120px] text-wrap h-[48px] gap-[4px] flex-col flex justify-center items-center"
                >
                  <p
                    class="w-[112px] h-[20px] text-[rgba(61,61,61,1)] text-[14px] mb-0"
                  >
                    Cấp bậc
                  </p>
                  <p
                    class="w-[112px] h-[24px] ml-0 text-[rgba(17,17,17,1)] text-[16px] font-bold mb-0"
                  >
                    {{ job?.skills }}
                  </p>
                </div>
              </div>
              <div class="w-[173px] h-[48px] flex gap-3">
                <div
                  class="w-[48px] h-[48px] bg-[rgba(248,233,234,1)] text-[rgba(188,34,40,1)] flex justify-center items-center rounded-xl"
                >
                  <font-awesome-icon :icon="['fas', 'award']" />
                </div>
                <div
                  class="w-[112px] h-[48px] gap-[4px] flex-col flex justify-center items-center"
                >
                  <p
                    class="w-[112px] h-[20px] text-[rgba(61,61,61,1)] text-[14px] mb-0"
                  >
                    Kinh nghiệm
                  </p>

                  <p
                    class="w-[115px] h-[24px] ml-0 text-[rgba(17,17,17,1)] text-[16px] font-bold mb-0"
                  >
                    {{ jobRankDuration }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[792px] ml-[160px] gap-[12px]">
          <p class="text-[16px] text-[rgba(17,17,17,1)] font-bold">
            Mô tả công việc
          </p>
          <div class="ml-2">
            <ul
              v-for="(des, index) in job?.description"
              :key="index"
              class="list-disc pl-4 text-[rgba(45,44,44,1)] text-[16px]"
            >
              <li class="mb-2">{{ des }}</li>
            </ul>
          </div>
        </div>

        <div class="w-[792px] ml-[160px] gap-[12px] mt-[40px]">
          <p class="text-[16px] text-[rgba(17,17,17,1)] font-bold">
            Yêu cầu ứng viên
          </p>
          <div class="ml-2">
            <ul
              v-for="(des, index) in job?.required"
              :key="index"
              class="list-disc pl-4 text-[rgba(45,44,44,1)] text-[16px]"
            >
              <li class="mb-2">{{ des }}</li>
            </ul>
          </div>
        </div>

        <div class="w-[792px] ml-[160px] gap-[12px] mt-[40px] mb-[40px]">
          <p class="text-[16px] text-[rgba(17,17,17,1)] font-bold">Quyền lợi</p>
          <div class="ml-2">
            <ul
              v-for="(bd, index) in job?.benefitsDescription"
              :key="index"
              class="list-disc pl-4 text-[rgba(45,44,44,1)] text-[16px]"
            >
              <li class="mb-2">{{ bd }}</li>
            </ul>
          </div>
        </div>

        <div class="w-[792px] h-[60px] ml-[160px] mb-[30px]">
          <p class="text-[rgba(17,17,17,1)] font-bold">Địa điểm làm việc</p>
          <li class="text-[rgba(45,44,44,1)] text-[16px]">
            {{ job?.province }}: {{ job?.district }}
          </li>
        </div>
        <div class="w-[792px] h-[60px] ml-[160px] mb-[30px]">
          <p class="text-[rgba(17,17,17,1)] font-bold">Thời gian làm việc</p>
          <li class="text-[rgba(45,44,44,1)] text-[16px]">
            {{ job?.workingTime }}
          </li>
        </div>
        <div class="w-[792px] h-[60px] ml-[160px] mb-[50px]">
          <p class="text-[rgba(17,17,17,1)] font-bold">Cách thức ứng tuyển</p>
          <li class="text-[rgba(45,44,44,1)] text-[16px]">
            Ứng viên nộp hồ sơ trực tuyến bằng cách bấm
            <span class="text-[16px] text-[rgba(45,44,44,1)] font-bold"
              >Ứng tuyển ngay</span
            >
            dưới đây.
          </li>
          <li class="text-[rgba(45,44,44,1)] text-[16px]">
            Hạn nộp hồ sơ: {{ job?.deadline }}
          </li>
        </div>

        <div class="w-[346px] h-[40px] flex gap-[16px] ml-[160px] mb-[50px]">
          <p
            v-if="hasApplied"
            class="w-[165px] h-[40px] bg-[#1e6d2a] gap-[8px] text-[rgba(255,255,255,1)] rounded-md justify-center items-center flex"
          >
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            Đã ứng tuyển
          </p>
          <p
            v-else
            class="w-[165px] hover:cursor-pointer h-[40px] bg-[rgba(171,31,36,1)] gap-[8px] text-[rgba(255,255,255,1)] rounded-md justify-center items-center flex"
            @click="applyForJob"
          >
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
            Ứng tuyển ngay
          </p>
          <p
            class="w-[165px] h-[40px] hover:cursor-pointer bg-[rgba(255,255,255,1)] border-2 border-[rgba(103,103,103,1)] gap-[8px] text-[rgba(103,103,103,1)] rounded-md justify-center items-center flex"
          >
            <font-awesome-icon :icon="['fas', 'heart']" />
            Lưu tin
          </p>
        </div>
      </div>
      <div class="flex gap-5 flex-col">
        <div
          class="w-[164px] h-[30px] ml-4 text-[20px] text-[rgba(0,0,0,1)] font-bold flex"
        >
          Việc làm liên quan
        </div>
        <div
          v-for="(job, index) in filteredRelatedJobs"
          :key="index"
          class="w-[410px] h-[186px] mb-[30px] p-4"
        >
          <div
            class="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow relative"
          >
            <div class="flex gap-5">
              <!-- Job Image -->
              <img
                :src="job.image"
                alt="Job Image"
                class="rounded-md object-cover mb-4 w-[80px] h-[80px]"
              />

              <!-- Job Title and Level -->
              <div class="justify-between items-start gap-4 mb-3">
                <h3
                  @click="handleClick(job.id)"
                  class="!text-[16px] font-semibold text-red-700 leading-tight hover:cursor-pointer"
                >
                  {{ job.title }}
                </h3>
                <div class="flex">
                  <span
                    v-for="(edu, index) in job.rank?.slice(0, 3)"
                    :key="index"
                    :class="[
                      ' px-3 py-1 rounded-full text-sm font-medium',
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
                  </span>
                  <div
                    v-if="job.rank?.length > 3"
                    class="w-[27px] h-[26px] rounded-full bg-[rgba(221,221,221,1)] flex justify-center items-center text-[rgba(103,103,103,1)]"
                  >
                    +{{ job.rank?.length - 3 }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Job Icons and Details -->
            <div
              class="flex items-center w-[362px] gap-[12px] space-x-2 text-[12px] mb-4"
            >
              <div
                class="flex gap-[8px] items-center w-[90px] h-[18px] font-semibold"
              >
                <i class="fas fa-money-bill text-[rgba(188,34,40,1)]">
                  <font-awesome-icon :icon="['fas', 'money-bill']" />
                </i>
                <span class="text-[12px] h-[18px] font-[400] truncate"
                  >{{ job.salary }} {{ job.salaryCurrent }}</span
                >
              </div>
              <div class="flex items-center w-[135px]">
                <span
                  class="w-[16px] h-[16px] bg-[rgba(240,240,240,1)] flex items-center justify-center rounded-full"
                >
                  <p
                    class="bg-[rgba(216,0,39,1)] m-0 p-0 rounded-full w-[8px] h-[8px] z-50"
                  ></p>
                </span>
                <div class="truncate">{{ job.province }}</div>
              </div>
              <div class="flex items-center">
                <i class="fas fa-briefcase text-[rgba(188,34,40,1)] mr-1"
                  ><font-awesome-icon :icon="['fas', 'briefcase']"
                /></i>
                {{ job.workingTime }}
              </div>
            </div>

            <!-- Update Date and Deadline -->
            <p class="text-[rgba(132,132,132,1)] text-sm">
              Cập nhật {{ job.timeAgo }} - Còn
              <span class="font-semibold text-black"
                >{{ job.daysLeft }} ngày</span
              >
              để ứng tuyển
            </p>

            <!-- Bookmark Icon -->
            <button
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <i class="far fa-heart text-lg"></i>
            </button>

            <!-- Badge Icon (optional if needed) -->
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import axios from "axios";
const store = useStore();
const route = useRoute();
const router = useRouter();
const applied = ref(false);
const jobId = ref(route.params.id);
const cv = computed(() => store.state.user.cv);
const jobs = computed(() => store.state.jobs.jobs);
const itvs = computed(() => store.state.interviewBooking.interviewBookings);
const job = computed(() => {
  return jobs.value.find((job) => job.id == jobId.value);
});
const userId = JSON.parse(localStorage.getItem("token"));
const loggedUser = computed(() => {
  const users = store.state.login.users;
  const loggedUserId = JSON.parse(localStorage.getItem("token"));
  return users.find((u) => u.id == loggedUserId);
});
console.log(loggedUser);

const jobRankDuration = computed(() => {
  if (job.value && job.value.skills) {
    // Xử lý trường hợp skills là một chuỗi
    let skill = job.value.skills;
    // console.log(skill);

    switch (skill) {
      case "Mới tốt nghiệp":
        return "1 năm";
      case "Sơ cấp":
        return "1 năm";
      case "Trung cấp":
        return "2 năm";
      case "Cao cấp":
        return "3 năm";
      case "Lead":
        return "5 năm";
      default:
        return "Không xác định";
    }
  }
  return "Không có dữ liệu công việc";
});

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
  // console.log(result);

  // Nếu có job hiện tại, thêm logic lọc công việc liên quan
  if (job.value) {
    const related = Object.values(result)
      .filter(
        (j) => j.industry === job.value.industry && j.id !== job.value.id // Loại bỏ chính công việc hiện tại
      )
      .slice(0, 3); // Lấy tối đa 3 công việc liên quan
    // console.log(related, "11111");

    // Thêm trường `isRelated` vào các công việc liên quan
    related.forEach((relatedJob) => {
      if (result[relatedJob.id]) {
        result[relatedJob.id].isRelated = true; // Đánh dấu các công việc liên quan
      }
    });

    // Loại bỏ công việc hiện tại khỏi `result`
    delete result[job.value.id];
    // console.log(result);
  }

  return result;
});

const filteredRelatedJobs = computed(() => {
  return Object.values(jobsWithDaysLeft.value).filter((job) => job.isRelated);
});
watch(
  () => route.params.id,
  (newId) => {
    jobId.value = newId; // Cập nhật jobId khi route thay đổi
  }
);

const hasApplied = computed(() => {
  return itvs.value.some(
    (itv) => itv.userId == userId && itv.jobId == jobId.value
  );
});

const handleClick = async (jobId) => {
  router.push(`/homepage/listJob/jobDetail/${jobId}`);
};

const currentUser = computed(() => {
  const users = store.state.login.users;
  const userId = JSON.parse(localStorage.getItem("token"));
  return users.find((u) => u.id == userId);
});

const applyForJob = async () => {
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (!currentUser.value || !currentUser.value.id) {
    return message.error("Vui lòng đăng nhập để ứng tuyển!");
  }

  // Kiểm tra xem người dùng đã có CV hay chưa
  const userHasValidCv = cv.value.some(
    (c) => c.userId === currentUser.value.id && c.status === true
  );

  if (!userHasValidCv) {
    return message.error("Vui lòng thêm CV hợp lệ để ứng tuyển!");
  }

  const payload = {
    jobId: +jobId.value,
    time: null,
    createAt: new Date().toISOString(),
    date: null,
    userId: currentUser.value.id,
    status: "pending",
    enterpriseId: +job.value.enterpriseId,
    meetingLink: null,
    interviewMode: null,
    cancelReason: null,
    description: null,
    rank: null,
    skill: null,
    province: null,
    district: null,
    address: null,
    benefitsDescription: null,
    updateStatusTime: [new Date().toLocaleString()],
    workingTime: job.value.workingTime,
  };
  try {
    const response = await axios.post(
      "http://localhost:8080/interview-bookings",
      payload
    );
    message.success("Bạn đã ứng tuyển thành công!");
    router.push("/profile/interview");
    await store.dispatch("getInterview");
    applied.value = true;
    await store.dispatch("getAllInterviewBooking");
  } catch (error) {
    message.error("Có lỗi xảy ra khi ứng tuyển!");
  }
};

onMounted(async () => {
  await store.dispatch("getAllJobs");
  await store.dispatch("getAllInterviewBooking");
  await store.dispatch("getAllUsers");
  await store.dispatch("getCvCdd");
});
</script>

<style></style>
