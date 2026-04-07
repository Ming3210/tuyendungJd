<template>
  <div class="bg-slate-100 w-full">
    <!-- Main content area with overlay -->
    <div class="main-content w-full" :class="{ overlay: isVisible }">
      <div class="w-full">
        <div class="p-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a-col
              v-for="interview in paginated"
              :key="interview.id"
              class="w-full"
            >
              <a-card :bordered="true" class="rounded-lg shadow">
                <div class="flex items-center mb-4">
                  <img
                    src="https://th.bing.com/th/id/R.5981877655a8effaacc60e46f2ce4e35?rik=C5enym8ImGH6uQ&pid=ImgRaw&r=0"
                    alt="Rikkei Jobs Logo"
                    class="w-[70px] h-[70px]"
                  />
                  <div>
                    <p
                      class="text-lg font-bold m-0 h-[60px] flex items-center text-gray-800"
                    >
                      {{
                        findJobById(interview.jobId)?.title ||
                        "Job Title Not Found"
                      }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{
                        findEnterpriseById(interview.enterpriseId)?.title ||
                        "Company Not Found"
                      }}
                    </p>
                  </div>
                </div>

                <div class="text-gray-700 space-y-2">
                  <div class="flex items-center text-sm">
                    <UserOutlined />
                    <span class="flex gap-[4px]">
                      <strong>Tên ứng viên:</strong>
                      {{ findUserById(interview.userId) }}
                    </span>
                  </div>

                  <div class="flex items-start text-sm">
                    <div class="flex">
                      <UserOutlined />
                      <span class=""><strong>CV:</strong></span>
                    </div>
                    <div class="flex flex-col gap-[4px] truncate">
                      <div
                        v-for="cv in Cvs"
                        :key="cv.id"
                        @click="redirectCV(cv.pdfDataUrl)"
                        class="text-blue-500 hover:underline cursor-pointer"
                      >
                        {{ cv.pdfDataUrl }}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center text-sm">
                    <CalendarFilled />
                    <span class="flex gap-[4px]">
                      <strong>Ngày:</strong> {{ interview.date }}
                    </span>
                  </div>

                  <div class="flex items-center text-sm">
                    <ClockCircleFilled />
                    <span class="flex gap-[4px]">
                      <strong>Thời gian:</strong> {{ interview.time }}
                    </span>
                  </div>

                  <div class="flex items-start text-sm">
                    <EnvironmentFilled class="mt-[3px]" />
                    <span class="w-[120px] flex gap-[4px]">
                      <strong>Địa điểm:</strong>
                    </span>
                    <a
                      @click="redirectMeeting(interview.meetingLink)"
                      class="text-blue-500 hover:underline w-full truncate"
                      v-if="interview.meetingLink"
                    >
                      {{ interview.meetingLink || "No Location Link" }}
                    </a>
                    <span v-else>No Location Available</span>
                  </div>
                </div>

                <div class="flex justify-between mt-4">
                  <a-button
                    type="primary"
                    @click="edit(interview)"
                    class="w-[48%] bg-red-600 border-none text-white hover:bg-red-700"
                  >
                    Chỉnh sửa
                  </a-button>
                  <a-button
                    @click="deleteInterviewBooking(interview.id)"
                    class="w-[48%] border-gray-300 text-gray-700 hover:border-gray-400"
                  >
                    Xóa
                  </a-button>
                </div>
              </a-card>
            </a-col>
          </div>
        </div>

        <div>
          <a-pagination
            class="text-end p-5"
            :current="current"
            :total="total"
            :pageSize="perPage"
            show-less-items
            @change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-container relative">
      <InterviewBookingModel
        :isVisible="isVisible"
        :edittedBooking="edittedBooking"
        @closeModal="closeModal"
        class="modal-center"
      />
    </div>
  </div>
</template>

<script setup>
import InterviewBookingModel from "@/components/InterviewBookingModel.vue";
import {
  CalendarFilled,
  ClockCircleFilled,
  EnvironmentFilled,
  UserOutlined,
} from "@ant-design/icons-vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const current = ref(1);
const perPage = 2; // Items per page
const isVisible = ref(false);
const store = useStore();
const edittedBooking = ref(null);
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const interviewBookings = computed(
  () => store.state.interviewBooking.interviewBookings
);
const enterprises = computed(() => store.state.enterprise.enterprises);
const jobs = computed(() => store.state.enterprise.jobs);
const interviewBookingByEnterpriseId = computed(() => {
  return store.state.interviewBooking.interviewBookings.filter(
    (i) => i.enterpriseId == id
  );
});
const total = computed(() => interviewBookingByEnterpriseId.value.length);
const paginated = computed(() => {
  return store.state.interviewBooking.paginatedInterviewBookings;
});
const Cvs = computed(() => store.state.user.cv);

const users = computed(() => store.state.login.users);

// Find user by ID
const findUserById = (id) => {
  const user = users.value.find((i) => i.id === id);
  return user ? user.fullName : "User not found";
};

// Find enterprise by ID
const findEnterpriseById = (id) => {
  const enterprise = enterprises.value.find((i) => i.id === id);
  if (enterprise) {
    return enterprise || { name: "Enterprise Not Found" };
  }
};

// Find job by ID
const findJobById = (id) => {
  const job = jobs.value.find((i) => i.id == id);
  return job || { title: "Job Title Not Found" };
};
const redirectCV = (link) => {
  window.open(link, "_blank");
};
const redirectMeeting = (link) => {
  window.open(link, "_blank");
};
// Close modal
const closeModal = () => {
  isVisible.value = false;
  store.dispatch("getAllInterviewBooking");
};

// Delete interview booking
const deleteInterviewBooking = (id) => {
  const confirm = window.confirm(
    "Are you sure you want to delete this booking?"
  );
  if (!confirm) {
    return;
  }
  store.dispatch("deleteInterviewBooking", id);
  store.dispatch("getAllInterviewBooking");
};

// Edit interview booking
const edit = (booking) => {
  edittedBooking.value = booking;
  isVisible.value = true;
};

// Handle page change
const handlePageChange = (page) => {
  current.value = page;
  const payload = {
    page,
    limit: perPage,
    id: id,
  };
  console.log(payload, "bbbbbbbbbbbbbbbbbbbb");

  store.dispatch("paginatedInterviewBooking", payload);
};

// Watch for changes in interview bookings
watch(
  () => interviewBookings.value,
  () => {
    handlePageChange(current.value);
  },
  { immediate: true }
);

// Fetch data on mount
onMounted(() => {
  store.dispatch("getAllInterviewBooking").then(() => {
    handlePageChange(current.value);
  });
  store.dispatch("getAllUsers");
  store.dispatch("getAllJob");
  store.dispatch("getAllEnterprise");
  store.dispatch("getCv");
});
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 64px - 200px);
  position: relative;
  z-index: 1;
}

.overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
