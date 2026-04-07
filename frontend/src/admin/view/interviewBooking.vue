<template>
  <div class="p-6">
    <!-- Header Section -->
    <div v-if="openForm" class="p-4">
      <InterviewModal
        @moveToNext="moveToNext"
        :inter="inter"
        @closeModal="closeModal"
        @cancelInterview="cancelInterview"
      />
    </div>
    <div class="flex items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý lịch phỏng vấn</h1>
      <div class="flex items-center gap-4">
        <div class="">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm lịch phỏng vấn"
            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @input="handleSearch"
          />
        </div>
      </div>
    </div>

    <!-- Interview Grid -->
    <div class="relative">
      <div
        v-if="interviews?.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="interview in paginatedData"
          :key="interview.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <!-- Card Image -->
          <div class="relative">
            <img
              :src="findJobImage(interview)"
              :alt="interview.jobTitle"
              class="w-full h-40 object-cover rounded-t-lg"
              @error="handleImageError"
            />
            <span
              class="absolute top-3 right-3 px-3 py-1 text-sm font-medium rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': interview.status === 'pending',
                'bg-teal-100 text-teal-800':
                  interview.status === 'Enterprise Verified',
                'bg-red-100 text-red-800':
                  interview.status === 'Student Verified',
                'bg-blue-100 text-blue-800':
                  interview.status === 'Waiting for Interview Day',
                'bg-purple-100 text-purple-800':
                  interview.status === 'Interviewing',
                'bg-lime-100 text-lime-200':
                  interview.status === 'Waiting for Result',
                'bg-green-100 text-green-300': interview.status == 'done',
                'bg-sky-100 text-sky-300': interview.status == 'cancelled',
              }"
            >
              {{ getStatusText(interview.status) }}
            </span>
          </div>

          <!-- Card Content -->
          <div class="p-4">
            <div class="flex items-center gap-3 mb-3">
              <img
                :src="findEnterpriseImage(interview)"
                class="w-10 h-10 rounded-full"
                alt="a"
              />
              <div>
                <h3 class="font-medium text-gray-900">
                  {{ interview?.enterpriseName }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ findEnterprise(interview) }}
                </p>
              </div>
            </div>
            <div class="mb-3 flex items-center gap-3">
              <img
                class="w-[30px] h-[30px] rounded-full"
                :src="findUserAvatar(interview)"
                alt=""
              />
              <span>{{ findUserName(interview) }}</span>
            </div>
            <!-- Interview Details -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <CalendarOutlined />
                <span>{{ interview?.date }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ClockCircleOutlined />
                <span>{{ interview?.time }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="w-full">
              <a-button @click="viewDetail(interview)" class="w-full"
                >View detail</a-button
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <img src="" class="w-24 h-24 mx-auto mb-4" alt="No data" />
          <p class="text-lg">Không tìm thấy lịch phỏng vấn</p>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <a-pagination
        v-model:current="current"
        :total="totalItems"
        :pageSize="pageSize"
        @change="handlePageChange"
        show-less-items
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import InterviewModal from "@/admin/components/InterviewModal.vue";
const interviews = computed(() => store.state.interview.interviewBookings);
const jobs = computed(() => store.state.interview.jobs);
const openForm = ref(false);
const store = useStore();
const searchQuery = ref("");
const pageSize = ref(8);
const current = ref(1);
const paginatedData = computed(
  () => store.state.interview.paginatedInterviewBookings || []
);
const totalItems = computed(() => interviews.value.length);

console.log(totalItems);

const users = computed(() => store.state.user.users);
const enterprises = computed(() => store.state.enterprises.enterprises);
const inter = ref({});
const findEnterprise = (interview) => {
  const enterprise = enterprises.value.find(
    (e) => e.id == interview.enterpriseId
  );
  return enterprise?.title;
};
const findEnterpriseImage = (interview) => {
  const enterprise = enterprises.value.find(
    (j) => j.id === interview.enterpriseId
  );
  return enterprise?.avatar;
};

const findJobImage = (interview) => {
  const job = jobs.value.find((j) => j.id === interview.jobId);
  return job?.image;
};

const findUserAvatar = (interview) => {
  const user = users.value.find((e) => e.id === interview.userId);
  return user?.avatar;
};

const findUserName = (interview) => {
  const user = users.value.find((e) => e.id === interview.userId);
  return user?.fullName;
};
const moveToNext = () => {
  store.dispatch("getAllInterviewBooking").then(() => {
    fetchPaginatedInterviews(current.value);
  });
};
const getStatusText = (status) => {
  const statusTexts = {
    pending: "Pending",
    "Enterprise Verified": "Enterprise Verified",
    "Student Verified": "Student Verified",
    "Waiting for Interview Day": "Waiting for Interview Day",
    Interviewing: "Interviewing",
    "Waiting for Result": "Waiting for Result",
    done: "Done",
    cancelled: "cancelled",
  };
  return statusTexts[status] || "Không xác định";
};

const handleSearch = () => {
  fetchPaginatedInterviews();
  store.dispatch("searchInterviewBooking", { title: searchQuery.value });
};

const fetchPaginatedInterviews = async (page = 1) => {
  try {
    const payload = {
      page,
      limit: pageSize.value,
    };
    await store.dispatch("getPaginatedInterviewBookings", payload);
  } catch (error) {
    console.error("Failed to fetch paginated interviews:", error);
  }
};

const cancelInterview = () => {
  store.dispatch("getAllInterviewBooking").then(() => {
    fetchPaginatedInterviews(current.value);
  });
};
const handlePageChange = (page) => {
  current.value = page;
  fetchPaginatedInterviews(page);
};
onMounted(() => {
  store.dispatch("getAllInterviewBooking"),
    store.dispatch("getUsers"),
    store.dispatch("getEnterprises"),
    store.dispatch("a"),
    fetchPaginatedInterviews();
});

const viewDetail = (interview) => {
  store.dispatch("getAllInterviewBooking").then(() => {
    inter.value = store.state.interview.interviewBookings.find(
      (i) => i.id === interview.id
    );
    openForm.value = true;
  });
};
const closeModal = () => {
  openForm.value = false;
};
</script>

<style scoped>
.interview-manager {
  padding: 24px;
}

.header {
  margin-bottom: 24px;
}

.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
}

.interview-card {
  transition: transform 0.2s;
}

.interview-card:hover {
  transform: translateY(-4px);
}

.interview-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
