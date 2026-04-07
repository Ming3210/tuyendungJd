<template>
  <div class="h-full">
    <a-modal
      title="Lịch phỏng vấn"
      :visible="props.isVisible"
      @submit="handleUpdate"
      @cancel="handleCancel"
      :footer="null"
      :mask="false"
      class="interview-modal ml-[170px]"
    >
      <hr />
      <div class="interview-form">
        <!-- Interview Date -->
        <div class="form-group mt-4">
          <label class="">Ngày phỏng vấn</label>
          <a-date-picker
            :value="date"
            @change="
              (value) => {
                date = value;
              }
            "
            placeholder="Chọn ngày"
            class="w-full h-[44px] mt-2"
          />
        </div>

        <!-- Interview Time -->
        <div class="form-group mt-4">
          <label class="mb-[6px]">Thời gian</label>
          <a-time-picker
            :value="time"
            @change="
              (value) => {
                time = value;
              }
            "
            placeholder="Chọn thời gian"
            format="HH:mm"
            class="w-full h-[44px] mt-2"
          />
        </div>

        <!-- Interview Mode -->
        <div class="form-group mt-4">
          <label class="mb-[6px]">Cách thức phỏng vấn</label>
          <a-select
            :value="interviewMode"
            @change="
              (value) => {
                interviewMode = value;
              }
            "
            placeholder="Chọn cách thức"
            class="w-full h-[44px] mt-2"
          >
            <a-select-option value="Online">Online</a-select-option>
            <a-select-option value="In-person">In-person</a-select-option>
          </a-select>
        </div>

        <!-- Meeting Link -->
        <div class="form-group mt-4">
          <label class="mb-[6px]">Link cuộc họp</label>
          <a-input
            :value="meetingLink"
            @change="
              (event) => {
                meetingLink = event.target.value;
              }
            "
            placeholder="Nhập link cuộc họp"
            class="w-full h-[44px] mt-2"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-2 mt-8">
          <a-button
            @click="handleCancel"
            class="border-gray-300 w-[248px] h-[48px]"
          >
            Hủy
          </a-button>
          <a-button
            type="primary"
            class="w-[328px] h-[48px] bg-[#C41E3A]"
            @click="handleUpdate"
          >
            Cập nhật
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import dayjs from "dayjs"; // Import dayjs for date and time formatting
import { useStore } from "vuex";
const store = useStore();
const date = ref(null);
const time = ref(null);
const interviewMode = ref("Online");
const meetingLink = ref("");
const emit = defineEmits("closeModal");

// Handle cancel action
const handleCancel = () => {
  console.log("Cancel clicked");
  emit("closeModal");
};

// Handle update action
const handleUpdate = () => {
  // Format date and time
  const formattedDate = date.value
    ? dayjs(date.value).format("DD/MM/YYYY")
    : "";
  const formattedTime = time.value
    ? dayjs(time.value, "HH:mm").format("HH:mm")
    : "";

  const newBooking = {
    ...props.edittedBooking,
    date: formattedDate,
    time: formattedTime,
    interviewMode: interviewMode.value,
    meetingLink: meetingLink.value,
  };
  store.dispatch("updateInterviewBooking", newBooking);
  handleCancel();
};

const props = defineProps(["isVisible", "edittedBooking"]);

watch(
  () => props.edittedBooking,
  (newBooking) => {
    if (newBooking) {
      date.value = props.edittedBooking.date
        ? dayjs(props.edittedBooking.date, "DD/MM/YYYY")
        : null;
      time.value = props.edittedBooking.time
        ? dayjs(props.edittedBooking.time, "HH:mm")
        : null;

      interviewMode.value = newBooking.interviewMode || "Online";
      meetingLink.value = newBooking.meetingLink || "";
    }
  },
  { immediate: true }
);
</script>

<style>
.ant-modal-title {
  font-size: 24px !important;
  font-weight: bold;
}

label {
  font-size: 14px;
  font-weight: 600;
}

.interview-modal {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 1000;
}

.ant-modal-mask {
  display: none !important;
}

.ant-btn-primary {
  background-color: #c41e3a !important;
  border-color: #c41e3a !important;
}

.ant-btn-primary:hover {
  background-color: #a01830 !important;
  border-color: #a01830 !important;
}
.ant-modal-wrap {
  position: absolute !important;
}
</style>
