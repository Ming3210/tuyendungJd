<template>
  <a-modal
    :visible="true"
    title="Interview Details"
    :footer="null"
    :width="800"
    @cancel="handleClose"
  >
    <div class="flex space-x-8">
      <div class="w-1/2">
        <a-steps direction="vertical" :current="currentStepIndex">
          <a-step
            v-for="(step, index) in stepsWithTimes"
            :key="index"
            :title="step.title"
            :description="step.time"
            :status="getStepStatus(index)"
          >
            <template #icon>
              <component :is="step.icon" />
            </template>
          </a-step>
        </a-steps>
        <div class="mt-6 flex gap-3 flex-col">
          <hr />
          <a-button
            type="primary"
            class="bg-blue-500 hover:bg-blue-600 w-full border-none"
            @click="handleMove"
            :disabled="isLastStep || interview.status === 'cancelled'"
          >
            Move to: {{ nextStepTitle }}
          </a-button>
          <hr />
          <a-button
            class="bg-red-500 hover:bg-red-600 w-full border-none"
            @click="showCancelModal"
            :disabled="isLastStep || interview.status === 'cancelled'"
          >
            Cancel Interview
          </a-button>
        </div>
      </div>

      <!-- Rest of the template remains the same -->
      <div class="w-1/2">
        <div class="mb-4">
          <h3 class="text-lg font-semibold">Meeting Time</h3>
          <p class="text-gray-600">
            <strong>Start:</strong> {{ interview?.time || "Not updated" }}
          </p>
          <p class="text-gray-600">
            <strong>Date:</strong> {{ interview?.date || "Not updated" }}
          </p>
          <p class="text-gray-600 truncate">
            <strong>Meeting Link:</strong>
            {{ interview?.meetingLink || "Not updated" }}
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold">Enterprise Information</h3>
          <p class="text-gray-600">
            <strong>Name:</strong> {{ enterpriseInfo?.title || "Not updated" }}
          </p>
          <p class="text-gray-600">
            <strong>Email:</strong> {{ enterpriseInfo?.email || "Not updated" }}
          </p>
          <p class="text-gray-600">
            <strong>Phone:</strong>
            {{ enterpriseInfo?.phoneNumber || "Not updated" }}
          </p>
          <p class="text-gray-600">
            <strong>Address:</strong>
            {{ enterpriseInfo?.address || "Not updated" }}
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold">Interview Manager</h3>
          <p class="text-gray-600">{{ enterpriseManager }}</p>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold">Candidate Information</h3>
          <p class="text-gray-600">{{ candidateInfo?.fullName }}</p>
          <p class="text-gray-600">{{ candidateInfo?.email }}</p>
          <p class="text-gray-600">{{ candidateInfo?.phone }}</p>
        </div>
        <div class="" v-if="interview.status == 'cancelled'">
          <h3 class="text-lg font-semibold">Cancelled Reason</h3>
          <p class="text-gray-600">{{ interview?.cancelReason }}</p>
        </div>
      </div>
    </div>

    <!-- Cancel Interview Modal -->
    <a-modal
      :visible="cancelModalVisible"
      title="Cancel Interview"
      @ok="confirmCancel"
      @cancel="cancelModalVisible = false"
    >
      <a-form>
        <a-form-item label="Reason for cancellation">
          <a-textarea
            :value="cancelReason"
            @change="
              (event) => {
                cancelReason = event.target.value;
              }
            "
            :rows="4"
            placeholder="Please provide a reason for cancellation"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-modal>
</template>

<script setup>
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  HourglassOutlined,
  FileSearchOutlined,
} from "@ant-design/icons-vue";
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const store = useStore();
const props = defineProps({
  inter: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["moveToNext", "cancelInterview", "closeModal"]);

// State
const interview = ref({ ...props.inter });
const cancelModalVisible = ref(false);
const cancelReason = ref("");
const enterpriseInfo = ref(null);
const candidateInfo = ref(null);

// Computed
const enterprises = computed(() => store.state.enterprises.enterprises);
const users = computed(() => store.state.user.users);

const INTERVIEW_STEPS = [
  { title: "pending", icon: ClockCircleOutlined },
  { title: "Enterprise Verified", icon: CheckCircleOutlined },
  { title: "Student Verified", icon: UserOutlined },
  { title: "Waiting for Interview Day", icon: CalendarOutlined },
  { title: "Interviewing", icon: TeamOutlined },
  { title: "Waiting for Result", icon: HourglassOutlined },
  { title: "Done", icon: FileSearchOutlined },
];

const currentStepIndex = computed(() => {
  if (interview.value.status === "done") {
    return INTERVIEW_STEPS.length - 1;
  }
  return interview.value?.updateStatusTime?.length - 1 || 0;
});
const isLastStep = computed(() => {
  return currentStepIndex.value >= INTERVIEW_STEPS.length - 1;
});

const stepsWithTimes = computed(() => {
  return INTERVIEW_STEPS.map((step, index) => {
    const time = interview.value?.updateStatusTime?.[index];
    return {
      ...step,
      time: time || "pending",
    };
  });
});

const nextStepTitle = computed(() => {
  const nextIndex = currentStepIndex.value + 1;
  return nextIndex < INTERVIEW_STEPS.length
    ? INTERVIEW_STEPS[nextIndex].title
    : "Process Complete";
});

const enterpriseManager = computed(() => {
  const enterprise = enterprises.value?.find(
    (e) => e.id === interview.value?.enterpriseId
  );
  const user = users.value?.find((u) => u.id === enterprise?.userId);
  return user?.fullName || "Not found";
});

const getStepStatus = (index) => {
  if (interview.value.status === "cancelled") return "error";
  if (index === currentStepIndex.value) return "process";
  if (index < currentStepIndex.value) return "finish";
  return "wait";
};

watch(
  () => props.inter.value,
  (newValue) => {
    if (newValue.cancelReason) {
      console.log("Cancel reason available:", newValue.cancelReason);
    }
  }
);

const handleMove = async () => {
  if (isLastStep.value) return;

  const nextIndex = currentStepIndex.value + 1;
  const updatedTimes = [...(interview.value.updateStatusTime || [])];
  updatedTimes.push(new Date().toLocaleString());

  const isMovingToLastStep = nextIndex === INTERVIEW_STEPS.length - 1;
  const nextStatus = INTERVIEW_STEPS[nextIndex].title;

  try {
    const updatedInterview = {
      ...interview.value,
      updateStatusTime: updatedTimes,
      status: isMovingToLastStep ? "done" : nextStatus,
    };

    await store.dispatch("updatedInterviewBookings", updatedInterview);
    interview.value = updatedInterview;

    message.success("Interview status updated successfully");
    await store.dispatch("getAllInterviewBooking");
    emit("moveToNext");
  } catch (error) {
    message.error("Failed to update interview status");
  }
};
const showCancelModal = () => {
  cancelModalVisible.value = true;
};

const confirmCancel = async () => {
  if (!cancelReason.value.trim()) {
    message.error("Please provide a reason for cancellation");
    return;
  }

  const newValue = {
    ...interview.value,
    cancelReason: cancelReason.value,
    status: "cancelled",
  };

  try {
    await store.dispatch("updatedInterviewBookings", newValue);
    cancelModalVisible.value = false;
    message.success("Interview cancelled successfully");
    await store.dispatch("getAllInterviewBooking");
    interview.value = newValue;
    emit("cancelInterview");
  } catch (error) {
    message.error("Failed to cancel interview");
  }
};

const handleClose = () => {
  emit("closeModal");
};

const fetchEnterpriseInfo = () => {
  if (interview.value?.enterpriseId && enterprises.value) {
    const enterprise = enterprises.value.find(
      (e) => e.id === interview.value.enterpriseId
    );
    if (enterprise) {
      enterpriseInfo.value = {
        title: enterprise.title,
        email: enterprise.email,
        phoneNumber: enterprise.phoneNumber,
        address: enterprise.address,
      };
    }
  }
};

const fetchCandidateInfo = () => {
  if (interview.value?.userId && users.value) {
    const user = users.value.find((u) => u.id === interview.value.userId);
    if (user) {
      candidateInfo.value = {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      };
    }
  }
};

// Watchers
watch(
  [users, enterprises, () => props.inter],
  () => {
    interview.value = { ...props.inter };
    fetchCandidateInfo();
    fetchEnterpriseInfo();
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  store.dispatch("getUsers");
  store.dispatch("getEnterprises");
});
</script>

<style scoped>
.ant-steps-item-icon {
  background: none;
}
</style>
