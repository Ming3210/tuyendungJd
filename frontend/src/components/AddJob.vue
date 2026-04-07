<template>
  <div class="w-full bg-gray-200 min-h-screen">
    <div class="w-full max-w-[982px] p-4 md:p-5">
      <!-- Nền mờ -->

      <div class="text-2xl font-semibold mb-4" v-if="props.isEditting">
        Chỉnh sửa tin tuyển dụng
      </div>
      <div class="text-2xl font-semibold mb-4" v-else>Thêm tin tuyển dụng</div>
      <div class="bg-white w-full p-8 rounded-lg shadow-lg relative z-50">
        <form @submit.prevent="handleSubmit">
          <!-- Thông tin cơ bản -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium mb-2"
                  >Tiêu đề công việc <span class="text-red-600">*</span></label
                >
                <a-input
                  :value="formData.title"
                  @input="(event) => (formData.title = event.target.value)"
                  placeholder="Nhập tiêu đề công việc"
                />
                <span class="text-red-500 text-xs" v-if="errors.title">{{
                  errors.title
                }}</span>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium mb-2"
                  >Số lượng tuyển <span class="text-red-600">*</span></label
                >
                <a-input-number
                  :value="formData.quantity"
                  @input="(value) => (formData.quantity = value)"
                  type="number"
                  :min="1"
                  class="w-full"
                />
                <span class="text-red-500 text-xs" v-if="errors.quantity">{{
                  errors.quantity
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2"
                  >Ngành nghề <span class="text-red-600">*</span></label
                >
                <a-select
                  :value="formData.industry"
                  @change="(value) => (formData.industry = value)"
                  class="w-full"
                >
                  <a-select-option value="IT">IT</a-select-option>
                  <a-select-option value="Designer">Designer</a-select-option>
                  <a-select-option value="Tester">Tester</a-select-option>
                  <a-select-option value="Marketig">Marketing</a-select-option>
                  <a-select-option value="AI">AI</a-select-option>
                  <a-select-option value="Data">Data</a-select-option>
                  <a-select-option value="Software">Software</a-select-option>
                  <a-select-option value="Robitics">Robitics</a-select-option>
                </a-select>
                <span class="text-red-500 text-xs" v-if="errors.gender">{{
                  errors.gender
                }}</span>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2"
                  >Giới tính <span class="text-red-600">*</span></label
                >
                <a-select
                  :value="formData.gender"
                  @change="(value) => (formData.gender = value)"
                  class="w-full"
                >
                  <a-select-option value="Nam">Nam</a-select-option>
                  <a-select-option value="Nữ">Nữ</a-select-option>
                  <a-select-option value="Khác">Khác</a-select-option>
                </a-select>
                <span class="text-red-500 text-xs" v-if="errors.gender">{{
                  errors.gender
                }}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 class="font-bold">Ảnh mô tả cong việc</h2>
            <a-upload
              v-model:file-list="fileList"
              list-type="picture"
              :preview-file="previewFile"
              :before-upload="() => false"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                Upload
              </a-button>
            </a-upload>
            <span class="text-red-500 text-xs" v-if="errors.image">{{
              errors.image
            }}</span>
          </div>
          <!-- Yêu cầu -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Yêu cầu</h3>
            <div class="grid grid-cols-2 gap-4">
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
                  <a-select-option value="Trưởng nhóm"
                    >Trưởng nhóm</a-select-option
                  >
                </a-select>

                <span class="text-red-500 text-xs" v-if="errors.skills">{{
                  errors.skills
                }}</span>
              </div>
            </div>
          </div>

          <!-- Quyền lợi -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Quyền lợi</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium mb-2"
                  >Loại tiền tệ<span class="text-red-600">*</span></label
                >
                <a-select
                  :value="formData.salaryCurrent"
                  @change="(value) => (formData.salaryCurrent = value)"
                  placeholder="Loại tiền tệ"
                  class="w-full"
                >
                  <a-select-option value="VND">VND</a-select-option>
                </a-select>
                <span
                  class="text-red-500 text-xs"
                  v-if="errors.salaryCurrent"
                  >{{ errors.salaryCurrent }}</span
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2"
                  >Mức lương<span class="text-red-600">*</span></label
                >
                <a-input
                  type="text"
                  :value="formData.salary"
                  @input="(event) => (formData.salary = event.target.value)"
                  placeholder="Nhập số tiền"
                />
                <span class="text-red-500 text-xs" v-if="errors.salary">{{
                  errors.salary
                }}</span>
              </div>
            </div>

            <h3 class="text-lg font-semibold mb-4">Địa chỉ cụ thể</h3>
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

          <!-- Thông tin thêm -->
          <div class="form-group mt-4">
            <label class="block text-sm font-medium mb-2"
              >Mô tả công việc <span class="text-red-600">*</span></label
            >
            <a-textarea
              :value="formData.description"
              @input="handleDescriptionInput"
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
              >Yêu cầu công việc<span class="text-red-600">*</span></label
            >
            <a-textarea
              :value="formData.required"
              @input="(event) => (formData.required = event.target.value)"
              :rows="4"
              placeholder="Nhập yêu cầu"
            />
            <span class="text-red-500 text-xs" v-if="errors.required">{{
              errors.required
            }}</span>
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
          <div class="form-group mt-4">
            <label class="block text-sm font-medium mb-2"
              >Hạn nhận CV<span class="text-red-600">*</span></label
            >
            <a-date-picker
              :disabled-date="disabledDate"
              :value="formData.deadline"
              @change="(date) => (formData.deadline = date)"
              placeholder="Chọn ngày"
              class="w-1/2"
            />
            <p class="text-red-500 text-xs" v-if="errors.deadline">
              {{ errors.deadline }}
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-4 mt-6">
            <a-button @click="handleCancelling">Hủy</a-button>
            <a-button
              v-if="props.isEditting"
              type="primary"
              danger
              html-type="submit"
              :loading="isSubmitting"
              >Cập nhật</a-button
            >
            <a-button
              v-else
              type="primary"
              danger
              html-type="submit"
              :loading="isSubmitting"
              >Đăng tin</a-button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import axios from "axios";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase/firebase";

const avatarPreviewUrl = ref("");
const isUploading = ref(false);
const fileList = ref([]);

const store = useStore();
const isSubmitting = ref(false);
const route = useRoute();
const { id } = route.params;
const formData = reactive({
  title: "",
  quantity: 1,
  description: "",
  rank: [],
  gender: "",
  skills: "",
  salaryCurrent: "",
  salary: "",
  province: "",
  district: "",
  image: "",
  address: "",
  benefitsDescription: "",
  workingTime: "",
  deadline: null,
  required: "",
  industry: "",
});

const errors = reactive({
  title: "",
  quantity: "",
  description: "",
  rank: "",
  gender: "",
  image: "",
  skills: "",
  salaryCurrent: "",
  salary: "",
  province: "",
  district: "",
  address: "",
  benefitsDescription: "",
  workingTime: "",
  deadline: "",
  required: "",
  industry: "",
});

const provinces = ref([]);
const districts = ref([]);

const validateForm = () => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  // Validate title
  if (!formData.title.trim()) {
    errors.title = "Vui lòng nhập tiêu đề công việc";
    isValid = false;
  }

  // Validate quantity
  if (!formData.quantity || formData.quantity < 1) {
    errors.quantity = "Số lượng tuyển phải lớn hơn 0";
    isValid = false;
  }

  // Validate gender
  if (!formData.gender) {
    errors.gender = "Vui lòng chọn giới tính";
    isValid = false;
  }

  if (!formData.skills) {
    errors.skills = "Vui lòng chọn lại kỹ năng";
    isValid = false;
  }

  // Validate skills
  if (!formData.rank.length) {
    errors.rank = "Vui lòng chọn ít nhất một loại công việc";
    isValid = false;
  }

  // Validate salary
  if (!formData.salaryCurrent) {
    errors.salaryCurrent = "Vui lòng chọn loại tiền tệ";
    isValid = false;
  }

  if (!formData.salary) {
    errors.salary = "Vui lòng nhập mức lương";
    isValid = false;
  }

  if (!formData.image) {
    errors.image = "Vui lòng chọn ảnh cho công việc";
    isValid = false;
  }
  // Validate location
  if (!formData.province) {
    errors.province = "Vui lòng chọn tỉnh/thành phố";
    isValid = false;
  }

  if (!formData.district) {
    errors.district = "Vui lòng chọn quận/huyện";
    isValid = false;
  }

  if (!formData.address.trim()) {
    errors.address = "Vui lòng nhập địa chỉ cụ thể";
    isValid = false;
  }

  // Validate descriptions
  if (!formData.description.trim()) {
    errors.description = "Vui lòng nhập mô tả công việc";
    isValid = false;
  }

  if (!formData.benefitsDescription.trim()) {
    errors.benefitsDescription = "Vui lòng nhập quyền lợi";
    isValid = false;
  }

  if (!formData.workingTime.trim()) {
    errors.workingTime = "Vui lòng nhập thời gian làm việc";
    isValid = false;
  }

  if (!formData.required.trim()) {
    errors.required = "Vui lòng nhập yêu cầu công việc";
    isValid = false;
  }

  // Validate deadline
  if (!formData.deadline) {
    errors.deadline = "Vui lòng chọn hạn nhận CV";
    isValid = false;
  }

  return isValid;
};

const disabledDate = (current) => {
  // Vô hiệu hóa tất cả ngày sau ngày hiện tại
  return current && current < dayjs().endOf("day");
};
const props = defineProps(["isEditting", "edittedJob"]);
console.log(props, 99999999);

const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    if (key === "quantity") {
      formData[key] = 1;
    } else if (Array.isArray(formData[key])) {
      formData[key] = [];
    } else {
      formData[key] = "";
    }
  });

  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};

watch(
  () => props.isEditting,
  (newValue) => {
    if (newValue && props.edittedJob) {
      formData.title = props.edittedJob.title || "";
      formData.quantity = props.edittedJob.quantity || 1;
      formData.description = props.edittedJob.description || "";
      formData.rank = props.edittedJob.rank || "";
      formData.gender = props.edittedJob.gender || "";
      formData.skills = props.edittedJob.skills || [];
      formData.salaryCurrent = props.edittedJob.salaryCurrent || "";
      formData.salary = props.edittedJob.salary || "";
      formData.province = props.edittedJob.province || "";
      formData.district = props.edittedJob.district || "";
      formData.address = props.edittedJob.address || "";
      formData.benefitsDescription = props.edittedJob.benefitsDescription || "";
      formData.workingTime = props.edittedJob.workingTime || "";
      formData.deadline = props.edittedJob.deadline
        ? dayjs(props.edittedJob.deadline, "DD/MM/YYYY")
        : null;
    } else {
      // Reset form if not editing
      resetForm();
    }
  },
  { immediate: true }
);
const emit = defineEmits("visible");
const handleCancel = () => {
  resetForm();
  emit("visible", false);
};
const handleCancelling = () => {
  if (props.isEditting) {
    resetForm();
    emit("visible", false);
    message.error("Bạn đã hủy cập nhật");
  } else {
    resetForm();
    emit("visible", false);
    message.error("Bạn đã hủy thêm công việc");
  }
};

const previewFile = async (file) => {
  console.log("Your upload file:", file);

  // Validate file type
  if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
    message.error("Only PNG or JPG files are accepted");
    return null;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    message.error("File size should not exceed 5MB");
    return null;
  }

  // Create a local preview URL
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreviewUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Upload to Firebase
  return await uploadImage(file);
};
const uploadImage = async (file) => {
  try {
    isUploading.value = true;

    const fileExtension = file.name.split(".").pop();
    const fileName = `uploaded_image_${Date.now()}.${fileExtension}`;
    const storageReference = storageRef(storage, `uploads/${fileName}`);

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageReference, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    formData.image = downloadUrl;
    message.success("Image uploaded successfully!");
  } catch (error) {
    console.error("Image upload failed:", error);
    message.error("Image upload failed");
    return null;
  } finally {
    isUploading.value = false;
  }
};

const handleSubmit = async () => {
  if (!validateForm()) {
    message.error("Vui lòng kiểm tra lại thông tin");
    return;
  }

  try {
    isSubmitting.value = true;

    const date = new Date().toISOString().split("T")[0];
    const reverseDate = date.split("-").reverse().join("/");
    const date1 = new Date().toISOString();
    const provinceName = provinces.value.find((p) => p.Id == formData.province);
    const districtName = districts.value.find((d) => d.Id == formData.district);
    const submitData = {
      ...formData,
      enterpriseId: Number(id),
      flight: "pending",
      province: provinceName.Name,
      district: districtName.Name,
      quantity: Number(formData.quantity),
      updateDate: date1,
      salary: formData.salary,
      deadline: formData.deadline
        ? formData.deadline.format("DD/MM/YYYY")
        : null,
    };

    if (props.isEditting) {
      // Update the job
      await store.dispatch("updateJob", {
        id: props.edittedJob.id,
        data: submitData,
      });
      store.dispatch("getAllJob");
      message.success("Cập nhật tin tuyển dụng thành công");
    } else {
      await store.dispatch("addJob", submitData);
      message.success("Đăng tin thành công");
    }

    handleCancel();
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    message.error("Đã có lỗi xảy ra khi đăng tin");
  } finally {
    isSubmitting.value = false;
  }
};

// Load tỉnh/thành phố khi component mounted
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

const handleDescriptionInput = (event) => {
  formData.description = event.target.value;
};
</script>

<style scoped>
.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1rem;
}
</style>
