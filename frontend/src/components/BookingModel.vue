<template>
  <div>
    <a-modal
      title="Lịch phỏng vấn"
      :open="true"
      @cancel="handleCancel"
      :footer="null"
      class="!w-[1000px]"
    >
      <hr />
      <div>
        <label>Chọn công ty</label>
        <a-select
          @change="(value) => (formData.enterpriseId = value)"
          :value="formData.enterpriseId"
          placeholder="Chọn công ty"
          class="w-full h-[44px] mt-2"
        >
          <a-select-option
            v-for="enterprise in ownedEnterprise"
            :key="enterprise.id"
            :value="enterprise.id"
            >{{ enterprise.title }}</a-select-option
          >
        </a-select>
        <span class="text-red-500 text-xs" v-if="errorEnterpriseId.value == ``">
          {{ errorEnterpriseId.value }}
        </span>
      </div>
      <div class="interview-form">
        <!-- Interview Date -->
        <div
          v-if="
            formData.enterpriseId !== `` && jobsFromInterviewBookings.length > 0
          "
        >
          <div class="form-group mt-4">
            <label class="">Ngày phỏng vấn</label>
            <a-date-picker
              :value="formData.date"
              @change="
                (value) => {
                  formData.date = value;
                }
              "
            >
            </a-date-picker>
            <span class="text-red-500 text-xs" v-if="errors.date">{{
              errors.date
            }}</span>
          </div>

          <!-- Interview Time -->
          <div class="form-group mt-4">
            <label class="mb-[6px]">Thời gian</label>
            <a-time-picker
              :value="time"
              @change="
                (value) => {
                  formData.time = value;
                }
              "
              placeholder="Chọn thời gian"
              format="HH:mm"
              class="w-full h-[44px] mt-2"
            />
          </div>
          <span class="text-red-500 text-xs" v-if="errors.time">{{
            errors.time
          }}</span>

          <!-- Interview Mode -->
          <div class="form-group mt-4">
            <label class="mb-[6px]">Cách thức phỏng vấn</label>
            <a-select
              :value="formData.interviewMode"
              @change="
                (value) => {
                  formData.interviewMode = value;
                }
              "
              placeholder="Chọn cách thức"
              class="w-full h-[44px] mt-2"
            >
              <a-select-option value="Online">Online</a-select-option>
              <a-select-option value="In-person">In-person</a-select-option>
            </a-select>
          </div>
          <span class="text-red-500 text-xs" v-if="errors.interviewMode">{{
            errors.interviewMode
          }}</span>

          <!-- Meeting Link -->
          <div
            v-if="formData.interviewMode == `Online`"
            class="form-group mt-4"
          >
            <label class="mb-[6px]">Link cuộc họp</label>
            <a-input
              :value="meetingLink"
              @change="
                (event) => {
                  formData.meetingLink = event.target.value;
                }
              "
              placeholder="Nhập link cuộc họp"
              class="w-full h-[44px]"
            />
          </div>
          <span class="text-red-500 text-xs" v-if="errors.meetingLink">{{
            errors.meetingLink
          }}</span>
          <div
            v-if="formData.interviewMode == `In-person`"
            class="form-group mt-4"
          >
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group mt-4">
                <label class="block text-sm font-medium mb-2">
                  Tỉnh/Thành phố <span class="text-red-600">*</span>
                </label>
                <a-select
                  :value="formData.province"
                  @change="
                    (value) => {
                      formData.province = value;
                      handleProvinceChange(value);
                    }
                  "
                  class="w-full"
                >
                  <a-select-option
                    v-for="prov in provinces"
                    :key="prov.Id"
                    :value="prov.Id"
                  >
                    {{ prov.Name }}
                  </a-select-option>
                </a-select>
                <span class="text-red-500 text-xs" v-if="errors.province">
                  {{ errors.province }}
                </span>
              </div>

              <!-- Select Quận -->
              <div class="form-group mt-4">
                <label class="block text-sm font-medium mb-2">
                  Quận <span class="text-red-600">*</span>
                </label>
                <a-select
                  :value="formData.district"
                  @change="(value) => (formData.district = value)"
                  class="w-full"
                  :disabled="!formData.province"
                >
                  <a-select-option
                    v-for="dist in districts"
                    :key="dist.Id"
                    :value="dist.Id"
                  >
                    {{ dist.Name }}
                  </a-select-option>
                </a-select>
                <span class="text-red-500 text-xs" v-if="errors.district">
                  {{ errors.district }}
                </span>
              </div>
            </div>
            <div class="form-group mt-4">
              <label class="block text-sm font-medium mb-2"
                >Địa chỉ cụ thể <span class="text-red-600">*</span></label
              >
              <a-input
                :value="formData.address"
                @input="(event) => (formData.address = event.target.value)"
                placeholder="Nhập địa chỉ cụ thể"
              />
              <span class="text-red-500 text-xs" v-if="errors.address">{{
                errors.address
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="block text-sm font-medium mb-2"
              >Kỹ năng <span class="text-red-600">*</span></label
            >
            <a-select
              :value="formData.skills"
              @change="(value) => (formData.skills = value)"
              class="w-full"
            >
              <a-select-option value="Mới tốt nghiệp"
                >Mới tốt nghiệp</a-select-option
              >
              <a-select-option value="Sơ cấp">Sơ cấp</a-select-option>
              <a-select-option value="Trung cấp">Trung cấp</a-select-option>
              <a-select-option value="Cao cấp">Cao cấp</a-select-option>
              <a-select-option value="Trưởng nhóm">Trưởng nhóm</a-select-option>
            </a-select>
            <span class="text-red-500 text-xs" v-if="errors.skills">{{
              errors.skills
            }}</span>
          </div>
          <div class="form-group">
            <label class="block text-sm font-medium mb-2"
              >Cấp bậc <span class="text-red-600">*</span></label
            >
            <a-select
              :value="formData.rank"
              mode="multiple"
              @change="(value) => (formData.rank = value)"
              class="w-full"
            >
              <a-select-option value="Intern">Intern</a-select-option>
              <a-select-option value="Fresher">Fresher</a-select-option>
              <a-select-option value="Junior">Junior</a-select-option>
              <a-select-option value="Senior">Senior</a-select-option>
              <a-select-option value="Lead">Lead</a-select-option>
            </a-select>
            <span class="text-red-500 text-xs" v-if="errors.rank">{{
              errors.rank
            }}</span>
          </div>
          <div class="form-group mt-4">
            <label>Chọn công việc</label>
            <a-select
              @change="
                (value) => {
                  formData.job = value;
                }
              "
              :value="formData.job"
              placeholder="Chọn công việc"
              class="w-full h-[44px] mt-2"
            >
              <a-select-option
                v-for="job in jobsFromInterviewBookings"
                :key="job.id"
                :value="job.title"
                >{{ job.title }}</a-select-option
              >
            </a-select>

            <span class="text-red-500 text-xs" v-if="errors.job">{{
              errors.job
            }}</span>
          </div>

          <div class="form-group mt-4">
            <label class="block text-sm font-medium mb-2"
              >Mô tả công việc <span class="text-red-600">*</span></label
            >
            <a-textarea
              :value="formData.description"
              @input="(event) => (formData.description = event.target.value)"
              :rows="4"
              placeholder="Nhập mô tả công việc"
            />
            <span class="text-red-500 text-xs" v-if="errors.description">{{
              errors.description
            }}</span>
          </div>
          <div class="form-group mt-4">
            <label class="block text-sm font-medium mb-2"
              >Quyền lợi<span class="text-red-600">*</span></label
            >
            <a-textarea
              :value="formData.benefitsDescription"
              @input="
                (event) => (formData.benefitsDescription = event.target.value)
              "
              :rows="4"
              placeholder="Nhập quyền lợi"
            />
            <span
              class="text-red-500 text-xs"
              v-if="errors.benefitsDescription"
              >{{ errors.benefitsDescription }}</span
            >
          </div>
          <div class="form-group mt-4">
            <label class="block text-sm font-medium mb-2"
              >Thời gian làm việc<span class="text-red-600">*</span></label
            >
            <a-select
              :value="formData.workingTime"
              @change="(value) => (formData.workingTime = value)"
              class="w-full"
            >
              <a-select-option value="Part time">Part time</a-select-option>
              <a-select-option value="Full time">Full time</a-select-option>
              <a-select-option value="Intern">Intern</a-select-option>
            </a-select>
            <span class="text-red-500 text-xs" v-if="errors.workingTime">{{
              errors.workingTime
            }}</span>
          </div>
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
            class="w-[328px] h-[48px] bg-[#C41E3A] text-white"
            @click="handleUp"
          >
            Cập nhật
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import axios from "axios";
import { computed, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const emit = defineEmits(["cancel"]);

const store = useStore();
const loggedUser = computed(() => {
  const users = store.state.login.users || [];
  const loggedUserId = JSON.parse(localStorage.getItem("token"));
  return users.find((u) => u.id === loggedUserId);
});
const route = useRoute();
const { id } = route.params;
const formData = reactive({
  enterpriseId: "",
  description: "",
  skills: "",
  id: "",
  rank: [],
  address: "",
  job: "",
  benefitsDescription: "",
  workingTime: "",
  userId: id,
  meetingLink: "",
  interviewMode: "",
  time: null,
  date: null,
});

const errors = reactive({
  enterpriseId: "",
  description: "",
  skills: "",
  rank: "",
  address: "",
  job: "",
  benefitsDescription: "",
  workingTime: "",
  userId: id,
  meetingLink: "",
  interviewMode: "",
  time: "",
  date: "",
});

const errorEnterpriseId = ref("");

// Hàm xử lý hủy
const handleCancel = () => {
  emit("cancel");
};

// Hàm validate form
const validateForm = () => {
  let isValid = true;

  // Reset all errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  // Enterprise validation
  if (!formData.enterpriseId) {
    errors.enterpriseId = "Vui lòng chọn công ty";
    errorEnterpriseId.value = "Vui lòng chọn công ty";
    message.error("Vui lòng chọn công ty");
    isValid = false;
  }

  // Job validation
  if (!formData.job) {
    errors.job = "Vui lòng chọn công việc";
    message.error("Vui lòng chọn công việc");
    isValid = false;
  }

  // Required fields validation
  const requiredFields = {
    rank: "Vui lòng chọn cấp bậc",
    description: "Vui lòng nhập mô tả công việc",
    benefitsDescription: "Vui lòng nhập quyền lợi",
    workingTime: "Vui lòng nhập thời gian làm việc",
    date: "Vui lòng chọn ngày phỏng vấn",
    time: "Vui lòng chọn giờ phỏng vấn",
  };

  Object.entries(requiredFields).forEach(([field, message]) => {
    if (field === "rank") {
      if (!formData[field].length) {
        errors[field] = message;
        isValid = false;
      }
    } else if (!formData[field]) {
      errors[field] = message;
      isValid = false;
    }
  });

  // Interview mode specific validation
  if (formData.interviewMode === "In-person") {
    const inPersonFields = {
      province: "Vui lòng chọn tỉnh/thành",
      district: "Vui lòng chọn quận/huyện",
      address: "Vui lòng nhập địa chỉ cụ thể",
    };

    Object.entries(inPersonFields).forEach(([field, message]) => {
      if (!formData[field]) {
        errors[field] = message;
        isValid = false;
      }
    });
  } else if (formData.interviewMode === "Online") {
    if (!formData.meetingLink) {
      errors.meetingLink = "Vui lòng nhập đường dẫn phỏng vấn trực tuyến";
      isValid = false;
    }
  }

  // Show validation summary if there are errors
  if (!isValid) {
    const errorMessages = Object.values(errors).filter((msg) => msg);
    if (errorMessages.length) {
      message.error(errorMessages[0]);
    }
  }

  return isValid && !errorEnterpriseId.value;
};

const provinces = ref([]);
const districts = ref([]);
// Xử lý cập nhật
const handleUp = async () => {
  if (!validateForm()) return;
  const provinceName = provinces.value.find((p) => p.Id == formData.province);
  const districtName = districts.value.find((d) => d.Id == formData.district);
  const formattedData = {
    ...formData,
    id: findId(formData.job),
    province: provinceName.Name,
    district: districtName.Name,
    date: formData.date ? formData.date.format("YYYY-MM-DD") : "",
    time: formData.time ? formData.time.format("HH:mm") : "",
  };

  try {
    console.log(formattedData);

    await store.dispatch("updateInterviewBooking", formattedData);
    handleCancel();
  } catch (error) {
    console.error("Error updating interview:", error);
  }
};

const jobs = computed(() => store.state.enterprise.jobs);
const interviewBookings = computed(
  () => store.state.interviewBooking.interviewBookings
);
const enterprises = computed(() => store.state.enterprise.enterprises || []);
const userid = JSON.parse(localStorage.getItem("token"));
const findId = (job) => {
  console.log(jobs);
  let trueJob = jobs.value.find((j) => j.title == job);
  const trueInterview = interviewBookings.value.find(
    (i) => i.jobId == trueJob.id
  );

  return trueInterview.id;
};
// Lấy các enterprise của user hiện tại và đã verified
const ownedEnterprise = computed(() =>
  enterprises.value.filter((e) => e.userId == userid && e.status == "verified")
);

// Lọc job theo enterpriseId được chọn
const filterJob = computed(() =>
  jobs.value.filter((j) => j.enterpriseId == formData.enterpriseId)
);

// Lấy các job có trong interviewBookings và thuộc enterprise được chọn
const jobsFromInterviewBookings = computed(() => {
  // Lọc các booking có userId trùng với id hiện tại
  const userBookings = interviewBookings.value.filter(
    (booking) => booking.userId === id
  );

  // Lấy tất cả jobId từ các booking của user
  const userJobIds = userBookings.map((booking) => booking.jobId);

  const userJobs = filterJob.value.filter((job) => userJobIds.includes(job.id));
  console.log(userJobs);

  return userJobs;
});

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    provinces.value = response.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu tỉnh/thành:", error);
  }
});

// Xử lý khi chọn tỉnh/thành phố
const handleProvinceChange = (provinceId) => {
  formData.district = null;
  const selectedProvince = provinces.value.find((p) => p.Id === provinceId);
  if (selectedProvince) {
    districts.value = selectedProvince.Districts;
  }
};
onMounted(() => {
  store.dispatch("getAllEnterprise");
  store.dispatch("getAllJob");
  store.dispatch("getAllInterviewBooking");
});
</script>
