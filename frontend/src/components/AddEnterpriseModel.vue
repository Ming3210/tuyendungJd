<template>
  <div class="">
    <h2 class="text-2xl font-bold text-center">Thêm Doanh Nghiệp</h2>
    <a-form
      :model="enterpriseData"
      :rules="rules"
      @finish="onFinish"
      ref="formRef"
      layout="vertical"
    >
      <a-form-item label="Tên Doanh Nghiệp" class="" name="title">
        <a-input
          :value="enterpriseData.title"
          @change="
            (event) => {
              enterpriseData.title = event.target.value;
            }
          "
          class="w-full"
        />
      </a-form-item>
      <div class="flex gap-6">
        <a-form-item label="Email" class="w-1/2" name="email">
          <a-input
            :value="enterpriseData.email"
            @change="
              (event) => {
                enterpriseData.email = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>
        <a-form-item
          label="Số lượng nhân viên"
          class="w-1/2"
          name="companySize"
        >
          <a-input
            :value="enterpriseData.companySize"
            @change="
              (event) => {
                enterpriseData.companySize = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>
      </div>

      <div class="flex gap-6">
        <a-form-item label="Sđt" name="phoneNumber" class="w-1/2">
          <a-input
            :value="enterpriseData.phoneNumber"
            @change="
              (event) => {
                enterpriseData.phoneNumber = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>

        <a-form-item label="Lĩnh vực hoạt động" name="industry" class="w-1/2">
          <a-input
            :value="enterpriseData.industry"
            @change="
              (event) => {
                enterpriseData.industry = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>
      </div>

      <a-form-item label="Giới thiệu" name="introduction">
        <a-textarea
          :value="enterpriseData.introduction"
          @change="
            (event) => {
              enterpriseData.introduction = event.target.value;
            }
          "
          :maxLength="100"
          :rows="3"
          class="w-full"
        />
      </a-form-item>

      <div class="flex gap-6">
        <a-form-item label="Website URL" name="websiteUrl" class="w-1/2">
          <a-input
            :value="enterpriseData.websiteUrl"
            @change="
              (event) => {
                enterpriseData.websiteUrl = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>

        <a-form-item label="Facebook URL" name="facebookUrl" class="w-1/2">
          <a-input
            :value="enterpriseData.facebookUrl"
            @change="
              (event) => {
                enterpriseData.facebookUrl = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>
      </div>

      <div class="flex gap-6">
        <a-form-item label="Linkedin URL" name="linkedinUrl" class="w-1/2">
          <a-input
            :value="enterpriseData.linkedinUrl"
            @change="
              (event) => {
                enterpriseData.linkedinUrl = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>

        <a-form-item label="Twitter URL" name="twitterUrl" class="w-1/2">
          <a-input
            :value="enterpriseData.twitterUrl"
            @change="
              (event) => {
                enterpriseData.twitterUrl = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>
      </div>

      <div class="flex gap-6">
        <a-form-item label="Mã số thuế" name="businessLicense" class="w-1/2">
          <a-input
            type="number"
            :value="enterpriseData.businessLicense"
            @change="
              (event) => {
                enterpriseData.businessLicense = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>

        <a-form-item label="Địa chỉ" name="address" class="w-1/2">
          <a-input
            :value="enterpriseData.address"
            @change="
              (event) => {
                enterpriseData.address = event.target.value;
              }
            "
            class="w-full"
          />
        </a-form-item>
      </div>

      <div class="flex gap-4 justify-between">
        <a-button @click="cancel" class="w-1/2"> Hủy </a-button>
        <a-button
          type="primary"
          html-type="submit"
          :loading="isSubmitting"
          class="w-1/2 bg-red-500"
        >
          {{ isSubmitting ? "Đang thêm..." : "Thêm Doanh Nghiệp" }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const formRef = ref(null);
const isSubmitting = ref(false);
const emit = defineEmits(["cancel"]);
const userLoginId = ref(JSON.parse(localStorage.getItem("token")));

const enterpriseData = reactive({
  title: "",
  introduction: "",
  email: "",
  avatar: "https://placehold.co/400",
  userId: userLoginId,
  phoneNumber: "",
  industry: "",
  websiteUrl: "",
  facebookUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  businessLicense: "",
  address: "",
  companySize: "",
});
const store = useStore();

const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const phonePattern = /^[0-9]{10}$/;

const rules = {
  title: [{ required: true, message: "Tên doanh nghiệp không được để trống" }],
  introduction: [
    { required: true, message: "Giới thiệu doanh nghiệp không được để trống" },
  ],
  companySize: [
    { required: true, message: "Số lượng nhân viên không được để trống" },
  ],
  email: [
    { required: true, message: "Email không được để trống" },
    { type: "email", message: "Sai định dạng email" },
    {
      validator(rules, value) {
        if (!value) {
          return Promise.resolve();
        }
        const isDuplicate =
          users.value.some((user) => user.email === value) ||
          enterprises.value.some((ent) => ent.email === value);
        if (isDuplicate) {
          return Promise.reject(new Error("Email đã tồn tại"));
        }
        return Promise.resolve();
      },
    },
  ],
  phoneNumber: [
    { required: true, message: "SĐT doanh nghiệp không được để trống" },
    { pattern: phonePattern, message: "SĐT không hợp lệ" },
  ],
  industry: [
    { required: true, message: "Lĩnh vực hoạt động không được để trống" },
  ],
  websiteUrl: [
    { required: true, message: "Website URL không được để trống" },
    { pattern: urlPattern, message: "Website URL không hợp lệ" },
  ],
  facebookUrl: [
    { required: true, message: "Facebook URL không được để trống" },
    { pattern: urlPattern, message: "Facebook URL không hợp lệ" },
  ],
  linkedinUrl: [
    { required: true, message: "Linkedin URL không được để trống" },
    { pattern: urlPattern, message: "Linkedin URL không hợp lệ" },
  ],
  twitterUrl: [
    { required: true, message: "Twitter URL không được để trống" },
    { pattern: urlPattern, message: "Twitter URL không hợp lệ" },
  ],
  businessLicense: [
    { required: true, message: "Mã số thuế không được để trống" },
  ],
  address: [{ required: true, message: "Địa chỉ không được để trống" }],
};

const cancel = () => {
  emit("cancel");
};
const users = computed(() => store.state.login.users);
const enterprises = computed(() => store.state.enterprise.enterprises);
console.log(users, 99999);

const onFinish = (values) => {
  isSubmitting.value = true;
  const newValue = {
    ...values,
    userId: enterpriseData.userId,
    avatar: enterpriseData.avatar,
    status: "pending",
  };
  setTimeout(() => {
    console.log("Form values:", newValue);
    store.dispatch("addEnterprise", newValue);
    message.success("Thêm doanh nghiệp thành công!");
    store.dispatch("getAllEnterprise");
    isSubmitting.value = false;
    formRef.value?.resetFields();
  }, 1000);
};
onMounted(() => {
  store.dispatch("getAllEnterprise");
  store.dispatch("getAllUsers");
});
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 16px;
}
</style>
